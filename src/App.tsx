import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import HomePage from "./pages/HomePage";
import OverviewPage from "./pages/OverviewPage";
import ProkerPage from "./pages/ProkerPage";
import MateriPage from "./pages/MateriPage";
import DivisionPage from "./pages/DivisionPage";
import NotFound from "./pages/NotFound";

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/proker" element={<ProkerPage />} />
          <Route path="/materi" element={<MateriPage />} />
          <Route path="/divisi/:code" element={<DivisionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}
