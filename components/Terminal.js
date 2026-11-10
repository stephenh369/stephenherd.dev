/** A little terminal window (traffic-light buttons and all) to frame a line of text. */
export default function Terminal({ children, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-white/50 bg-black ${className}`}>
      <div className="flex gap-1.5 px-4 py-2" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
      </div>
      <div className="border-t border-white/50 px-4 py-4 font-mono">{children}</div>
    </div>
  )
}
