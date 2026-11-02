import { useEffect, useState } from 'react';

/** Types a word out, holds, deletes it, moves to the next. */
export function useTypewriter(words: string[], enabled = true): string {
  const [text, setText] = useState(words[0] ?? '');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled || words.length === 0) return;
    const word = words[wordIndex % words.length];

    if (!deleting && text === word) {
      const hold = window.setTimeout(() => setDeleting(true), 1800);
      return () => window.clearTimeout(hold);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const step = window.setTimeout(
      () =>
        setText((current) =>
          deleting ? word.slice(0, current.length - 1) : word.slice(0, current.length + 1)
        ),
      deleting ? 55 : 110
    );
    return () => window.clearTimeout(step);
  }, [text, deleting, wordIndex, words, enabled]);

  return text;
}
