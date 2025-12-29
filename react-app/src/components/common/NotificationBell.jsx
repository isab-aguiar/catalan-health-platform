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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  const handleLimparNotificacoes = async () => {
    try {
      setLoading(true);
      const promises = notificacoes.map(notif => deletarNotificacao(notif.id));
      await Promise.all(promises);
      carregarNotificacoes();
    } catch (error) {
      console.error('Erro ao limpar notificações:', error);
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
    if (!notif.lida) {
      await handleMarcarComoLida(notif.id);
    }

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
        <div className="fixed sm:absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-72 bg-white rounded-xl shadow-2xl border border-neutral-200/80 z-50 max-h-[400px] flex flex-col overflow-hidden backdrop-blur-sm">
          {/* Header do Dropdown */}
          <div className="p-4 border-b border-neutral-100 sticky top-0 bg-gradient-to-b from-white to-neutral-50/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-neutral-900 text-base">Notificações</h3>
                {naoLidas > 0 && (
                  <p className="text-xs text-neutral-600 mt-0.5">{naoLidas} não lida{naoLidas > 1 ? 's' : ''}</p>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/admin/notificacoes');
                  }}
                  className="p-2 text-neutral-600 hover:text-gov-blue hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="Ver todas"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Botões de Ação */}
            {notificacoes.length > 0 && (
              <div className="flex gap-2">
                {naoLidas > 0 && (
                  <button
                    onClick={handleMarcarTodasComoLidas}
                    disabled={loading}
                    className="flex-1 px-3 py-2 bg-gradient-to-br from-blue-50 to-blue-100/50 text-blue-700 hover:from-blue-100 hover:to-blue-200/50 rounded-lg font-semibold text-xs disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-1.5 border border-blue-200/50 shadow-sm hover:shadow"
                    title="Marcar todas como lidas"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Marcar lidas
                  </button>
                )}
                <button
                  onClick={handleLimparNotificacoes}
                  disabled={loading}
                  className="flex-1 px-3 py-2 bg-gradient-to-br from-red-50 to-red-100/50 text-red-700 hover:from-red-100 hover:to-red-200/50 rounded-lg font-semibold text-xs disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-1.5 border border-red-200/50 shadow-sm hover:shadow"
                  title="Limpar todas as notificações"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Limpar
                </button>
              </div>
            )}
          </div>

          {/* Lista de Notificações */}
          <div className="overflow-y-auto flex-1 bg-neutral-50/30">
            {loading ? (
              <div className="p-10 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-3 border-t-gov-blue border-r-gov-blue/30 border-b-gov-blue/10 border-l-gov-blue/10 mx-auto"></div>
                <p className="text-xs text-neutral-500 mt-3">Carregando...</p>
              </div>
            ) : notificacoes.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <Bell className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-sm font-medium text-neutral-700 mb-1">Nenhuma notificação</p>
                <p className="text-xs text-neutral-500">Você está em dia!</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100/50">
                {notificacoes.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 hover:bg-white/80 transition-all duration-200 cursor-pointer group relative ${
                      !notif.lida ? 'bg-gradient-to-r from-blue-50/80 to-blue-50/40 hover:from-blue-100/60 hover:to-blue-50/60' : 'bg-white/40 hover:bg-white/90'
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
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4
                            className={`text-sm leading-snug ${
                              !notif.lida ? 'font-bold text-neutral-900' : 'font-semibold text-neutral-700'
                            } line-clamp-1`}
                          >
                            {notif.titulo}
                          </h4>
                          {!notif.lida && (
                            <div className="w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex-shrink-0 mt-1 shadow-sm ring-2 ring-blue-200/50"></div>
                          )}
                        </div>

                        {notif.mensagem && (
                          <p className="text-xs text-neutral-600 leading-relaxed mt-1 line-clamp-2">
                            {notif.mensagem}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2.5">
                          <span className="text-xs font-medium text-neutral-500 bg-neutral-100/60 px-2 py-0.5 rounded-full">
                            {formatarTempo(notif.criadoEm)}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletarNotificacao(notif.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200"
                            title="Deletar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
            <div className="p-3 border-t border-neutral-100 text-center sticky bottom-0 bg-gradient-to-t from-white to-neutral-50/50 backdrop-blur-sm">
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
