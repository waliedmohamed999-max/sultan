import type { Category } from './products'

export interface CategoryItem {
  id: Category
  title: string
  subtitle: string
  image: string
  path: string
}

export const categories: CategoryItem[] = [
  {
    id: 'cleaning',
    title: 'منظفات منزلية',
    subtitle: 'نظافة طبيعية آمنة لعائلتك',
    image: '/category-images/cleaning.png',
    path: '/products?category=cleaning'
  },
  {
    id: 'care',
    title: 'منتجات العناية الطبيعية',
    subtitle: 'صابون وزيوت بروتين يومي',
    image: '/category-images/care.png',
    path: '/products?category=care'
  },
  {
    id: 'wipes',
    title: 'مناديل مبللة',
    subtitle: 'نعومة وترطيب للاستخدام اليومي',
    image: '/category-images/wipes.png',
    path: '/products?category=wipes'
  },
  {
    id: 'dental',
    title: 'عناية الفم',
    subtitle: 'اختيارات طبيعية للعناية الشخصية',
    image: '/category-images/dental.png',
    path: '/products?category=dental'
  },
  {
    id: 'bundle',
    title: 'باقات التوفير',
    subtitle: 'مجموعات بسعر أفضل',
    image: '/category-images/bundle.png',
    path: '/products?category=bundle'
  }
]
