'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { useSiteContent } from '@/components/cms/useSiteContent'
import { siteContentDefaults } from '@/data/siteContent'

export default function BlogPage() {
  const { content } = useSiteContent(siteContentDefaults)

  return (
    <section className="section bg-white">
      <div className="container">
        <h1 className="section-title">{content.pages.blog.title}</h1>
        <div className="grid gap-5 md:grid-cols-3">
          {content.blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-lg bg-surface p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <CheckCircle2 className="mb-4 text-primary" />
              <h2 className="text-xl font-black leading-8 text-[#183b28]">{post.title}</h2>
              <p className="mt-3 leading-7 text-[#666]">{post.excerpt}</p>
              <span className="mt-5 block text-sm font-bold text-primary">{post.date} | {post.author}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
