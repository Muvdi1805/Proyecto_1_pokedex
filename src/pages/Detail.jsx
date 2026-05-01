import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import toast from "react-hot-toast";

// COMPONENTES
import StatsSection from "../components/StatsSection";
import TypeBadges from "../components/TypeBadges";
import EvolutionSection from "../components/EvolutionSection";
import AbilitiesSection from "../components/AbilitiesSection";

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
    // SCROLL ARRIBA
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const fetchData = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);

        // TIPOS
        const typeRes = await fetch(data.types[0].type.url);
        const typeData = await typeRes.json();

        setWeaknesses(typeData.damage_relations.double_damage_from);
        setStrengths(typeData.damage_relations.double_damage_to);

        // SPECIES
        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();

        setGeneration(speciesData.generation.name);

        // EVOLUCIONES
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        const evoList = [];
        let evoChain = evoData.chain;

        do {
          evoList.push({
            name: evoChain.species.name,
            url: evoChain.species.url,
          });

          evoChain = evoChain.evolves_to[0];
        } while (evoChain);

        setEvolution(evoList);

      } catch (err) {
        console.error("Error cargando Pokémon:", err);
        toast.error("Error cargando Pokémon ❌");
      }
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
      toast("❌ Eliminado de favoritos");
    } else {
      addFavorite({
        id: pokemon.id,
        name: pokemon.name,
        image:
          pokemon.sprites.other["official-artwork"].front_default,
        types: pokemon.types.map((t) => t.type.name),
      });
      toast.success("❤️ Añadido a favoritos");
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

      {/* VOLVER */}
      <button
        onClick={() => navigate("/explore")}
        className="mb-6 flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
      >
        ← Volver
      </button>

      {/* CARD */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700">

        {/* NOMBRE */}
        <header>
          <h1 className="text-3xl text-center capitalize font-bold mb-4">
            {pokemon.name}
          </h1>
        </header>

        {/* IMAGEN */}
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
        <div className="mt-4">
          <TypeBadges
            types={pokemon.types.map((t) => t.type.name)}
          />
        </div>

        {/* STATS */}
        <StatsSection
          stats={pokemon.stats}
          strengths={strengths}
          weaknesses={weaknesses}
        />

        {/* HABILIDADES */}
        <AbilitiesSection abilities={pokemon.abilities} />

        {/* EVOLUCIONES */}
        <EvolutionSection
          evolution={evolution}
          currentId={id}
          onSelect={(name) => {
            toast(`🔄 Viendo evolución: ${name}`);
            navigate(`/pokemon/${name}`);
          }}
        />

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