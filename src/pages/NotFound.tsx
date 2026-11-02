import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { reveal } from '../hooks/useReveal';

const links = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
];

export default function NotFound() {
  return (
    <section
      className="section-pad flex min-h-[80vh] items-center pt-[160px] max-[575px]:pt-[120px]"
      aria-labelledby="nf-heading"
    >
      <div className="container-zf">
        <motion.div {...reveal()} className="mx-auto max-w-[640px] text-center">
          <p
            aria-hidden="true"
            data-text="404"
            className="font-display text-[clamp(96px,22vw,200px)] font-semibold leading-none tracking-tight before:content-[attr(data-text)]"
            style={{ color: 'rgba(22, 131, 255, 0.35)' }}
          />
          <h1
            id="nf-heading"
            className="mt-2 font-display text-[44px] font-semibold leading-tight tracking-tight text-white max-[575px]:text-[32px]"
          >
            This page doesn&rsquo;t exist
          </h1>
          <p className="mt-5 font-inter text-[18px] leading-7 text-gray-495 max-[575px]:text-[16px]">
            The link may be broken or the page may have moved. Head back home, or
            jump to one of these.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild className="h-12 gap-2 rounded-lg px-8 text-base">
              <Link to="/">
                Back to home
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-lg px-8 text-base">
              <Link to="/#contact">Contact us</Link>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="inline-block py-1 font-inter text-[15px] text-gray-495 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
