import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Middleware berjalan di semua path KECUALI:
  // - _next (aset internal Next.js)
  // - studio (Sanity Studio — tidak perlu locale)
  // - File statis dengan ekstensi (gambar, favicon, dll)
  matcher: [
    '/((?!_next|studio|.*\\..*).*)',
    '/',
    '/(en|id|ru)/:path*',
  ],
};
