import { motion } from 'framer-motion';
import { reveal } from '../hooks/useReveal';
import { cn } from '../lib/cn';

/**
 * Splits a heading so one key word picks up the brand blue.
 * Mark the word yourself with asterisks ("Design, *build* and grow"); with no
 * marker the last word is used, keeping any trailing punctuation plain.
 */
export function AccentTitle({ text, tone = 'dark' }: { text: string; tone?: 'dark' | 'light' }) {
  const accent = tone === 'light' ? 'text-brand-blue' : 'text-brand-bright';
  const marked = text.match(/^(.*?)\*(.+?)\*(.*)$/s);
  let before: string, word: string, after: string;
  if (marked) {
    [, before, word, after] = marked;
  } else {
    const m = text.match(/^(.*?)([^\s]+?)([?!.,:;]*)$/s);
    if (!m || !m[1].trim()) return <>{text}</>;
    [, before, word, after] = m;
  }
  return (
    <>
      {before}
      <span className={accent}>{word}</span>
      {after}
    </>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'dark' | 'light';
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
}

/** Centered eyebrow / title / description block shared by four sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'dark',
  as = 'h2',
  id,
  className,
}: SectionHeadingProps) {
  const Title = as;
  const light = tone === 'light';

  return (
    <motion.div
      {...reveal()}
      className={cn('mx-auto max-w-[900px] text-center', className)}
    >
      <p className={cn('eyebrow', light ? 'text-gray-muted-dark' : 'text-primary')}>
        {eyebrow}
      </p>
      <Title
        id={id}
        className={cn('section-title', light ? 'text-black' : 'text-white')}
      >
        <AccentTitle text={title} tone={tone} />
      </Title>
      {description && (
        <p
          className={cn(
            'section-sub mx-auto max-w-[620px]',
            light ? 'text-gray-muted-light' : 'text-gray-495'
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
