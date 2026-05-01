import { typeIcons, typeColors, typeNames } from "../utils/typeData";

export default function TypeBadges({ types }) {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {types.map((t) => (
        <span
          key={t}
          className={`flex items-center gap-1 px-3 py-1 rounded-full ${typeColors[t]}`}
        >
          <img src={typeIcons[t]} className="w-4 h-4" />
          {typeNames[t]}
        </span>
      ))}
    </div>
  );
}