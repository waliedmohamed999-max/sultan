import { DashboardClient } from './DashboardClient'
import { siteContentDefaults } from '@/data/siteContent'

export const metadata = {
  title: 'لوحة التحكم | I Natural'
}

export default function DashboardPage() {
  return <DashboardClient initialContent={siteContentDefaults} />
}
