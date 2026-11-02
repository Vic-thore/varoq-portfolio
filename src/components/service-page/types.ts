import type { LucideIcon } from 'lucide-react';

/** An icon, a short title, and a sentence: used across service pages. */
export interface IconItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

/** Original concept work shown to demonstrate an approach. */
export interface ServiceConcept {
  name: string;
  category: string;
  image: string;
  alt: string;
  brief: string;
  approach: string;
  delivered: string[];
}

export interface ServicePackage {
  name: string;
  blurb: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
}

export interface PageImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** A feature deep-dive: an eyebrow, heading, intro, two sub-points and a picture. */
export interface DeepDive {
  eyebrow: string;
  title: string;
  description: string;
  points: { title: string; description: string }[];
  image: PageImage;
  /** Optional Lottie animation shown instead of the image. */
  lottie?: string;
}
