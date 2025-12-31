import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, AlertCircle } from 'lucide-react';
import { getEscalaAtiva } from '../../services/escalasService';

/**
 * Componente para exibir escalas semanais
 * Usado quando a escala varia por dia da semana (ex: Recepção)
 */
export default function EscalaSemanal({
  titulo = "Escala Semanal",
  escalaKey // chave da escala no Firestore
}) {
  const [escala, setEscala] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tipoEscala, setTipoEscala] = useState(null);

  useEffect(() => {
    loadEscala();
  }, [escalaKey]);

  const loadEscala = async () => {
    if (!escalaKey) {
      setError("Chave da escala não informada");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const result = await getEscalaAtiva(escalaKey);

    if (result.success) {
      setEscala(result.data);
      setTipoEscala(result.tipo);
    } else {
      setError(result.error || "Erro ao carregar escala");
    }

    setLoading(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-neutral-600 text-sm">Carregando escala...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <AlertCircle className="w-12 h-12 text-red-400" />
          <p className="text-red-700 text-sm font-semibold">Erro ao carregar escala</p>
          <p className="text-red-600 text-xs">{error}</p>
        </div>
      </div>
    );
  }

  // Se não encontrar a escala ou não for pública, não mostrar
  if (!escala || !escala.exibirNoPublico) {
    return null;
  }

  // Verificar se é escala semanal
  if (!escala.escalaSemanal || !escala.escalaSemanal.habilitado) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <AlertCircle className="w-12 h-12 text-amber-400" />
          <p className="text-amber-700 text-sm">
            Esta escala não está configurada como escala semanal
          </p>
        </div>
      </div>
    );
  }

  const diasSemana = [
    { key: 'segunda', label: 'Segunda-feira' },
    { key: 'terca', label: 'Terça-feira' },
    { key: 'quarta', label: 'Quarta-feira' },
    { key: 'quinta', label: 'Quinta-feira' },
    { key: 'sexta', label: 'Sexta-feira' }
  ];

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5">
      <h3 className="font-semibold text-neutral-800 mb-4 pb-3 border-b border-neutral-300 text-sm flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-600" />
        {titulo}
      </h3>

      {/* Indicador de tipo de escala */}
      {tipoEscala === "mensal" && (
        <div className="mb-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-3">
          <p className="text-xs text-blue-800">
            <strong>Escala Mensal</strong> - Esta é a escala específica do mês atual
          </p>
        </div>
      )}

      {/* Horário de Funcionamento Geral */}
      {(escala.horarios?.manha?.ativo || escala.horarios?.tarde?.ativo || escala.horarios?.saudeNaHora?.ativo) && (
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
                <div className="text-xs text-blue-700 font-medium mb-1">Manhã/Tarde</div>
                <div className="text-base font-bold text-neutral-900">
                  {escala.horarios.manha.display}
                </div>
              </div>
            )}
            {escala.horarios?.saudeNaHora?.ativo && (
              <div className="bg-white border border-green-200 rounded-lg px-4 py-2 flex-1 min-w-[140px]">
                <div className="text-xs text-green-700 font-medium mb-1">Saúde na Hora</div>
                <div className="text-base font-bold text-neutral-900">
                  {escala.horarios.saudeNaHora.display}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Versão Desktop */}
      <div className="hidden md:block">
        <table className="w-full border-collapse border border-neutral-300">
          <thead>
            <tr className="bg-neutral-100">
              <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm w-1/6">
                Dia da Semana
              </th>
              <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                Período
              </th>
              <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                Profissionais
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {diasSemana.map(dia => {
              const profissionaisDoDia = escala.escalaSemanal.dias[dia.key]?.profissionais || [];

              // Separar profissionais por turno
              const profsManha = profissionaisDoDia.filter(p => p.turno === 'manha' || p.turno === 'both');
              const profsSaudeNaHora = profissionaisDoDia.filter(p => p.turno === 'saudeNaHora');

              const temManha = profsManha.length > 0;
              const temSaudeNaHora = profsSaudeNaHora.length > 0;

              if (!temManha && !temSaudeNaHora) {
                return (
                  <tr key={dia.key} className="bg-white">
                    <td className="border border-neutral-300 px-4 py-3">
                      <strong className="text-neutral-800">{dia.label}</strong>
                    </td>
                    <td colSpan="2" className="border border-neutral-300 px-4 py-3 text-center text-neutral-500 italic">
                      Sem profissionais escalados
                    </td>
                  </tr>
                );
              }

              return (
                <>
                  {temManha && (
                    <tr key={`${dia.key}-manha`} className="bg-white">
                      <td className={`border border-neutral-300 px-4 py-3 ${temSaudeNaHora ? '' : ''}`} rowSpan={temSaudeNaHora ? 2 : 1}>
                        <strong className="text-neutral-800">{dia.label}</strong>
                      </td>
                      <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                        <strong>{escala.horarios?.manha?.display || '07h00 às 17h00'}</strong>
                      </td>
                      <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                        {profsManha.map((prof, idx) => (
                          <div key={idx} className={idx > 0 ? "pt-2 mt-2 border-t border-neutral-200" : ""}>
                            <div className="font-medium">{prof.nome}</div>
                            <div className="text-xs text-neutral-600">{prof.funcao}</div>
                          </div>
                        ))}
                      </td>
                    </tr>
                  )}
                  {temSaudeNaHora && (
                    <tr key={`${dia.key}-saude`} className="bg-white">
                      {!temManha && (
                        <td className="border border-neutral-300 px-4 py-3">
                          <strong className="text-neutral-800">{dia.label}</strong>
                        </td>
                      )}
                      <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                        <strong className="text-green-700">{escala.horarios?.saudeNaHora?.display || '17h00 às 22h00'}</strong>
                      </td>
                      <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                        {profsSaudeNaHora.map((prof, idx) => (
                          <div key={idx} className={idx > 0 ? "pt-2 mt-2 border-t border-neutral-200" : ""}>
                            <div className="font-medium">{prof.nome}</div>
                            <div className="text-xs text-neutral-600">{prof.funcao}</div>
                          </div>
                        ))}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Versão Mobile */}
      <div className="md:hidden space-y-4">
        {diasSemana.map(dia => {
          const profissionaisDoDia = escala.escalaSemanal.dias[dia.key]?.profissionais || [];

          // Separar profissionais por turno
          const profsManha = profissionaisDoDia.filter(p => p.turno === 'manha' || p.turno === 'both');
          const profsSaudeNaHora = profissionaisDoDia.filter(p => p.turno === 'saudeNaHora');

          if (profsManha.length === 0 && profsSaudeNaHora.length === 0) {
            return null;
          }

          return (
            <div key={dia.key} className="bg-white border border-neutral-200 rounded-lg p-4">
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                  {dia.label}
                </span>
              </div>

              <div className="space-y-4">
                {/* Manhã/Tarde */}
                {profsManha.length > 0 && (
                  <div className="pb-3 border-b border-neutral-200">
                    <p className="text-xs text-neutral-500 mb-2">Período</p>
                    <p className="text-sm font-semibold text-neutral-800 mb-3">
                      {escala.horarios?.manha?.display || '07h00 às 17h00'}
                    </p>
                    <p className="text-xs text-neutral-500 mb-2"><strong>Profissionais</strong></p>
                    <div className="space-y-2">
                      {profsManha.map((prof, idx) => (
                        <div key={idx} className={idx > 0 ? "pt-2 border-t border-neutral-100" : ""}>
                          <div className="font-medium text-sm text-neutral-800">{prof.nome}</div>
                          <div className="text-xs text-neutral-600">{prof.funcao}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Saúde na Hora */}
                {profsSaudeNaHora.length > 0 && (
                  <div className="pt-1">
                    <p className="text-xs text-neutral-500 mb-2">Período</p>
                    <p className="text-sm font-semibold text-green-700 mb-3">
                      {escala.horarios?.saudeNaHora?.display || '17h00 às 22h00'} (Saúde na Hora)
                    </p>
                    <p className="text-xs text-neutral-500 mb-2"><strong>Profissionais</strong></p>
                    <div className="space-y-2">
                      {profsSaudeNaHora.map((prof, idx) => (
                        <div key={idx} className={idx > 0 ? "pt-2 border-t border-neutral-100" : ""}>
                          <div className="font-medium text-sm text-neutral-800">{prof.nome}</div>
                          <div className="text-xs text-neutral-600">{prof.funcao}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Observações se houver */}
      {escala.observacoes && escala.observacoes.length > 0 && (
        <div className="mt-4 pt-4 border-t border-neutral-300">
          <div className="text-xs text-neutral-600 space-y-1">
            {escala.observacoes.map((obs, idx) => (
              <p key={idx} className="italic">• {obs}</p>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-neutral-300">
        <p className="text-xs text-neutral-500 italic text-center">
          Escalas atualizadas automaticamente • Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
}
