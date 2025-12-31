import { useState, useRef, useEffect } from 'react';
import { Search, X, Plus } from 'lucide-react';
import { getAllEmployees } from '../../config/employees';

/**
 * Componente de autocomplete para adicionar profissionais
 * Mostra sugestões conforme o usuário digita
 */
export default function ProfissionalAutocomplete({ onAddProfissional }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const allEmployees = getAllEmployees();

  // Atualizar sugestões conforme digita
  useEffect(() => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = allEmployees.filter(emp =>
      emp.displayName.toLowerCase().includes(term) ||
      emp.fullName.toLowerCase().includes(term) ||
      emp.role.toLowerCase().includes(term)
    ).slice(0, 8); // Limitar a 8 sugestões

    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setSelectedIndex(-1);
  }, [searchTerm]);

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navegação por teclado
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (employee) => {
    onAddProfissional({
      id: employee.id,
      nome: employee.displayName,
      funcao: employee.role,
      turno: 'manha' // Default, usuário pode alterar depois
    });

    setSearchTerm('');
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder="Digite o nome do profissional (ex: Maria)"
          className="block w-full pl-10 pr-10 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-neutral-700"
          >
            <X className="h-5 w-5 text-neutral-400" />
          </button>
        )}
      </div>

      {/* Sugestões */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-neutral-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((employee, index) => (
            <button
              key={employee.id}
              onClick={() => handleSelectSuggestion(employee)}
              className={`w-full text-left px-4 py-3 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none border-b border-neutral-100 last:border-b-0 ${
                index === selectedIndex ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-neutral-900">
                    {employee.displayName}
                  </div>
                  <div className="text-xs text-neutral-600 mt-0.5">
                    {employee.role}
                  </div>
                </div>
                <Plus className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Mensagem quando não encontrar */}
      {showSuggestions && searchTerm.length >= 2 && suggestions.length === 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-neutral-300 rounded-md shadow-lg p-4"
        >
          <p className="text-sm text-neutral-600 text-center">
            Nenhum profissional encontrado para "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
}
