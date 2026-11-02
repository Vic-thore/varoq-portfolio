import * as React from 'react';
import { useReducedMotion } from 'framer-motion';

export interface InteractiveSynapseNetworkProps {
  /** Content rendered on top of the network canvas. */
  children?: React.ReactNode;
  /** Color of each node (CSS color string). */
  nodeColor?: string;
  /** Color of the traveling pulse (CSS color string). */
  pulseColor?: string;
  /** How many nodes to simulate. */
  nodeCount?: number;
  /** Maximum distance (px) for a connection. */
  connectionRadius?: number;
  /** Opacity of the fading trail left behind each frame (0-1). */
  trailOpacity?: number;
  /** ARIA label for assistive technologies. */
  ariaLabel?: string;
  /** Additional classes on the wrapper. */
  className?: string;
}

/*
 * Adapted from the "interactive synapse network" component. Two changes from
 * the original:
 *  - Sized to its container (via ResizeObserver) instead of the whole
 *    viewport, and the pointer is tracked relative to that container, since
 *    this renders inside a hero section rather than filling the screen.
 *  - Visitors who prefer reduced motion get a single static frame instead
 *    of a running animation.
 * The background trail is pure black, as requested; node and pulse colors
 * are left to the caller.
 */
export function InteractiveSynapseNetwork({
  children,
  nodeColor = 'rgba(56,189,248,0.85)',
  pulseColor = 'rgba(255,255,255,1)',
  nodeCount = 60,
  connectionRadius = 170,
  trailOpacity = 0.18,
  ariaLabel = 'Interactive synapse network',
  className = '',
}: InteractiveSynapseNetworkProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouseRef = React.useRef({ x: -9999, y: -9999 });
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;

    interface PulseT {
      start: NodeT;
      end: NodeT;
      progress: number;
    }

    class NodeT {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      connections: NodeT[] = [];
      pulses: PulseT[] = [];
      activation = 0;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.6 + 1.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);
        const target = Math.max(0, 1 - dist / (connectionRadius * 0.8));
        this.activation += (target - this.activation) * 0.1;

        if (this.activation > 0.5 && Math.random() > 0.98 && this.connections.length) {
          const to = this.connections[Math.floor(Math.random() * this.connections.length)];
          if (to) this.pulses.push({ start: this, end: to, progress: 0 });
        }
        this.pulses = this.pulses.filter((p) => p.progress < 1);
        this.pulses.forEach((p) => (p.progress += 0.03));
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const alpha = Math.max(0.25, this.activation);
        ctx!.fillStyle = nodeColor.replace(/[\d.]+\)$/, `${alpha})`);
        ctx!.fill();
        this.pulses.forEach((p) => {
          const x = p.start.x + (p.end.x - p.start.x) * p.progress;
          const y = p.start.y + (p.end.y - p.start.y) * p.progress;
          ctx!.beginPath();
          ctx!.arc(x, y, 2.4, 0, Math.PI * 2);
          ctx!.fillStyle = pulseColor;
          ctx!.fill();
        });
      }
    }

    let nodes: NodeT[] = [];

    const connect = () => {
      nodes.forEach((n1) => {
        n1.connections = nodes.filter(
          (n2) => n2 !== n1 && Math.hypot(n1.x - n2.x, n1.y - n2.y) < connectionRadius,
        );
      });
    };

    const drawFrame = (clear: boolean) => {
      if (clear) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.fillStyle = `rgba(0,0,0,${trailOpacity})`;
        ctx.fillRect(0, 0, width, height);
      }
      nodes.forEach((n1) => {
        n1.connections.forEach((n2) => {
          const a = Math.max(0.05, n1.activation, n2.activation) * 0.25;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = nodeColor.replace(/[\d.]+\)$/, `${a})`);
          ctx.stroke();
        });
      });
      nodes.forEach((n) => n.draw());
    };

    const setup = () => {
      width = canvas.width = wrapper.clientWidth;
      height = canvas.height = wrapper.clientHeight;
      nodes = Array.from({ length: nodeCount }, () => new NodeT());
      connect();
      if (reduceMotion) {
        drawFrame(true);
      }
    };

    setup();

    const animate = () => {
      nodes.forEach((n) => n.update());
      drawFrame(false);
      raf = requestAnimationFrame(animate);
    };
    if (!reduceMotion) animate();

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    wrapper.addEventListener('mousemove', onMove);
    wrapper.addEventListener('mouseleave', onLeave);

    const ro = new ResizeObserver(() => setup());
    ro.observe(wrapper);

    return () => {
      cancelAnimationFrame(raf);
      wrapper.removeEventListener('mousemove', onMove);
      wrapper.removeEventListener('mouseleave', onLeave);
      ro.disconnect();
    };
  }, [nodeColor, pulseColor, nodeCount, connectionRadius, trailOpacity, reduceMotion]);

  return (
    <div
      ref={wrapperRef}
      className={`relative h-full w-full overflow-hidden bg-black ${className}`}
    >
      <canvas ref={canvasRef} role="img" aria-label={ariaLabel} className="absolute inset-0 block h-full w-full" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

export default InteractiveSynapseNetwork;
