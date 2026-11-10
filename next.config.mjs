/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The whole site is content-driven and static, so it is exported as plain
  // HTML. That keeps hosting simple and lets Netlify Forms detect the contact
  // form in the generated markup at deploy time.
  output: 'export',
  images: { unoptimized: true },
}

export default nextConfig
