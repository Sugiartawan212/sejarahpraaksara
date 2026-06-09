import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Ini bawaan kamu, biarin aja buat CMS nanti
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Ini tambahan buat gambar placeholder premium kita
      },
    ],
  },
};

export default withNextIntl(nextConfig);