import { useEffect, useId, useRef, useState } from 'react';

const TZ = 'Africa/Lagos';

/** Edit this list to change what the card says. Hours are Lagos time (24h); ranges are [from, to). */
const SCHEDULE = [
  { from: 0, to: 7, status: 'Offline', note: 'Asleep. Replies in the morning.', hours: '23:00–07:00' },
  { from: 7, to: 9, status: 'Starting the day', note: 'Coffee, inbox and planning.', hours: '07:00–09:00' },
  { from: 9, to: 13, status: 'Deep work', note: 'Heads down, designing and building.', hours: '09:00–13:00' },
  { from: 13, to: 15, status: 'On a break', note: 'Lunch and a reset.', hours: '13:00–15:00' },
  { from: 15, to: 19, status: 'Back at work', note: 'Finishing things up at the desk.', hours: '15:00–19:00' },
  { from: 19, to: 23, status: 'Signed off', note: 'Away from the desk. Messages answered tomorrow.', hours: '19:00–23:00' },
  { from: 23, to: 24, status: 'Offline', note: 'Asleep. Replies in the morning.', hours: '23:00–07:00' },
];

const parts = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hour12: false });

function read() {
  const d = new Date();
  const [h, m] = parts.format(d).split(':').map(Number);
  return { h, label: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` };
}

/** Header pill showing live Lagos time. Hover, focus or tap opens a small card with what's going on right now. */
export function StatusPill({ className = '' }: { className?: string }) {
  const [now, setNow] = useState<{ h: number; label: string } | null>(null);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const tick = () => setNow(read());
    tick();
    const t = window.setInterval(tick, 15000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => wrap.current && !wrap.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  const slot = now ? SCHEDULE.find((s) => now.h >= s.from && now.h < s.to) : undefined;

  return (
    <div
      ref={wrap}
      className={`${className} ${className.includes("absolute") ? "" : "relative"}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-2.5 rounded-full border border-white/20 bg-[#111318] px-4 font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_6px_20px_rgba(0,0,0,0.45)]"
      >
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        Lagos
        <span className="text-white/40">·</span>
        <span className="tabular-nums" suppressHydrationWarning>{now?.label ?? '--:--'}</span>
        <span className="text-[9px] text-white/55">WAT</span>
      </button>

      <div
        id={id}
        role="status"
        className={`absolute left-1/2 top-full z-[80] mt-3 w-[340px] -translate-x-1/2 rounded-xl border border-black/10 bg-white p-5 text-left shadow-[0_24px_60px_rgba(0,0,0,0.5)] transition duration-200 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
        }`}
      >
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-black/10 bg-white" aria-hidden="true" />
        <p className="font-inter text-[12px] text-[#05070B]/60">Currently, Veetech is</p>
        <p className="mt-2 font-tight text-[22px] font-medium leading-tight text-[#05070B]">{slot?.status ?? 'Online'}</p>
        <div className="mt-4 flex items-start justify-between gap-4 border-t border-black/10 pt-3 font-inter text-[12px] text-[#05070B]/60">
          <span>{slot?.note ?? 'Open to new projects.'}</span>
          <span className="shrink-0 tabular-nums">{slot?.hours ?? ''}</span>
        </div>
      </div>
    </div>
  );
}
