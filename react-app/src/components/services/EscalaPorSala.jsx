import { Calendar, Clock, Users, RefreshCw } from "lucide-react";
import { escalasTrabalho } from "../../data/escalasTrabalho";

export default function EscalaPorSala({
  titulo = "Profissionais Escalados",
  escalaKey,
}) {
  const escala = escalasTrabalho[escalaKey];

  if (!escala || !escala.exibirNoPublico) {
    return null;
  }

  if (!escala.profissionais || escala.profissionais.length === 0) {
    return (
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <Users className="w-12 h-12 text-neutral-300" />
          <p className="text-neutral-600 text-sm">
            Nenhum profissional escalado no momento
          </p>
          <p className="text-neutral-500 text-xs">
            As escalas serão atualizadas em breve
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5">
      <h3 className="font-semibold text-neutral-800 mb-4 pb-3 border-b border-neutral-300 text-sm flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-600" />
        {titulo}
      </h3>

      {(escala.horarios?.manha?.ativo || escala.horarios?.tarde?.ativo) && (
        <div className="mb-5 bg-gradient-to-r from-blue-50 to-teal-50 border-l-4 border-blue-600 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-neutral-800 text-sm">
              Horário de Funcionamento
            </h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {escala.horarios?.manha?.ativo && (
              <div className="bg-white border border-blue-200 rounded-lg px-4 py-2 flex-1 min-w-[140px]">
                <div className="text-xs text-blue-700 font-medium mb-1">
                  Manhã
                </div>
                <div className="text-base font-bold text-neutral-900">
                  {escala.horarios.manha.display}
                </div>
              </div>
            )}
            {escala.horarios?.tarde?.ativo && (
              <div className="bg-white border border-amber-200 rounded-lg px-4 py-2 flex-1 min-w-[140px]">
                <div className="text-xs text-amber-700 font-medium mb-1">
                  Tarde
                </div>
                <div className="text-base font-bold text-neutral-900">
                  {escala.horarios.tarde.display}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="hidden md:block">
        <table className="w-full border-collapse border border-neutral-300">
          <thead>
            <tr className="bg-neutral-100">
              <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                Profissional
              </th>
              <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                Cargo
              </th>
              <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                Horário
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {escala.profissionais.map((prof, idx) => (
              <tr key={idx} className="bg-white">
                <td className="border border-neutral-300 px-4 py-3">
                  <strong className="text-neutral-800">{prof.nome}</strong>
                </td>
                <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                  {prof.funcao}
                </td>
                <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                  <div className="space-y-1">
                    {escala.horarios?.manha?.ativo &&
                      (prof.turno === "manha" || prof.turno === "both") && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs">
                            Manhã: {escala.horarios.manha.display}
                          </span>
                        </div>
                      )}
                    {escala.horarios?.tarde?.ativo &&
                      (prof.turno === "tarde" || prof.turno === "both") && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span className="text-xs">
                            Tarde: {escala.horarios.tarde.display}
                          </span>
                        </div>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {escala.profissionais.map((prof, idx) => (
          <div
            key={idx}
            className="bg-white border border-neutral-200 rounded-lg p-4"
          >
            <div className="mb-3 pb-3 border-b border-neutral-200">
              <div className="font-semibold text-neutral-800 mb-1">
                {prof.nome}
              </div>
              <div className="text-xs text-neutral-600">{prof.funcao}</div>
            </div>

            <div>
              <p className="text-xs text-neutral-500 mb-1 font-medium">
                Horários:
              </p>
              <div className="space-y-1">
                {escala.horarios?.manha?.ativo &&
                  (prof.turno === "manha" || prof.turno === "both") && (
                    <div className="flex items-center gap-2 text-xs text-neutral-700">
                      <Clock className="w-3 h-3 text-blue-600" />
                      Manhã: {escala.horarios.manha.display}
                    </div>
                  )}
                {escala.horarios?.tarde?.ativo &&
                  (prof.turno === "tarde" || prof.turno === "both") && (
                    <div className="flex items-center gap-2 text-xs text-neutral-700">
                      <Clock className="w-3 h-3 text-amber-600" />
                      Tarde: {escala.horarios.tarde.display}
                    </div>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {escala.observacoes && escala.observacoes.length > 0 && (
        <div className="mt-4 pt-4 border-t border-neutral-300">
          <div className="text-xs text-neutral-600 space-y-1">
            {escala.observacoes.map((obs, idx) => (
              <p key={idx} className="italic">
                • {obs}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-neutral-300">
        <p className="text-xs text-neutral-500 italic text-center">
          Escalas atualizadas automaticamente • Última atualização:{" "}
          {new Date().toLocaleDateString("pt-BR")}
        </p>
      </div>
    </div>
  );
}
