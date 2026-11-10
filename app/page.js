import HomeExperience from '@/components/home/HomeExperience'
import { getHome, getNavPages, getWorld } from '@/lib/content'

export default function HomePage() {
  const { title, typewriter } = getHome()
  return <HomeExperience home={{ title, typewriter }} pages={getNavPages()} world={getWorld()} />
}
