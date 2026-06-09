import HeroSection from '@/components/home/HeroSection';
import StatisticBanner from '@/components/home/StatisticBanner';
import PhilosophySection from '@/components/home/PhilosophySection';
import ServicesSection from '@/components/home/ServicesSection';
import ProcessSection from '@/components/home/ProcessSection';
import GalleryPreview from '@/components/home/GalleryPreview';
import TestimonialSection from '@/components/home/TestimonialSection';
import BookingSection from '@/components/home/BookingSection';
// Halaman utama — Frontend-First Phase 1
// Hanya menampilkan HeroSection & Navbar (floating capsule)

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

      <StatisticBanner />
      <PhilosophySection />
      <ServicesSection />
      <ProcessSection />
      <GalleryPreview />
      <TestimonialSection />
      <BookingSection />
    </div>
  );
}