import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { typeIcons, typeColors, typeNames } from "../utils/typeData";

export default function Card({ pokemon }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((f) => f.id === pokemon.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="h-full">

      <article className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer flex flex-col justify-between h-full">

        {/* IMAGEN */}
        <img
          src={pokemon.image}
          alt={`Imagen de ${pokemon.name}`}
          className="w-full h-32 object-contain"
        />

        {/* NOMBRE */}
        <h3 className="text-center capitalize font-bold mt-2">
          {pokemon.name}
        </h3>

        {/* TIPOS */}
        <ul className="flex justify-center gap-2 mt-3 flex-wrap">

          {pokemon.types.map((t) => (
            <li
              key={t}
              className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-full ${typeColors[t]}`}
            >
              {/* ICONO */}
              <img
                src={typeIcons[t]}
                alt={t}
                className="w-4 h-4"
              />

              {/* TEXTO SOLO EN DESKTOP */}
              <span className="hidden sm:inline text-xs font-semibold">
                {typeNames[t]}
              </span>
            </li>
          ))}

        </ul>

        {/* BOTÓN */}
        <button
          onClick={handleFavoriteClick}
          className={`mt-3 w-full py-2 rounded-lg transition text-sm font-semibold ${
            isFavorite
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          {isFavorite ? "❤️ Guardado" : "🤍 Guardar"}
        </button>

      </article>
    </Link>
  );
}