import { typeIcons, typeColors, typeNames } from "../utils/typeData";

export default function StatsSection({ stats, strengths, weaknesses }) {
  return (
    <section className="mt-6">

      {/* STATS */}
      <div>
        <h2 className="font-bold mb-2">Stats</h2>

        {stats.map((s) => (
          <div key={s.stat.name} className="mb-2">
            <p className="text-sm capitalize">
              {s.stat.name}: {s.base_stat}
            </p>

            <div className="bg-gray-700 h-2 rounded">
              <div
                className="bg-green-400 h-2 rounded"
                style={{ width: `${Math.min(s.base_stat, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* FUERTE CONTRA */}
      <div className="mt-6">
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
      </div>

      {/* DÉBIL CONTRA */}
      <div className="mt-6">
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
      </div>

    </section>
  );
}