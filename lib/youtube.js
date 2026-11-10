import { fetchChannelVideos } from './youtubeFeed.mjs'

const DEFAULT_LIMIT = 5

/**
 * Loads the recent videos for a page's `videos` front-matter (see
 * content/README.md). This runs when the site is built, so the exported HTML
 * already contains the videos; components/VideoFeeds.js then refreshes them in
 * the browser. A channel whose feed cannot be read is still listed, just
 * without videos, so a YouTube hiccup never fails the build.
 */
export async function getVideoFeeds(config) {
  const channels = config?.channels ?? []
  const limit = config.limit ?? DEFAULT_LIMIT
  return Promise.all(
    channels.map(async (channel) => {
      const base = {
        id: channel.id,
        name: channel.name,
        description: channel.description ?? null,
        url: channel.handle ? `https://www.youtube.com/${channel.handle}` : `https://www.youtube.com/channel/${channel.id}`,
        limit,
      }
      try {
        return { ...base, videos: await fetchChannelVideos(channel.id, limit) }
      } catch (error) {
        console.warn(`[youtube] ${channel.name}: ${error.message}`)
        return { ...base, videos: [] }
      }
    })
  )
}
