import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { typeIcons, typeColors, typeNames } from "../utils/typeData";

export default function Card({ pokemon }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((f) => f.id === pokemon.id);

  // evitar que el botón dispare el Link
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
    <Link to={`/pokemon/${pokemon.id}`}>

      <article className="bg-gray-800 p-4 rounded-xl shadow hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer">

        <img
          src={pokemon.image}
          alt={`Imagen de ${pokemon.name}`}
          className="w-full h-32 object-contain"
        />

        <h3 className="text-center capitalize font-bold mt-2">
          {pokemon.name}
        </h3>

        <ul className="flex justify-center gap-2 mt-2 flex-wrap">
          {pokemon.types.map((t) => (
            <li
              key={t}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${typeColors[t]}`}
            >
              <img
                src={typeIcons[t]}
                alt={t}
                className="w-4 h-4"
              />
              {typeNames[t]}
            </li>
          ))}
        </ul>

        {/* FAVORITO */}
        <button
          onClick={handleFavoriteClick}
          className={`mt-3 w-full py-2 rounded transition ${
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