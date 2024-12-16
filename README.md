## Barkod Oluşturucu

Bu proje, özelleştirilebilir metin görüntüleme özelliğine sahip barkodlar oluşturmak için [Next.js](https://nextjs.org) kullanılarak geliştirilmiştir.

### react-barcode için Özel Düzenleme

Barkodların altında özel metin görüntülemek için, `react-barcode` kütüphanesinin tip tanımlamasına aşağıdaki özelliği ekleyin:

```typescript
// node_modules/react-barcode/lib/index.d.ts
text?: string;
```

Bu düzenleme şunları yapmanızı sağlar:

- Orijinal değerlerle barkod oluşturma
- Barkodun altında özel biçimlendirilmiş metin görüntüleme
- Barkodun orijinal değerle taranabilir kalmasını sağlama

Örnek kullanım:

```typescript
<Barcode
  value="123456" // Barkod için orijinal değer
  text="(12)3456" // Özel görüntüleme metni
/>
```

### Başlangıç

Öncelikle, geliştirme sunucusunu başlatın:

```bash
pnpm dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak sonucu görebilirsiniz.

### Özellikler

- Tekli veya üçlü barkod görüntüleme modları
- Özel metin biçimlendirme (örn. parantez ekleme)
- Duyarlı tasarım
- Sade ve basit arayüz
- Yazdırmaya uygun sabit boyutlar (tekli için 10cm x 5cm, üçlü için 10cm x 15cm)

### Kullanılan Teknolojiler

- [Next.js](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Tip güvenliği
- [Tailwind CSS](https://tailwindcss.com) - Stil
- [react-barcode](https://www.npmjs.com/package/react-barcode) - Barkod oluşturma

### Vercel'de Dağıtım

Next.js uygulamanızı dağıtmanın en kolay yolu, Next.js'in yaratıcıları tarafından geliştirilen [Vercel Platform](https://vercel.com/new)'unu kullanmaktır.

Daha fazla detay için [Next.js dağıtım dokümantasyonu](https://nextjs.org/docs/app/building-your-application/deploying)'na göz atın.

---

# Barcode Generator | Barkod Oluşturucu

[English](#barcode-generator) | [Türkçe](#barkod-oluşturucu-1)

## Barcode Generator

This is a [Next.js](https://nextjs.org) project for generating barcodes with customizable display text.

### Custom Modification for react-barcode

To enable custom text display under barcodes while keeping the original barcode value, add the following prop type to the `react-barcode` library's type definition:

```typescript
// node_modules/react-barcode/lib/index.d.ts
text?: string;
```

This modification allows you to:

- Generate barcodes with original values
- Display custom formatted text under the barcode
- Keep barcode scannable with original value

Example usage:

```typescript
<Barcode
  value="123456" // Original value for barcode
  text="(12)3456" // Custom display text
/>
```

### Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Features

- Single or triple barcode display modes
- Custom text formatting (e.g., adding parentheses)
- Responsive design
- Clean and simple interface
- Print-friendly layout with fixed dimensions (10cm x 5cm for single, 10cm x 15cm for triple)

### Technologies Used

- [Next.js](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [react-barcode](https://www.npmjs.com/package/react-barcode) - Barcode generation
