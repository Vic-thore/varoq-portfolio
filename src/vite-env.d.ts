/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Analytics 4 measurement ID, e.g. G-XXXXXXXXXX. Analytics stays off when unset. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}
