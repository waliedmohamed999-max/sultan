export interface Review {
  name: string
  rating: number
  comment: string
  date: string
}

export const reviews: Review[] = [
  {
    name: 'فاطمة خالد',
    rating: 5,
    comment: 'ريحة مريحة وحلوة، وينظف من غير ما يترك أثر قوي أو مزعج.',
    date: '2025-12-22'
  },
  {
    name: 'فاطمة العبدري',
    rating: 5,
    comment: 'اشتريت منتجات الملابس ومناديل من الموقع، والتجربة ممتازة من أول استخدام.',
    date: '2025-12-22'
  },
  {
    name: 'رعد الرحمن سرور',
    rating: 5,
    comment: 'هذا الباقي فيه كل أنواع الصابون اللي أحتاجها. كلها طبيعية وريحتها تجنن.',
    date: '2025-12-22'
  }
]

export const blogPosts = [
  {
    slug: 'natural-cleaning-routine',
    title: 'أفضل طرق تنظيف وعناية بالمنزل بمنتجات طبيعية',
    excerpt: 'خطوات يومية بسيطة للحفاظ على نظافة المنزل بدون روائح كيميائية حادة.',
    date: '2025-12-22',
    author: 'INatural'
  },
  {
    slug: 'soap-care-guide',
    title: 'وداعا للمواد الكيميائية: كيف تختارين الصابون الطبيعي المناسب لبشرتك؟',
    excerpt: 'دليل سريع لفهم المكونات الطبيعية واختيار المنتج الأنسب للبشرة.',
    date: '2025-12-22',
    author: 'INatural'
  },
  {
    slug: 'why-natural-cleaners',
    title: 'استخدامات منتجات التنظيف الطبيعي الآمن من I Natural',
    excerpt: 'متى تختارين المنظف الطبيعي؟ وما الفرق الذي يصنعه داخل المنزل؟',
    date: '2025-12-22',
    author: 'INatural'
  }
]
