import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { solicitarPermissaoNotificacoes } from '../../services/notificacoesService';

/**
 * Banner para solicitar permissão de notificações
 */
export default function NotificationBanner() {
  const [permission, setPermission] = useState('default');
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);

      // Verificar localStorage para ver se já foi dispensado
      const wasDismissed = localStorage.getItem('notification-banner-dismissed');
      if (wasDismissed === 'true') {
        setDismissed(true);
      }
    }
  }, []);

  const handleActivate = async () => {
    const granted = await solicitarPermissaoNotificacoes();
    setPermission(granted ? 'granted' : 'denied');
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('notification-banner-dismissed', 'true');
  };

  // Não mostrar se: não há suporte, já foi concedido, ou foi dispensado
  if (!('Notification' in window) || permission === 'granted' || dismissed) {
    return null;
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 animate-slide-down shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-amber-600" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-amber-900 mb-1">
            Ativar Notificações
          </h4>
          <p className="text-sm text-amber-700 mb-3">
            Receba lembretes dos seus eventos diretamente no navegador para não perder nenhum compromisso importante.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleActivate}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
            >
              Ativar Notificações
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-100 transition-all duration-200 text-sm font-medium"
            >
              Agora Não
            </button>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-amber-600 hover:text-amber-800 transition-colors p-1 rounded hover:bg-amber-100"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
