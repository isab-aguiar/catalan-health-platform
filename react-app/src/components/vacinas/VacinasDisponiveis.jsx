import { CheckCircle2, Shield, XCircle } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import { useVacinas } from '../../hooks/useVacinas';

export default function VacinasDisponiveis() {
  const { vacinas, loading, error } = useVacinas();
  const vacinaDisponivel = (v) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const inicio = v.periodoInicio
      ? v.periodoInicio.toDate
        ? v.periodoInicio.toDate()
        : new Date(v.periodoInicio)
      : null;
    const fim = v.periodoFim
      ? v.periodoFim.toDate
        ? v.periodoFim.toDate()
        : new Date(v.periodoFim)
      : null;
    if (!inicio || !fim) return false;
    const inicioDate = new Date(inicio);
    inicioDate.setHours(0, 0, 0, 0);
    const fimDate = new Date(fim);
    fimDate.setHours(0, 0, 0, 0);
    const dentroDoPeriodo = hoje >= inicioDate && hoje <= fimDate;
    const temQuantidade = (v.quantidade || 0) > 0;
    return dentroDoPeriodo && temQuantidade;
  };
  if (loading) {
    return (
      <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-8">
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  if (error) {
    const isPermissionError =
      error.toLowerCase().includes('permission') ||
      error.toLowerCase().includes('permissão') ||
      error.toLowerCase().includes('permission-denied');
    return (
      <div className="bg-error/10 border-l-4 border-error p-4 rounded-r-md">
        <p className="text-sm text-error font-medium mb-2">
          Erro ao carregar informações de vacinas
        </p>
        <p className="text-xs text-red-700 mb-2">
          {isPermissionError
            ? 'Erro de permissão: As regras do Firestore podem não estar configuradas corretamente. Verifique o console do navegador (F12) para mais detalhes.'
            : error}
        </p>
        {isPermissionError && (
          <div className="mt-3 p-3 bg-red-100 rounded text-xs text-red-800">
            <p className="font-semibold mb-1">Como resolver:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Abra o console do navegador (F12)</li>
              <li>Verifique a mensagem de erro completa</li>
              <li>Confirme que as regras do Firestore foram publicadas</li>
              <li>Tente limpar o cache do navegador (Ctrl+Shift+R)</li>
            </ol>
          </div>
        )}
      </div>
    );
  }
  const vacinasPublicadas = vacinas.filter((v) => v.publicado === true);
  if (vacinasPublicadas.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-neutral-700" />
          Programa de Vacinação
        </h2>
        <p className="text-neutral-600 text-sm">
          Não há informações de vacinação disponíveis no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-md shadow-sm overflow-hidden">
      <div className="bg-primary-700 p-5">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Programa de Vacinação - ESF Catalão
        </h2>
        <p className="text-neutral-200 text-xs mt-1.5">
          Vacinas disponíveis na unidade - Atualização semanal
        </p>
      </div>
      <div className="md:hidden divide-y divide-neutral-200">
        {vacinasPublicadas.map((v) => {
          const disponivel = vacinaDisponivel(v);
          return (
            <div
              key={v.id}
              className="p-4 border-b border-neutral-200 last:border-b-0"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-neutral-900 text-base">
                  {v.nome}
                </h3>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold flex-shrink-0 ml-2 ${
                    disponivel
                      ? 'bg-success/10 text-green-800 border border-green-400'
                      : 'bg-error/10 text-red-800 border border-red-400'
                  }`}
                >
                  {disponivel ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Disponível
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      Indisponível
                    </>
                  )}
                </span>
              </div>
              <div className="space-y-2.5 text-sm mt-3">
                <div>
                  <span className="font-semibold text-neutral-800 text-xs uppercase tracking-wide">
                    Indicação:{' '}
                  </span>
                  <p className="text-neutral-700 mt-1 leading-relaxed">
                    {v.finalidade}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-neutral-800 text-xs uppercase tracking-wide">
                    Público-Alvo:{' '}
                  </span>
                  <p className="text-neutral-700 mt-1">{v.publicoAlvo}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-100 border-b-2 border-neutral-300">
            <tr>
              <th className="text-left p-4 font-semibold text-neutral-800 text-xs uppercase tracking-wide">
                Vacina
              </th>
              <th className="text-left p-4 font-semibold text-neutral-800 text-xs uppercase tracking-wide">
                Indicação
              </th>
              <th className="text-left p-4 font-semibold text-neutral-800 text-xs uppercase tracking-wide">
                Público-Alvo
              </th>
              <th className="text-left p-4 font-semibold text-neutral-800 text-xs uppercase tracking-wide">
                Situação
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {vacinasPublicadas.map((v) => {
              const disponivel = vacinaDisponivel(v);
              return (
                <tr key={v.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-neutral-900">{v.nome}</div>
                  </td>
                  <td className="p-4 text-neutral-700 leading-relaxed">
                    {v.finalidade}
                  </td>
                  <td className="p-4 text-neutral-700">{v.publicoAlvo}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
                        disponivel
                          ? 'bg-success/10 text-green-800 border border-success'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}
                    >
                      {disponivel ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Disponível
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          Indisponível
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-neutral-50 border-t border-neutral-200 p-4">
        <p className="text-xs text-neutral-600 text-center leading-relaxed">
          Esta lista é atualizada semanalmente pela equipe de saúde. A
          disponibilidade pode variar conforme a demanda e o estoque da unidade.
        </p>
      </div>
    </div>
  );
}
