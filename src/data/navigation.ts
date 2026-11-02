export interface NavItem {
  label: string;
  href: string;
}

// Home/About are real routes; Work/Insights anchor to sections on the
// homepage (ScrollToHash handles the cross-page case).
export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
];

export const trailingNav: NavItem[] = [
  { label: 'Work', href: '/work' },
];
