import TypeSelect from "../components/TypeSelect";

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
        <select
          value={genFilter}
          onChange={(e) => setGenFilter(e.target.value)}
          className={baseStyle}
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