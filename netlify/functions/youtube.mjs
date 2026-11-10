import { CHANNEL_ID, fetchChannelVideos } from '../../lib/youtubeFeed.mjs'

/**
 * GET /api/youtube?channel=<channel id>&limit=<n>
 *
 * Returns a channel's most recent videos as JSON. The site is static, so the
 * videos baked in at build time would otherwise only be as fresh as the last
 * deploy; components/VideoFeeds.js calls this to pick up newer uploads.
 * Responses are cached at Netlify's edge, so YouTube is asked at most every
 * half hour per channel.
 */
export default async function handler(request) {
  const params = new URL(request.url).searchParams
  const channel = params.get('channel') ?? ''
  const limit = Math.min(15, Math.max(1, Number.parseInt(params.get('limit'), 10) || 5))
  if (!CHANNEL_ID.test(channel)) return Response.json({ error: 'Unknown channel' }, { status: 400 })

  try {
    return Response.json(
      { videos: await fetchChannelVideos(channel, limit) },
      {
        headers: {
          'Cache-Control': 'public, max-age=300',
          'Netlify-CDN-Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400',
        },
      }
    )
  } catch {
    return Response.json({ error: 'Could not load videos' }, { status: 502 })
  }
}

export const config = { path: '/api/youtube' }
