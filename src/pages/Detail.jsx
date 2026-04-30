import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { typeIcons, typeColors, typeNames } from "../utils/typeData";
import toast from "react-hot-toast";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const [pokemon, setPokemon] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [evolution, setEvolution] = useState([]);
  const [generation, setGeneration] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);

      //  tipos
      const typeRes = await fetch(data.types[0].type.url);
      const typeData = await typeRes.json();

      setWeaknesses(typeData.damage_relations.double_damage_from);
      setStrengths(typeData.damage_relations.double_damage_to);

      //  species
      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();

      setGeneration(speciesData.generation.name);

      const evoRes = await fetch(speciesData.evolution_chain.url);
      const evoData = await evoRes.json();

      const evoNames = [];
      let evoChain = evoData.chain;

      do {
        evoNames.push(evoChain.species.name);
        evoChain = evoChain.evolves_to[0];
      } while (evoChain);

      setEvolution(evoNames);
    };

    fetchData();
  }, [id]);

  const isFavorite = pokemon
    ? favorites.some((f) => f.id === pokemon.id)
    : false;

  const toggleFavorite = () => {
    if (!pokemon) return;

    if (isFavorite) {
      removeFavorite(pokemon.id);
      toast.error("Eliminado de favoritos");
    } else {
      addFavorite({
        id: pokemon.id,
        name: pokemon.name,
        image:
          pokemon.sprites.other["official-artwork"].front_default,
        types: pokemon.types.map((t) => t.type.name),
      });
      toast.success("Añadido a favoritos ❤️");
    }
  };

  if (!pokemon)
    return (
      <main className="text-white p-6 text-center">
        <p className="animate-pulse">Cargando Pokémon...</p>
      </main>
    );

  return (
    <main className="p-6 max-w-4xl mx-auto text-white">

      
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-300 hover:text-white transition"
      >
        ← Volver
      </button>

      {/* CARD */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700">

        <header>
          <h1 className="text-3xl text-center capitalize font-bold mb-4">
            {pokemon.name}
          </h1>
        </header>

        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="mx-auto w-60 hover:scale-105 transition"
        />

        {/* FAVORITO */}
        <div className="flex justify-center">
          <button
            onClick={toggleFavorite}
            className={`mt-4 px-4 py-2 rounded transition ${
              isFavorite
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {isFavorite ? "❤️ Guardado" : "🤍 Guardar"}
          </button>
        </div>

        {/* TIPOS */}
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                typeColors[t.type.name]
              }`}
            >
              <img
                src={typeIcons[t.type.name]}
                alt={t.type.name}
                className="w-5 h-5"
              />
              {typeNames[t.type.name]}
            </span>
          ))}
        </div>

        {/* STATS */}
        <section className="mt-6">
          <h2 className="font-bold mb-2">Stats</h2>

          {pokemon.stats.map((s) => (
            <div key={s.stat.name} className="mb-2">
              <p className="text-sm capitalize">
                {s.stat.name}: {s.base_stat}
              </p>

              <div className="bg-gray-700 h-2 rounded">
                <div
                  className="bg-green-400 h-2 rounded transition-all duration-500"
                  style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </section>

        {/* ⚔️ FUERTE */}
        <section className="mt-6">
          <h2 className="font-bold mb-2">Fuerte contra</h2>

          <div className="flex gap-2 flex-wrap">
            {strengths.map((t) => (
              <span
                key={t.name}
                className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                  typeColors[t.name] || "bg-green-600"
                }`}
              >
                <img src={typeIcons[t.name]} className="w-4 h-4" />
                {typeNames[t.name]}
              </span>
            ))}
          </div>
        </section>

        {/* DÉBIL */}
        <section className="mt-6">
          <h2 className="font-bold mb-2">Débil contra</h2>

          <div className="flex gap-2 flex-wrap">
            {weaknesses.map((t) => (
              <span
                key={t.name}
                className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                  typeColors[t.name] || "bg-red-600"
                }`}
              >
                <img src={typeIcons[t.name]} className="w-4 h-4" />
                {typeNames[t.name]}
              </span>
            ))}
          </div>
        </section>

        {/* ⚡ HABILIDADES */}
        <section className="mt-6">
          <h2 className="font-bold mb-2">Habilidades</h2>

          <div className="flex gap-2 flex-wrap">
            {pokemon.abilities.map((a) => (
              <span
                key={a.ability.name}
                className="bg-gray-700 px-3 py-1 rounded"
              >
                {a.ability.name}
              </span>
            ))}
          </div>
        </section>

        {/* 🔄 EVOLUCIONES */}
        <section className="mt-6">
          <h2 className="font-bold mb-2">Evoluciones</h2>

          <div className="flex gap-2 flex-wrap">
            {evolution.map((e) => (
              <span key={e} className="bg-gray-700 px-3 py-1 rounded">
                {e}
              </span>
            ))}
          </div>
        </section>

        {/* GENERACIÓN */}
        <section className="mt-6">
          <h2 className="font-bold mb-2">Generación</h2>

          <p className="bg-gray-700 inline-block px-3 py-1 rounded">
            {generation}
          </p>
        </section>

      </section>
    </main>
  );
}