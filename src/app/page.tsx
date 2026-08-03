import { Hero } from '@/components/home/hero';
import { About } from '@/components/home/about';
import { FeaturedWork } from '@/components/home/featured-work';
import { TechnicalExpertise } from '@/components/home/technical-expertise';
import { ExperienceBeyondCode } from '@/components/home/experience-beyond-code';
import { Contact } from '@/components/home/contact';
import { TopographicContour } from '@/components/background/topographic-contour';

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <Hero />
      <div className="relative w-full bg-[#09090B]">
        <TopographicContour />
        <About />
        <ExperienceBeyondCode />
        <TechnicalExpertise />
      </div>
      <FeaturedWork />
      <Contact />
    </div>
  );
}
