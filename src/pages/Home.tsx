import { Hero } from '../components/Hero';
import { ClientLogos } from '../components/ClientLogos';
import { SelectedWorks } from '../components/SelectedWorks';
import { WorkPreviewHero } from '../components/WorkPreviewHero';
import { Services } from '../components/Services';
import { About } from '../components/About';
import { Process } from '../components/Process';
import { TestimonialWall } from '../components/TestimonialWall';
import { CTASection } from '../components/CTASection';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <SelectedWorks />
      <WorkPreviewHero />
      <Process />
      <Services />
      <About />
      <TestimonialWall />
      <CTASection />
      <FAQ />
      <Contact />
    </>
  );
}
