import { categories } from './categories'
import { blogPosts, reviews, type Review } from './reviews'
import { products, type Product } from './products'

export type BlogPost = (typeof blogPosts)[number]

export interface HeroContent {
  badge: string
  headline: string
  description: string
  primaryCta: string
  primaryHref: string
  secondaryCta: string
  secondaryHref: string
  image: string
}

export interface HomeSectionCopy {
  eyebrow: string
  title: string
  subtitle: string
}

export interface WhyChooseItem {
  title: string
  text: string
}

export interface CtaContent {
  title: string
  description: string
  buttonText: string
  buttonHref: string
}

export interface NavLinkContent {
  label: string
  href: string
}

export interface HeaderContent {
  tickerMessages: string[]
  brandName: string
  brandSubline: string
  navLinks: NavLinkContent[]
}

export interface HomeContent {
  offers: HomeSectionCopy
  collections: HomeSectionCopy
  bestSellers: HomeSectionCopy
  why: HomeSectionCopy
  whyItems: WhyChooseItem[]
  certifications: HomeSectionCopy
  certificationItems: string[]
  testimonials: HomeSectionCopy
  journal: HomeSectionCopy
  cta: CtaContent
}

export interface SitePagesContent {
  products: HomeSectionCopy & {
    allLabel: string
  }
  productDetails: {
    featuresTitle: string
    relatedTitle: string
  }
  about: {
    badge: string
    title: string
    description: string
    points: string[]
  }
  checkout: {
    title: string
    fullNameLabel: string
    fullNamePlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    addressLabel: string
    addressPlaceholder: string
    submitText: string
    paymentTitle: string
    paymentMethods: string[]
  }
  blog: {
    title: string
    articleBody: string[]
  }
  login: {
    eyebrow: string
    title: string
    description: string
    points: string[]
    cardTitle: string
    cardDescription: string
    emailLabel: string
    passwordLabel: string
    submitText: string
    registerLinkText: string
  }
  register: {
    eyebrow: string
    title: string
    description: string
    cardTitle: string
    cardDescription: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    passwordLabel: string
    submitText: string
    loginLinkText: string
  }
}

export interface SiteContent {
  header: HeaderContent
  hero: HeroContent
  home: HomeContent
  pages: SitePagesContent
  products: Product[]
  categories: typeof categories
  reviews: Review[]
  blogPosts: BlogPost[]
}

export const siteContentDefaults: SiteContent = {
  header: {
    tickerMessages: [
      'استمتعي بالشحن المجاني على بعض منتجاتنا',
      'منتجاتنا طبيعية 100% خالية من المواد الكيميائية',
      'أنا طبيعي | اختيارك الطبيعي | استبدلي المنتجات الكيميائية بمنتجات طبيعية من أنا طبيعي'
    ],
    brandName: 'I Natural',
    brandSubline: 'Clean & Care',
    navLinks: [
      { href: '/', label: 'الرئيسية' },
      { href: '/products', label: 'المتجر' },
      { href: '/products?category=cleaning', label: 'المنزل' },
      { href: '/products?category=care', label: 'العناية' },
      { href: '/blog', label: 'المدونة' },
      { href: '/about', label: 'من نحن' }
    ]
  },
  hero: {
    badge: 'طبيعي 100%',
    headline: 'عناية طبيعية ترتقي بتفاصيل المنزل.',
    description: 'منتجات تنظيف وعناية مصممة بروح هادئة ومكونات مختارة، لتجربة يومية أكثر نقاء وثقة.',
    primaryCta: 'تسوق الآن',
    primaryHref: '/products',
    secondaryCta: 'اكتشف المجموعة',
    secondaryHref: '/products?category=cleaning',
    image: '/hero/dishwashing-premium.png'
  },
  home: {
    offers: {
      eyebrow: 'اختيارات الشهر',
      title: 'عروض مختارة بعناية',
      subtitle: 'مجموعات توفر قيمة أعلى دون التنازل عن جودة التجربة اليومية.'
    },
    collections: {
      eyebrow: 'المجموعات',
      title: 'تصفحي العوالم الطبيعية',
      subtitle: 'كل قسم مصمم حول احتياج واضح، من تنظيف المنزل إلى العناية الشخصية.'
    },
    bestSellers: {
      eyebrow: 'الأكثر طلبا',
      title: 'منتجات تستحق مكانها في روتينك',
      subtitle: 'اختيارات عملية بتصميم هادئ ومكونات طبيعية واضحة.'
    },
    why: {
      eyebrow: 'لماذا I Natural',
      title: 'هدوء طبيعي، أداء يمكن الاعتماد عليه',
      subtitle: 'إشارات ثقة وتجربة استخدام متوازنة تجعل المنتج الطبيعي اختيارا يوميا.'
    },
    whyItems: [
      { title: 'مكونات منتقاة', text: 'تركيبات نباتية لطيفة للاستخدام اليومي داخل المنزل وعلى البشرة.' },
      { title: 'معايير موثوقة', text: 'شهادات جودة واعتماد تمنحك وضوحا أكبر قبل الشراء.' },
      { title: 'تجربة راقية', text: 'روائح هادئة، ملمس نظيف، وتفاصيل تغليف تناسب نمط حياة حديث.' }
    ],
    certifications: {
      eyebrow: 'عناية معتمدة',
      title: 'ثقة مبنية على معايير',
      subtitle: 'نضع معايير الجودة في واجهة التجربة لأن الشفافية جزء من المنتج.'
    },
    certificationItems: ['ISO 22000:2018', 'HACCP / TS 13001', 'ISO 9001'],
    testimonials: {
      eyebrow: 'آراء العملاء',
      title: 'تجارب عملاء حقيقية',
      subtitle: 'آراء مختصرة من عملاء اختاروا المنتجات الطبيعية في روتينهم اليومي.'
    },
    journal: {
      eyebrow: 'المدونة',
      title: 'من المدونة',
      subtitle: 'قراءات قصيرة تساعدك على اختيار منتجات العناية والتنظيف الطبيعي بثقة.'
    },
    cta: {
      title: 'شحن سريع وخدمة مباشرة',
      description: 'تابعي طلبك بسهولة وتواصلي معنا عبر واتساب لأي استفسار قبل أو بعد الشراء.',
      buttonText: 'ابدأ التسوق',
      buttonHref: '/products'
    }
  },
  pages: {
    products: {
      eyebrow: 'منتجات طبيعية 100%',
      title: 'كل المنتجات',
      subtitle: 'اختاري من منتجات التنظيف والعناية الطبيعية، والتعديلات من الداشبورد تظهر هنا مباشرة.',
      allLabel: 'الكل'
    },
    productDetails: {
      featuresTitle: 'المميزات',
      relatedTitle: 'منتجات مرتبطة'
    },
    about: {
      badge: 'منذ 2013',
      title: 'من نحن',
      description: 'I Natural علامة سعودية في مجال المنتجات الطبيعية، تقدم منظفات ومنتجات عناية شخصية بروح آمنة وبسيطة للعائلة. هدفنا أن يكون اختيار المنتج الطبيعي سهلا وواضحا ومتاحا لكل بيت.',
      points: ['طبيعي 100%', 'معايير جودة', 'تجربة لطيفة']
    },
    checkout: {
      title: 'إتمام الطلب',
      fullNameLabel: 'الاسم الكامل',
      fullNamePlaceholder: 'اكتبي الاسم',
      phoneLabel: 'رقم الجوال',
      phonePlaceholder: '+966',
      addressLabel: 'المدينة والعنوان',
      addressPlaceholder: 'المدينة، الحي، الشارع',
      submitText: 'إرسال الطلب',
      paymentTitle: 'طرق الدفع',
      paymentMethods: ['Mastercard', 'Visa', 'Mada', 'Apple Pay', 'STC Pay', 'Tabby', 'Cash']
    },
    blog: {
      title: 'المدونة',
      articleBody: [
        'اختيار المنتجات الطبيعية يبدأ من قراءة المكونات وفهم الاستخدام المناسب لكل منتج. كلما كانت التركيبة أوضح، كان قرار الشراء أسهل وأكثر ثقة.',
        'في I Natural نركز على تقديم منتجات يومية عملية للمنزل والعناية، بروائح متوازنة وتجربة استخدام مريحة تناسب العائلة.'
      ]
    },
    login: {
      eyebrow: 'دخول آمن',
      title: 'تسجيل الدخول',
      description: 'ادخل إلى حسابك أو لوحة التحكم لإدارة محتوى الواجهة والمنتجات وتجربة المتجر.',
      points: ['تعديل المنتجات', 'إدارة آمنة محلية', 'حفظ فوري في المتصفح'],
      cardTitle: 'مرحبا بك',
      cardDescription: 'استخدم بياناتك للدخول، أو انتقل مباشرة إلى الداشبورد المحلي.',
      emailLabel: 'البريد الإلكتروني',
      passwordLabel: 'كلمة المرور',
      submitText: 'دخول إلى الداشبورد',
      registerLinkText: 'إنشاء حساب جديد'
    },
    register: {
      eyebrow: 'انضم إلى I Natural',
      title: 'إنشاء حساب',
      description: 'واجهة حساب أنيقة ومتوافقة مع تجربة المتجر الفاخرة.',
      cardTitle: 'حساب جديد',
      cardDescription: 'هذه واجهة تجريبية جاهزة للربط لاحقا بنظام مصادقة حقيقي.',
      nameLabel: 'الاسم',
      namePlaceholder: 'الاسم الكامل',
      emailLabel: 'البريد الإلكتروني',
      passwordLabel: 'كلمة المرور',
      submitText: 'إنشاء الحساب',
      loginLinkText: 'لديك حساب؟ تسجيل الدخول'
    }
  },
  products,
  categories,
  reviews,
  blogPosts
}

export const SITE_CONTENT_STORAGE_KEY = 'inatural-site-content-v1'
