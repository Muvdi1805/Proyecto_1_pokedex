import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded transition ${
      isActive
        ? "bg-yellow-400 text-black font-bold"
        : "hover:text-yellow-400"
    }`;

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-black/70 backdrop-blur-md text-white p-4 shadow-lg">

        <div className="max-w-6xl mx-auto flex justify-between items-center">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src="/icono.png"
              alt="Pokédex logo"
              className="w-8 h-8 object-contain hover:rotate-12 transition"
            />
            <h1 className="text-xl font-bold text-yellow-400">
              Pokédex App
            </h1>
          </NavLink>

          {/* BOTÓN HAMBURGUESA (MOBILE) */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>

          {/* LINKS DESKTOP */}
          <ul className="hidden md:flex gap-4 text-sm md:text-base">
            <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
            <li><NavLink to="/explore" className={linkClass}>Explore</NavLink></li>
            <li><NavLink to="/favorites" className={linkClass}>Favorites</NavLink></li>
            <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
          </ul>

        </div>

        {/* MENÚ MOBILE */}
        {open && (
          <div className="md:hidden mt-4 bg-gray-900 rounded-xl p-4 flex flex-col gap-2 shadow-lg">

            <NavLink to="/" onClick={() => setOpen(false)} className={linkClass}>
              Home
            </NavLink>

            <NavLink to="/explore" onClick={() => setOpen(false)} className={linkClass}>
              Explore
            </NavLink>

            <NavLink to="/favorites" onClick={() => setOpen(false)} className={linkClass}>
              Favorites
            </NavLink>

            <NavLink to="/contact" onClick={() => setOpen(false)} className={linkClass}>
              Contact
            </NavLink>

          </div>
        )}

      </nav>
    </header>
  );
}