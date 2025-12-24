// =========================================
// COMPONENTE CAMPANHA CARD
// =========================================
// Exibe campanhas visuais usando templates profissionais

import { memo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  AlertCircle,
  CheckCircle,
  Syringe,
  Package,
  Activity,
  ChevronRight
} from 'lucide-react';
import { campanhaTemplates } from '../../data/campanhaTemplates';
import { incrementarVisualizacoes, incrementarCliques } from '../../services/campanhasService';
import PDFViewer from './PDFViewer';

/**
 * Componente principal do Card de Campanha
 */
const CampanhaCard = memo(({ campanha, onClick }) => {
  // Selecionar template
  const template = campanhaTemplates[campanha.template] || campanhaTemplates.informativo;
  const estilo = template.estilo;

  // Registrar visualização (apenas uma vez)
  const handleVisualizacao = () => {
    if (campanha.id) {
      incrementarVisualizacoes(campanha.id);
    }
  };

  // Registrar clique
  const handleClick = () => {
    if (campanha.id) {
      incrementarCliques(campanha.id);
    }
    if (onClick) {
      onClick(campanha);
    }
  };

  // Renderizar componente baseado no template
  switch (campanha.template) {
    case 'vacinacao':
      return <TemplateVacinacao campanha={campanha} estilo={estilo} onClick={handleClick} />;
    
    case 'material':
      return <TemplateMaterial campanha={campanha} estilo={estilo} onClick={handleClick} />;
    
    case 'educacao':
      return <TemplateEducacao campanha={campanha} estilo={estilo} onClick={handleClick} />;
    
    case 'evento':
      return <TemplateEvento campanha={campanha} estilo={estilo} onClick={handleClick} />;
    
    case 'urgente':
      return <TemplateUrgente campanha={campanha} estilo={estilo} onClick={handleClick} />;
    
    default:
      return <TemplateInformativo campanha={campanha} estilo={estilo} onClick={handleClick} />;
  }
});

CampanhaCard.displayName = 'CampanhaCard';

/**
 * Template: Campanha de Vacinação
 */
const TemplateVacinacao = ({ campanha, estilo, onClick }) => {
  return (
    <div className={estilo.container}>
      {/* Header com gradiente azul */}
      <div className={estilo.header}>
        <div className="flex items-center justify-between">
          <span className={estilo.badge}>
            <Syringe className="w-4 h-4 inline mr-1" />
            Vacinação
          </span>
          {campanha.dataFim && (
            <span className="text-blue-100 text-sm">
              Até {formatarData(campanha.dataFim)}
            </span>
          )}
        </div>
        <h2 className={estilo.titulo}>{campanha.titulo}</h2>
        {campanha.subtitulo && (
          <p className={estilo.subtitulo}>{campanha.subtitulo}</p>
        )}
      </div>

      {/* Imagem (se houver) */}
      {campanha.imagemURL && (
        <img
          src={campanha.imagemURL}
          alt={campanha.titulo}
          className={estilo.imagem}
        />
      )}

      {/* PDF (se houver) */}
      {campanha.pdfURL && (
        <div className="px-6 pt-4">
          <PDFViewer
            pdfURL={campanha.pdfURL}
            pdfNome={campanha.pdfNome || 'documento.pdf'}
            height={500}
            showControls={true}
          />
        </div>
      )}

      {/* Corpo */}
      <div className={estilo.corpo}>
        <p className={estilo.descricao}>{campanha.descricao}</p>

        {/* Informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {campanha.dataInicio && (
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-sm">
                {formatarPeriodo(campanha.dataInicio, campanha.dataFim)}
              </span>
            </div>
          )}
          
          {campanha.horario && (
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm">{campanha.horario}</span>
            </div>
          )}
          
          {campanha.publicoAlvo && (
            <div className="flex items-center gap-2 text-slate-700">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm">{campanha.publicoAlvo}</span>
            </div>
          )}
          
          {campanha.local && (
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="text-sm">{campanha.local}</span>
            </div>
          )}
        </div>

        {/* Tópicos */}
        {campanha.topicos && campanha.topicos.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold text-slate-800 text-sm">Importante:</h4>
            <ul className="space-y-1">
              {campanha.topicos.map((topico, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-700 text-sm">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{topico}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        {onClick && (
          <button 
            onClick={onClick}
            className={estilo.cta + " w-full"}
          >
            {campanha.cta || 'Saiba Mais'}
            <ChevronRight className="w-5 h-5 inline ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Template: Aviso de Material
 */
const TemplateMaterial = ({ campanha, estilo, onClick }) => {
  return (
    <div className={estilo.container}>
      {/* Header */}
      <div className={estilo.header}>
        <AlertCircle className={estilo.icone} />
        <h2 className={estilo.titulo}>{campanha.titulo}</h2>
      </div>

      {/* Corpo */}
      <div className={estilo.corpo}>
        <span className={estilo.badge}>
          <Package className="w-3 h-3 inline mr-1" />
          {campanha.categoria === 'material' ? 'Material' : campanha.categoria}
        </span>

        <p className={estilo.descricao + " mt-4"}>{campanha.descricao}</p>

        {/* PDF (se houver) */}
        {campanha.pdfURL && (
          <div className="mt-4">
            <PDFViewer
              pdfURL={campanha.pdfURL}
              pdfNome={campanha.pdfNome}
              height={400}
            />
          </div>
        )}

        {campanha.dataValidade && (
          <div className={estilo.dataValidade}>
            <Calendar className="w-4 h-4 inline mr-1" />
            Atualizado em {formatarData(campanha.atualizadoEm || new Date())}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Template: Campanha Educativa
 */
const TemplateEducacao = ({ campanha, estilo, onClick }) => {
  return (
    <div className={estilo.container}>
      {/* Header com imagem em destaque */}
      <div className={estilo.header + " relative"}>
        {campanha.imagemURL && (
          <>
            <img 
              src={campanha.imagemURL} 
              alt={campanha.titulo}
              className={estilo.imagem}
            />
            <div className={estilo.overlay}></div>
            <span className={estilo.badge}>
              <Activity className="w-4 h-4 inline mr-1" />
              Educação em Saúde
            </span>
            <h2 className={estilo.titulo}>{campanha.titulo}</h2>
          </>
        )}
        
        {!campanha.imagemURL && (
          <div className="bg-green-600 text-white p-6">
            <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-3">
              <Activity className="w-4 h-4 inline mr-1" />
              Educação em Saúde
            </span>
            <h2 className="text-3xl font-bold text-white">{campanha.titulo}</h2>
          </div>
        )}
      </div>

      {/* Corpo */}
      <div className={estilo.corpo}>
        {campanha.subtitulo && (
          <h3 className={estilo.subtitulo}>{campanha.subtitulo}</h3>
        )}

        <p className={estilo.descricao}>{campanha.descricao}</p>

        {/* PDF (se houver) */}
        {campanha.pdfURL && (
          <div className="mt-4">
            <PDFViewer
              pdfURL={campanha.pdfURL}
              pdfNome={campanha.pdfNome}
              height={500}
            />
          </div>
        )}

        {/* Tópicos */}
        {campanha.topicos && campanha.topicos.length > 0 && (
          <div className={estilo.listaTopicos}>
            {campanha.topicos.map((topico, index) => (
              <div key={index} className={estilo.topicoItem}>
                <CheckCircle className={estilo.topicoIcone} />
                <span>{topico}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {onClick && (
          <button 
            onClick={onClick}
            className={estilo.cta + " w-full"}
          >
            {campanha.cta || 'Saiba Mais'}
            <ChevronRight className="w-5 h-5 inline ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Template: Evento
 */
const TemplateEvento = ({ campanha, estilo, onClick }) => {
  return (
    <div className={estilo.container}>
      {/* Imagem */}
      {campanha.imagemURL && (
        <img 
          src={campanha.imagemURL} 
          alt={campanha.titulo}
          className={estilo.imagem}
        />
      )}

      {/* Header */}
      <div className={estilo.header}>
        <span className={estilo.badge}>Evento</span>
        <h2 className={estilo.titulo}>{campanha.titulo}</h2>

        {/* Informações em grid */}
        <div className={estilo.infoGrid}>
          {campanha.dataInicio && (
            <div className={estilo.infoItem}>
              <Calendar className={estilo.infoIcone} />
              <div className={estilo.infoTexto}>
                <div className="font-semibold">Data</div>
                <div>{formatarData(campanha.dataInicio)}</div>
              </div>
            </div>
          )}

          {campanha.horario && (
            <div className={estilo.infoItem}>
              <Clock className={estilo.infoIcone} />
              <div className={estilo.infoTexto}>
                <div className="font-semibold">Horário</div>
                <div>{campanha.horario}</div>
              </div>
            </div>
          )}

          {campanha.local && (
            <div className={estilo.infoItem}>
              <MapPin className={estilo.infoIcone} />
              <div className={estilo.infoTexto}>
                <div className="font-semibold">Local</div>
                <div>{campanha.local}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Corpo */}
      <div className={estilo.corpo}>
        <p className={estilo.descricao}>{campanha.descricao}</p>

        {/* PDF (se houver) */}
        {campanha.pdfURL && (
          <div className="mt-4">
            <PDFViewer
              pdfURL={campanha.pdfURL}
              pdfNome={campanha.pdfNome}
              height={500}
            />
          </div>
        )}

        {campanha.topicos && campanha.topicos.length > 0 && (
          <div className="mt-4 space-y-1">
            {campanha.topicos.map((topico, index) => (
              <div key={index} className="flex items-center gap-2 text-slate-700 text-sm">
                <CheckCircle className="w-4 h-4 text-violet-600" />
                <span>{topico}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {onClick && (
          <button 
            onClick={onClick}
            className={estilo.inscricao}
          >
            {campanha.cta || 'Participar'}
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Template: Urgente
 */
const TemplateUrgente = ({ campanha, estilo, onClick }) => {
  return (
    <div className={estilo.container}>
      {/* Header com animação */}
      <div className={estilo.header}>
        <AlertCircle className={estilo.icone} />
        <div className="flex-1">
          <span className={estilo.badge}>URGENTE</span>
          <h2 className={estilo.titulo}>{campanha.titulo}</h2>
        </div>
      </div>

      {/* Corpo */}
      <div className={estilo.corpo}>
        {/* Alerta */}
        <div className={estilo.alerta}>
          <p className={estilo.alertaTexto}>
            ⚠️ Requer atenção imediata
          </p>
        </div>

        <p className={estilo.descricao}>{campanha.descricao}</p>

        {/* PDF (se houver) */}
        {campanha.pdfURL && (
          <div className="mt-4">
            <PDFViewer
              pdfURL={campanha.pdfURL}
              pdfNome={campanha.pdfNome}
              height={400}
            />
          </div>
        )}

        {campanha.contato && (
          <div className="mt-4 flex items-center gap-2 bg-red-50 p-3 rounded-lg">
            <Phone className="w-5 h-5 text-red-600" />
            <div>
              <div className="text-xs text-slate-600">Contato:</div>
              <div className="font-semibold text-slate-800">{campanha.contato}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Template: Informativo Simples
 */
const TemplateInformativo = ({ campanha, estilo, onClick }) => {
  return (
    <div className={estilo.container}>
      {campanha.imagemURL && (
        <img 
          src={campanha.imagemURL} 
          alt={campanha.titulo}
          className={estilo.imagem}
        />
      )}

      <div className={estilo.corpo}>
        <h2 className={estilo.titulo}>{campanha.titulo}</h2>
        <p className={estilo.descricao}>{campanha.descricao}</p>

        {/* PDF (se houver) */}
        {campanha.pdfURL && (
          <div className="mt-4">
            <PDFViewer
              pdfURL={campanha.pdfURL}
              pdfNome={campanha.pdfNome}
              height={500}
            />
          </div>
        )}

        {/* Footer */}
        <div className={estilo.footer}>
          <span className={estilo.dataPublicacao}>
            <Calendar className="w-4 h-4 inline mr-1" />
            {formatarData(campanha.criadoEm || new Date())}
          </span>
        </div>

        {onClick && (
          <button 
            onClick={onClick}
            className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
          >
            {campanha.cta || 'Saiba Mais'}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Helpers de formatação
 */
const formatarData = (data) => {
  if (!data) return '';
  const date = data instanceof Date ? data : new Date(data);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
};

const formatarPeriodo = (dataInicio, dataFim) => {
  if (!dataInicio) return '';
  
  const inicio = dataInicio instanceof Date ? dataInicio : new Date(dataInicio);
  
  if (!dataFim) {
    return `A partir de ${formatarData(inicio)}`;
  }
  
  const fim = dataFim instanceof Date ? dataFim : new Date(dataFim);
  
  if (inicio.toDateString() === fim.toDateString()) {
    return formatarData(inicio);
  }
  
  return `${inicio.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} a ${fim.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}`;
};

export default CampanhaCard;

