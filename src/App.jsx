import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Detail from "./pages/Detail";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import { FavoritesProvider } from "./context/FavoritesContext";

import AdBlockModal from "./components/AdBlockModal";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>

        {/* SCROLL RESET */}
        <ScrollToTop />

        {/* MODAL */}
        <AdBlockModal />

        {/* NAVBAR */}
        <Navbar />

        {/* CONTENIDO */}
        <main className="min-h-screen bg-gray-950">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/pokemon/:id" element={<Detail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="text-center text-gray-500 py-4 text-sm bg-black">
          © 2026 Pokédex App
        </footer>

        {/* TOASTER */}
        <Toaster
          position="top-right"
          containerStyle={{ zIndex: 100000 }}
          toastOptions={{
          duration: 2500,
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid #374151",
    },
  }}
/>

      </BrowserRouter>
    </FavoritesProvider>
  );
}