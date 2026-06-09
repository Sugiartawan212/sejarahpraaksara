import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'id', 'ru'],
  defaultLocale: 'en',
  // Locale default ('en') tidak akan muncul di URL
  // Contoh: /en/properti → /properti (canonical)
  // /id/properti → tetap /id/properti
  localePrefix: 'as-needed',
});
