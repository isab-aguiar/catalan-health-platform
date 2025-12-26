import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, Lock, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    if (prevPathname.current !== location.pathname) {
      if (isOpen) {
        onClose();
      }
      prevPathname.current = location.pathname;
    }
  }, [location.pathname, isOpen, onClose]);

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

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Sala de Vacinação', path: '/servicos/vacinas' },
    { name: 'Grupos', path: '/grupos' },
    { name: 'Equipe', path: '/equipe' },
    { name: 'Remsa', path: '/remsa' },
    { name: 'ACS', path: '/acs' },
    { name: 'Educação', path: '/educacao' },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div
        className="hidden lg:block fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
      />
      <aside 
        className="hidden lg:flex fixed right-0 top-0 h-full w-64 bg-white border-l border-neutral-200 flex-col z-[55] shadow-xl transform transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex items-center justify-end">
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Fechar menu"
          >
            <X size={20} className="text-neutral-700" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 mb-4 -mt-2.5">
            {currentUser ? (
              <button
                onClick={() => {
                  navigate('/admin/painel');
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg transition-colors font-semibold"
              >
                <User size={20} />
                <span>Painel</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate('/admin/login');
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-semibold shadow-md"
              >
                <Lock size={20} />
                <span>Acesso Restrito</span>
              </button>
            )}
          </div>
          <ul className="space-y-1 px-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-600'
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
