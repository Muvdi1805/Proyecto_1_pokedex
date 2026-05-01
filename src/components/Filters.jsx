import { typeNames } from "../utils/typeData";

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
  typeColors,
}) {
  return (
    <section className="mb-6">

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        {/* BUSCAR */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar Pokémon..."
          className="p-2 bg-gray-800 rounded col-span-2 md:col-span-1"
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
  );
}