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
const BASE_URL = 'https://sejarahpraaksara.vercel.app'; // TODO: Sesuaikan dengan domain asli nanti
const SITE_NAME = 'Sejarah Pra-Aksara';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

// ─── Teks per-locale ───────────────────────────────────────────────────────────
const LOCALE_META: Record<string, { title: string; description: string; keywords: string[] }> = {
  en: {
    title: 'Prehistoric Era | Group Presentation',
    description:
      'An interactive presentation website about the prehistoric era, its stages of civilization, and archaeological artifacts left behind by early humans.',
    keywords: [
      'prehistoric era', 'pre-literacy age', 'paleolithic', 'mesolithic', 'neolithic',
      'bronze age indonesia', 'prehistoric artifacts', 'history presentation',
      'early humans indonesia', 'ancient civilization',
    ],
  },
  id: {
    title: 'Sejarah Pra-Aksara | Presentasi Kelompok',
    description:
      'Website presentasi interaktif mengenai sejarah masa pra-aksara, tingkatan zaman, dan artefak peninggalan.',
    keywords: [
      'sejarah pra-aksara', 'zaman praaksara', 'paleolitikum', 'mesolitikum', 'neolitikum',
      'perundagian', 'artefak prasejarah', 'presentasi sejarah', 'manusia purba indonesia',
      'peradaban awal indonesia', 'zaman batu', 'zaman logam',
    ],
  },
  ru: {
    title: 'Доисторическая эпоха | Групповая презентация',
    description:
      'Интерактивный сайт-презентация об истории доисторической эпохи, этапах цивилизации и археологических артефактах.',
    keywords: [
      'доисторическая эпоха', 'палеолит', 'мезолит', 'неолит', 'бронзовый век',
      'доисторические артефакты', 'история индонезии', 'древний человек',
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
          alt: `${SITE_NAME} — Presentasi Interaktif Sejarah Pra-Aksara`,
        },
      ],
    },

    // ── Twitter / X Cards ───────────────────────────────────────────────────
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

// ─── JSON-LD: EducationalPresentation Schema ──────────────────────────────────
const presentationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  description:
    'Website presentasi interaktif mengenai sejarah masa pra-aksara, tingkatan zaman, dan artefak peninggalan manusia purba di Indonesia.',
  url: BASE_URL,
  inLanguage: 'id',
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
        {/* JSON-LD: Presentation Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(presentationSchema) }}
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