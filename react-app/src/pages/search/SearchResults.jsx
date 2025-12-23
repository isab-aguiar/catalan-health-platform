import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePageSearch } from '../../hooks/usePageSearch';
import Card from '../../components/common/Card';
import { Search } from 'lucide-react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const results = usePageSearch(query);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-neutral-900 mb-6">
        Resultados da Busca para "<span className="text-primary-600">{query}</span>"
      </h1>

      {results.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result, index) => (
            <Card
              key={index}
              title={result.item.title}
              description={result.item.description}
              icon={result.item.icon}
              href={result.item.path}
              badge={result.item.hub}
              variant="default"
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-neutral-50 rounded-2xl shadow-soft">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-neutral-400" />
          </div>
          <p className="text-neutral-600 text-lg">
            Nenhum resultado encontrado para <strong>"{query}"</strong>
          </p>
        </div>
      )}
    </div>
  );
}
