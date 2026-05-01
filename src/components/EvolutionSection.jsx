import { useNavigate } from "react-router-dom";

export default function EvolutionSection({ evolution, currentId, onSelect }) {
  const navigate = useNavigate();

  const getId = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  return (
    <section className="mt-6">
      <h2 className="font-bold mb-3">Evoluciones</h2>

      <div className="flex gap-4 flex-wrap">

        {evolution.map((e) => {
          const evoId = getId(e.url);
          const isCurrent = Number(evoId) === Number(currentId);

          return (
            <div
              key={e.name}
              onClick={() => {
                // TOAST + NAVEGACIÓN
                if (onSelect) {
                  onSelect(e.name);
                } else {
                  navigate(`/pokemon/${evoId}`);
                }
              }}
              className={`cursor-pointer p-3 rounded-xl text-center transition shadow-lg
              
              ${
                isCurrent
                  ? "bg-yellow-400 text-black scale-105 border-4 border-yellow-300"
                  : "bg-gray-800 hover:bg-gray-700 hover:scale-105"
              }
              `}
            >

              {/* IMAGEN */}
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evoId}.png`}
                alt={e.name}
                className="w-20 h-20 mx-auto"
              />

              {/* NOMBRE */}
              <p className="capitalize mt-2 text-sm font-semibold">
                {e.name}
              </p>

            </div>
          );
        })}

      </div>
    </section>
  );
}