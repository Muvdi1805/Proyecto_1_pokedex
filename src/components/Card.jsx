import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { typeIcons, typeColors, typeNames } from "../utils/typeData";
import toast from "react-hot-toast";

export default function Card({ pokemon }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((f) => f.id === pokemon.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFavorite(pokemon.id);
      toast("❌ Eliminado de favoritos");
    } else {
      addFavorite(pokemon);
      toast.success("❤️ Añadido a favoritos");
    }
  };

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="h-full">

      <article className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer flex flex-col justify-between h-full">

        <img
          loading="lazy"
          src={pokemon.image}
          alt={`Imagen de ${pokemon.name}`}
          className="w-full h-32 object-contain"
        />

        <h3 className="text-center capitalize font-bold mt-2">
          {pokemon.name}
        </h3>

        <ul className="flex justify-center gap-2 mt-3 flex-wrap">
          {pokemon.types.map((t) => (
            <li
              key={t}
              className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-full ${typeColors[t]}`}
            >
              <img src={typeIcons[t]} className="w-4 h-4" />

              <span className="hidden sm:inline text-xs font-semibold">
                {typeNames[t]}
              </span>
            </li>
          ))}
        </ul>

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