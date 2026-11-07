import { TitleScreen } from '@/components/title/title-screen'
import { getAllPosts } from '@/lib/posts'

export default function Page() {
  const [latest] = getAllPosts()
  return <TitleScreen latestPostHref={`/posts/${latest.slug}`} />
}
