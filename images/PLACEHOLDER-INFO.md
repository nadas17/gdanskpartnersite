# FlotaPartner Web Sitesi - Placeholder Görseller

Bu klasör, FlotaPartner web sitesi için geçici placeholder görselleri içerir.

## Mevcut Placeholder Görseller

### 📱 Logo ve Branding
- ✅ `logo.svg` - Ana şirket logosu (SVG format)
- ✅ `favicon.svg` - Browser icon (SVG format)

### 🤝 Partner Logoları
- ✅ `uber-logo.svg` - Uber logosu placeholder
- ✅ `bolt-logo.svg` - Bolt logosu placeholder
- ✅ `freenow-logo.svg` - FreeNow logosu placeholder
- ✅ `itaxi-logo.svg` - iTaxi logosu placeholder

### 👨‍💼 İnsan Görselleri
- ✅ `hero-driver.svg` - Ana sayfa hero bölümü sürücü görseli
- ✅ `driver-1.svg` - Sürücü profil fotoğrafı #1

### 🚗 Araç Görselleri
- ✅ `fleet-car-1.svg` - Filo araç görseli #1

## Teknik Detaylar

### Format Seçimi
- **SVG kullanma nedenleri:**
  - Sonsuz ölçeklenebilirlik
  - Küçük dosya boyutu
  - CSS ile kolayca özelleştirilebilir
  - Modern tarayıcılarda mükemmel destek
  - Retina/HiDPI ekranlarda keskin görünüm

### Renk Paleti
Placeholder'larda kullanılan renkler proje tasarım sisteminden alınmıştır:
- Primary Blue: `#2563eb`
- Primary Dark: `#1d4ed8`
- Primary Light: `#3b82f6`
- Secondary Orange: `#f59e0b`
- Success Green: `#10b981`
- Uber Black: `#000000`
- Bolt Green: `#34d186`
- FreeNow Blue: `#00a8e8`
- iTaxi Orange: `#ff6b35`

## Production İçin Yapılacaklar

### 🎯 Öncelikli Görseller
1. **Profesyonel Logo** - Grafik tasarımcıdan alınacak
2. **Gerçek Partner Logoları** - Resmi logolar kullanılacak
3. **Fotoğraf Çekimi** - Profesyonel sürücü ve araç fotoğrafları

### 📋 Eksik Görseller Listesi
- [ ] `og-image.jpg` (1200x630px) - Social media sharing
- [ ] `fleet-car-2.svg` → `fleet-car-8.svg` - Ek araç görselleri
- [ ] `driver-2.svg` → `driver-3.svg` - Ek sürücü profilleri
- [ ] Blog post görselleri
- [ ] Testimonial arka plan görselleri

### 🔄 Güncelleme Talimatları
Gerçek görseller hazır olduğunda:

1. SVG dosyalarını aynı isimle değiştirin
2. Veya format değişikliği gerekiyorsa HTML'deki src attributelarını güncelleyin
3. CSS'te boyutlandırma ayarlarını kontrol edin

### 🛠️ Geliştirme Notları
- Tüm placeholder'lar responsive tasarıma uygun
- CSS'te SVG özel stilleri tanımlanmış
- Lazy loading ready
- SEO-friendly alt textler mevcut

### 📐 Boyut Standartları
- **Logo**: 40x40px (interface'de)
- **Partner Logoları**: 200x80px (max)
- **Hero Image**: 800x600px
- **Fleet Cars**: 600x400px
- **Driver Avatars**: 150x150px (circular)
- **Favicon**: 32x32px

Bu placeholder sistem, web sitesinin tamamen fonksiyonel olmasını sağlar ve gerçek görseller hazır olana kadar profesyonel bir görünüm sunar.
