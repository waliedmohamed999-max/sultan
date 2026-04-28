'use client'

import { notFound } from 'next/navigation'
import { useSiteContent } from '@/components/cms/useSiteContent'
import type { SiteContent } from '@/data/siteContent'

export function BlogPostClient({ slug, initialContent }: { slug: string; initialContent: SiteContent }) {
  const { content } = useSiteContent(initialContent)
  const post = content.blogPosts.find((item) => item.slug === slug)
  if (!post) notFound()

  return (
    <article className="section bg-white">
      <div className="container max-w-3xl">
        <span className="badge mb-4">{post.date} | {post.author}</span>
        <h1 className="section-title">{post.title}</h1>
        <p className="text-xl leading-10 text-[#444]">{post.excerpt}</p>
        <div className="mt-8 space-y-5 text-lg leading-10 text-[#555]">
          {content.pages.blog.articleBody.map((paragraph, index) => (
            <p key={`${post.slug}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  )
}
