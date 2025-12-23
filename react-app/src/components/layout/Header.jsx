import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Building2, Search } from "lucide-react";
import MobileMenu from "./MobileMenu";
import GlobalSearch from "../search/GlobalSearch";
import { usePageSearch } from "../../hooks/usePageSearch";

/**
 * Header Component
 * Cabeçalho sticky com navegação e menu mobile
 */

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const searchResults = usePageSearch(searchQuery);

  // Fechar resultados ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mostrar resultados quando há query
  useEffect(() => {
    if (searchQuery.length >= 3) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.length >= 3) {
      if (searchResults.length > 0) {
        navigate(searchResults[0].item.path);
        setSearchQuery("");
        setShowSearchResults(false);
      } else {
        navigate(`/search-results?query=${searchQuery}`);
        setSearchQuery("");
        setShowSearchResults(false);
      }
    } else if (e.key === "Escape") {
      setShowSearchResults(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/servicos" },
    { name: "Grupos", path: "/grupos" },
    { name: "Equipe", path: "/equipe" },
    { name: "Remsa", path: "/remsa" },
    { name: "ACS", path: "/acs" },
    { name: "Educação", path: "/educacao" },
  ];

  return (
    <>
      {/* Logo Fixo - Canto Superior Esquerdo */}
      <Link
        to="/"
        className="fixed top-0 left-0 z-50 p-3 bg-white hover:bg-neutral-50 transition-colors border-b border-r border-neutral-200 rounded-br-lg lg:border-0 lg:rounded-none flex items-center gap-2 group"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-soft group-hover:shadow-medium transition-shadow">
          <Building2 size={24} className="text-white" />
        </div>
        <span className="font-bold text-lg text-neutral-900 hidden sm:inline">
          UBS São José
        </span>
      </Link>

      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-soft lg:border-l pl-[140px] sm:pl-[200px] pr-[60px]">
        <div className="w-full h-[70px] flex items-center justify-center">
          {/* Barra de Pesquisa Centralizada - Desktop */}
          <div
            ref={searchRef}
            className="hidden lg:flex w-full max-w-2xl relative"
          >
            <div className="relative w-full">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => {
                  if (searchQuery.length >= 3) {
                    setShowSearchResults(true);
                  }
                }}
                placeholder="Buscar: vacinas, agendamento, triagem..."
                className="w-full pl-12 pr-4 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-lg focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowSearchResults(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  aria-label="Limpar busca"
                >
                  <X size={18} />
                </button>
              )}

              {/* Dropdown de Resultados */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {searchResults.slice(0, 5).map((result, index) => {
                    const IconComponent = result.item.icon;
                    const isReactComponent =
                      IconComponent &&
                      (typeof IconComponent === "function" ||
                        (typeof IconComponent === "object" &&
                          IconComponent?.$$typeof));

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          navigate(result.item.path);
                          setSearchQuery("");
                          setShowSearchResults(false);
                        }}
                        className="w-full flex items-start gap-3 p-3 hover:bg-neutral-50 transition-colors text-left group border-b border-neutral-100 last:border-b-0"
                      >
                        {result.item.icon && (
                          <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                            {isReactComponent ? (
                              <IconComponent size={16} />
                            ) : (
                              <span className="text-lg">
                                {result.item.icon}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-neutral-900 truncate group-hover:text-primary-600 transition-colors">
                            {result.item.title}
                          </h3>
                          <p className="text-xs text-neutral-600 line-clamp-1">
                            {result.item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                  {searchResults.length > 5 && (
                    <button
                      onClick={() => {
                        navigate(`/search-results?query=${searchQuery}`);
                        setSearchQuery("");
                        setShowSearchResults(false);
                      }}
                      className="w-full p-3 text-sm text-primary-600 hover:bg-primary-50 font-semibold border-t border-neutral-200"
                    >
                      Ver todos os {searchResults.length} resultados
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      {isSearchOpen && <GlobalSearch onClose={() => setIsSearchOpen(false)} />}

      {/* Mobile Menu Toggle - Fixo no canto superior direito */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-0 right-0 z-50 p-3 bg-white hover:bg-neutral-100 transition-colors border-b border-l border-neutral-200 rounded-bl-lg"
        aria-label="Menu"
      >
        {isMobileMenuOpen ? (
          <X size={24} className="text-neutral-700" />
        ) : (
          <Menu size={24} className="text-neutral-700" />
        )}
      </button>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
