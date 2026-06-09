// app/layout.tsx — Root layout minimal (wajib ada, biarkan seperti ini)
// Layout utama yang sebenarnya ada di app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}