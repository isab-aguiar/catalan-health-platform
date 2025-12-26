import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { usePageSearch } from '../../hooks/usePageSearch';

export default function GlobalSearch({ onClose }) {
  const [query, setQuery] = useState('');
  const results = usePageSearch(query);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleResultClick = (path) => {
    navigate(path);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && query.length > 2) {
      if (results.length > 0) {
        handleResultClick(results[0].item.path);
      } else {
        navigate(`/search-results?query=${query}`);
        onClose();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div className="container mx-auto px-4 pt-20">
        <div
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-strong overflow-hidden animate-slide-down"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-4 p-4 border-b border-neutral-200">
            <Search size={24} className="text-neutral-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: vacinas, agendamento, triagem, Dr. João..."
              className="flex-1 text-lg outline-none"
            />
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 p-1"
              aria-label="Fechar busca"
            >
              <X size={24} />
            </button>
          </div>

          {results.length > 0 && (
            <>
              <div className="max-h-96 overflow-y-auto">
                {results.map((result, index) => {
                  const IconComponent = result.item.icon;
                  const isReactComponent =
                    IconComponent &&
                    (typeof IconComponent === 'function' ||
                      (typeof IconComponent === 'object' && IconComponent?.$$typeof));
                  return (
                    <button
                      key={index}
                      onClick={() => handleResultClick(result.item.path)}
                      className="w-full flex items-start gap-4 p-4 hover:bg-neutral-50 transition-colors text-left group"
                    >
                      {result.item.icon && (
                        <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                          {isReactComponent ? (
                            <IconComponent size={20} />
                          ) : (
                            <span className="text-2xl">{result.item.icon}</span>
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-neutral-900 truncate group-hover:text-primary-600 transition-colors">
                          {result.item.title}
                        </h3>
                        <p className="text-sm text-neutral-600 line-clamp-2">
                          {result.item.description}
                        </p>
                        <span className="text-xs text-primary-600 font-medium mt-1 inline-block">
                          {result.item.hub}
                        </span>
                      </div>
                      <ArrowRight
                        size={20}
                        className="text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2"
                      />
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-neutral-200 p-4">
                <button
                  onClick={() => {
                    navigate(`/search-results?query=${query}`);
                    onClose();
                  }}
                  className="w-full py-3 bg-primary-50 hover:bg-primary-100 text-primary-700 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Search size={18} />
                  Ver todos os resultados para &quot;{query}&quot;
                </button>
              </div>
            </>
          )}

          {query.length > 2 && results.length === 0 && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-neutral-400" />
              </div>
              <p className="text-neutral-600">
                Nenhum resultado encontrado para <strong>&quot;{query}&quot;</strong>
              </p>
            </div>
          )}

          {query.length <= 2 && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-primary-500" />
              </div>
              <p className="text-neutral-600">
                Digite pelo menos <strong>3 caracteres</strong> para buscar
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
