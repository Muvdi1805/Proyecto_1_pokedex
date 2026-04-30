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
    <div className="p-4 text-white">
      <input
        placeholder="Nombre"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <textarea
        placeholder="Mensaje"
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button
        disabled={!valid}
        onClick={() => dialogRef.current.showModal()}
        className="bg-blue-500 px-4 py-2 mt-2"
      >
        Enviar
      </button>

      <dialog ref={dialogRef} className="p-6 rounded">
        <p>¿Seguro que no quieres enviar el mensaje?</p>

        {/* ⚠️ DARK PATTERN (confirmshaming) */}

        <button className="text-gray-500">
          No, prefiero no recibir ayuda
        </button>

        <button className="bg-blue-500 text-white px-4 py-2 mt-2">
          Sí, enviar
        </button>
      </dialog>
    </div>
  );
}