import { useFavorites } from "../context/FavoritesContext";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { typeIcons, typeColors, typeNames } from "../utils/typeData";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const dialogRef = useRef();
  const selected = useRef(null);

  const openModal = (id) => {
    selected.current = id;
    dialogRef.current.showModal();
  };

  //  Evita que al hacer click en eliminar se abra el Link
  const handleDeleteClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(id);
  };

  if (!favorites.length) {
    return (
      <section className="p-6 text-center text-white">
        <header>
          <h1 className="text-2xl font-bold mb-2">
            ⭐ Mi colección Pokémon
          </h1>
        </header>

        <p className="text-gray-400">
          No tienes favoritos guardados 😢
        </p>
      </section>
    );
  }

  return (
    <section className="p-6 text-white">

      <header>
        <h1 className="text-2xl font-bold mb-6 text-center">
          ⭐ Mi colección Pokémon
        </h1>
      </header>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {favorites.map((f) => (
          
          
          <Link key={f.id} to={`/pokemon/${f.id}`}>
            <article className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-2xl shadow-xl text-center hover:scale-105 transition cursor-pointer">

              <img
                src={f.image}
                alt={`Imagen de ${f.name}`}
                className="w-full h-28 object-contain"
              />

              <h2 className="capitalize font-bold mt-2 text-lg">
                {f.name}
              </h2>

              {/* TIPOS */}
              {f.types && (
                <ul className="flex justify-center gap-2 mt-2 flex-wrap">
                  {f.types.map((t) => (
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
              )}

              {/* BOTÓN ELIMINAR */}
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

      {/* MODAL */}
      <dialog
        ref={dialogRef}
        className="p-6 rounded-lg bg-gray-900 text-white"
      >
        <h2 className="text-xl font-bold text-red-500 mb-2">
          ¿Eliminar definitivamente?
        </h2>

        <p className="text-sm text-gray-400 mb-4">
          Esta acción no se puede deshacer. Perderás este Pokémon para siempre.
        </p>

        
        <div className="flex justify-end gap-3">
          <button
            onClick={() => dialogRef.current.close()}
            className="text-gray-400 text-sm"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              removeFavorite(selected.current);
              dialogRef.current.close();
            }}
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white font-bold"
          >
            ELIMINAR DEFINITIVAMENTE
          </button>
        </div>
      </dialog>

    </section>
  );
}