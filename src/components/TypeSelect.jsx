import { useState, useRef, useEffect } from "react";
import { typeNames, typeIcons } from "../utils/typeData";

export default function TypeSelect({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();


  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>

      {/* BOTÓN */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-2 bg-gray-800 rounded-xl flex justify-between items-center hover:bg-gray-700 transition shadow-inner text-sm"
      >
        {value ? (
          <span className="flex items-center gap-2">
            <img src={typeIcons[value]} className="w-4 h-4" />
            {typeNames[value]}
          </span>
        ) : (
          <span className="text-gray-400">{label}</span>
        )}

        {/* Flecha */}
        <span className={`transition ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 max-h-60 overflow-y-auto custom-scroll">

          
          <div
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="px-3 py-2 text-gray-400 cursor-pointer hover:bg-gray-800 transition border-b border-gray-700"
          >
            Todos
          </div>

          {/* LISTA */}
          {Object.keys(typeNames).map((t) => (
            <div
              key={t}
              onClick={() => {
                onChange(t);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-800 transition"
            >
              <img src={typeIcons[t]} className="w-4 h-4" />
              {typeNames[t]}
            </div>
          ))}

        </div>
      )}
    </div>
  );
}