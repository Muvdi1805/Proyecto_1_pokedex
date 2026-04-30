import { useEffect, useState } from "react";
import Card from "../components/Card";
import { typeColors, typeNames } from "../utils/typeData";

export default function Explore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // filtros
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [genFilter, setGenFilter] = useState("");
  const [strongAgainst, setStrongAgainst] = useState("");
  const [weakAgainst, setWeakAgainst] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=500"
        ); // ⚠️ bajamos a 300 (mejor rendimiento)
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = data.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (!typeFilter || p.types.includes(typeFilter)) &&
      (!genFilter || p.generation === genFilter) &&
      (!strongAgainst || p.strongAgainst.includes(strongAgainst)) &&
      (!weakAgainst || p.weakAgainst.includes(weakAgainst))
    );
  });

  if (loading)
    return (
      <main className="p-6 text-white text-center">
        <p className="animate-pulse">Cargando Pokémon...</p>
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
      <section className="mb-6">

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 bg-gray-800 rounded col-span-2 md:col-span-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* TIPO */}
          <select
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 bg-gray-800 rounded"
          >
            <option value="">Tipo</option>
            {Object.keys(typeColors).map((t) => (
              <option key={t} value={t}>
                {typeNames[t]}
              </option>
            ))}
          </select>

          {/* GENERACIÓN */}
          <select
            onChange={(e) => setGenFilter(e.target.value)}
            className="p-2 bg-gray-800 rounded"
          >
            <option value="">Generación</option>
            <option value="generation-i">Gen I</option>
            <option value="generation-ii">Gen II</option>
            <option value="generation-iii">Gen III</option>
            <option value="generation-iv">Gen IV</option>
            <option value="generation-v">Gen V</option>
            <option value="generation-vi">Gen VI</option>
            <option value="generation-vii">Gen VII</option>
            <option value="generation-viii">Gen VIII</option>
            <option value="generation-ix">Gen IX</option>
          </select>

          {/* FUERTE */}
          <select
            onChange={(e) => setStrongAgainst(e.target.value)}
            className="p-2 bg-gray-800 rounded"
          >
            <option value="">Fuerte contra</option>
            {Object.keys(typeColors).map((t) => (
              <option key={t} value={t}>
                {typeNames[t]}
              </option>
            ))}
          </select>

          {/* DÉBIL */}
          <select
            onChange={(e) => setWeakAgainst(e.target.value)}
            className="p-2 bg-gray-800 rounded"
          >
            <option value="">Débil contra</option>
            {Object.keys(typeColors).map((t) => (
              <option key={t} value={t}>
                {typeNames[t]}
              </option>
            ))}
          </select>

        </div>
      </section>

      {/* RESULTADOS */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filtered.map((p) => (
            <Card key={p.id} pokemon={p} />
          ))}
        </div>
      </section>

    </main>
  );
}