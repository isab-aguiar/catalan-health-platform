import { Calendar, Clock, MapPin, Users, Phone, MessageCircle } from 'lucide-react';

export default function CampanhaInfoCard({ campanha }) {
  if (!campanha) return null;

  // WhatsApp configuration - usando número encontrado em Home.jsx
  const WHATSAPP_NUMBER = '5537991770200';

  const getWhatsAppMessage = () => {
    const message = `Olá! Gostaria de saber mais sobre a campanha: *${campanha.titulo}*`;
    return encodeURIComponent(message);
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${getWhatsAppMessage()}`;

  // Helper to format dates
  const formatDate = (date) => {
    if (!date) return null;
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Check if any metadata exists
  const hasMetadata = campanha.local || campanha.horario || campanha.publicoAlvo ||
                      campanha.contato || campanha.dataInicio || campanha.dataFim;

  if (!hasMetadata) return null;

  return (
    <div className="bg-white rounded-xl border-2 border-primary-100 shadow-soft overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Informações da Campanha
        </h3>
      </div>

      {/* Content Grid */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Data Início/Fim */}
          {(campanha.dataInicio || campanha.dataFim) && (
            <div className="bg-primary-50 rounded-lg p-4 border-l-4 border-primary-600">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary-700 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-primary-900 mb-1">
                    Período
                  </p>
                  <p className="text-sm text-primary-800">
                    {campanha.dataInicio && formatDate(campanha.dataInicio)}
                    {campanha.dataInicio && campanha.dataFim && ' até '}
                    {campanha.dataFim && formatDate(campanha.dataFim)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Horário */}
          {campanha.horario && (
            <div className="bg-primary-50 rounded-lg p-4 border-l-4 border-primary-600">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-700 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-primary-900 mb-1">
                    Horário
                  </p>
                  <p className="text-sm text-primary-800">{campanha.horario}</p>
                </div>
              </div>
            </div>
          )}

          {/* Local */}
          {campanha.local && (
            <div className="bg-primary-50 rounded-lg p-4 border-l-4 border-primary-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-700 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-primary-900 mb-1">
                    Local
                  </p>
                  <p className="text-sm text-primary-800">{campanha.local}</p>
                </div>
              </div>
            </div>
          )}

          {/* Público-Alvo */}
          {campanha.publicoAlvo && (
            <div className="bg-primary-50 rounded-lg p-4 border-l-4 border-primary-600">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary-700 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-primary-900 mb-1">
                    Público-Alvo
                  </p>
                  <p className="text-sm text-primary-800">{campanha.publicoAlvo}</p>
                </div>
              </div>
            </div>
          )}

          {/* Contato */}
          {campanha.contato && (
            <div className="bg-primary-50 rounded-lg p-4 border-l-4 border-primary-600 md:col-span-2">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-700 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-primary-900 mb-1">
                    Contato
                  </p>
                  <p className="text-sm text-primary-800">{campanha.contato}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp CTA Button */}
        <div className="pt-4 border-t border-neutral-200">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-success hover:bg-success-dark text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg group"
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>{campanha.cta || 'Saiba Mais'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
