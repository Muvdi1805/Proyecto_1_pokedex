import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `transition px-3 py-1 rounded ${
      isActive
        ? "bg-yellow-400 text-black font-bold"
        : "hover:text-yellow-400"
    }`;

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-black/70 backdrop-blur-md text-white p-4 shadow-lg">

        <div className="max-w-6xl mx-auto flex justify-between items-center">

          {/* LOGO */}
          <h1 className="text-xl font-bold text-yellow-400">
            Pokédex ⚡
          </h1>

          {/* LINKS */}
          <ul className="flex gap-4 text-sm md:text-base">
            <li>
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/explore" className={linkClass}>
                Explore
              </NavLink>
            </li>

            <li>
              <NavLink to="/favorites" className={linkClass}>
                Favorites
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" className={linkClass}>
                Contact
              </NavLink>
            </li>
          </ul>

        </div>
      </nav>
    </header>
  );
}