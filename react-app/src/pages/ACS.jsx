import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  Search, 
  Filter, 
  Home,
  UserCircle2,
  X
} from 'lucide-react';
import { microareasData } from '../data/microareas';
import ACSModal from '../components/search/ACSModal';
import { useACSSearch } from '../hooks/useACSSearch';
import { normalize } from '../utils/normalize';
import BackButton from '../components/common/BackButton';

/**
 * ACS Page
 * Página completa com galeria de todos os ACS, busca inteligente com autocomplete e filtros
 */

export default function ACSPage() {
  // Usar hook de busca inteligente
  const { query, setQuery, suggestions: acsSearchSuggestions } = useACSSearch();
  
  const [selectedESF, setSelectedESF] = useState('all');
  const [selectedACS, setSelectedACS] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Extrair todas as ESFs únicas (exceto São Judas migrada)
  const allESFs = Object.keys(microareasData).filter(esf => 
    !microareasData[esf].migrada
  );

  // Flatten todos os ACS com suas informações da ESF
  const allACS = useMemo(() => {
    const acsArray = [];
    
    Object.entries(microareasData).forEach(([esfName, esfData]) => {
      // Pular ESF migrada
      if (esfData.migrada) return;
      
      esfData.microareas.forEach(microarea => {
        acsArray.push({
          nome: microarea.acs,
          microarea: microarea.numero,
          esf: esfName,
          medico: esfData.medico,
          enfermeira: esfData.enfermeira,
          dentista: esfData.dentista,
          asb: esfData.asb || '',
          bio: microarea.bio || null,
          photo: microarea.photo || null,
          ruas: microarea.ruas,
          observacao: esfData.observacao || null,
        });
      });
    });
    
    return acsArray;
  }, []);

  // Criar sugestões combinadas: busca inteligente + busca por nome de ACS
  const suggestions = useMemo(() => {
    if (query.trim().length < 2) return [];

    const normalizedQuery = normalize(query);
    const matches = [];
    const seen = new Set();

    // 1. Adicionar resultados da busca inteligente (endereços com números)
    acsSearchSuggestions.forEach(suggestion => {
      const key = `${suggestion.esf}-${suggestion.microarea}`;
      if (!seen.has(key)) {
        seen.add(key);
        matches.push({
          type: 'rua',
          label: suggestion.street,
          subtitle: `ACS: ${suggestion.acs} - ${suggestion.esf}`,
          numberRange: suggestion.numberRange,
          data: suggestion
        });
      }
    });

    // 2. Adicionar busca por nome do ACS (fallback simples)
    allACS.forEach(acs => {
      const key = `${acs.esf}-${acs.microarea}`;
      if (!seen.has(key) && normalize(acs.nome).includes(normalizedQuery)) {
        seen.add(key);
        matches.push({
          type: 'acs',
          label: acs.nome,
          subtitle: `${acs.esf} - Microárea ${acs.microarea}`,
          data: acs
        });
      }
    });

    // Limitar a 8 sugestões
    return matches.slice(0, 8);
  }, [query, acsSearchSuggestions, allACS]);

  // Filtrar ACS por busca e ESF
  const filteredACS = useMemo(() => {
    let filtered = allACS;

    // Se tem busca ativa, usar resultados do useACSSearch
    if (query.trim().length >= 2) {
      const normalizedQuery = normalize(query);
      
      // Criar Set de ACS únicos dos resultados da busca inteligente
      const searchResultKeys = new Set(
        acsSearchSuggestions.map(s => `${s.esf}-${s.microarea}`)
      );
      
      // Filtrar por resultados de busca inteligente OU por nome do ACS
      filtered = filtered.filter(acs => {
        const key = `${acs.esf}-${acs.microarea}`;
        const matchesSmart = searchResultKeys.has(key);
        const matchesName = normalize(acs.nome).includes(normalizedQuery);
        return matchesSmart || matchesName;
      });
    } else {
      // Quando não há busca ativa, ocultar áreas descobertas e ESF São Judas da listagem
      filtered = filtered.filter(acs => {
        const isAreaDescoberta = acs.nome.includes('Área Descoberta');
        const isSaoJudas = acs.esf === 'ESF SÃO JUDAS';
        return !isAreaDescoberta && !isSaoJudas;
      });
    }

    // Aplicar filtro de ESF
    if (selectedESF !== 'all') {
      filtered = filtered.filter(acs => acs.esf === selectedESF);
    }

    return filtered;
  }, [query, acsSearchSuggestions, selectedESF, allACS]);

  const handleSuggestionClick = (suggestion) => {
    setQuery('');
    setShowSuggestions(false);
    
    // Montar objeto ACS completo para o modal
    let acsData;
    
    if (suggestion.type === 'rua') {
      // Busca por rua - montar objeto do suggestion
      acsData = {
        nome: suggestion.data.acs,
        microarea: suggestion.data.microarea,
        esf: suggestion.data.esf,
        medico: suggestion.data.medico,
        enfermeira: suggestion.data.enfermeira,
        dentista: suggestion.data.dentista,
        asb: suggestion.data.asb,
        bio: suggestion.data.bio,
        photo: suggestion.data.photo,
        observacao: suggestion.data.observacao,
        ruas: allACS.find(a => 
          a.nome === suggestion.data.acs && 
          a.esf === suggestion.data.esf
        )?.ruas || [],
        // Adicionar rua encontrada para destacar no modal
        searchedStreet: suggestion.label,
        searchedRange: suggestion.numberRange
      };
    } else {
      // Busca por nome - usar dados diretos
      acsData = suggestion.data;
    }
    
    setSelectedACS(acsData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <BackButton className="mb-0 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40 backdrop-blur-md shadow-none" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Agentes Comunitários de Saúde
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl">
            Conheça todos os Agentes Comunitários de Saúde (ACS) da UBS São José. 
            Busque por nome do ACS ou endereço.
          </p>

          {/* Busca e Filtros */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Campo de busca com autocomplete */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 z-10" size={20} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(e.target.value.length >= 2);
                  }}
                  onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setShowSuggestions(false);
                    if (e.key === 'Enter' && suggestions.length > 0) {
                      handleSuggestionClick(suggestions[0]);
                    }
                  }}
                  placeholder="Ex: Maria Silva ou Rua Amazonas 330"
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border-2 border-white/30 rounded-lg text-white placeholder-white/60 focus:bg-white/30 focus:border-white focus:outline-none transition-all"
                />

                {/* Dropdown de Sugestões */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-strong overflow-hidden z-20 max-h-96 overflow-y-auto animate-slide-down">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full flex items-start gap-3 p-4 hover:bg-primary-50 transition-colors text-left border-b border-neutral-100 last:border-0"
                      >
                        <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          {suggestion.type === 'acs' ? (
                            <UserCircle2 size={20} className="text-primary-600" />
                          ) : (
                            <MapPin size={20} className="text-primary-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-neutral-900">
                            {suggestion.label}
                          </p>
                          <p className="text-sm text-neutral-600">
                            {suggestion.subtitle}
                          </p>
                          {suggestion.numberRange && (
                            <p className="text-xs text-neutral-500 mt-1">
                              Números: {suggestion.numberRange}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Filtro por ESF */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                <select
                  value={selectedESF}
                  onChange={(e) => setSelectedESF(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border-2 border-white/30 rounded-lg text-white focus:bg-white/30 focus:border-white focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="all" className="text-neutral-900 bg-white">
                    Todas as ESFs ({allACS.length} Microáreas)
                  </option>
                  {allESFs.map(esf => {
                    const count = allACS.filter(acs => acs.esf === esf).length;
                    return (
                      <option key={esf} value={esf} className="text-neutral-900 bg-white">
                        {esf} ({count} Microáreas)
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Contador de resultados */}
            <div className="mt-4 flex items-center gap-2 text-white/90">
              <Users size={18} />
              <span className="font-semibold">
                {filteredACS.length} {filteredACS.length === 1 ? 'microárea encontrada' : 'microáreas encontradas'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de ACS */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {filteredACS.length === 0 ? (
            // Sem resultados
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={48} className="text-neutral-400" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                Nenhum ACS encontrado
              </h2>
              <p className="text-neutral-600 mb-8">
                Tente ajustar os filtros ou buscar por outros termos.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedESF('all');
                }}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            // Grid de cards
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredACS.map((acs, index) => (
                <ACSCard 
                  key={`${acs.esf}-${acs.microarea}-${index}`} 
                  acs={acs}
                  onClick={() => setSelectedACS(acs)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal de ACS */}
      {selectedACS && (
        <ACSModal
          acs={selectedACS}
          onClose={() => setSelectedACS(null)}
        />
      )}
    </div>
  );
}

/**
 * Card individual de ACS (simplificado - sem equipe)
 */
function ACSCard({ acs, onClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl border-2 border-neutral-200 hover:border-primary-300 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md cursor-pointer group"
    >
      {/* Header do Card */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white">
        <div className="flex items-start gap-4">
          {/* Avatar com foto ou ícone */}
          <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-white/30 bg-white/20">
            {acs.photo && !imageError ? (
              <img
                src={acs.photo}
                alt={`Foto de ${acs.nome}`}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <UserCircle2 size={40} strokeWidth={1.5} className="text-white" />
            )}
          </div>
          
          {/* Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1 group-hover:text-white/90 transition-colors">
              {acs.nome}
            </h3>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <MapPin size={14} />
              <span>Microárea {acs.microarea}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-6">
        {/* ESF */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold">
            <Users size={14} />
            {acs.esf}
          </div>
        </div>

        {/* Ruas de cobertura */}
        <div className="border-t border-neutral-200 pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="w-full flex items-center justify-between text-left hover:text-primary-600 transition-colors"
          >
            <h4 className="font-semibold text-neutral-900 text-sm flex items-center gap-2">
              <MapPin size={16} className="text-primary-600" />
              Ruas de Cobertura ({acs.ruas.length})
            </h4>
            <span className="text-primary-600 text-xs font-semibold">
              {isExpanded ? 'Ocultar' : 'Ver todas'}
            </span>
          </button>

          {isExpanded && (
            <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
              {acs.ruas.map((rua, idx) => (
                <div 
                  key={idx} 
                  className="pl-4 border-l-2 border-primary-200 py-1"
                >
                  <p className="text-sm font-semibold text-neutral-900">{rua.nome}</p>
                  <p className="text-xs text-neutral-600">{rua.numeros}</p>
                </div>
              ))}
            </div>
          )}
          
          {!isExpanded && (
            <div className="mt-3 space-y-1">
              {acs.ruas.slice(0, 3).map((rua, idx) => (
                <div key={idx} className="text-xs text-neutral-600 truncate">
                  • {rua.nome} ({rua.numeros})
                </div>
              ))}
              {acs.ruas.length > 3 && (
                <p className="text-xs text-primary-600 font-medium">
                  + {acs.ruas.length - 3} ruas
                </p>
              )}
            </div>
          )}
        </div>

        {/* CTA para abrir modal */}
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <div className="text-center text-sm text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
            Clique para ver detalhes completos →
          </div>
        </div>
      </div>
    </div>
  );
}
