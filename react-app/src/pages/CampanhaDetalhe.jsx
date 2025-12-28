import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import CampanhaInfoCard from '../components/campaign/CampanhaInfoCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { buscarCampanhaPorId } from '../services/campanhasService';

export default function CampanhaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campanha, setCampanha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCampanha();
  }, [id]);

  const loadCampanha = async () => {
    try {
      setLoading(true);
      const data = await buscarCampanhaPorId(id);
      setCampanha(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-error mb-4">Erro ao carregar campanha: {error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!campanha) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-neutral-600 mb-4">Campanha não encontrada</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container-custom max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>

        {/* Campaign Image */}
        {campanha.imagemURL && (
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-medium">
            <img
              src={campanha.imagemURL}
              alt={campanha.titulo}
              className="w-full max-h-64 sm:max-h-80 md:max-h-96 object-cover"
            />
            {campanha.imageCredit && (
              <div className="absolute bottom-0 right-0 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-tl-lg">
                <p className="text-xs text-white/95 italic">
                  {campanha.imageCredit}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Campaign Content */}
        <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6 md:p-8 mb-8">
          {/* Category Badge */}
          {campanha.categoria && (
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
              campanha.categoria === 'vacina'
                ? 'bg-info/10 text-primary-700'
                : campanha.categoria === 'material'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-success/10 text-green-700'
            }`}>
              {campanha.categoria}
            </span>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
            {campanha.titulo}
          </h1>

          {/* Subtitle */}
          {campanha.subtitulo && (
            <p className="text-lg text-neutral-600 italic mb-6">
              {campanha.subtitulo}
            </p>
          )}

          {/* Description */}
          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
              {campanha.descricao}
            </p>
          </div>
        </div>

        {/* Campaign Info Card */}
        <CampanhaInfoCard campanha={campanha} />
      </div>
    </div>
  );
}
