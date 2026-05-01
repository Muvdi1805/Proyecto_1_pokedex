import { useEffect, useState } from "react";

export default function AdBlockModal() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // 🔥 BLOQUEA EL SCROLL DEL BODY
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center">

      {/* CONTENIDO */}
      <div className="bg-gray-900 text-white p-6 rounded-2xl max-w-md w-full text-center shadow-2xl border border-gray-700">

        <h2 className="text-2xl font-bold text-red-500 mb-2">
          ⚠️ AdBlock detectado
        </h2>

        <p className="text-gray-400 mb-4">
          Para continuar usando la app, desactiva tu bloqueador de anuncios.
        </p>

                    {/*
                ⚠️ DARK PATTERN: Confirmshaming + Visual Hierarchy

                Este modal simula la detección de AdBlock (aunque no se verifica realmente),
                con el objetivo de influenciar la decisión del usuario.

                Se aplican las siguientes técnicas:

                1. Confirmshaming:
                - El botón negativo usa un texto que hace sentir culpa al usuario:
                    "No, prefiero una experiencia limitada"
                - Esto busca que el usuario evite elegir esa opción.

                2. Jerarquía visual (Visual Hierarchy):
                - El botón principal ("Desactivar AdBlock") es más grande,
                    llamativo (color amarillo) y fácil de identificar.
                - El botón secundario es pequeño, gris y menos visible.

                3. Interrupción del flujo:
                - El modal aparece automáticamente al entrar,
                    obligando al usuario a tomar una decisión antes de continuar.

                4. Objetivo:
                Aumentar la probabilidad de que el usuario elija la opción deseada
                mediante manipulación visual y psicológica.
            */}
            
        <div className="flex flex-col gap-3">

          <button
            onClick={() => setOpen(false)}
            className="bg-yellow-400 text-black font-bold py-3 rounded-lg hover:scale-105 transition text-lg"
          >
            ✅ Desactivar AdBlock
          </button>

          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 text-xs hover:text-gray-400"
          >
            No, prefiero una experiencia limitada
          </button>

        </div>

      </div>
    </div>
  );
}


 