import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { SmoothScroll } from './lib/smoothScroll';
import { ScrollToHash } from './components/ScrollToHash';
import Home from './pages/Home';
const Work = lazy(() => import('./pages/Work'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));

/** Pages that live on the home page in this portfolio send visitors to the matching section. */
const toHome = (hash = '') => <Navigate to={`/${hash}`} replace />;

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <ScrollToHash />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<CaseStudy />} />
          <Route path="contact" element={toHome('#contact')} />
          <Route path="services" element={toHome('#services')} />
          <Route path="services/*" element={toHome('#services')} />
          <Route path="about" element={toHome()} />
          <Route path="ai-solutions" element={toHome()} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
