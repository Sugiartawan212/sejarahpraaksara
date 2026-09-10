import HeroSection from '@/components/home/HeroSection';
import TeamSection from '@/components/home/TeamSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import ProcessSection from '@/components/home/ProcessSection';
import ServicessSection from '@/components/home/ServicesSection';
import GalleryPreview from '@/components/home/GalleryPreview';
import TestimonialSection from '@/components/home/QuizSection';
import FunFactSection from '@/components/home/FunFactSection';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { locale } = await params;

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TeamSection />
      <PhilosophySection />
      <ProcessSection />
      <FunFactSection />
      <ServicessSection />
      <GalleryPreview />
      <TestimonialSection />
    </div>
  );
}