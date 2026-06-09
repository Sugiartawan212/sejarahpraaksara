export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  return (
    <div className="pt-32 px-4 min-h-screen">
      <h1 className="text-4xl font-serif">Project Detail: {slug}</h1>
    </div>
  );
}
