'use client'

import { useEffect, useState } from 'react'

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

function formatDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : dateFormat.format(date)
}

function PlayBadge() {
  return (
    <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <svg className="h-9 w-13 opacity-90 drop-shadow-lg" viewBox="0 0 175 115">
        <path
          fill="#f00"
          d="m154 17.5c-1.82-6.73-7.07-12-13.8-13.8-9.04-3.49-96.6-5.2-122 0.1-6.73 1.82-12 7.07-13.8 13.8-4.08 17.9-4.39 56.6 0.1 74.9 1.82 6.73 7.07 12 13.8 13.8 17.9 4.12 103 4.7 122 0 6.73-1.82 12-7.07 13.8-13.8 4.35-19.5 4.66-55.8-0.1-75z"
        />
        <path fill="#fff" d="m105 55-40.8-23.4v46.8z" />
      </svg>
    </span>
  )
}

function VideoCard({ video, featured }) {
  return (
    <li className={featured ? 'sm:col-span-2 lg:row-span-2' : ''}>
      <a className="glass link-card flex h-full flex-col overflow-hidden" href={video.url} target="_blank" rel="noreferrer">
        <span className="relative block aspect-video w-full bg-black">
          <img className="h-full w-full object-cover" src={video.thumbnail} alt="" loading="lazy" />
          <PlayBadge />
        </span>
        <span className={`flex flex-1 flex-col justify-between gap-2 ${featured ? 'p-6' : 'p-4'}`}>
          <h3 className={`font-semibold text-blue-400 ${featured ? 'text-2xl lg:text-3xl' : 'text-base'}`}>{video.title}</h3>
          <span className="text-sm text-white/70">
            {featured ? 'Latest video · ' : ''}
            <time dateTime={video.published}>{formatDate(video.published)}</time>
          </span>
          <span className="sr-only"> (opens on YouTube in a new tab)</span>
        </span>
      </a>
    </li>
  )
}

function Channel({ channel }) {
  const [videos, setVideos] = useState(channel.videos)

  // The list in the HTML dates from the last deploy; ask for anything newer.
  // If the request fails (or there is no function, as in local development)
  // the built-in list simply stays.
  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/youtube?channel=${encodeURIComponent(channel.id)}&limit=${channel.limit}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (Array.isArray(data?.videos) && data.videos.length) setVideos(data.videos)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [channel.id, channel.limit])

  const headingId = `channel-${channel.id}`
  return (
    <section aria-labelledby={headingId}>
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <div className="max-w-2xl">
          <h2 id={headingId} className="text-3xl text-blue-400">
            {channel.name}
          </h2>
          {channel.description ? <p className="pt-2 text-white/80">{channel.description}</p> : null}
        </div>
        <a className="btn" href={channel.url} target="_blank" rel="noreferrer">
          Visit channel
          <span className="sr-only"> {channel.name} (opens in a new tab)</span>
        </a>
      </div>
      {videos.length ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} featured={index === 0} />
          ))}
        </ul>
      ) : (
        <p className="glass p-6">The latest videos could not be loaded just now. You can find them all on the channel.</p>
      )}
    </section>
  )
}

/** Recent videos from each YouTube channel listed in a page's `videos` front-matter. */
export default function VideoFeeds({ channels }) {
  if (!channels?.length) return null
  return (
    <div className="grid gap-14">
      {channels.map((channel) => (
        <Channel key={channel.id} channel={channel} />
      ))}
    </div>
  )
}
