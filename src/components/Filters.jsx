import TypeSelect from "../components/TypeSelect";
import GenerationSelect from "../components/GenerationSelect";

const baseStyle =
  "w-full p-2 bg-gray-800 rounded-xl hover:bg-gray-700 transition shadow-inner text-sm";

export default function Filters({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  genFilter,
  setGenFilter,
  strongAgainst,
  setStrongAgainst,
  weakAgainst,
  setWeakAgainst,
}) {
  return (
    <section className="mb-6">

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        {/* BUSCAR */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar Pokémon..."
          className={`${baseStyle} col-span-2 md:col-span-1`}
        />

        {/* TIPO */}
        <TypeSelect
          value={typeFilter}
          onChange={setTypeFilter}
          label="Tipo"
        />

        {/* GENERACIÓN */}
        <GenerationSelect
          value={genFilter}
          onChange={setGenFilter}
          label="Generación"
        />

        {/* FUERTE */}
        <TypeSelect
          value={strongAgainst}
          onChange={setStrongAgainst}
          label="Fuerte contra"
        />

        {/* DÉBIL */}
        <TypeSelect
          value={weakAgainst}
          onChange={setWeakAgainst}
          label="Débil contra"
        />

      </div>
    </section>
  );
}