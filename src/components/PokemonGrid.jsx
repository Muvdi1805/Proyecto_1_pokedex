import Card from "./Card";

export default function PokemonGrid({ data }) {
  return (
    <section>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.map((p) => (
          <Card key={p.id} pokemon={p} />
        ))}
      </div>
    </section>
  );
}