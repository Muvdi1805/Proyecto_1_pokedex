import { useFavorites } from "../context/FavoritesContext";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { typeIcons, typeColors, typeNames } from "../utils/typeData";
import toast from "react-hot-toast";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const dialogRef = useRef();
  const selected = useRef(null);

  const openModal = (id) => {
    selected.current = id;
    dialogRef.current.showModal();
  };

  const handleDeleteClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(id);
  };

  if (!favorites.length) {
    return (
      <section className="p-6 text-center text-white">
        <h1 className="text-2xl font-bold mb-2">
          ⭐ Mi colección Pokémon
        </h1>
        <p className="text-gray-400">
          No tienes favoritos guardados 😢
        </p>
      </section>
    );
  }

  return (
    <section className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-6 text-center">
        ⭐ Mi colección Pokémon
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {favorites.map((f) => (
          <Link key={f.id} to={`/pokemon/${f.id}`}>

            <article className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:scale-105 transition text-center">

              <img
                src={f.image}
                alt={f.name}
                className="w-full h-28 object-contain"
              />

              <h2 className="capitalize font-bold mt-2">
                {f.name}
              </h2>

              <ul className="flex justify-center gap-2 mt-2 flex-wrap">
                {f.types.map((t) => (
                  <li
                    key={t}
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${typeColors[t]}`}
                  >
                    <img src={typeIcons[t]} className="w-4 h-4" />
                    {typeNames[t]}
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => handleDeleteClick(e, f.id)}
                className="mt-3 text-red-400 hover:text-red-300"
              >
                Eliminar
              </button>

            </article>
          </Link>
        ))}
      </div>

      <dialog ref={dialogRef} className="p-6 rounded-lg bg-gray-900 text-white">

        <h2 className="text-xl font-bold text-red-500 mb-2">
          ¿Eliminar definitivamente?
        </h2>

        <div className="flex justify-end gap-3 mt-4">

          <button
            onClick={() => dialogRef.current.close()}
            className="text-gray-400"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              removeFavorite(selected.current);
              toast("❌ Eliminado de favoritos");
              dialogRef.current.close();
            }}
            className="bg-red-600 px-4 py-2 rounded"
          >
            ELIMINAR
          </button>

        </div>

      </dialog>

    </section>
  );
}