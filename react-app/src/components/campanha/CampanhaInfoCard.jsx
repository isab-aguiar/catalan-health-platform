export default function CampanhaInfoCard({ campanha }) {
  return (
    <div className="border rounded-md shadow-sm p-6 mb-6 bg-blue-50 border-blue-300">
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800">
          {campanha.titulo}
        </h2>
        {campanha.urgente && (
          <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-700 rounded">
            Urgente
          </span>
        )}
      </div>
      {campanha.subtitulo && (
        <p className="text-sm font-medium text-slate-700 mb-3 italic">
          {campanha.subtitulo}
        </p>
      )}
      <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed mb-4">
        {campanha.descricao}
      </div>
      {}
      <div className="space-y-2 text-xs text-slate-600 border-t border-slate-300 pt-3">
        {campanha.local && (
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>{campanha.local}</span>
          </div>
        )}
        {campanha.horario && (
          <div className="flex items-center gap-2">
            <span>🕐</span>
            <span>{campanha.horario}</span>
          </div>
        )}
        {campanha.publicoAlvo && (
          <div className="flex items-center gap-2">
            <span>👥</span>
            <span>{campanha.publicoAlvo}</span>
          </div>
        )}
        {campanha.contato && (
          <div className="flex items-center gap-2">
            <span>📞</span>
            <span>{campanha.contato}</span>
          </div>
        )}
        {(campanha.dataInicio || campanha.dataFim) && (
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>
              {campanha.dataInicio &&
                new Date(campanha.dataInicio).toLocaleDateString("pt-BR")}
              {campanha.dataFim &&
                ` até ${new Date(campanha.dataFim).toLocaleDateString("pt-BR")}`}
            </span>
          </div>
        )}
      </div>
      {campanha.topicos && campanha.topicos.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-300">
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
            {campanha.topicos.map((topico, idx) => (
              <li key={idx}>{topico}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
