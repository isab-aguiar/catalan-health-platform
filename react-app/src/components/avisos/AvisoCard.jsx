import { Calendar } from "lucide-react";
const categoriaConfig = {
  vacina: {
    bg: "bg-neutral-50",
    border: "border-neutral-300",
    text: "text-neutral-800",
    iconBg: "bg-neutral-200",
    iconColor: "text-neutral-700",
    label: "Vacina",
  },
  material: {
    bg: "bg-neutral-50",
    border: "border-neutral-300",
    text: "text-neutral-800",
    iconBg: "bg-neutral-200",
    iconColor: "text-neutral-700",
    label: "Material",
  },
  campanha: {
    bg: "bg-neutral-50",
    border: "border-neutral-300",
    text: "text-neutral-800",
    iconBg: "bg-neutral-200",
    iconColor: "text-neutral-700",
    label: "Campanha",
  },
};
function formatarData(timestamp) {
  if (!timestamp) return "";
  // Se for Timestamp do Firestore, converter para Date
  let date;
  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    date = new Date(timestamp);
  }
  const dia = date.getDate().toString().padStart(2, "0");
  const mes = (date.getMonth() + 1).toString().padStart(2, "0");
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
export default function AvisoCard({ aviso }) {
  if (!aviso) return null;
  const categoria = aviso.categoria || "campanha";
  const config = categoriaConfig[categoria] || categoriaConfig.campanha;
  return (
    <div
      className={`
        ${config.bg} ${config.border} ${config.text}
        border rounded-md p-4 shadow-sm
        hover:shadow transition-shadow
      `}
    >
      {}
      <div className="flex items-start justify-between mb-3">
        <span
          className={`
            ${config.iconBg} ${config.iconColor}
            px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide
          `}
        >
          {config.label}
        </span>
        {aviso.data && (
          <div className="flex items-center gap-1.5 text-xs opacity-75">
            <Calendar size={12} />
            <span>{formatarData(aviso.data)}</span>
          </div>
        )}
      </div>
      {}
      <h3 className="text-base font-semibold mb-2 line-clamp-2">
        {aviso.titulo}
      </h3>
      {}
      <p className="text-sm leading-relaxed line-clamp-3 opacity-90">
        {aviso.descricao}
      </p>
    </div>
  );
}
