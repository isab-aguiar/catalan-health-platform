import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Phone, Clock, MapPin, ClipboardPlus } from "lucide-react";

/**
 * MobileMenu Component
 * Menu overlay para navegação mobile
 */

export default function MobileMenu({ isOpen, onClose, navLinks }) {
  // Prevent body scroll when menu is open
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

  const handleLinkClick = (e, link) => {
    if (link.onClick) {
      link.onClick(e);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 lg:hidden animate-fade-in"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-[70px] left-0 right-0 bottom-0 bg-white z-50 lg:hidden overflow-y-auto animate-slide-down">
        <nav className="container mx-auto max-w-6xl px-4 py-6">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="block px-4 py-3 text-lg font-medium text-neutral-900 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact Info */}
          <div className="mt-8 p-4 bg-primary-50 rounded-lg">
            <h3 className="font-bold text-primary-700 mb-3">Contato</h3>
            <div className="space-y-2 text-sm text-neutral-700">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary-600 flex-shrink-0" />
                <p>(37) 3229-6080</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary-600 flex-shrink-0" />
                <p>07:00 - 17:00 (Seg-Sex)</p>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardPlus
                  size={16}
                  className="text-primary-600 flex-shrink-0"
                />
                <p>Saúde na Hora: 17:00 - 22:00</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary-600 flex-shrink-0" />
                <p>
                  Rua Júlio Nogueira, 1320
                  <br />
                  São José, Divinópolis - MG
                </p>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
