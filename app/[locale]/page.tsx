import HeroSection from '@/components/home/HeroSection';
import TeamSection from '@/components/home/TeamSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import ProcessSection from '@/components/home/ProcessSection';
import ServicessSection from '@/components/home/ServicesSection';
import GalleryPreview from '@/components/home/GalleryPreview';
import TestimonialSection from '@/components/home/QuizSection';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { locale } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F3EF]">
      <HeroSection />
      <TeamSection />
      <PhilosophySection />
      <ProcessSection />
      <ServicessSection />
      <GalleryPreview />
      <TestimonialSection />
    </div>
  );
}