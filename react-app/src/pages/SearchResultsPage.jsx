import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, ArrowRight, Home } from 'lucide-react';
import Fuse from 'fuse.js';
import { allPagesData } from '../data/allPagesData';
import Card from '../components/common/Card';
import BackButton from '../components/common/BackButton';

/**
 * SearchResultsPage
 * Página que exibe resultados completos da busca quando usuário não seleciona autocomplete
 */

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query.length > 0) {
      const fuse = new Fuse(allPagesData, {
        keys: ['title', 'keywords', 'description'],
        threshold: 0.4, // Mais permissivo para resultados completos
        includeScore: true,
        minMatchCharLength: 2,
      });

      const searchResults = fuse.search(query);
      setResults(searchResults);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [query]);

  // Agrupar resultados por hub
  const groupedResults = results.reduce((acc, result) => {
    const hub = result.item.hub || 'Outros';
    if (!acc[hub]) {
      acc[hub] = [];
    }
    acc[hub].push(result);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Header da busca */}
      <section className="py-12 px-4 bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <BackButton className="mb-0 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40 backdrop-blur-md shadow-none" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Resultados da Busca
            </h1>
          </div>
          
          {query && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3 text-white">
                <Search size={20} />
                <span className="text-lg">
                  Buscando por: <strong className="font-bold">"{query}"</strong>
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Resultados */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
              <p className="mt-4 text-neutral-600">Buscando...</p>
            </div>
          ) : results.length === 0 ? (
            // Sem resultados
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={48} className="text-neutral-400" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                Nenhum resultado encontrado
              </h2>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                Não encontramos nenhuma página ou serviço para <strong>"{query}"</strong>.
                Tente buscar por outros termos ou navegue pelos nossos hubs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/"
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Voltar para Início
                </Link>
                <Link
                  to="/servicos"
                  className="px-6 py-3 bg-white border-2 border-neutral-200 hover:border-primary-300 text-neutral-900 rounded-lg font-semibold transition-colors"
                >
                  Ver Todos os Serviços
                </Link>
              </div>
            </div>
          ) : (
            // Com resultados
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900">
                  {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                </h2>
                <p className="text-neutral-600 mt-1">
                  Clique em um card para acessar a página
                </p>
              </div>

              {/* Resultados agrupados por hub */}
              {Object.entries(groupedResults).map(([hub, hubResults]) => (
                <div key={hub} className="mb-12">
                  <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary-600 rounded-full" />
                    {hub}
                    <span className="text-sm font-normal text-neutral-500">
                      ({hubResults.length})
                    </span>
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hubResults.map((result, index) => (
                      <Card
                        key={index}
                        title={result.item.title}
                        description={result.item.description}
                        icon={result.item.icon}
                        href={result.item.path}
                        variant="default"
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Link para voltar */}
              <div className="mt-12 text-center">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                >
                  <Home size={20} />
                  Voltar para página inicial
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
