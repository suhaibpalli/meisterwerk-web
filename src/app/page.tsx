import { getLayout } from '@/lib/layout-server'
import { HomeLayout } from '@/components/layouts'

export default async function HomePage() {
  const layout = await getLayout()
  return <HomeLayout layout={layout} />
}
