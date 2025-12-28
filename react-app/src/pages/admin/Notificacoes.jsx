import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, Filter, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminLayout from '../../layouts/AdminLayout';
import {
  buscarNotificacoesUsuario,
  marcarComoLida,
  marcarTodasComoLidas,
  deletarNotificacao,
  limparLidas,
  TIPOS_NOTIFICACAO,
} from '../../services/notificacoesService';

export default function Notificacoes() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todas'); // 'todas', 'naoLidas', 'lidas'

  useEffect(() => {
    carregarNotificacoes();
  }, [filtro]);

  const carregarNotificacoes = async () => {
    try {
      setLoading(true);
      const filtros = {};

      if (filtro === 'naoLidas') {
        filtros.apenasNaoLidas = true;
      }

      const notifs = await buscarNotificacoesUsuario(currentUser.uid, filtros);

      // Se filtro é 'lidas', filtrar manualmente
      if (filtro === 'lidas') {
        setNotificacoes(notifs.filter(n => n.lida));
      } else {
        setNotificacoes(notifs);
      }
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarcarComoLida = async (notifId) => {
    try {
      await marcarComoLida(notifId);
      carregarNotificacoes();
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  };

  const handleMarcarTodasComoLidas = async () => {
    if (!confirm('Marcar todas as notificações como lidas?')) return;

    try {
      await marcarTodasComoLidas(currentUser.uid);
      alert('Todas as notificações foram marcadas como lidas!');
      carregarNotificacoes();
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
      alert('Erro ao marcar como lidas');
    }
  };

  const handleDeletarNotificacao = async (notifId) => {
    if (!confirm('Deletar esta notificação?')) return;

    try {
      await deletarNotificacao(notifId);
      carregarNotificacoes();
    } catch (error) {
      console.error('Erro ao deletar notificação:', error);
      alert('Erro ao deletar notificação');
    }
  };

  const handleLimparLidas = async () => {
    if (!confirm('Limpar todas as notificações lidas?')) return;

    try {
      const result = await limparLidas(currentUser.uid);
      alert(result.message);
      carregarNotificacoes();
    } catch (error) {
      console.error('Erro ao limpar lidas:', error);
      alert('Erro ao limpar notificações');
    }
  };

  const handleClickNotificacao = async (notif) => {
    // Marcar como lida
    if (!notif.lida) {
      await handleMarcarComoLida(notif.id);
    }

    // Navegar se tiver link
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const getIconeNotificacao = (tipo) => {
    const classes = {
      [TIPOS_NOTIFICACAO.LEMBRETE]: 'bg-purple-100 text-purple-600',
      [TIPOS_NOTIFICACAO.REUNIAO]: 'bg-blue-100 text-blue-600',
      [TIPOS_NOTIFICACAO.ALERTA]: 'bg-red-100 text-red-600',
      [TIPOS_NOTIFICACAO.SISTEMA]: 'bg-neutral-100 text-neutral-600',
    };

    return classes[tipo] || classes[TIPOS_NOTIFICACAO.SISTEMA];
  };

  const formatarData = (data) => {
    if (!data) return '';
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const naoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <AdminLayout currentPage="notificacoes">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                <Bell className="w-7 h-7 text-gov-blue" />
                Notificações
              </h1>
              <p className="text-neutral-600 mt-1">
                {naoLidas > 0 ? `${naoLidas} não lida(s)` : 'Todas as notificações lidas'}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={carregarNotificacoes}
                className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Atualizar
              </button>

              {naoLidas > 0 && (
                <button
                  onClick={handleMarcarTodasComoLidas}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Marcar todas como lidas
                </button>
              )}

              <button
                onClick={handleLimparLidas}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Limpar lidas
              </button>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-neutral-500" />
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="px-3 py-1.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gov-blue"
            >
              <option value="todas">Todas as Notificações</option>
              <option value="naoLidas">Não Lidas</option>
              <option value="lidas">Lidas</option>
            </select>
          </div>
        </div>

        {/* Lista de Notificações */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
          {loading ? (
            <div className="p-12 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gov-blue"></div>
            </div>
          ) : notificacoes.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">Nenhuma notificação encontrada</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {notificacoes.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-neutral-50 transition-colors cursor-pointer group ${
                    !notif.lida ? 'bg-blue-50/30' : ''
                  }`}
                  onClick={() => handleClickNotificacao(notif)}
                >
                  <div className="flex gap-4">
                    {/* Ícone */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconeNotificacao(notif.tipo)}`}>
                      <Bell className="w-5 h-5" />
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3
                              className={`text-base ${
                                !notif.lida ? 'font-semibold text-neutral-900' : 'font-medium text-neutral-700'
                              }`}
                            >
                              {notif.titulo}
                            </h3>
                            {!notif.lida && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>

                          {notif.mensagem && (
                            <p className="text-sm text-neutral-600 mt-1">
                              {notif.mensagem}
                            </p>
                          )}

                          <p className="text-xs text-neutral-500 mt-2">
                            {formatarData(notif.criadoEm)}
                          </p>
                        </div>

                        {/* Ações */}
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notif.lida && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarcarComoLida(notif.id);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Marcar como lida"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletarNotificacao(notif.id);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Deletar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
