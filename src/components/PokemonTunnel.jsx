import { useEffect, useState } from "react";

export default function PokemonTunnel() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const json = await res.json();

      const detailed = await Promise.all(
        json.results.map(async (p) => {
          const r = await fetch(p.url);
          const d = await r.json();

          return {
            id: d.id,
            name: d.name,
            image:
              d.sprites.other["official-artwork"].front_default,
          };
        })
      );

      setPokemons([...detailed, ...detailed]);
    };

    fetchData();
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-10">

      {/* FONDO */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90" />

      {/* FADE LADOS */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10" />

      {/* CONTENIDO */}
      <div className="relative flex items-center justify-center animate-tunnel gap-6">

        {pokemons.map((p, i) => (
          <img
            key={i}
            src={p.image}
            alt={p.name}
            className="
              w-20 h-20 md:w-24 md:h-24 
              object-contain 
              animate-float
              opacity-80
              hover:opacity-100
              hover:scale-110
              transition
            "
          />
        ))}

      </div>

    </div>
  );
}