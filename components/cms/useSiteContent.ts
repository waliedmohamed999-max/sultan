'use client'

import { useEffect, useMemo, useState } from 'react'
import { SITE_CONTENT_STORAGE_KEY, siteContentDefaults, type SiteContent } from '@/data/siteContent'

const SITE_CONTENT_UPDATE_EVENT = 'inatural-site-content-update'

function mergeSiteContent(initialContent: SiteContent, parsed: Partial<SiteContent>): SiteContent {
  return {
    ...initialContent,
    ...parsed,
    header: {
      ...initialContent.header,
      ...parsed.header,
      tickerMessages: parsed.header?.tickerMessages?.length ? parsed.header.tickerMessages : initialContent.header.tickerMessages,
      navLinks: parsed.header?.navLinks?.length ? parsed.header.navLinks : initialContent.header.navLinks
    },
    hero: { ...initialContent.hero, ...parsed.hero },
    home: {
      ...initialContent.home,
      ...parsed.home,
      offers: { ...initialContent.home.offers, ...parsed.home?.offers },
      collections: { ...initialContent.home.collections, ...parsed.home?.collections },
      bestSellers: { ...initialContent.home.bestSellers, ...parsed.home?.bestSellers },
      why: { ...initialContent.home.why, ...parsed.home?.why },
      certifications: { ...initialContent.home.certifications, ...parsed.home?.certifications },
      testimonials: { ...initialContent.home.testimonials, ...parsed.home?.testimonials },
      journal: { ...initialContent.home.journal, ...parsed.home?.journal },
      cta: { ...initialContent.home.cta, ...parsed.home?.cta },
      whyItems: parsed.home?.whyItems?.length ? parsed.home.whyItems : initialContent.home.whyItems,
      certificationItems: parsed.home?.certificationItems?.length ? parsed.home.certificationItems : initialContent.home.certificationItems
    },
    pages: {
      ...initialContent.pages,
      ...parsed.pages,
      products: { ...initialContent.pages.products, ...parsed.pages?.products },
      productDetails: { ...initialContent.pages.productDetails, ...parsed.pages?.productDetails },
      about: {
        ...initialContent.pages.about,
        ...parsed.pages?.about,
        points: parsed.pages?.about?.points?.length ? parsed.pages.about.points : initialContent.pages.about.points
      },
      checkout: {
        ...initialContent.pages.checkout,
        ...parsed.pages?.checkout,
        paymentMethods: parsed.pages?.checkout?.paymentMethods?.length ? parsed.pages.checkout.paymentMethods : initialContent.pages.checkout.paymentMethods
      },
      blog: {
        ...initialContent.pages.blog,
        ...parsed.pages?.blog,
        articleBody: parsed.pages?.blog?.articleBody?.length ? parsed.pages.blog.articleBody : initialContent.pages.blog.articleBody
      },
      login: {
        ...initialContent.pages.login,
        ...parsed.pages?.login,
        points: parsed.pages?.login?.points?.length ? parsed.pages.login.points : initialContent.pages.login.points
      },
      register: { ...initialContent.pages.register, ...parsed.pages?.register }
    },
    products: parsed.products?.length ? parsed.products : initialContent.products,
    categories: parsed.categories?.length ? parsed.categories : initialContent.categories,
    reviews: parsed.reviews?.length ? parsed.reviews : initialContent.reviews,
    blogPosts: parsed.blogPosts?.length ? parsed.blogPosts : initialContent.blogPosts
  }
}

export function useSiteContent(initialContent: SiteContent = siteContentDefaults) {
  const [content, setContent] = useState<SiteContent>(initialContent)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    function loadStoredContent() {
      const stored = window.localStorage.getItem(SITE_CONTENT_STORAGE_KEY)
      if (!stored) {
        setContent(initialContent)
        return
      }

      const parsed = JSON.parse(stored) as Partial<SiteContent>
      setContent(mergeSiteContent(initialContent, parsed))
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === SITE_CONTENT_STORAGE_KEY) loadStoredContent()
    }

    function handleLocalUpdate(event: Event) {
      setContent((event as CustomEvent<SiteContent>).detail)
    }

    try {
      loadStoredContent()
      window.addEventListener('storage', handleStorage)
      window.addEventListener(SITE_CONTENT_UPDATE_EVENT, handleLocalUpdate)
    } catch {
      setContent(initialContent)
    } finally {
      setReady(true)
    }

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(SITE_CONTENT_UPDATE_EVENT, handleLocalUpdate)
    }
  }, [initialContent])

  const actions = useMemo(
    () => ({
      save(nextContent: SiteContent) {
        try {
          setContent(nextContent)
          window.localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(nextContent))
          window.dispatchEvent(new CustomEvent(SITE_CONTENT_UPDATE_EVENT, { detail: nextContent }))
          return true
        } catch {
          return false
        }
      },
      reset() {
        setContent(initialContent)
        window.localStorage.removeItem(SITE_CONTENT_STORAGE_KEY)
        window.dispatchEvent(new CustomEvent(SITE_CONTENT_UPDATE_EVENT, { detail: initialContent }))
      }
    }),
    [initialContent]
  )

  return { content, setContent, ready, ...actions }
}
