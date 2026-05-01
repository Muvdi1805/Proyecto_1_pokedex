import { useState, useRef } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const dialogRef = useRef();

  const valid =
    form.name.length > 2 &&
    form.email.includes("@") &&
    form.message.length > 5;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">

      <section className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6">

        {/* HEADER */}
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-400">
            Contacto ⚡
          </h1>
          <p className="text-gray-400 mt-2">
            Envíanos un mensaje
          </p>
        </header>

        {/* FORM */}
        <form className="flex flex-col gap-4">

          <input
            placeholder="Nombre"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-400"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-400"
          />

          <textarea
            placeholder="Mensaje"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-400"
          />

          {/* INDICADOR */}
          {!valid && (
            <p className="text-xs text-red-400">
              Completa todos los campos correctamente
            </p>
          )}

          {/* BOTÓN */}
          <button
            type="button"
            disabled={!valid}
            onClick={() => dialogRef.current.showModal()}
            className={`py-3 rounded-lg font-bold transition ${
              valid
                ? "bg-yellow-400 text-black hover:scale-105"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Enviar
          </button>
        </form>
      </section>

      {/* MODAL */}
      <dialog
        ref={dialogRef}
        className="rounded-xl p-6 bg-gray-900 text-white border border-gray-700 shadow-xl"
      >
        <h2 className="text-lg font-bold mb-2">
          ¿Seguro que no quieres enviar el mensaje?
        </h2>

        <p className="text-sm text-gray-400 mb-4">
          Podrías perder una respuesta importante ⚠️
        </p>
        
        <div className="flex justify-end gap-3">

          <button
            onClick={() => dialogRef.current.close()}
            className="text-gray-400 text-sm"
          >
            No, prefiero no recibir ayuda
          </button>

          <button
            onClick={() => dialogRef.current.close()}
            className="bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:scale-105"
          >
            Sí, enviar
          </button>

        </div>
      </dialog>

    </main>
  );
}