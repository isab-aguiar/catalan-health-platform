import { useEffect, useRef, useState } from 'react';
import Alert from '../common/Alert';
import { useACSSearch } from '../../hooks/useACSSearch';
import ACSModal from './ACSModal';
import AutocompleteDropdown from './AutocompleteDropdown';
import MigrationAlert from './MigrationAlert';
import SearchBar from './SearchBar';

export default function SearchSection({ className = '' }) {
  const { query, setQuery, results, suggestions } = useACSSearch();
  const [selectedACS, setSelectedACS] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setSelectedACS(null);
  };

  const handleSuggestionSelect = (suggestion) => {
    setQuery(suggestion.street);
    setShowSuggestions(false);
    setSelectedACS(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && results.length > 0) {
      setSelectedACS(results[0]);
      setShowSuggestions(false);
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className={className}>
      <div ref={searchRef} className="relative max-w-3xl mx-auto">
        <SearchBar
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="Ex: Rua Amazonas, Av. Brasil, ou digite seu endereço completo..."
        />

        {showSuggestions && (
          <AutocompleteDropdown
            suggestions={suggestions}
            onSelect={handleSuggestionSelect}
            searchTerm={query.replace(/\d+/g, '').trim()}
          />
        )}
      </div>

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
              <strong>Exemplos:</strong> &quot;Amazonas 330&quot;, &quot;Av Amazonas 330&quot;,
              &quot;Avenida Amazonas 330&quot;
            </p>
          </Alert>
        </div>
      )}

      {query.length === 0 && (
        <div className="mt-6 max-w-3xl mx-auto text-center">
          <p className="text-white text-sm">
            Digite o nome da sua rua ou endereço completo para localizar sua
            equipe de saúde
          </p>
        </div>
      )}
    </div>
  );
}
