import { useEffect, useState } from 'react';

const TZ = 'Africa/Lagos';

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: TZ,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/** Live local time in Lagos with a pulsing status dot. Renders a placeholder until mounted to keep prerendered HTML stable. */
export function LiveClock({ className = '' }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={`flex items-center gap-2.5 font-inter text-[13px] text-white/70 ${className}`} aria-label="Local time in Lagos">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      <span className="uppercase tracking-[0.12em]">Lagos, NG</span>
      <span className="tabular-nums text-white" suppressHydrationWarning>
        {now ?? '--:--:--'} <span className="text-white/50">WAT</span>
      </span>
    </div>
  );
}
