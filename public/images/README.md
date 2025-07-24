# Placeholder Images - FlotaPartner Website

Bu dosya, web sitesinde kullanılması gereken görsellerin listesini ve özelliklerini içerir.

## Gerekli Görseller

### 1. Logo ve Branding
- **logo.png** (400x400px, PNG, transparent background)
  - Ana şirket logosu
  - Header ve footer'da kullanılacak
  
- **favicon.ico** (32x32px, ICO format)
  - Browser tab icon
  
- **og-image.jpg** (1200x630px, JPG)
  - Social media sharing görseli

### 2. Hero Section
- **hero-driver.jpg** (800x600px, JPG, high quality)
  - Mutlu sürücü fotoğrafı
  - Profesyonel, güven verici
  - Recommendation: Araç içinde gülümseyen sürücü

### 3. Partner Logos
- **uber-logo.png** (200x80px, PNG, transparent)
- **bolt-logo.png** (200x80px, PNG, transparent)  
- **freenow-logo.png** (200x80px, PNG, transparent)
- **itaxi-logo.png** (200x80px, PNG, transparent)

### 4. Fleet Images (Gallery)
Minimum 6-8 araç fotoğrafı gerekli:
- **fleet-car-1.jpg** → **fleet-car-8.jpg** (600x400px, JPG)
  - Modern, temiz araçlar
  - Farklı açılardan çekilmiş
  - Interior ve exterior shots
  - Professional photography önerisi

### 5. Driver Testimonials
- **driver-1.jpg** → **driver-3.jpg** (150x150px, JPG, circular crop ready)
  - Real driver photos veya stock photos
  - Diverse, professional looking

### 6. Additional Graphics
- **process-step-icons.svg** (Her adım için ayrı icon)
  - Step 1: Form icon
  - Step 2: Document icon  
  - Step 3: Contract icon
  - Step 4: Car key icon

## Temporary Placeholder Setup

Geliştirme aşamasında placeholder servislerini kullanabilirsiniz:

```html
<!-- Hero image placeholder -->
<img src="https://picsum.photos/800/600?random=1" alt="Hero Driver">

<!-- Fleet images placeholder -->
<img src="https://picsum.photos/600/400?random=2" alt="Fleet Car 1">
<img src="https://picsum.photos/600/400?random=3" alt="Fleet Car 2">

<!-- Driver avatars placeholder -->
<img src="https://i.pravatar.cc/150?img=1" alt="Driver 1">
<img src="https://i.pravatar.cc/150?img=2" alt="Driver 2">
```

## Image Optimization Guidelines

### Format Requirements
- **JPG**: Photos, complex images
- **PNG**: Logos, transparent backgrounds
- **SVG**: Icons, simple graphics
- **WebP**: Modern format for better compression (fallback önerisi)

### Size Guidelines
- **Hero images**: Max 800KB
- **Fleet gallery**: Max 300KB per image
- **Logos**: Max 50KB
- **Icons**: Vectorel (SVG) preferred

### SEO Image Requirements
- Alt text for all images
- Descriptive filenames
- Consistent naming convention
- Responsive images with multiple sizes

## Professional Photography Checklist

### Fleet Photography
- [ ] Clean, well-maintained vehicles
- [ ] Good lighting (preferably natural)
- [ ] Multiple angles per vehicle
- [ ] Interior shots showing comfort
- [ ] Branding/company elements visible
- [ ] Consistent background/setting

### Driver Photography
- [ ] Professional, friendly appearance
- [ ] Business casual clothing
- [ ] Natural, genuine smiles
- [ ] Good lighting
- [ ] Diverse representation
- [ ] High resolution for cropping flexibility

## Brand Consistency

### Color Palette
- Primary: #2563eb (Blue)
- Secondary: #f59e0b (Orange)
- Use these colors in graphics and overlays

### Typography in Images
- Use Inter font family when adding text to images
- Maintain brand voice and tone

## File Organization

```
images/
├── brand/
│   ├── logo.png
│   ├── favicon.ico
│   └── og-image.jpg
├── hero/
│   └── hero-driver.jpg
├── partners/
│   ├── uber-logo.png
│   ├── bolt-logo.png
│   ├── freenow-logo.png
│   └── itaxi-logo.png
├── fleet/
│   ├── fleet-car-1.jpg
│   ├── fleet-car-2.jpg
│   └── ...
├── drivers/
│   ├── driver-1.jpg
│   ├── driver-2.jpg
│   └── ...
└── icons/
    ├── process-step-1.svg
    ├── process-step-2.svg
    └── ...
```

## Implementation Notes

1. **Lazy Loading**: Images below the fold should use lazy loading
2. **Responsive Images**: Use srcset for different screen sizes
3. **Fallbacks**: Provide fallback images for missing assets
4. **Compression**: All images should be optimized before upload
5. **CDN**: Consider using image CDN for production

Bu görseller hazırlandıktan sonra placeholder linkler değiştirilerek production için hazır hale getirilebilir.
