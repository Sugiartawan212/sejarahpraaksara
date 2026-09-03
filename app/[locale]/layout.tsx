// app/[locale]/layout.tsx — Layout utama dengan dukungan i18n + Full Technical SEO
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';


// ─── Konstanta SEO ─────────────────────────────────────────────────────────────
const BASE_URL = 'https://umahluwung.com'; // TODO: Sesuaikan dengan domain asli nanti
const SITE_NAME = 'Umah Luwung Interior';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`; // Pastikan menyiapkan gambar og-image.jpg di folder public

// ─── Teks per-locale ───────────────────────────────────────────────────────────
const LOCALE_META: Record<string, { title: string; description: string; keywords: string[] }> = {
  en: {
    title: 'Umah Luwung | Premium Interior Design in Singaraja, Bali',
    description:
      'Transforming visionary concepts into awe-inspiring realities. Umah Luwung is a premier interior design studio in Singaraja, North Bali, specializing in custom furniture, kitchen sets, and full residential refurbishments.',
    keywords: [
      'interior design bali', 'singaraja interior', 'custom furniture bali', 'premium interior designer',
      'kitchen set singaraja', 'bali residential design', 'umah luwung',
      'bali architecture', 'interior contractor bali', 'luxury home bali',
    ],
  },
  id: {
    title: 'Umah Luwung | Desain Interior Premium di Singaraja, Bali',
    description:
      'Mengubah visi menjadi ruang nyata yang memukau. Umah Luwung adalah studio desain interior terpercaya di Singaraja, spesialis custom furniture, kitchen set, dan renovasi hunian eksklusif sejak 2003.',
    keywords: [
      'desain interior bali', 'interior singaraja', 'custom furniture bali', 'jasa interior premium',
      'kitchen set singaraja', 'renovasi rumah bali', 'umah luwung',
      'kontraktor interior bali', 'desain ruang tamu', 'desain kamar tidur',
    ],
  },
  ru: {
    title: 'Umah Luwung | Премиальный дизайн интерьера на Бали',
    description:
      'Превращаем концепции в потрясающую реальность. Umah Luwung — ведущая студия дизайна интерьера в Сингарадже, Бали, специализирующаяся на мебели на заказ и элитном ремонте жилых помещений.',
    keywords: [
      'дизайн интерьера бали', 'мебель на заказ бали', 'премиальный интерьер бали', 'ремонт вилл бали',
      'umah luwung', 'интерьер сингараджа', 'архитектура бали',
    ],
  },
};

// ─── generateMetadata ──────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = LOCALE_META[locale] ?? LOCALE_META['en'];

  // Canonical: bahasa default (id) → tanpa prefix /id (jika localePrefix: 'as-needed')
  // Catatan: Asumsi kamu menggunakan 'id' atau 'en' sebagai default, sesuaikan jika perlu.
  const canonicalUrl = locale === 'en' ? BASE_URL : `${BASE_URL}/${locale}`;

  return {
    metadataBase: new URL(BASE_URL),

    // ── Title Template ──────────────────────────────────────────────────────
    title: {
      default: meta.title,
      template: `%s | ${SITE_NAME}`,
    },

    // ── Deskripsi, Keywords & Robots ────────────────────────────────────────
    description: meta.description,
    keywords: meta.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },

    // ── Hreflang Alternates (kritis anti-duplicate content) ─────────────────
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': BASE_URL,
        'id': `${BASE_URL}/id`,
        'ru': `${BASE_URL}/ru`,
        'x-default': BASE_URL,
      },
    },

    // ── Open Graph ──────────────────────────────────────────────────────────
    openGraph: {
      type: 'website',
      locale: locale === 'id' ? 'id_ID' : locale === 'ru' ? 'ru_RU' : 'en_US',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — Builders of Extraordinary Spaces`,
        },
      ],
    },

    // ── Twitter / X Cards ───────────────────────────────────────────────────
    twitter: {
      card: 'summary_large_image',
      site: '@UmahLuwung', // TODO: Ganti jika ada Twitter resmi
      creator: '@UmahLuwung',
      title: meta.title,
      description: meta.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

// ─── JSON-LD: HomeAndConstructionBusiness Schema ──────────────────────────────
const interiorDesignSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: SITE_NAME,
  description:
    'Umah Luwung is a premier interior design studio dedicated to transforming visionary concepts into awe-inspiring realities. Specializing in custom furniture, kitchen sets, and residential refurbishments in Singaraja, Bali.',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: DEFAULT_OG_IMAGE,
  telephone: '+6281353555535', // Menggunakan nomor Kak Sri/Admin Umah Luwung
  email: 'info@umahluwung.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Pantai Penimbangan Gg. Balbo No.1A, Baktiseraga',
    addressLocality: 'Singaraja, Buleleng, Bali',
    postalCode: '81119',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -8.112, // Koordinat Singaraja (Sesuaikan presisi jika punya data Maps persis)
    longitude: 115.088,
  },
  areaServed: {
    '@type': 'City',
    name: 'Singaraja',
  },
  sameAs: [
    'https://www.instagram.com/umahluwungsingaraja',
    'https://www.facebook.com/Umah-Luwung-interior-modern-di-singaraja',
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    opens: '08:00',
    closes: '17:00',
  },
};

// ─── Layout Component ──────────────────────────────────────────────────────────
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'id' | 'ru')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        {/* JSON-LD: Interior Design Schema — diinjeksi di semua halaman */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(interiorDesignSchema) }}
        />
      </head>
      {/* Background utama diset ke warna gelap (Dark Charcoal) agar transisi halaman terasa eksklusif */}
      <body className="bg-[#1A1A18] text-[#EBE7E0] antialiased selection:bg-[#B89970] selection:text-white">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />

        </NextIntlClientProvider>
      </body>
    </html>
  );
}