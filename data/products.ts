export type Category = 'cleaning' | 'care' | 'wipes' | 'dental' | 'bundle'

export interface Product {
  id: string
  name: string
  nameEn?: string
  category: Category
  price: number
  originalPrice?: number
  discount?: number
  inStock: boolean
  description: string
  features: string[]
  certifications?: string[]
  weight?: string
  image?: string
}

export const categoryLabels: Record<Category, string> = {
  cleaning: 'منظفات منزلية طبيعية',
  care: 'منتجات العناية الطبيعية',
  wipes: 'مناديل مبللة',
  dental: 'عناية الفم',
  bundle: 'باقات التوفير'
}

export const products: Product[] = [
  {
    id: 'laundry-1500',
    name: 'سائل غسيل الملابس الطبيعي 1.5 لتر برائحة زهور ربيعية',
    nameEn: 'Natural Laundry Liquid 1.5L',
    category: 'cleaning',
    image: '/product-images/laundry-1500.svg',
    price: 69,
    inStock: true,
    description: 'تركيبة طبيعية لطيفة على الأقمشة وقوية على البقع اليومية، مناسبة للاستخدام العائلي المتكرر.',
    features: ['100% طبيعي', 'رائحة زهور ربيعية', 'آمن على الأقمشة', 'خالي من المواد الكيميائية القاسية'],
    certifications: ['ISO 22000:2018', 'HACCP'],
    weight: '1.5 لتر'
  },
  {
    id: 'allpurpose-500',
    name: 'منظف شامل متعدد الاستخدامات 500 مل',
    nameEn: 'All Purpose Cleaner 500ml',
    category: 'cleaning',
    image: '/product-images/allpurpose-500.svg',
    price: 69,
    inStock: true,
    description: 'منظف يومي للأسطح والمطابخ يمنح لمعانا نظيفا دون روائح حادة.',
    features: ['مناسب للأسطح', 'بخلاصة الألوفيرا', 'لا يترك بقايا', 'آمن على اليدين'],
    certifications: ['GMP', 'ISO 9001'],
    weight: '500 مل'
  },
  {
    id: 'allpurpose-100',
    name: 'منظف شامل متعدد الاستخدامات 100 مل',
    nameEn: 'All Purpose Cleaner 100ml',
    category: 'cleaning',
    image: '/product-images/allpurpose-100.svg',
    price: 29,
    inStock: true,
    description: 'حجم عملي للتجربة أو الحمل، بنفس فعالية التركيبة الطبيعية.',
    features: ['حجم اقتصادي', 'لطيف الرائحة', 'مناسب للسفر'],
    weight: '100 مل'
  },
  {
    id: 'laundry-2000',
    name: 'سائل غسيل الملابس الطبيعي 2 لتر',
    nameEn: 'Natural Laundry Liquid 2L',
    category: 'cleaning',
    image: '/product-images/laundry-2000.svg',
    price: 49,
    inStock: true,
    description: 'عبوة منزلية بتركيبة فعالة للغسيل اليومي وحماية ألوان الملابس.',
    features: ['تركيبة نباتية', 'رغوة متوازنة', 'مناسب للغسالات الأوتوماتيك'],
    weight: '2 لتر'
  },
  {
    id: 'allpurpose-5000',
    name: 'منظف شامل متعدد الاستخدامات 5 لتر',
    nameEn: 'All Purpose Cleaner 5L',
    category: 'cleaning',
    image: '/product-images/allpurpose-5000.svg',
    price: 245,
    inStock: false,
    description: 'حجم توفير للمنازل الكبيرة والمنشآت الصغيرة.',
    features: ['حجم عائلي', 'قيمة أفضل', 'خالي من المواد الضارة'],
    weight: '5 لتر'
  },
  {
    id: 'laundry-3000',
    name: 'سائل غسيل الملابس الطبيعي 3 لتر',
    nameEn: 'Natural Laundry Liquid 3L',
    category: 'cleaning',
    image: '/product-images/laundry-3000.svg',
    price: 69,
    inStock: true,
    description: 'حل اقتصادي للغسيل المتكرر مع عناية طبيعية بالأقمشة.',
    features: ['100% طبيعي', 'مناسب للعائلة', 'رائحة منعشة'],
    weight: '3 لتر'
  },
  {
    id: 'laurel-soap',
    name: 'صابونة الغار الطبيعية 100% بزيت الغار والزيتون',
    nameEn: 'Natural Laurel Soap',
    category: 'care',
    image: '/product-images/laurel-soap.svg',
    price: 39,
    inStock: true,
    description: 'صابونة عناية يومية بزيوت طبيعية للبشرة الحساسة والجافة.',
    features: ['زيت غار طبيعي', 'زيت زيتون نقي', 'لطيفة على البشرة'],
    certifications: ['Vegan', 'GMP']
  },
  {
    id: 'honey-soap',
    name: 'صابونة العسل المرطبة الطبيعية 100%',
    nameEn: 'Natural Honey Soap',
    category: 'care',
    image: '/product-images/honey-soap.svg',
    price: 39,
    inStock: false,
    description: 'صابونة عسل طبيعية تمنح البشرة نعومة وترطيبا متوازنا.',
    features: ['عسل طبيعي', '100% طبيعي', 'ترطيب لطيف']
  },
  {
    id: 'soap-bundle-5',
    name: 'باقة الصابون المتنوع الطبيعي 5 قطع',
    nameEn: 'Natural Soap Bundle',
    category: 'bundle',
    image: '/product-images/soap-bundle-5.svg',
    price: 149,
    inStock: true,
    description: 'مجموعة مختارة من الصابون الطبيعي للاستخدام اليومي أو الإهداء.',
    features: ['5 قطع', 'تشكيلة عناية', 'قيمة توفير']
  },
  {
    id: 'luxury-bundle',
    name: 'مجموعة العناية الفاخرة',
    nameEn: 'Luxury Care Bundle',
    category: 'bundle',
    image: '/product-images/luxury-bundle.svg',
    price: 179,
    inStock: true,
    description: 'مجموعة متكاملة للعناية الطبيعية بروتين يومي مريح.',
    features: ['منتجات مختارة', 'هدية مناسبة', 'تغليف أنيق']
  },
  {
    id: 'daily-refresh-bundle',
    name: 'باقة الانتعاش اليومي',
    nameEn: 'Daily Refresh Bundle',
    category: 'bundle',
    image: '/product-images/daily-refresh-bundle.svg',
    price: 119,
    originalPrice: 168,
    discount: 29,
    inStock: true,
    description: 'باقة توفير تجمع منتجات أساسية للاستخدام اليومي.',
    features: ['خصم 29%', 'منتجات يومية', 'اختيار عائلي']
  },
  {
    id: 'natural-wet-wipes',
    name: 'مناديل مبللة طبيعية 100%',
    nameEn: 'Natural Wet Wipes',
    category: 'wipes',
    image: '/product-images/natural-wet-wipes.svg',
    price: 39,
    inStock: true,
    description: 'مناديل مبللة طبيعية ناعمة وآمنة للوجه واليدين ومثالية للأطفال.',
    features: ['نعومة فائقة', 'آمن على الوجه واليدين', 'ترطيب منعش', 'مثالي للأطفال'],
    certifications: ['Vegan', 'GMP & ISO']
  }
]

export function getProduct(id: string) {
  return products.find((product) => product.id === id)
}

export function calculateDiscount(product: Product) {
  if (product.discount) return product.discount
  if (!product.originalPrice) return undefined
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
}
