/**
 * "Name - Role" titles: the name and the hyphen are white, the role is the
 * accent blue. Titles without a hyphen are shown whole in white.
 */
export default function SiteTitle({ title, className = '' }) {
  const [name, ...rest] = title.split(' - ')
  if (!rest.length) return <span className={className}>{title}</span>
  return (
    <span className={className}>
      <span className="text-white">{name} -</span> <span className="text-blue-400">{rest.join(' - ')}</span>
    </span>
  )
}
