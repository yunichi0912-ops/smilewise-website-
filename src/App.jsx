import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Nikoniko from './pages/Nikoniko.jsx';
import CardOrder from './pages/CardOrder.jsx';
import System from './pages/System.jsx';
import Works from './pages/Works.jsx';
import Pricing from './pages/Pricing.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import Diagnosis from './pages/Diagnosis.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="nikoniko" element={<Nikoniko />} />
        <Route path="diagnosis" element={<Diagnosis />} />
        <Route path="card-order" element={<CardOrder />} />
        <Route path="system" element={<System />} />
        <Route path="works" element={<Works />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
