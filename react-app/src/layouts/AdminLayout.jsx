import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, ArrowLeft } from 'lucide-react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';

export default function AdminLayout({ children, currentPage = 'dashboard' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const { showModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  // Bloquear scroll quando sidebar estiver aberto
  useEffect(() => {
    if (sidebarOpen) {
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
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    }
  }, [sidebarOpen]);

  // Garantir que scroll seja liberado ao desmontar ou mudar de página
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, []);

  // Scroll para o topo ao mudar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleLogout = async () => {
    const confirmed = await showModal({
      type: 'confirmation',
      title: 'Confirmar Saída',
      message: 'Tem certeza que deseja sair do sistema?',
      confirmText: 'Sair',
      cancelText: 'Cancelar',
    });

    if (confirmed) {
      const result = await logout();
      if (result.success) {
        navigate('/admin/login', { replace: true });
      } else {
        await showModal({
          type: 'error',
          title: 'Erro ao Sair',
          message: 'Não foi possível fazer logout. Tente novamente.',
          confirmText: 'OK',
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden w-full bg-neutral-50">
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-label="Fechar menu"
        aria-hidden={!sidebarOpen}
      />

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full bg-white shadow-2xl overflow-y-auto">
          <AdminSidebar
            currentPage={currentPage}
            onLogout={handleLogout}
            isMobile
            onNavigate={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 w-full">
        <header className="fixed top-0 right-0 left-0 z-20 bg-white border-b border-neutral-300 shadow-sm">
          <AdminHeader
            onMenuClick={() => setSidebarOpen(true)}
            onLogout={handleLogout}
          />
        </header>

        <main className="flex-1 pt-[64px] min-h-screen bg-neutral-50 py-8 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              {currentPage !== 'dashboard' && (
                <button
                  onClick={() => navigate(-1)}
                  className="bg-white text-neutral-700 p-3 rounded-md shadow-sm hover:bg-neutral-50 transition-colors flex items-center gap-2 px-4 border border-neutral-300"
                  aria-label="Voltar"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-semibold text-sm">Voltar</span>
                </button>
              )}
              <button
                onClick={() => setSidebarOpen(true)}
                className={`bg-primary-700 text-white p-3 rounded-md shadow-sm hover:bg-primary-800 transition-colors flex items-center gap-2 px-4 ${
                  currentPage === 'dashboard' ? 'ml-auto' : ''
                }`}
                aria-label="Abrir menu"
              >
                <Menu className="w-5 h-5" />
                <span className="font-semibold text-sm">Menu</span>
              </button>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
