# GdanskTaxi - Polonya Taksi Partnerliği Platformu

Modern, responsive ve kullanıcı dostu taksi filo ortaklığı web sitesi. Polonya'nın Gdansk şehrinde Türk şoförler için özel olarak tasarlanmıştır.

## 🚗 Proje Hakkında

GdanskTaxi, Polonya Gdansk'ta taksi şoförü olmak isteyen Türk vatandaşları için kapsamlı bir platform sunar. Uber, Bolt ve FreeNow gibi popüler platformlarda çalışma imkanı sağlar.

## ✨ Özellikler

- **Modern Tasarım**: Inter font ailesi ve profesyonel renk paleti
- **Responsive Design**: Tüm cihazlarda mükemmel çalışır
- **Dark Theme**: Göz yormayan koyu tema
- **Mobile First**: Touch-friendly arayüz
- **Kazanç Hesaplayıcısı**: Zloty cinsinden gerçek zamanlı hesaplama
- **Çoklu Platform Desteği**: Uber, Bolt, FreeNow entegrasyonu
- **Türkçe İçerik**: Tam Türkçe dil desteği
- **SEO Optimize**: Arama motorları için optimize edilmiş

## 🛠️ Teknolojiler

- **HTML5**: Semantik ve erişilebilir markup
- **CSS3**: Modern CSS özellikleri (Grid, Flexbox, CSS Variables)
- **Vanilla JavaScript**: Hızlı ve performanslı interaktivite
- **Font Awesome**: İkon kütüphanesi
- **Google Fonts**: Inter font ailesi

## 📱 Responsive Breakpoints

- **Desktop**: 1024px ve üzeri
- **Tablet**: 768px - 1024px
- **Mobile**: 480px - 768px
- **Small Mobile**: 480px altı
- **Large Screen**: 1400px üzeri

## 🎨 Renk Paleti

```css
--primary-color: #009688    /* Teal Green */
--background-main: #212121  /* Charcoal */
--background-card: #37474F  /* Slate Gray */
--text-main: #F5F5F5       /* Light Gray */
--accent-color: #FFC107    /* Gold Accent */
```

## 📂 Proje Yapısı

```
gdansk-taxi/
├── index.html              # Ana sayfa
├── pages/
│   └── offer.html          # Teklif sayfası
├── css/
│   └── style.css           # Ana stylesheet
├── js/
│   └── main.js             # JavaScript işlevsellik
├── images/                 # Görseller (placeholder)
├── videos/                 # Video dosyaları (placeholder)
├── favicon.ico             # Site ikonu
└── README.md               # Bu dosya
```

## 🚀 Kurulum

1. Repository'yi klonlayın:
```bash
git clone https://github.com/[kullanici-adi]/gdansk-taxi.git
```

2. Proje dizinine gidin:
```bash
cd gdansk-taxi
```

3. Web sunucusu ile çalıştırın veya doğrudan index.html'i açın.

## 🌟 Öne Çıkan Bölümler

### Hero Section
- Video background desteği
- Gerçek zamanlı statistikler
- CTA butonları

### Kazanç Hesaplayıcısı
- Dinamik zloty hesaplaması
- Gdansk bölge seçenekleri
- Görsel sonuç gösterimi

### Mobile Navigation
- Hamburger menu
- Touch-friendly design
- Smooth animations

## 📧 İletişim

- **Email**: info@gdansktaxi.pl
- **Telefon**: +48 123 456 789
- **Adres**: ul. Długa 123, 80-827 Gdansk, Polonya

## 📄 Lisans

Bu proje MIT lisansı altında yayınlanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

---

**GdanskTaxi** - Polonya'da taksi şoförü olmanın en kolay yolu! 🇵🇱🚗rtner - Taksi & Ride-Sharing Filo Ortaklığı Web Sitesi

Modern ve profesyonel bir pazarlama web sitesi. Türki```javascript
this.rates = {
    istanbul: { economy: 35, comfort: 45, premium: 60 },
    ankara: { economy: 30, comfort: 40, premium: 55 },
    // ...
};
```ber, Bolt ve diğer ride-sharing platformları için filo ortaklığı hizmeti veren şirket için geliştirilmiştir.

## 🎯 Proje Amacı

Bu web sitesi, potansiyel sürücülerden başvuru (lead) toplamak ve şirketin profesyonel imajını güçlendirmek amacıyla geliştirilmiştir. Minimum formalite, maksimum kazanç vaadi ile sürücü kazanımına odaklanır.

## 🚀 Özellikler

### Ana Bileşenler
- **Modern Hero Section**: Dikkat çekici başlık ve değer önerisi
- **İnteraktif Kazanç Hesaplayıcısı**: Sürücülerin potansiyel kazançlarını hesaplayabilmesi
- **Lead Generation Formu**: Sürücü başvuru formu
- **Responsive Tasarım**: Mobile-first yaklaşım
- **SEO Optimize**: Arama motorları için optimize edilmiş

### Teknik Özellikler
- **Vanilla JavaScript**: Framework bağımlılığı yok
- **Modern CSS**: CSS Grid, Flexbox, CSS Variables
- **Performance Optimized**: Lazy loading, debouncing, throttling
- **Accessibility**: WCAG uyumlu erişilebilirlik özellikleri
- **Analytics Ready**: Google Analytics ve Facebook Pixel entegrasyonu hazır

## 📁 Proje Yapısı

```
├── index.html              # Ana sayfa
├── css/
│   └── style.css           # Ana stil dosyası
├── js/
│   └── main.js             # Ana JavaScript dosyası
├── images/                 # Görsel dosyaları (placeholder)
│   ├── logo.png
│   ├── hero-driver.jpg
│   ├── uber-logo.png
│   ├── bolt-logo.png
│   └── ...
├── pages/                  # Ek sayfalar için
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## 🛠️ Kurulum ve Çalıştırma

### Gereksinimler
- Modern web tarayıcısı
- Local web server (geliştirme için)

### Çalıştırma
1. Projeyi klonlayın veya indirin
2. Web sunucusu başlatın:
   ```bash
   # Python ile
   python -m http.server 8000
   
   # Node.js ile (http-server)
   npx http-server
   
   # VS Code Live Server extension ile
   # index.html'e sağ tıklayıp "Open with Live Server"
   ```
3. Tarayıcıda `http://localhost:8000` adresini açın

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: #2563eb (Mavi)
- **Secondary**: #f59e0b (Turuncu)
- **Success**: #10b981 (Yeşil)
- **Gray Scale**: #f9fafb → #111827

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Spacing
- CSS Variables kullanılarak tutarlı spacing sistemi
- 4px grid sistemi

## 💻 Geliştirme

### CSS Mimarisi
- **CSS Variables**: Tutarlı theming
- **BEM Metodolojisi**: Scss-like class naming
- **Mobile-First**: Responsive tasarım
- **Modern Features**: CSS Grid, Flexbox, Custom Properties

### JavaScript Özellikleri
- **ES6+ Syntax**: Modern JavaScript
- **Class-based Architecture**: Maintainable kod yapısı
- **Event Delegation**: Performance optimizasyonu
- **Error Handling**: Robust error management

### Ana JavaScript Sınıfları

#### EarningsCalculator
```javascript
// Kazanç hesaplayıcısı
const calculator = new EarningsCalculator();
```

#### LeadFormHandler
```javascript
// Form yönetimi ve lead tracking
const formHandler = new LeadFormHandler();
```

#### ScrollAnimations
```javascript
// Scroll-based animasyonlar
const animations = new ScrollAnimations();
```

## 🔧 Özelleştirme

### Kazanç Oranları
`js/main.js` dosyasındaki `rates` objesini düzenleyerek şehir ve araç tipine göre saatlik oranları güncelleyebilirsiniz:

```javascript
this.rates = {
    warsaw: { economy: 25, comfort: 30, premium: 40 },
    krakow: { economy: 22, comfort: 27, premium: 35 },
    // ...
};
```

### Form Entegrasyonu
`LeadFormHandler.simulateAPICall()` metodunu gerçek API endpoint'iniz ile değiştirin:

```javascript
async simulateAPICall(data) {
    const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
}
```

### Analytics Entegrasyonu
Google Analytics ve Facebook Pixel kodlarını `<head>` bölümüne ekleyin.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Lead Generation

### Form Alanları
- Ad/Soyad
- Telefon
- E-posta
- Şehir
- Deneyim seviyesi
- Araç sahipliği
- Ek notlar

### Tracking Events
- Form submission
- Calculator usage
- Button clicks
- Section views

## 🔐 Güvenlik ve Gizlilik

- KVKK uyumlu veri toplama
- Form validation
- XSS koruması
- Güvenli form handling

## 📈 SEO Optimizasyonu

### On-Page SEO
- Semantic HTML5
- Meta tags
- Open Graph tags
- Structured data ready
- Fast loading
- Mobile-friendly

### Content Strategy
- Polish keyword targeting
- Local SEO optimization
- Blog section for content marketing

## 🚀 Performance

### Optimization Teknikleri
- Image lazy loading
- CSS/JS minification ready
- Critical CSS inlining ready
- Web font optimization
- Debounced/throttled event handlers

### Loading Performance
- Preload critical resources
- Async/defer JavaScript
- Optimized images
- Minimal third-party scripts

## 🧪 Test Edilecek Özellikler

### Functional Testing
- [ ] Form submission
- [ ] Calculator accuracy
- [ ] Navigation menu
- [ ] Responsive layout
- [ ] Cross-browser compatibility

### Performance Testing
- [ ] Page load speed
- [ ] Mobile performance
- [ ] Core Web Vitals

## 🌐 Deployment

### Production Checklist
- [ ] Replace placeholder images
- [ ] Update contact information
- [ ] Configure analytics
- [ ] Set up form backend
- [ ] Add SSL certificate
- [ ] Configure CDN
- [ ] Test all functionality

### Hosting Önerileri
- Netlify (JAMstack)
- Vercel
- GitHub Pages
- Traditional hosting (cPanel)

## 📞 Support

Web sitesi ile ilgili teknik sorularınız için:
- Code review ve optimizasyon
- Ek özellik geliştirme
- Bakım ve güncelleme
- Performance monitoring

## 📄 License

Bu proje FlotaPartner için özel olarak geliştirilmiştir.

---

**🚗 FlotaPartner - Direksiyon başında gereksiz formaliteler olmadan kazan!**
