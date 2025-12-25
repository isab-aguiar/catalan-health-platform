import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, Lock, User } from "lucide-react";
import MobileMenu from "./MobileMenu";
import GlobalSearch from "../search/GlobalSearch";
import { usePageSearch } from "../../hooks/usePageSearch";
import { useAuth } from "../../contexts/AuthContext";
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchResults = usePageSearch(searchQuery);
  const { currentUser } = useAuth();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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
  const handleContatoClick = (e) => {
    e.preventDefault();
    const scrollToElement = () => {
      const element = document.getElementById("contato");
      if (element) {
        const yOffset = -80;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };
    if (location.pathname === "/") {
      scrollToElement();
    } else {
      navigate("/");
      setTimeout(scrollToElement, 300);
    }
    setIsMobileMenuOpen(false);
  };
  const handleNavClick = (e, link) => {
    e.preventDefault();
    if (link.onClick) {
      // Se o link tem um onClick customizado (como Contato), usa ele
      link.onClick(e);
    } else {
      // Para outros links, navega e rola para o topo
      if (location.pathname === link.path) {
        // Se já estiver na página, apenas rola para o topo
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Navega para a página e rola para o topo
        navigate(link.path);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      }
      setIsMobileMenuOpen(false);
    }
  };
  const navLinks = [
    { name: "Início", path: "/", handleClick: handleNavClick },
    { name: "Serviços", path: "/servicos", handleClick: handleNavClick },
    {
      name: "Sala de Vacinação",
      path: "/servicos/vacinas",
      handleClick: handleNavClick,
    },
    { name: "Grupos", path: "/grupos", handleClick: handleNavClick },
    { name: "Equipe", path: "/equipe", handleClick: handleNavClick },
    { name: "Remsa", path: "/remsa", handleClick: handleNavClick },
    { name: "ACS", path: "/acs", handleClick: handleNavClick },
    { name: "Educação", path: "/educacao", handleClick: handleNavClick },
    {
      name: "Contato",
      path: "/#contato",
      isAnchor: true,
      onClick: handleContatoClick,
      handleClick: handleNavClick,
    },
  ];
  return (
    <>
      {!isMobileMenuOpen && (
        <Link
          to="/"
          className="fixed top-0 left-0 z-50 p-3 bg-white hover:bg-neutral-50 transition-colors flex items-center justify-center group overflow-hidden"
        >
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-soft group-hover:shadow-medium transition-shadow overflow-hidden flex-shrink-0">
            <img
              src="/favicon.png"
              alt="ESF Catalão - Saúde da Família"
              className="w-full h-full object-contain object-center"
              style={{
                imageRendering: "high-quality",
              }}
            />
          </div>
        </Link>
      )}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-neutral-200 shadow-soft lg:border-l pl-12 sm:pl-[140px] md:pl-[200px] pr-12 sm:pr-[60px] overflow-x-hidden w-full">
        <div className="w-full h-[70px] flex items-center justify-between gap-4 px-4">
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
          {}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {currentUser ? (
              <button
                onClick={() => navigate("/admin/painel")}
                className="flex items-center gap-2 px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg transition-colors font-medium text-sm"
              >
                <User size={18} />
                <span>Painel</span>
              </button>
            ) : (
              <button
                onClick={() => navigate("/admin/login")}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm hover:shadow-md"
              >
                <Lock size={18} />
                <span>Acesso Restrito</span>
              </button>
            )}
          </div>
        </div>
      </header>
      {isSearchOpen && <GlobalSearch onClose={() => setIsSearchOpen(false)} />}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed right-0 z-50 p-3 bg-white hover:bg-neutral-100 transition-colors"
        style={{ top: "12px" }}
        aria-label="Menu"
      >
        {isMobileMenuOpen ? (
          <X size={24} className="text-neutral-700" />
        ) : (
          <Menu size={24} className="text-neutral-700" />
        )}
      </button>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
