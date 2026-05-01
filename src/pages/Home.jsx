import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="text-white">

      {/* HERO */}
      <header className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-6">

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Descubre el Mundo Pokémon
        </h1>

        <p className="text-gray-300 max-w-xl mb-6">
          Explora, analiza y guarda tus Pokémon favoritos con datos reales.
        </p>

        {/* CTA PRINCIPAL */}
        <Link
          to="/explore"
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg text-lg font-bold transition"
        >
          Explorar ahora
        </Link>

        <p className="text-xs text-gray-500 mt-2">
          (Recomendado por entrenadores expertos 😉)
        </p>

      </header>

      {/* FEATURES */}
      <section className="py-16 px-6 max-w-5xl mx-auto">

        <h2 className="text-2xl font-bold text-center mb-10">
          ¿Qué puedes hacer?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <article className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="font-bold mb-2">Explorar</h3>
            <p className="text-gray-400">
              Navega entre cientos de Pokémon con información detallada.
            </p>
          </article>

          <article className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="font-bold mb-2">Filtrar</h3>
            <p className="text-gray-400">
              Encuentra Pokémon por tipo, generación o estrategia.
            </p>
          </article>

          <article className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="font-bold mb-2">Guardar</h3>
            <p className="text-gray-400">
              Crea tu lista de favoritos fácilmente.
            </p>
          </article>

        </div>
      </section>

      <section className="py-12 text-center bg-gray-900">

        <h2 className="text-xl font-bold mb-4">
          ⚡ No te quedes atrás
        </h2>

        <p className="text-gray-400 mb-6">
          Más de 500 Pokémon ya están siendo explorados por otros usuarios.
        </p>

        {/* Se genera sensación de urgencia y miedo a quedarse fuera (Fear Of Missing Out) */}
        <Link
          to="/explore"
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300"
        >
          Empezar ahora
        </Link>

      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © 2026 Pokédex App
      </footer>

    </main>
  );
}