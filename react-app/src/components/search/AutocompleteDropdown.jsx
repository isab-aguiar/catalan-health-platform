import { MapPin } from 'lucide-react';
import Badge from '../common/Badge';

/**
 * AutocompleteDropdown Component
 * Dropdown com sugestões de autocomplete
 * Aparece abaixo do SearchBar
 */

export default function AutocompleteDropdown({
  suggestions,
  onSelect,
  searchTerm = '',
  className = '',
}) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  // Função para destacar termo buscado
  const highlightMatch = (text, term) => {
    if (!term) return text;

    const index = text.toLowerCase().indexOf(term.toLowerCase());
    if (index === -1) return text;

    const before = text.substring(0, index);
    const match = text.substring(index, index + term.length);
    const after = text.substring(index + term.length);

    return (
      <>
        {before}
        <mark className="bg-primary-surface font-semibold px-0.5 rounded">{match}</mark>
        {after}
      </>
    );
  };

  return (
    <div
      className={`absolute top-full left-0 right-0 mt-2 bg-white border-2 border-primary
                  rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 animate-slide-down ${className}`}
    >
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="w-full flex items-center gap-3 p-3.5 hover:bg-primary-surface
                   transition-colors text-left border-b border-border last:border-b-0
                   focus:outline-none focus:bg-primary-surface"
          aria-label={`Selecionar ${suggestion.street}`}
        >
          <MapPin size={20} className="text-primary flex-shrink-0" strokeWidth={2} />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-text-primary text-sm truncate">
              {highlightMatch(suggestion.street, searchTerm)}
            </p>
            <p className="text-xs text-text-secondary truncate mt-0.5">
              {suggestion.numberRange}
            </p>
          </div>
          <Badge variant="primary" size="sm">
            {suggestion.esf.replace('ESF ', '')}
          </Badge>
        </button>
      ))}
    </div>
  );
}
