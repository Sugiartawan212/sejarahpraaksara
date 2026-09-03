// Layout di dalam [[...tool]] tidak diperlukan.
// Root layout untuk /studio ada di app/studio/layout.tsx
export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}