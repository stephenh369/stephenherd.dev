/**
 * Reads a YouTube channel's public Atom feed (no API key needed) into a plain
 * list of recent videos. Shared by the build (lib/youtube.js) and by the
 * Netlify function that refreshes the list for visitors
 * (netlify/functions/youtube.mjs), so it has no dependencies.
 */

export const CHANNEL_ID = /^UC[\w-]{22}$/

export const feedUrl = (channelId) => `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }

function decode(text = '') {
  return text.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (match, code) => {
    if (code[0] !== '#') return ENTITIES[code.toLowerCase()] ?? match
    const point = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10)
    return Number.isFinite(point) ? String.fromCodePoint(point) : match
  })
}

const tag = (xml, name) => decode(xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1]?.trim())

export function parseFeed(xml, limit = 6) {
  const videos = []
  for (const [, entry] of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const id = tag(entry, 'yt:videoId')
    if (!/^[\w-]{6,20}$/.test(id)) continue
    const link = decode(entry.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"/)?.[1])
    const views = Number(entry.match(/<media:statistics[^>]*views="(\d+)"/)?.[1])
    videos.push({
      id,
      title: tag(entry, 'title'),
      url: /^https:\/\/www\.youtube\.com\//.test(link) ? link : `https://www.youtube.com/watch?v=${id}`,
      published: tag(entry, 'published'),
      // 16:9 thumbnail (the one named in the feed is 4:3 with black bars).
      thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
      views: Number.isFinite(views) ? views : null,
      short: link.includes('/shorts/'),
    })
  }
  return videos
    .filter((video) => !video.short)
    .sort((a, b) => (b.published || '').localeCompare(a.published || ''))
    .slice(0, limit)
}

/** The channel's most recent videos, newest first. Throws if the feed cannot be read. */
export async function fetchChannelVideos(channelId, limit = 6) {
  if (!CHANNEL_ID.test(channelId)) throw new Error(`Not a YouTube channel ID: ${channelId}`)
  const response = await fetch(feedUrl(channelId), { signal: AbortSignal.timeout(8000) })
  if (!response.ok) throw new Error(`YouTube feed for ${channelId} returned ${response.status}`)
  return parseFeed(await response.text(), limit)
}
