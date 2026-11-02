import { useState, type ImgHTMLAttributes } from 'react';

/**
 * An <img> that retries once with `fallbackSrc` if the main image fails to
 * load, so a higher-resolution URL can be tried safely.
 */
export function CoverImage({
  src,
  fallbackSrc,
  alt = '',
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & { fallbackSrc?: string }) {
  const [current, setCurrent] = useState(src);
  return (
    <img
      {...rest}
      src={current}
      alt={alt}
      onError={() => {
        if (fallbackSrc && current !== fallbackSrc) setCurrent(fallbackSrc);
      }}
    />
  );
}
