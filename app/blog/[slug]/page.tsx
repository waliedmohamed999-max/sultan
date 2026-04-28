import { notFound } from 'next/navigation'
import { blogPosts } from '@/data/reviews'
import { siteContentDefaults } from '@/data/siteContent'
import { BlogPostClient } from './BlogPostClient'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug)
  if (!post) notFound()
  return <BlogPostClient slug={params.slug} initialContent={siteContentDefaults} />
}
