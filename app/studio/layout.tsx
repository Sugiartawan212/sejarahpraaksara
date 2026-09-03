import React from 'react';

// Layout khusus untuk rute /studio — route group terpisah dari [locale]
// Harus mengembalikan <html> dan <body> karena ini root layout untuk segment /studio
export const metadata = {
  title: 'Sanity Studio - Pra-Aksara',
  description: 'Backend CMS untuk website presentasi Sejarah Pra-Aksara',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
