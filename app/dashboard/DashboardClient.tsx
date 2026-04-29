'use client'

import { useEffect, useMemo, useState } from 'react'
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react'
import { useSiteContent } from '@/components/cms/useSiteContent'
import type { Category, Product } from '@/data/products'
import type { SiteContent } from '@/data/siteContent'

const tabs = ['hero', 'home', 'routes', 'images', 'products', 'categories', 'reviews', 'blog'] as const
type Tab = (typeof tabs)[number]

const categoryOptions: Category[] = ['cleaning', 'care', 'wipes', 'dental', 'bundle']

const tabLabels: Record<Tab, string> = {
  hero: 'الواجهة الرئيسية',
  home: 'محتوى الصفحة',
  routes: 'الروابط والصفحات',
  images: 'الصور',
  products: 'المنتجات',
  categories: 'الأقسام',
  reviews: 'آراء العملاء',
  blog: 'المدونة'
}

const categoryLabels: Record<Category, string> = {
  cleaning: 'منظفات منزلية',
  care: 'العناية الطبيعية',
  wipes: 'مناديل مبللة',
  dental: 'عناية الفم',
  bundle: 'باقات التوفير'
}

const homeSectionLabels: Record<keyof SiteContent['home']['sectionVisibility'], string> = {
  offers: 'قسم العروض',
  collections: 'قسم الأقسام',
  bestSellers: 'قسم الأكثر طلبا',
  why: 'قسم لماذا نحن',
  certifications: 'قسم الشهادات',
  testimonials: 'قسم آراء العملاء',
  journal: 'قسم المدونة',
  cta: 'قسم الدعوة النهائية'
}

export function DashboardClient({ initialContent }: { initialContent: SiteContent }) {
  const { content, setContent, save, reset } = useSiteContent(initialContent)
  const [tab, setTab] = useState<Tab>('hero')
  const [saveStatus, setSaveStatus] = useState('')
  const [selectedProductId, setSelectedProductId] = useState(content.products[0]?.id || '')
  const selectedProduct = useMemo(
    () => content.products.find((product) => product.id === selectedProductId) || content.products[0],
    [content.products, selectedProductId]
  )

  function updateProduct(product: Product, previousId = selectedProductId) {
    setContent({
      ...content,
      products: content.products.map((item) => (item.id === previousId ? product : item))
    })
  }

  function updateProductId(id: string) {
    if (!selectedProduct) return
    updateProduct({ ...selectedProduct, id })
    setSelectedProductId(id)
  }

  function deleteSelectedProduct() {
    if (!selectedProduct) return
    const nextProducts = content.products.filter((item) => item.id !== selectedProduct.id)
    setContent({ ...content, products: nextProducts })
    setSelectedProductId(nextProducts[0]?.id || '')
  }

  function addProduct() {
    const product: Product = {
      id: `product-${Date.now()}`,
      name: 'منتج جديد',
      category: 'cleaning',
      price: 0,
      inStock: true,
      description: 'وصف المنتج',
      features: ['ميزة أساسية'],
      image: ''
    }
    setSelectedProductId(product.id)
    setContent({ ...content, products: [product, ...content.products] })
  }

  function showStatus(message: string) {
    setSaveStatus(message)
    window.setTimeout(() => setSaveStatus(''), 2500)
  }

  function handleSave() {
    const saved = save(content)
    showStatus(saved ? 'تم الحفظ بنجاح' : 'تعذر الحفظ. تأكد أن المتصفح يسمح باستخدام localStorage.')
  }

  function handleReset() {
    reset()
    showStatus('تمت إعادة المحتوى الأصلي')
  }

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <strong>لوحة تحكم I Natural</strong>
        <nav>
          {tabs.map((item) => (
            <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>
              {tabLabels[item]}
            </button>
          ))}
        </nav>
        <button className="dashboard-save" type="button" onClick={handleSave}>
          <Save size={17} /> حفظ التغييرات
        </button>
        <button className="dashboard-reset" type="button" onClick={handleReset}>
          <RotateCcw size={17} /> إعادة الأصل
        </button>
        {saveStatus && <p className="dashboard-status">{saveStatus}</p>}
      </aside>

      <section className="dashboard-panel">
        {tab === 'hero' && (
          <div className="dashboard-card">
            <h1>الواجهة الرئيسية</h1>
            <DashboardInput label="الشارة العلوية" value={content.hero.badge} onChange={(value) => setContent({ ...content, hero: { ...content.hero, badge: value } })} />
            <DashboardInput label="العنوان الرئيسي" value={content.hero.headline} onChange={(value) => setContent({ ...content, hero: { ...content.hero, headline: value } })} />
            <DashboardTextarea label="الوصف" value={content.hero.description} onChange={(value) => setContent({ ...content, hero: { ...content.hero, description: value } })} />
            <div className="dashboard-grid-2">
              <DashboardInput label="نص الزر الأساسي" value={content.hero.primaryCta} onChange={(value) => setContent({ ...content, hero: { ...content.hero, primaryCta: value } })} />
              <DashboardInput label="رابط الزر الأساسي" value={content.hero.primaryHref} onChange={(value) => setContent({ ...content, hero: { ...content.hero, primaryHref: value } })} />
              <DashboardInput label="نص الزر الثانوي" value={content.hero.secondaryCta} onChange={(value) => setContent({ ...content, hero: { ...content.hero, secondaryCta: value } })} />
              <DashboardInput label="رابط الزر الثانوي" value={content.hero.secondaryHref} onChange={(value) => setContent({ ...content, hero: { ...content.hero, secondaryHref: value } })} />
            </div>
            <DashboardInput label="مسار صورة الواجهة" value={content.hero.image} onChange={(value) => setContent({ ...content, hero: { ...content.hero, image: value } })} />
            <ImageField label="رفع صورة الواجهة" value={content.hero.image} onChange={(image) => setContent({ ...content, hero: { ...content.hero, image } })} />
          </div>
        )}

        {tab === 'home' && (
          <div className="dashboard-card">
            <h1>محتوى الصفحة الرئيسية بالكامل</h1>
            <SectionVisibilityEditor
              value={content.home.sectionVisibility}
              onChange={(sectionVisibility) => setContent({ ...content, home: { ...content.home, sectionVisibility } })}
            />
            <HomeSectionEditor title="قسم العروض" value={content.home.offers} onChange={(offers) => setContent({ ...content, home: { ...content.home, offers } })} />
            <HomeSectionEditor title="قسم الأقسام" value={content.home.collections} onChange={(collections) => setContent({ ...content, home: { ...content.home, collections } })} />
            <HomeSectionEditor title="قسم الأكثر طلبا" value={content.home.bestSellers} onChange={(bestSellers) => setContent({ ...content, home: { ...content.home, bestSellers } })} />
            <HomeSectionEditor title="قسم لماذا نحن" value={content.home.why} onChange={(why) => setContent({ ...content, home: { ...content.home, why } })} />
            <PairListEditor title="عناصر لماذا نحن" firstLabel="العنوان" secondLabel="الوصف" value={content.home.whyItems} onChange={(whyItems) => setContent({ ...content, home: { ...content.home, whyItems } })} />
            <HomeSectionEditor title="قسم الشهادات" value={content.home.certifications} onChange={(certifications) => setContent({ ...content, home: { ...content.home, certifications } })} />
            <TextListEditor title="الشهادات" addLabel="إضافة شهادة" value={content.home.certificationItems} onChange={(certificationItems) => setContent({ ...content, home: { ...content.home, certificationItems } })} />
            <HomeSectionEditor title="قسم آراء العملاء" value={content.home.testimonials} onChange={(testimonials) => setContent({ ...content, home: { ...content.home, testimonials } })} />
            <HomeSectionEditor title="قسم المدونة" value={content.home.journal} onChange={(journal) => setContent({ ...content, home: { ...content.home, journal } })} />
            <div className="dashboard-subcard">
              <h2>قسم الدعوة النهائية</h2>
              <DashboardInput label="العنوان" value={content.home.cta.title} onChange={(title) => setContent({ ...content, home: { ...content.home, cta: { ...content.home.cta, title } } })} />
              <DashboardTextarea label="الوصف" value={content.home.cta.description} onChange={(description) => setContent({ ...content, home: { ...content.home, cta: { ...content.home.cta, description } } })} />
              <div className="dashboard-grid-2">
                <DashboardInput label="نص الزر" value={content.home.cta.buttonText} onChange={(buttonText) => setContent({ ...content, home: { ...content.home, cta: { ...content.home.cta, buttonText } } })} />
                <DashboardInput label="رابط الزر" value={content.home.cta.buttonHref} onChange={(buttonHref) => setContent({ ...content, home: { ...content.home, cta: { ...content.home.cta, buttonHref } } })} />
              </div>
            </div>
          </div>
        )}

        {tab === 'products' && selectedProduct && (
          <div className="dashboard-card">
            <div className="dashboard-card-head">
              <h1>المنتجات</h1>
              <button onClick={addProduct}><Plus size={16} /> منتج جديد</button>
            </div>
            <div className="dashboard-products-layout">
              <div className="dashboard-products-list">
                {content.products.map((product) => (
                  <button key={product.id} className={selectedProduct.id === product.id ? 'active' : ''} onClick={() => setSelectedProductId(product.id)}>
                    <span>
                      <strong>{product.name}</strong>
                      <small>{categoryLabels[product.category]} · {product.price} ريال</small>
                    </span>
                    <em>{product.inStock ? 'متوفر' : 'غير متوفر'}</em>
                  </button>
                ))}
              </div>
              <div className="dashboard-product-editor">
                <DashboardInput label="معرف المنتج" value={selectedProduct.id} onChange={updateProductId} />
                <DashboardInput label="اسم المنتج" value={selectedProduct.name} onChange={(value) => updateProduct({ ...selectedProduct, name: value })} />
                <DashboardTextarea label="وصف المنتج" value={selectedProduct.description} onChange={(value) => updateProduct({ ...selectedProduct, description: value })} />
                <div className="dashboard-grid-3">
                  <label>القسم<select value={selectedProduct.category} onChange={(event) => updateProduct({ ...selectedProduct, category: event.target.value as Category })}>{categoryOptions.map((item) => <option key={item} value={item}>{categoryLabels[item]}</option>)}</select></label>
                  <DashboardInput label="السعر" type="number" value={String(selectedProduct.price)} onChange={(value) => updateProduct({ ...selectedProduct, price: Number(value) })} />
                  <DashboardInput label="السعر قبل الخصم" type="number" value={String(selectedProduct.originalPrice || '')} onChange={(value) => updateProduct({ ...selectedProduct, originalPrice: value ? Number(value) : undefined })} />
                </div>
                <DashboardInput label="الحجم / الوزن" value={selectedProduct.weight || ''} onChange={(value) => updateProduct({ ...selectedProduct, weight: value })} />
                <DashboardInput label="مسار صورة المنتج" value={selectedProduct.image || ''} onChange={(value) => updateProduct({ ...selectedProduct, image: value })} />
                <ImageField label="رفع صورة المنتج" value={selectedProduct.image || ''} onChange={(image) => updateProduct({ ...selectedProduct, image })} />
                <DashboardTextarea label="المميزات، كل ميزة في سطر" value={selectedProduct.features.join('\n')} onChange={(value) => updateProduct({ ...selectedProduct, features: value.split('\n').filter(Boolean) })} />
                <label className="dashboard-check"><input type="checkbox" checked={selectedProduct.inStock} onChange={(event) => updateProduct({ ...selectedProduct, inStock: event.target.checked })} /> متوفر</label>
                <button className="dashboard-danger" onClick={deleteSelectedProduct}><Trash2 size={16} /> حذف المنتج</button>
              </div>
            </div>
          </div>
        )}

        {tab === 'images' && <ImagesEditor content={content} setContent={setContent} selectedProduct={selectedProduct} updateProduct={updateProduct} />}

        {tab === 'routes' && (
          <div className="dashboard-card">
            <h1>الروابط وجميع الصفحات</h1>
            <div className="dashboard-subcard">
              <h2>الهيدر والشريط العلوي</h2>
              <div className="dashboard-grid-2">
                <DashboardInput label="اسم البراند" value={content.header.brandName} onChange={(brandName) => setContent({ ...content, header: { ...content.header, brandName } })} />
                <DashboardInput label="وصف البراند" value={content.header.brandSubline} onChange={(brandSubline) => setContent({ ...content, header: { ...content.header, brandSubline } })} />
              </div>
              <DashboardInput label="مسار صورة اللوجو" value={content.header.logoImage || ''} onChange={(logoImage) => setContent({ ...content, header: { ...content.header, logoImage } })} />
              <ImageField label="زر تغيير اللوجو" value={content.header.logoImage || ''} onChange={(logoImage) => setContent({ ...content, header: { ...content.header, logoImage } })} />
              <TextListEditor title="رسائل الشريط العلوي" addLabel="إضافة رسالة" value={content.header.tickerMessages} onChange={(tickerMessages) => setContent({ ...content, header: { ...content.header, tickerMessages } })} />
              <LinkListEditor title="روابط القائمة والمسارات" value={content.header.navLinks} onChange={(navLinks) => setContent({ ...content, header: { ...content.header, navLinks } })} />
            </div>

            <HomeSectionEditor title="صفحة المنتجات" value={content.pages.products} onChange={(products) => setContent({ ...content, pages: { ...content.pages, products: { ...content.pages.products, ...products } } })} />
            <div className="dashboard-subcard">
              <h2>تفاصيل المنتج</h2>
              <div className="dashboard-grid-2">
                <DashboardInput label="عنوان المميزات" value={content.pages.productDetails.featuresTitle} onChange={(featuresTitle) => setContent({ ...content, pages: { ...content.pages, productDetails: { ...content.pages.productDetails, featuresTitle } } })} />
                <DashboardInput label="عنوان المنتجات المرتبطة" value={content.pages.productDetails.relatedTitle} onChange={(relatedTitle) => setContent({ ...content, pages: { ...content.pages, productDetails: { ...content.pages.productDetails, relatedTitle } } })} />
              </div>
            </div>

            <div className="dashboard-subcard">
              <h2>صفحة من نحن</h2>
              <div className="dashboard-grid-2">
                <DashboardInput label="الشارة" value={content.pages.about.badge} onChange={(badge) => setContent({ ...content, pages: { ...content.pages, about: { ...content.pages.about, badge } } })} />
                <DashboardInput label="العنوان" value={content.pages.about.title} onChange={(title) => setContent({ ...content, pages: { ...content.pages, about: { ...content.pages.about, title } } })} />
              </div>
              <DashboardTextarea label="الوصف" value={content.pages.about.description} onChange={(description) => setContent({ ...content, pages: { ...content.pages, about: { ...content.pages.about, description } } })} />
              <TextListEditor title="نقاط صفحة من نحن" addLabel="إضافة نقطة" value={content.pages.about.points} onChange={(points) => setContent({ ...content, pages: { ...content.pages, about: { ...content.pages.about, points } } })} />
            </div>

            <CheckoutEditor content={content} setContent={setContent} />
            <AuthPagesEditor content={content} setContent={setContent} />

            <div className="dashboard-subcard">
              <h2>صفحة المدونة والمقالات</h2>
              <DashboardInput label="عنوان صفحة المدونة" value={content.pages.blog.title} onChange={(title) => setContent({ ...content, pages: { ...content.pages, blog: { ...content.pages.blog, title } } })} />
              <DashboardTextarea label="محتوى المقال، كل فقرة في سطر" value={content.pages.blog.articleBody.join('\n')} onChange={(value) => setContent({ ...content, pages: { ...content.pages, blog: { ...content.pages.blog, articleBody: toLines(value) } } })} />
            </div>
          </div>
        )}

        {tab === 'categories' && <JsonEditor title="الأقسام" value={content.categories} onChange={(categories) => setContent({ ...content, categories })} />}
        {tab === 'reviews' && <JsonEditor title="آراء العملاء" value={content.reviews} onChange={(reviews) => setContent({ ...content, reviews })} />}
        {tab === 'blog' && <JsonEditor title="مقالات المدونة" value={content.blogPosts} onChange={(blogPosts) => setContent({ ...content, blogPosts })} />}
      </section>
    </div>
  )
}

function DashboardInput({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label>{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} /></label>
}

function DashboardTextarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label>{label}<textarea value={value} onChange={(event) => onChange(event.target.value)} /></label>
}

function HomeSectionEditor({ title, value, onChange }: { title: string; value: { eyebrow: string; title: string; subtitle: string }; onChange: (value: { eyebrow: string; title: string; subtitle: string }) => void }) {
  return (
    <div className="dashboard-subcard">
      <h2>{title}</h2>
      <div className="dashboard-grid-3">
        <DashboardInput label="الشارة" value={value.eyebrow} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
        <DashboardInput label="العنوان" value={value.title} onChange={(sectionTitle) => onChange({ ...value, title: sectionTitle })} />
        <DashboardInput label="الوصف المختصر" value={value.subtitle} onChange={(subtitle) => onChange({ ...value, subtitle })} />
      </div>
    </div>
  )
}

function SectionVisibilityEditor({
  value,
  onChange
}: {
  value: SiteContent['home']['sectionVisibility']
  onChange: (value: SiteContent['home']['sectionVisibility']) => void
}) {
  return (
    <div className="dashboard-subcard">
      <h2>إظهار وحذف أقسام الصفحة</h2>
      <div className="dashboard-toggle-grid">
        {(Object.keys(homeSectionLabels) as Array<keyof SiteContent['home']['sectionVisibility']>).map((key) => (
          <label key={key} className="dashboard-check dashboard-toggle-row">
            <input type="checkbox" checked={value[key]} onChange={(event) => onChange({ ...value, [key]: event.target.checked })} />
            {homeSectionLabels[key]}
          </label>
        ))}
      </div>
    </div>
  )
}

function TextListEditor({ title, addLabel, value, onChange }: { title: string; addLabel: string; value: string[]; onChange: (value: string[]) => void }) {
  const updateItem = (index: number, nextValue: string) => onChange(value.map((item, itemIndex) => (itemIndex === index ? nextValue : item)))
  const deleteItem = (index: number) => onChange(value.filter((_, itemIndex) => itemIndex !== index))

  return (
    <div className="dashboard-list-editor">
      <div className="dashboard-card-head">
        <h2>{title}</h2>
        <button type="button" onClick={() => onChange([...value, 'عنصر جديد'])}><Plus size={16} /> {addLabel}</button>
      </div>
      {value.map((item, index) => (
        <div key={`${title}-${index}`} className="dashboard-list-row">
          <input value={item} onChange={(event) => updateItem(index, event.target.value)} />
          <button type="button" className="dashboard-danger" onClick={() => deleteItem(index)}><Trash2 size={16} /> حذف</button>
        </div>
      ))}
    </div>
  )
}

function PairListEditor({
  title,
  firstLabel,
  secondLabel,
  value,
  onChange
}: {
  title: string
  firstLabel: string
  secondLabel: string
  value: Array<{ title: string; text: string }>
  onChange: (value: Array<{ title: string; text: string }>) => void
}) {
  const updateItem = (index: number, nextValue: { title: string; text: string }) => onChange(value.map((item, itemIndex) => (itemIndex === index ? nextValue : item)))
  const deleteItem = (index: number) => onChange(value.filter((_, itemIndex) => itemIndex !== index))

  return (
    <div className="dashboard-subcard">
      <div className="dashboard-card-head">
        <h2>{title}</h2>
        <button type="button" onClick={() => onChange([...value, { title: 'عنوان جديد', text: 'وصف جديد' }])}><Plus size={16} /> إضافة عنصر</button>
      </div>
      {value.map((item, index) => (
        <div key={`${title}-${index}`} className="dashboard-repeat-card">
          <div className="dashboard-grid-2">
            <DashboardInput label={firstLabel} value={item.title} onChange={(itemTitle) => updateItem(index, { ...item, title: itemTitle })} />
            <DashboardInput label={secondLabel} value={item.text} onChange={(text) => updateItem(index, { ...item, text })} />
          </div>
          <button type="button" className="dashboard-danger" onClick={() => deleteItem(index)}><Trash2 size={16} /> حذف العنصر</button>
        </div>
      ))}
    </div>
  )
}

function LinkListEditor({ title, value, onChange }: { title: string; value: SiteContent['header']['navLinks']; onChange: (value: SiteContent['header']['navLinks']) => void }) {
  const updateItem = (index: number, nextValue: SiteContent['header']['navLinks'][number]) => onChange(value.map((item, itemIndex) => (itemIndex === index ? nextValue : item)))
  const deleteItem = (index: number) => onChange(value.filter((_, itemIndex) => itemIndex !== index))

  return (
    <div className="dashboard-list-editor">
      <div className="dashboard-card-head">
        <h2>{title}</h2>
        <button type="button" onClick={() => onChange([...value, { label: 'رابط جديد', href: '/' }])}><Plus size={16} /> إضافة مسار</button>
      </div>
      {value.map((item, index) => (
        <div key={`${item.href}-${index}`} className="dashboard-repeat-card">
          <div className="dashboard-grid-2">
            <DashboardInput label="نص الرابط" value={item.label} onChange={(label) => updateItem(index, { ...item, label })} />
            <DashboardInput label="المسار" value={item.href} onChange={(href) => updateItem(index, { ...item, href })} />
          </div>
          <button type="button" className="dashboard-danger" onClick={() => deleteItem(index)}><Trash2 size={16} /> حذف المسار</button>
        </div>
      ))}
    </div>
  )
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  function handleFile(file?: File) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') onChange(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="dashboard-image-field">
      <div className="dashboard-image-preview">
        {value ? <img src={value} alt="" /> : <span>لا توجد صورة</span>}
      </div>
      <label>
        {label}
        <input type="file" accept="image/*" onChange={(event) => handleFile(event.target.files?.[0])} />
      </label>
      {value && (
        <button type="button" className="dashboard-reset" onClick={() => onChange('')}>
          حذف الصورة
        </button>
      )}
    </div>
  )
}

function ImagesEditor({
  content,
  setContent,
  selectedProduct,
  updateProduct
}: {
  content: SiteContent
  setContent: (content: SiteContent) => void
  selectedProduct?: Product
  updateProduct: (product: Product, previousId?: string) => void
}) {
  function updateCategory(index: number, image: string) {
    setContent({
      ...content,
      categories: content.categories.map((category, itemIndex) => (
        itemIndex === index ? { ...category, image } : category
      )) as SiteContent['categories']
    })
  }

  return (
    <div className="dashboard-card">
      <h1>إدارة الصور</h1>
      <p className="dashboard-help">يمكنك كتابة مسار صورة من مجلد public مثل /images/dishwashing.jpeg أو رفع صورة من جهازك ثم الضغط على حفظ التغييرات.</p>

      <div className="dashboard-subcard">
        <h2>اللوجو</h2>
        <DashboardInput label="مسار صورة اللوجو" value={content.header.logoImage || ''} onChange={(logoImage) => setContent({ ...content, header: { ...content.header, logoImage } })} />
        <ImageField label="زر تغيير اللوجو" value={content.header.logoImage || ''} onChange={(logoImage) => setContent({ ...content, header: { ...content.header, logoImage } })} />
      </div>

      <div className="dashboard-subcard">
        <h2>صورة الواجهة الرئيسية</h2>
        <DashboardInput label="مسار الصورة" value={content.hero.image} onChange={(image) => setContent({ ...content, hero: { ...content.hero, image } })} />
        <ImageField label="رفع صورة الواجهة" value={content.hero.image} onChange={(image) => setContent({ ...content, hero: { ...content.hero, image } })} />
      </div>

      <div className="dashboard-subcard">
        <h2>صور الأقسام</h2>
        <div className="dashboard-image-grid">
          {content.categories.map((category, index) => (
            <div key={category.id} className="dashboard-image-item">
              <strong>{category.title}</strong>
              <DashboardInput label="مسار الصورة" value={category.image} onChange={(image) => updateCategory(index, image)} />
              <ImageField label="رفع صورة القسم" value={category.image} onChange={(image) => updateCategory(index, image)} />
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="dashboard-subcard">
          <h2>صورة المنتج المحدد</h2>
          <DashboardInput label="اسم المنتج" value={selectedProduct.name} onChange={(name) => updateProduct({ ...selectedProduct, name })} />
          <DashboardInput label="مسار الصورة" value={selectedProduct.image || ''} onChange={(image) => updateProduct({ ...selectedProduct, image })} />
          <ImageField label="رفع صورة المنتج" value={selectedProduct.image || ''} onChange={(image) => updateProduct({ ...selectedProduct, image })} />
        </div>
      )}

      <div className="dashboard-subcard">
        <h2>مسارات الصور المتاحة</h2>
        <div className="dashboard-path-list">
          {[
            '/hero/dishwashing-premium.png',
            '/images/dishwashing.jpeg',
            '/images/wet-wipes.jpeg',
            '/category-images/cleaning.png',
            '/category-images/care.png',
            '/category-images/wipes.png',
            '/category-images/dental.png',
            '/category-images/bundle.png',
            '/product-images/laundry-1500.svg',
            '/product-images/allpurpose-500.svg',
            '/product-images/allpurpose-100.svg',
            '/product-images/laundry-2000.svg',
            '/product-images/allpurpose-5000.svg',
            '/product-images/laundry-3000.svg',
            '/product-images/laurel-soap.svg',
            '/product-images/honey-soap.svg',
            '/product-images/soap-bundle-5.svg',
            '/product-images/luxury-bundle.svg',
            '/product-images/daily-refresh-bundle.svg',
            '/product-images/natural-wet-wipes.svg'
          ].map((path) => <code key={path}>{path}</code>)}
        </div>
      </div>
    </div>
  )
}

function CheckoutEditor({ content, setContent }: { content: SiteContent; setContent: (content: SiteContent) => void }) {
  const page = content.pages.checkout
  const update = (checkout: SiteContent['pages']['checkout']) => setContent({ ...content, pages: { ...content.pages, checkout } })

  return (
    <div className="dashboard-subcard">
      <h2>صفحة إتمام الطلب</h2>
      <div className="dashboard-grid-2">
        <DashboardInput label="العنوان" value={page.title} onChange={(title) => update({ ...page, title })} />
        <DashboardInput label="زر الإرسال" value={page.submitText} onChange={(submitText) => update({ ...page, submitText })} />
        <DashboardInput label="حقل الاسم" value={page.fullNameLabel} onChange={(fullNameLabel) => update({ ...page, fullNameLabel })} />
        <DashboardInput label="Placeholder الاسم" value={page.fullNamePlaceholder} onChange={(fullNamePlaceholder) => update({ ...page, fullNamePlaceholder })} />
        <DashboardInput label="حقل الجوال" value={page.phoneLabel} onChange={(phoneLabel) => update({ ...page, phoneLabel })} />
        <DashboardInput label="Placeholder الجوال" value={page.phonePlaceholder} onChange={(phonePlaceholder) => update({ ...page, phonePlaceholder })} />
        <DashboardInput label="حقل العنوان" value={page.addressLabel} onChange={(addressLabel) => update({ ...page, addressLabel })} />
        <DashboardInput label="Placeholder العنوان" value={page.addressPlaceholder} onChange={(addressPlaceholder) => update({ ...page, addressPlaceholder })} />
      </div>
      <DashboardInput label="عنوان طرق الدفع" value={page.paymentTitle} onChange={(paymentTitle) => update({ ...page, paymentTitle })} />
      <TextListEditor title="طرق الدفع" addLabel="إضافة طريقة دفع" value={page.paymentMethods} onChange={(paymentMethods) => update({ ...page, paymentMethods })} />
    </div>
  )
}

function AuthPagesEditor({ content, setContent }: { content: SiteContent; setContent: (content: SiteContent) => void }) {
  const login = content.pages.login
  const register = content.pages.register
  const updateLogin = (nextLogin: SiteContent['pages']['login']) => setContent({ ...content, pages: { ...content.pages, login: nextLogin } })
  const updateRegister = (nextRegister: SiteContent['pages']['register']) => setContent({ ...content, pages: { ...content.pages, register: nextRegister } })

  return (
    <>
      <div className="dashboard-subcard">
        <h2>صفحة تسجيل الدخول</h2>
        <div className="dashboard-grid-2">
          <DashboardInput label="الشارة" value={login.eyebrow} onChange={(eyebrow) => updateLogin({ ...login, eyebrow })} />
          <DashboardInput label="العنوان" value={login.title} onChange={(title) => updateLogin({ ...login, title })} />
          <DashboardInput label="عنوان الكرت" value={login.cardTitle} onChange={(cardTitle) => updateLogin({ ...login, cardTitle })} />
          <DashboardInput label="زر الدخول" value={login.submitText} onChange={(submitText) => updateLogin({ ...login, submitText })} />
          <DashboardInput label="حقل البريد" value={login.emailLabel} onChange={(emailLabel) => updateLogin({ ...login, emailLabel })} />
          <DashboardInput label="حقل كلمة المرور" value={login.passwordLabel} onChange={(passwordLabel) => updateLogin({ ...login, passwordLabel })} />
        </div>
        <DashboardTextarea label="الوصف" value={login.description} onChange={(description) => updateLogin({ ...login, description })} />
        <DashboardTextarea label="وصف الكرت" value={login.cardDescription} onChange={(cardDescription) => updateLogin({ ...login, cardDescription })} />
        <TextListEditor title="نقاط صفحة الدخول" addLabel="إضافة نقطة" value={login.points} onChange={(points) => updateLogin({ ...login, points })} />
        <DashboardInput label="رابط إنشاء الحساب" value={login.registerLinkText} onChange={(registerLinkText) => updateLogin({ ...login, registerLinkText })} />
      </div>

      <div className="dashboard-subcard">
        <h2>صفحة إنشاء الحساب</h2>
        <div className="dashboard-grid-2">
          <DashboardInput label="الشارة" value={register.eyebrow} onChange={(eyebrow) => updateRegister({ ...register, eyebrow })} />
          <DashboardInput label="العنوان" value={register.title} onChange={(title) => updateRegister({ ...register, title })} />
          <DashboardInput label="عنوان الكرت" value={register.cardTitle} onChange={(cardTitle) => updateRegister({ ...register, cardTitle })} />
          <DashboardInput label="زر إنشاء الحساب" value={register.submitText} onChange={(submitText) => updateRegister({ ...register, submitText })} />
          <DashboardInput label="حقل الاسم" value={register.nameLabel} onChange={(nameLabel) => updateRegister({ ...register, nameLabel })} />
          <DashboardInput label="Placeholder الاسم" value={register.namePlaceholder} onChange={(namePlaceholder) => updateRegister({ ...register, namePlaceholder })} />
          <DashboardInput label="حقل البريد" value={register.emailLabel} onChange={(emailLabel) => updateRegister({ ...register, emailLabel })} />
          <DashboardInput label="حقل كلمة المرور" value={register.passwordLabel} onChange={(passwordLabel) => updateRegister({ ...register, passwordLabel })} />
        </div>
        <DashboardTextarea label="الوصف" value={register.description} onChange={(description) => updateRegister({ ...register, description })} />
        <DashboardTextarea label="وصف الكرت" value={register.cardDescription} onChange={(cardDescription) => updateRegister({ ...register, cardDescription })} />
        <DashboardInput label="رابط تسجيل الدخول" value={register.loginLinkText} onChange={(loginLinkText) => updateRegister({ ...register, loginLinkText })} />
      </div>
    </>
  )
}

function toLines(value: string) {
  return value.split('\n').map((line) => line.trim()).filter(Boolean)
}

function parsePairs(value: string) {
  return toLines(value).map((line) => {
    const [label, ...hrefParts] = line.split('|')
    return { label: label.trim(), href: hrefParts.join('|').trim() || '#' }
  })
}

function JsonEditor<T>({ title, value, onChange }: { title: string; value: T; onChange: (value: T) => void }) {
  const [text, setText] = useState(JSON.stringify(value, null, 2))
  const [error, setError] = useState('')

  useEffect(() => {
    setText(JSON.stringify(value, null, 2))
    setError('')
  }, [value])

  return (
    <div className="dashboard-card">
      <h1>{title}</h1>
      <textarea className="dashboard-json" value={text} onChange={(event) => setText(event.target.value)} />
      {error && <p className="dashboard-error">{error}</p>}
      <button onClick={() => { try { onChange(JSON.parse(text)); setError('') } catch { setError('JSON غير صالح') } }}>تطبيق البيانات</button>
    </div>
  )
}
