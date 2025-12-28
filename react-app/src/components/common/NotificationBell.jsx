import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, Check, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  buscarNotificacoesRecentes,
  contarNaoLidas,
  marcarComoLida,
  marcarTodasComoLidas,
  deletarNotificacao,
  TIPOS_NOTIFICACAO,
} from '../../services/notificacoesService';

export default function NotificationBell() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notificacoes, setNotificacoes] = useState([]);
  const [naoLidas, setNaoLidas] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      carregarNotificacoes();
      // Atualizar a cada 30 segundos
      const interval = setInterval(carregarNotificacoes, 30000);
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const carregarNotificacoes = async () => {
    if (!currentUser) return;

    try {
      const [notifs, count] = await Promise.all([
        buscarNotificacoesRecentes(currentUser.uid),
        contarNaoLidas(currentUser.uid),
      ]);
      setNotificacoes(notifs);
      setNaoLidas(count);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
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
    try {
      setLoading(true);
      await marcarTodasComoLidas(currentUser.uid);
      carregarNotificacoes();
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletarNotificacao = async (notifId) => {
    try {
      await deletarNotificacao(notifId);
      carregarNotificacoes();
    } catch (error) {
      console.error('Erro ao deletar notificação:', error);
    }
  };

  const handleClickNotificacao = async (notif) => {
    // Marcar como lida
    if (!notif.lida) {
      await handleMarcarComoLida(notif.id);
    }

    // Navegar se tiver link
    if (notif.link) {
      setIsOpen(false);
      navigate(notif.link);
    }
  };

  const getIconeNotificacao = (tipo) => {
    switch (tipo) {
      case TIPOS_NOTIFICACAO.LEMBRETE:
        return <Bell className="w-4 h-4 text-purple-600" />;
      case TIPOS_NOTIFICACAO.REUNIAO:
        return <Bell className="w-4 h-4 text-blue-600" />;
      case TIPOS_NOTIFICACAO.ALERTA:
        return <Bell className="w-4 h-4 text-red-600" />;
      default:
        return <Bell className="w-4 h-4 text-neutral-600" />;
    }
  };

  const formatarTempo = (data) => {
    if (!data) return '';

    const agora = new Date();
    const diff = agora - data;
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);

    if (minutos < 1) return 'Agora';
    if (minutos < 60) return `${minutos}m atrás`;
    if (horas < 24) return `${horas}h atrás`;
    if (dias < 7) return `${dias}d atrás`;
    return data.toLocaleDateString('pt-BR');
  };

  if (!currentUser) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão do Sino */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
        aria-label="Notificações"
      >
        <Bell className="w-5 h-5" />
        {naoLidas > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {naoLidas > 9 ? '9+' : naoLidas}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-neutral-200 z-50 max-h-[500px] flex flex-col">
          {/* Header do Dropdown */}
          <div className="p-4 border-b border-neutral-200 sticky top-0 bg-white rounded-t-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-neutral-900">Notificações</h3>
                {naoLidas > 0 && (
                  <p className="text-xs text-neutral-500">{naoLidas} não lida(s)</p>
                )}
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/admin/notificacoes');
                }}
                className="text-xs text-neutral-600 hover:text-neutral-700 font-medium"
                title="Ver todas"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Botões de Ação */}
            {naoLidas > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={handleMarcarTodasComoLidas}
                  disabled={loading}
                  className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium text-xs disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5"
                  title="Marcar todas como lidas"
                >
                  <Check className="w-3.5 h-3.5" />
                  Marcar como lidas
                </button>
                <button
                  onClick={handleMarcarTodasComoLidas}
                  disabled={loading}
                  className="flex-1 px-3 py-1.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded-lg font-medium text-xs disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5"
                  title="Limpar notificações do dropdown"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Limpar
                </button>
              </div>
            )}
          </div>

          {/* Lista de Notificações */}
          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gov-blue mx-auto"></div>
              </div>
            ) : notificacoes.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-sm text-neutral-500">Nenhuma notificação</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {notificacoes.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 hover:bg-neutral-50 transition-colors cursor-pointer group ${
                      !notif.lida ? 'bg-blue-50/50' : ''
                    }`}
                    onClick={() => handleClickNotificacao(notif)}
                  >
                    <div className="flex gap-3">
                      {/* Ícone */}
                      <div className="flex-shrink-0 mt-1">
                        {getIconeNotificacao(notif.tipo)}
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            className={`text-sm ${
                              !notif.lida ? 'font-semibold text-neutral-900' : 'font-medium text-neutral-700'
                            } line-clamp-1`}
                          >
                            {notif.titulo}
                          </h4>
                          {!notif.lida && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></div>
                          )}
                        </div>

                        {notif.mensagem && (
                          <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                            {notif.mensagem}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-neutral-500">
                            {formatarTempo(notif.criadoEm)}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletarNotificacao(notif.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-red-600 transition-all"
                            title="Deletar"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notificacoes.length > 0 && (
            <div className="p-3 border-t border-neutral-200 text-center sticky bottom-0 bg-white rounded-b-lg">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/admin/notificacoes');
                }}
                className="text-sm text-gov-blue hover:text-gov-blue-dark font-medium"
              >
                Ver todas as notificações
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
