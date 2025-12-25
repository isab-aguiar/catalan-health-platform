// =========================================
// COMPONENTE: Vacinas Disponíveis (Público)
// =========================================
// Tabela pública mostrando vacinas disponíveis na ESF Catalão
// Exibe apenas vacinas publicadas e dentro do período válido

import { useMemo } from 'react';
import { useVacinas } from '../../hooks/useVacinas';
import LoadingSpinner from '../common/LoadingSpinner';
import { CheckCircle2, XCircle, Calendar } from 'lucide-react';

export default function VacinasDisponiveis() {
  const { vacinas, loading, error } = useVacinas();

  // Filtrar e processar vacinas disponíveis
  const vacinasDisponiveis = useMemo(() => {
    if (!vacinas || vacinas.length === 0) return [];

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Zerar horas para comparação apenas de data

    return vacinas
      .filter((v) => {
        // Apenas vacinas publicadas
        if (!v.publicado) return false;

        // Verificar período
        const inicio = v.periodoInicio
          ? (v.periodoInicio.toDate ? v.periodoInicio.toDate() : new Date(v.periodoInicio))
          : null;
        const fim = v.periodoFim
          ? (v.periodoFim.toDate ? v.periodoFim.toDate() : new Date(v.periodoFim))
          : null;

        if (!inicio || !fim) return false;

        // Zerar horas para comparação
        const inicioDate = new Date(inicio);
        inicioDate.setHours(0, 0, 0, 0);
        const fimDate = new Date(fim);
        fimDate.setHours(0, 0, 0, 0);

        // Verificar se está dentro do período
        const dentroDoPeriodo = hoje >= inicioDate && hoje <= fimDate;

        // Verificar se tem quantidade disponível
        const temQuantidade = (v.quantidade || 0) > 0;

        return dentroDoPeriodo && temQuantidade;
      })
      .sort((a, b) => {
        // Ordenar por nome
        const nomeA = a.nome || '';
        const nomeB = b.nome || '';
        return nomeA.localeCompare(nomeB, 'pt-BR');
      });
  }, [vacinas]);

  // Função para verificar se uma vacina está disponível
  const vacinaDisponivel = (v) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const inicio = v.periodoInicio
      ? (v.periodoInicio.toDate ? v.periodoInicio.toDate() : new Date(v.periodoInicio))
      : null;
    const fim = v.periodoFim
      ? (v.periodoFim.toDate ? v.periodoFim.toDate() : new Date(v.periodoFim))
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

  // Formatar data para exibição
  const formatarData = (timestamp) => {
    if (!timestamp) return '--';
    
    let date;
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    }

    return date.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-md shadow-sm p-8">
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-md">
        <p className="text-sm text-red-900">
          Erro ao carregar informações de vacinas. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  // Buscar todas as vacinas publicadas (não apenas as disponíveis) para mostrar na tabela
  const vacinasPublicadas = vacinas.filter((v) => v.publicado === true);

  if (vacinasPublicadas.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Vacinas Disponíveis
        </h2>
        <p className="text-slate-600 text-sm">
          Nenhuma informação de vacinação disponível no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Vacinas Disponíveis na ESF Catalão
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          Informações atualizadas em tempo real
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 font-semibold text-slate-700">Vacina</th>
              <th className="text-left p-4 font-semibold text-slate-700">Para que serve</th>
              <th className="text-left p-4 font-semibold text-slate-700">Público-Alvo</th>
              <th className="text-left p-4 font-semibold text-slate-700">Status</th>
              <th className="text-left p-4 font-semibold text-slate-700">Período</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {vacinasPublicadas.map((v) => {
              const disponivel = vacinaDisponivel(v);

              return (
                <tr
                  key={v.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4">
                    <div className="font-semibold text-slate-900">{v.nome}</div>
                  </td>
                  <td className="p-4 text-slate-600">{v.finalidade}</td>
                  <td className="p-4 text-slate-600">{v.publicoAlvo}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                        disponivel
                          ? 'bg-green-100 text-green-800 border border-green-300'
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
                  <td className="p-4 text-xs text-slate-600">
                    {v.periodoInicio && v.periodoFim ? (
                      <span>
                        {formatarData(v.periodoInicio)} até {formatarData(v.periodoFim)}
                      </span>
                    ) : (
                      <span className="text-slate-400">--</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-50 border-t border-slate-200 p-4">
        <p className="text-xs text-slate-600 text-center">
          Este painel tem caráter informativo. A disponibilidade pode mudar conforme a demanda.
        </p>
      </div>
    </div>
  );
}

