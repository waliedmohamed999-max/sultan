import { HomePageClient } from '@/components/home/HomePageClient'
import { siteContentDefaults } from '@/data/siteContent'

export default function HomePage() {
  return <HomePageClient initialContent={siteContentDefaults} />
}
