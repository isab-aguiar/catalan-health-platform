import { useState, useRef, useEffect } from "react";
import { useACSSearch } from "../../hooks/useACSSearch";
import SearchBar from "./SearchBar";
import AutocompleteDropdown from "./AutocompleteDropdown";
import ACSModal from "./ACSModal";
import MigrationAlert from "./MigrationAlert";
import Alert from "../common/Alert";

/**
 * SearchSection Component
 * Seção completa de busca com autocomplete e modal de resultados
 * Integra SearchBar + AutocompleteDropdown + ACSModal
 */

export default function SearchSection({ className = "" }) {
  const { query, setQuery, results, suggestions } = useACSSearch();
  const [selectedACS, setSelectedACS] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mostrar sugestões quando usuário digita
  useEffect(() => {
    if (query.length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setSelectedACS(null); // Limpar resultado ao digitar
  };

  const handleSuggestionSelect = (suggestion) => {
    setQuery(suggestion.street);
    setShowSuggestions(false);
    setSelectedACS(suggestion); // Abre o modal
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      setSelectedACS(results[0]); // Abre o modal com o primeiro resultado
      setShowSuggestions(false);
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className={className}>
      {/* Search Input */}
      <div ref={searchRef} className="relative max-w-3xl mx-auto">
        <SearchBar
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="Ex: Rua Amazonas, Av. Brasil, ou digite seu endereço completo..."
        />

        {/* Autocomplete Suggestions */}
        {showSuggestions && (
          <AutocompleteDropdown
            suggestions={suggestions}
            onSelect={handleSuggestionSelect}
            searchTerm={query.replace(/\d+/g, "").trim()}
          />
        )}
      </div>

      {/* Modal de ACS ou Alerta de Migração */}
      {selectedACS && (
        <>
          {selectedACS.migrada ? (
            <MigrationAlert
              migrationInfo={selectedACS.novoLocal}
              onClose={() => setSelectedACS(null)}
            />
          ) : (
            <ACSModal acs={selectedACS} onClose={() => setSelectedACS(null)} />
          )}
        </>
      )}

      {/* No Results Message */}
      {query.length >= 2 && results.length === 0 && !selectedACS && (
        <div className="mt-8 max-w-3xl mx-auto">
          <Alert type="warning">
            <strong className="font-semibold">
              Nenhum resultado encontrado
            </strong>
            <p className="mt-1 text-sm">
              Verifique se digitou corretamente o nome da rua. Tente sem o
              número ou com uma variação diferente.
            </p>
            <p className="text-sm mt-2">
              <strong>Exemplos:</strong> "Amazonas 330", "Av Amazonas 330",
              "Avenida Amazonas 330"
            </p>
          </Alert>
        </div>
      )}

      {/* Initial Help Text */}
      {query.length === 0 && (
        <div className="mt-6 max-w-3xl mx-auto text-center">
          <p className="text-white/90 text-sm">
            Digite o nome da sua rua ou endereço completo para localizar sua equipe de saúde
          </p>
        </div>
      )}
    </div>
  );
}
