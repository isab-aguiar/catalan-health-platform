import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import { Menu } from "lucide-react";
export default function AdminLayout({ children, currentPage = "dashboard" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);
  const handleLogout = async () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      const result = await logout();
      if (result.success) {
        navigate("/admin/login", { replace: true });
      } else {
        alert("Erro ao fazer logout. Tente novamente.");
      }
    }
  };
  return (
    <div className="flex min-h-screen overflow-x-hidden w-full bg-neutral-50">
      {}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-label="Fechar menu"
        aria-hidden={!sidebarOpen}
      />
      {}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
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
      {}
      <div className="flex flex-col flex-1 w-full">
        {}
        <header className="fixed top-0 right-0 left-0 z-20 bg-white border-b border-slate-300 shadow-sm">
          <AdminHeader
            onMenuClick={() => setSidebarOpen(true)}
            onLogout={handleLogout}
          />
        </header>
        {}
        <main className="flex-1 pt-[64px] min-h-screen">
          {}
          <div className="px-4 pt-4 pb-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 flex items-center gap-2 px-4"
              aria-label="Abrir menu"
            >
              <Menu className="w-5 h-5" />
              <span className="font-semibold text-sm">Menu</span>
            </button>
          </div>
          {}
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
