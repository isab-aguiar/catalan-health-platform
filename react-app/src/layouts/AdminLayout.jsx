import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLayout({ children, currentPage = 'dashboard' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  const handleLogout = async () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      const result = await logout();
      if (result.success) {
        navigate('/admin/login', { replace: true });
      } else {
        alert('Erro ao fazer logout. Tente novamente.');
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
            <button
              onClick={() => setSidebarOpen(true)}
              className="bg-primary-700 text-white p-3 rounded-md shadow-sm hover:bg-primary-800 transition-colors flex items-center gap-2 px-4 mb-6"
              aria-label="Abrir menu"
            >
              <Menu className="w-5 h-5" />
              <span className="font-semibold text-sm">Menu</span>
            </button>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
