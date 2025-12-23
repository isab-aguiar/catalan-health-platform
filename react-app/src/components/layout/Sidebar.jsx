import { Link, useLocation } from "react-router-dom";
import { Building2, X } from "lucide-react";
import { useEffect } from "react";

/**
 * Sidebar Component
 * Menu lateral fixo para desktop (aparece ao clicar no menu)
 */

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  // Fechar sidebar ao clicar em um link
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Prevenir scroll do body quando sidebar está aberta
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/servicos" },
    { name: "Grupos", path: "/grupos" },
    { name: "Equipe", path: "/equipe" },
    { name: "Remsa", path: "/remsa" },
    { name: "ACS", path: "/acs" },
    { name: "Educação", path: "/educacao" },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="hidden lg:block fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="hidden lg:flex fixed right-0 top-0 h-full w-64 bg-white border-l border-neutral-200 flex-col z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
        {/* Logo (não clicável) e Botão Fechar */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Fechar menu"
          >
            <X size={20} className="text-neutral-700" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-soft">
              <Building2 size={24} className="text-white" />
            </div>
            <span className="font-bold text-lg text-neutral-900">
              UBS São José
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary-50 text-primary-700 font-semibold"
                        : "text-neutral-700 hover:bg-neutral-50 hover:text-primary-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
