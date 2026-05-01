import { useEffect, useMemo, useState } from "react";
import { typeColors } from "../utils/typeData";
import toast from "react-hot-toast";

// COMPONENTES
import Filters from "../components/Filters";
import PokemonGrid from "../components/PokemonGrid";

export default function Explore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); 

  // filtros
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [genFilter, setGenFilter] = useState("");
  const [strongAgainst, setStrongAgainst] = useState("");
  const [weakAgainst, setWeakAgainst] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setError(false);

      try {
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=500"
        );
        const json = await res.json();

        const detailed = await Promise.all(
          json.results.map(async (p) => {
            const r = await fetch(p.url);
            const d = await r.json();

            const speciesRes = await fetch(d.species.url);
            const species = await speciesRes.json();

            const typeRes = await fetch(d.types[0].type.url);
            const typeData = await typeRes.json();

            return {
              id: d.id,
              name: d.name,
              image:
                d.sprites.other["official-artwork"].front_default,
              types: d.types.map((t) => t.type.name),
              generation: species.generation.name,
              strongAgainst:
                typeData.damage_relations.double_damage_to.map(
                  (t) => t.name
                ),
              weakAgainst:
                typeData.damage_relations.double_damage_from.map(
                  (t) => t.name
                ),
            };
          })
        );

        setData(detailed);
      } catch (err) {
        console.error(err);
        setError(true); // 🔥 ERROR
        toast.error("Error cargando Pokémon ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const filtered = useMemo(() => {
    return data.filter((p) => {
      return (
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (!typeFilter || p.types.includes(typeFilter)) &&
        (!genFilter || p.generation === genFilter) &&
        (!strongAgainst || p.strongAgainst.includes(strongAgainst)) &&
        (!weakAgainst || p.weakAgainst.includes(weakAgainst))
      );
    });
  }, [data, search, typeFilter, genFilter, strongAgainst, weakAgainst]);

  // LOADING
  if (loading)
    return (
      <main className="p-6 text-white text-center">
        <p className="animate-pulse">Cargando Pokémon...</p>
      </main>
    );

  //  ERROR VISUAL
  if (error)
    return (
      <main className="p-6 text-center text-red-400">
        Error cargando datos ❌
      </main>
    );

  return (
    <main className="p-6 text-white">

      {/* HEADER */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">
          Explorar Pokémon
        </h1>
      </header>

      {/* FILTROS */}
      <Filters
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        genFilter={genFilter}
        setGenFilter={setGenFilter}
        strongAgainst={strongAgainst}
        setStrongAgainst={setStrongAgainst}
        weakAgainst={weakAgainst}
        setWeakAgainst={setWeakAgainst}
        typeColors={typeColors}
      />

      {/* EMPTY STATE */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 mt-6">
          No se encontraron Pokémon "{search}" 🥲
        </p>
      ) : (
        <PokemonGrid data={filtered} />
      )}

    </main>
  );
}