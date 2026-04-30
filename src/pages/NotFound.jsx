import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-black via-gray-900 to-black text-center px-6">

      {/* ERROR CODE */}
      <h1 className="text-7xl font-extrabold text-red-500 animate-pulse">
        404
      </h1>

      {/* MENSAJE */}
      <h2 className="text-2xl mt-4 font-bold">
        ¡Pokémon no encontrado!
      </h2>

      <p className="text-gray-400 mt-2 max-w-md">
        Parece que este Pokémon se escapó o nunca existió en esta región...
      </p>

      {/* IMAGEN */}
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
        alt="psyduck confused"
        className="w-40 mt-6 animate-bounce"
      />

      {/* DARK PATTERN */}
      <p className="text-yellow-400 text-sm mt-4">
        ⚠️ Si no regresas ahora, podrías perder Pokémon raros...
      </p>

      {/* BOTONES */}
      <div className="flex gap-4 mt-6">

        <button
          onClick={() => navigate("/")}
          className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-lg hover:scale-105 transition"
        >
          Ir al inicio
        </button>

        <button
          onClick={() => navigate("/explore")}
          className="bg-gray-700 px-6 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Explorar
        </button>

      </div>

    </main>
  );
}