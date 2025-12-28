import React, { useState, useEffect } from 'react';
import { Calendar, Users, Plus, Edit2, Trash2, Eye, CheckCircle, XCircle, Archive, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  buscarEscalas,
  buscarEscalaPorId,
  criarEscala,
  atualizarEscala,
  deletarEscala,
  publicarEscala,
  despublicarEscala,
  arquivarEscala,
  atualizarProfissionaisDia,
  TURNOS,
  DIAS_SEMANA,
} from '../../services/escalasService';
import { useAuth } from '../../contexts/AuthContext';
import EscalaEditor from '../../components/admin/EscalaEditor';

export default function EscalasAdmin() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [escalas, setEscalas] = useState([]);
  const [escalaAtual, setEscalaAtual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [escalaEditando, setEscalaEditando] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('todas');
  const [showEditor, setShowEditor] = useState(false);

  // Bloquear scroll quando modal ou editor estiver aberto
  useEffect(() => {
    if (showModal || showEditor) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [showModal, showEditor]);

  const meses = [
    { num: 1, nome: 'Janeiro' },
    { num: 2, nome: 'Fevereiro' },
    { num: 3, nome: 'Março' },
    { num: 4, nome: 'Abril' },
    { num: 5, nome: 'Maio' },
    { num: 6, nome: 'Junho' },
    { num: 7, nome: 'Julho' },
    { num: 8, nome: 'Agosto' },
    { num: 9, nome: 'Setembro' },
    { num: 10, nome: 'Outubro' },
    { num: 11, nome: 'Novembro' },
    { num: 12, nome: 'Dezembro' },
  ];

  useEffect(() => {
    carregarEscalas();
  }, [filtroStatus]);

  const carregarEscalas = async () => {
    try {
      setLoading(true);
      const filtros = {};
      if (filtroStatus !== 'todas') {
        filtros.status = filtroStatus;
      }
      const escalasData = await buscarEscalas(filtros);
      setEscalas(escalasData);
    } catch (error) {
      console.error('Erro ao carregar escalas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCriarNovaEscala = () => {
    const hoje = new Date();
    setEscalaEditando({
      mes: hoje.getMonth() + 1,
      ano: hoje.getFullYear(),
      titulo: '',
      profissionais: {},
      turnosPorDia: [TURNOS.MANHA, TURNOS.TARDE],
      diasFuncionamento: [
        DIAS_SEMANA.SEGUNDA,
        DIAS_SEMANA.TERCA,
        DIAS_SEMANA.QUARTA,
        DIAS_SEMANA.QUINTA,
        DIAS_SEMANA.SEXTA,
      ],
      observacoes: '',
      status: 'rascunho',
    });
    setModoEdicao(false);
    setShowModal(true);
  };

  const handleEditarEscala = async (escalaId) => {
    try {
      const escala = await buscarEscalaPorId(escalaId);
      setEscalaEditando(escala);
      setShowEditor(true);
    } catch (error) {
      console.error('Erro ao carregar escala:', error);
      alert('Erro ao carregar escala para edição');
    }
  };

  const handleSalvarEscalaEditor = async (escalaAtualizada) => {
    try {
      await atualizarEscala(escalaAtualizada.id, {
        profissionais: escalaAtualizada.profissionais,
      });
      alert('Escala atualizada com sucesso!');
      setShowEditor(false);
      setEscalaEditando(null);
      carregarEscalas();
      if (escalaAtual?.id === escalaAtualizada.id) {
        setEscalaAtual(escalaAtualizada);
      }
    } catch (error) {
      console.error('Erro ao salvar escala:', error);
      alert('Erro ao salvar escala: ' + error.message);
    }
  };

  const handleVisualizarEscala = async (escalaId) => {
    try {
      const escala = await buscarEscalaPorId(escalaId);
      setEscalaAtual(escala);
    } catch (error) {
      console.error('Erro ao carregar escala:', error);
    }
  };

  const handleSalvarEscala = async () => {
    try {
      if (!escalaEditando.mes || !escalaEditando.ano) {
        alert('Mês e ano são obrigatórios');
        return;
      }

      if (modoEdicao && escalaEditando.id) {
        await atualizarEscala(escalaEditando.id, escalaEditando);
        alert('Escala atualizada com sucesso!');
      } else {
        await criarEscala(escalaEditando, currentUser.uid);
        alert('Escala criada com sucesso!');
      }

      setShowModal(false);
      setEscalaEditando(null);
      carregarEscalas();
    } catch (error) {
      console.error('Erro ao salvar escala:', error);
      alert('Erro ao salvar escala: ' + error.message);
    }
  };

  const handleDeletarEscala = async (escalaId) => {
    if (!confirm('Tem certeza que deseja deletar esta escala?')) return;

    try {
      await deletarEscala(escalaId);
      alert('Escala deletada com sucesso!');
      carregarEscalas();
      if (escalaAtual?.id === escalaId) {
        setEscalaAtual(null);
      }
    } catch (error) {
      console.error('Erro ao deletar escala:', error);
      alert('Erro ao deletar escala: ' + error.message);
    }
  };

  const handlePublicarEscala = async (escalaId) => {
    try {
      await publicarEscala(escalaId);
      alert('Escala publicada com sucesso!');
      carregarEscalas();
    } catch (error) {
      console.error('Erro ao publicar escala:', error);
      alert('Erro ao publicar escala: ' + error.message);
    }
  };

  const handleDespublicarEscala = async (escalaId) => {
    try {
      await despublicarEscala(escalaId);
      alert('Escala despublicada com sucesso!');
      carregarEscalas();
    } catch (error) {
      console.error('Erro ao despublicar escala:', error);
      alert('Erro ao despublicar escala: ' + error.message);
    }
  };

  const handleArquivarEscala = async (escalaId) => {
    try {
      await arquivarEscala(escalaId);
      alert('Escala arquivada com sucesso!');
      carregarEscalas();
    } catch (error) {
      console.error('Erro ao arquivar escala:', error);
      alert('Erro ao arquivar escala: ' + error.message);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      rascunho: 'bg-yellow-100 text-yellow-800',
      publicada: 'bg-green-100 text-green-800',
      arquivada: 'bg-gray-100 text-gray-800',
    };
    const labels = {
      rascunho: 'Rascunho',
      publicada: 'Publicada',
      arquivada: 'Arquivada',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getDiasDoMes = (mes, ano) => {
    const diasNoMes = new Date(ano, mes, 0).getDate();
    const dias = [];
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const data = new Date(ano, mes - 1, dia);
      const diaSemana = data.getDay();
      dias.push({
        dia,
        diaSemana,
        data: data.toISOString().split('T')[0],
        nomeDia: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][diaSemana],
      });
    }
    return dias;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Voltar</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                <Users className="w-7 h-7 text-gov-blue" />
                Escalas de Trabalho
              </h1>
              <p className="text-neutral-600 mt-1">
                Gerencie as escalas mensais da equipe
              </p>
            </div>
          </div>
          <button
            onClick={handleCriarNovaEscala}
            className="bg-gov-blue text-gray-900 px-4 py-2.5 rounded-lg hover:bg-gov-blue-dark transition-colors flex items-center gap-2 font-medium shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Nova Escala
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
        <div className="flex items-center gap-3">
          <Search className="w-4 h-4 text-neutral-500" />
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="px-3 py-1.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gov-blue"
          >
            <option value="todas">Todas as Escalas</option>
            <option value="rascunho">Rascunhos</option>
            <option value="publicada">Publicadas</option>
            <option value="arquivada">Arquivadas</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Escalas */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-lg font-semibold text-neutral-900">Escalas Cadastradas</h2>

          {loading ? (
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gov-blue"></div>
            </div>
          ) : escalas.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 text-center">
              <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500">Nenhuma escala encontrada</p>
              <button
                onClick={handleCriarNovaEscala}
                className="mt-4 text-gov-blue hover:underline text-sm"
              >
                Criar primeira escala
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {escalas.map((escala) => (
                <div
                  key={escala.id}
                  className={`bg-white rounded-lg shadow-sm border border-neutral-200 p-4 cursor-pointer transition-all hover:shadow-md ${
                    escalaAtual?.id === escala.id ? 'ring-2 ring-gov-blue' : ''
                  }`}
                  onClick={() => handleVisualizarEscala(escala.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-neutral-900">
                        {meses.find((m) => m.num === escala.mes)?.nome} {escala.ano}
                      </h3>
                      <p className="text-sm text-neutral-600 mt-1">{escala.titulo}</p>
                    </div>
                    {getStatusBadge(escala.status)}
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditarEscala(escala.id);
                      }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {escala.status === 'rascunho' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePublicarEscala(escala.id);
                        }}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Publicar"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}

                    {escala.status === 'publicada' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDespublicarEscala(escala.id);
                          }}
                          className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                          title="Despublicar"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArquivarEscala(escala.id);
                          }}
                          className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                          title="Arquivar"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletarEscala(escala.id);
                      }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors ml-auto"
                      title="Deletar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visualização da Escala */}
        <div className="lg:col-span-2">
          {escalaAtual ? (
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    {meses.find((m) => m.num === escalaAtual.mes)?.nome} {escalaAtual.ano}
                  </h2>
                  <p className="text-neutral-600 mt-1">{escalaAtual.titulo}</p>
                </div>
                {getStatusBadge(escalaAtual.status)}
              </div>

              {escalaAtual.observacoes && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Observações:</strong> {escalaAtual.observacoes}
                  </p>
                </div>
              )}

              {/* Grid da Escala */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-200">
                      <th className="text-left py-3 px-2 font-semibold text-neutral-700">Dia</th>
                      <th className="text-left py-3 px-2 font-semibold text-neutral-700">Manhã</th>
                      <th className="text-left py-3 px-2 font-semibold text-neutral-700">Almoço</th>
                      <th className="text-left py-3 px-2 font-semibold text-neutral-700">Tarde</th>
                      <th className="text-left py-3 px-2 font-semibold text-neutral-700">Observações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDiasDoMes(escalaAtual.mes, escalaAtual.ano).map((diaInfo) => {
                      const profissionaisDia = escalaAtual.profissionais[diaInfo.data] || {};
                      const isWeekend = diaInfo.diaSemana === 0 || diaInfo.diaSemana === 6;

                      return (
                        <tr
                          key={diaInfo.data}
                          className={`border-b border-neutral-100 ${
                            isWeekend ? 'bg-neutral-50' : ''
                          }`}
                        >
                          <td className="py-3 px-2">
                            <div className="font-medium text-neutral-900">{diaInfo.dia}</div>
                            <div className="text-xs text-neutral-500">{diaInfo.nomeDia}</div>
                          </td>
                          <td className="py-3 px-2">
                            {profissionaisDia.manha?.length > 0 ? (
                              <div className="space-y-1">
                                {profissionaisDia.manha.map((prof, idx) => (
                                  <div
                                    key={idx}
                                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                                  >
                                    {prof}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-neutral-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="py-3 px-2">
                            {profissionaisDia.almoco?.length > 0 ? (
                              <div className="space-y-1">
                                {profissionaisDia.almoco.map((prof, idx) => (
                                  <div
                                    key={idx}
                                    className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded"
                                  >
                                    {prof}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-neutral-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="py-3 px-2">
                            {profissionaisDia.tarde?.length > 0 ? (
                              <div className="space-y-1">
                                {profissionaisDia.tarde.map((prof, idx) => (
                                  <div
                                    key={idx}
                                    className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded"
                                  >
                                    {prof}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-neutral-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="py-3 px-2">
                            {profissionaisDia.observacoes ? (
                              <span className="text-xs text-neutral-600">
                                {profissionaisDia.observacoes}
                              </span>
                            ) : (
                              <span className="text-neutral-400 text-xs">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-12 text-center">
              <Eye className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">Selecione uma escala para visualizar</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Criação/Edição (Placeholder) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-full sm:max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-neutral-900">
                {modoEdicao ? 'Editar Escala' : 'Nova Escala'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEscalaEditando(null);
                }}
                className="text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Formulário Básico */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Mês
                  </label>
                  <select
                    value={escalaEditando?.mes || ''}
                    onChange={(e) =>
                      setEscalaEditando({ ...escalaEditando, mes: parseInt(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue"
                  >
                    {meses.map((m) => (
                      <option key={m.num} value={m.num}>
                        {m.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Ano
                  </label>
                  <input
                    type="number"
                    value={escalaEditando?.ano || ''}
                    onChange={(e) =>
                      setEscalaEditando({ ...escalaEditando, ano: parseInt(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Título (opcional)
                </label>
                <input
                  type="text"
                  value={escalaEditando?.titulo || ''}
                  onChange={(e) =>
                    setEscalaEditando({ ...escalaEditando, titulo: e.target.value })
                  }
                  placeholder="Ex: Escala de Plantão - Janeiro 2024"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Observações
                </label>
                <textarea
                  value={escalaEditando?.observacoes || ''}
                  onChange={(e) =>
                    setEscalaEditando({ ...escalaEditando, observacoes: e.target.value })
                  }
                  rows={3}
                  placeholder="Informações adicionais sobre a escala..."
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue resize-none"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Nota:</strong> Após criar a escala, clique no ícone de edição para preencher
                  os profissionais de cada dia usando o editor interativo.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-neutral-200 flex gap-3 justify-end sticky bottom-0 bg-white">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEscalaEditando(null);
                }}
                className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvarEscala}
                className="px-4 py-2 bg-gov-blue text-white rounded-lg hover:bg-gov-blue-dark transition-colors"
              >
                {modoEdicao ? 'Atualizar' : 'Criar'} Escala
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editor de Escala */}
      {showEditor && escalaEditando && (
        <EscalaEditor
          escala={escalaEditando}
          onSave={handleSalvarEscalaEditor}
          onClose={() => {
            setShowEditor(false);
            setEscalaEditando(null);
          }}
        />
      )}
    </div>
  );
}
