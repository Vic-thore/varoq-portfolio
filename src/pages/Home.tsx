import { Hero } from '../components/Hero';
import { WorkSlider } from '../components/WorkSlider';
import { WorkPreviewHero } from '../components/WorkPreviewHero';
import { Services } from '../components/Services';
import { Process } from '../components/Process';
import { Showcase } from '../components/Showcase';
import { TestimonialWall } from '../components/TestimonialWall';
import { CTASection } from '../components/CTASection';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <WorkSlider />
      <Services />
      <WorkPreviewHero />
      <Process />
      <Showcase />
      <TestimonialWall />
      <CTASection />
      <FAQ />
      <Contact />
    </>
  );
}
