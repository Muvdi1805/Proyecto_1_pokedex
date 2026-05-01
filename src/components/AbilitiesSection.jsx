export default function AbilitiesSection({ abilities }) {
  return (
    <section className="mt-6">
      <h2 className="font-bold mb-2">Habilidades</h2>

      <div className="flex gap-2 flex-wrap">
        {abilities.map((a) => (
          <span key={a.ability.name} className="bg-gray-700 px-3 py-1 rounded">
            {a.ability.name}
          </span>
        ))}
      </div>
    </section>
  );
}