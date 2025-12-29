import { memo } from "react";
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
  ChevronRight,
} from "lucide-react";
import { campanhaTemplates } from "../../data/campanhaTemplates";
import {
  incrementarVisualizacoes,
  incrementarCliques,
} from "../../services/campanhasService";
import PDFViewer from "./PDFViewer";
const CampanhaCard = memo(({ campanha, onClick }) => {
  const template =
    campanhaTemplates[campanha.template] || campanhaTemplates.informativo;
  const estilo = template.estilo;
  const handleVisualizacao = () => {
    if (campanha.id) {
      incrementarVisualizacoes(campanha.id);
    }
  };
  const handleClick = () => {
    if (campanha.id) {
      incrementarCliques(campanha.id);
    }
    if (onClick) {
      onClick(campanha);
    }
  };
  switch (campanha.template) {
    case "vacinacao":
      return (
        <TemplateVacinacao
          campanha={campanha}
          estilo={estilo}
          onClick={handleClick}
        />
      );
    case "material":
      return (
        <TemplateMaterial
          campanha={campanha}
          estilo={estilo}
          onClick={handleClick}
        />
      );
    case "evento":
      return (
        <TemplateEvento
          campanha={campanha}
          estilo={estilo}
          onClick={handleClick}
        />
      );
    case "urgente":
      return (
        <TemplateUrgente
          campanha={campanha}
          estilo={estilo}
          onClick={handleClick}
        />
      );
    default:
      return (
        <TemplateInformativo
          campanha={campanha}
          estilo={estilo}
          onClick={handleClick}
        />
      );
  }
});
CampanhaCard.displayName = "CampanhaCard";
const TemplateVacinacao = ({ campanha, estilo, onClick }) => {
  return (
    <div className={estilo.container}>
      {}
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
      {}
      {campanha.imagemURL && (
        <div className="relative">
          <img
            src={campanha.imagemURL}
            alt={campanha.titulo}
            className={estilo.imagem}
          />
          {campanha.imageCredit && (
            <div className="absolute bottom-0 right-0 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-tl-md">
              <p className="text-[10px] sm:text-xs text-white/95 italic font-light">
                {campanha.imageCredit}
              </p>
            </div>
          )}
        </div>
      )}
      {}
      {campanha.pdfURL && (
        <div className="px-6 pt-4">
          <PDFViewer
            pdfURL={campanha.pdfURL}
            pdfNome={campanha.pdfNome || "documento.pdf"}
            height={500}
            showControls={true}
          />
        </div>
      )}
      {}
      <div className={estilo.corpo}>
        <p className={estilo.descricao}>{campanha.descricao}</p>
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {campanha.dataInicio && (
            <div className="flex items-center gap-2 text-neutral-700">
              <Calendar className="w-5 h-5 text-info" />
              <span className="text-sm">
                {formatarPeriodo(campanha.dataInicio, campanha.dataFim)}
              </span>
            </div>
          )}
          {campanha.horario && (
            <div className="flex items-center gap-2 text-neutral-700">
              <Clock className="w-5 h-5 text-info" />
              <span className="text-sm">{campanha.horario}</span>
            </div>
          )}
          {campanha.publicoAlvo && (
            <div className="flex items-center gap-2 text-neutral-700">
              <Users className="w-5 h-5 text-info" />
              <span className="text-sm">{campanha.publicoAlvo}</span>
            </div>
          )}
          {campanha.local && (
            <div className="flex items-center gap-2 text-neutral-700">
              <MapPin className="w-5 h-5 text-info" />
              <span className="text-sm">{campanha.local}</span>
            </div>
          )}
        </div>
        {}
        {campanha.topicos && campanha.topicos.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold text-neutral-800 text-sm">
              Importante:
            </h4>
            <ul className="space-y-1">
              {campanha.topicos.map((topico, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-neutral-700 text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-info mt-0.5 flex-shrink-0" />
                  <span>{topico}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {}
        {onClick && (
          <button onClick={onClick} className={estilo.cta + " w-full"}>
            {campanha.cta || "Saiba Mais"}
            <ChevronRight className="w-5 h-5 inline ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};
const TemplateMaterial = ({ campanha, estilo, onClick }) => {
  return (
    <div className={estilo.container}>
      {}
      <div className={estilo.header}>
        <AlertCircle className={estilo.icone} />
        <h2 className={estilo.titulo}>{campanha.titulo}</h2>
      </div>
      {}
      <div className={estilo.corpo}>
        <span className={estilo.badge}>
          <Package className="w-3 h-3 inline mr-1" />
          {campanha.categoria === "material" ? "Material" : campanha.categoria}
        </span>
        <p className={estilo.descricao + " mt-4"}>{campanha.descricao}</p>
        {}
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
const TemplateEvento = ({ campanha, estilo, onClick }) => {
  return (
    <div className={estilo.container}>
      {}
      {campanha.imagemURL && (
        <div className="relative">
          <img
            src={campanha.imagemURL}
            alt={campanha.titulo}
            className={estilo.imagem}
          />
          {campanha.imageCredit && (
            <div className="absolute bottom-0 right-0 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-tl-md">
              <p className="text-[10px] sm:text-xs text-white/95 italic font-light">
                {campanha.imageCredit}
              </p>
            </div>
          )}
        </div>
      )}
      {}
      <div className={estilo.header}>
        <span className={estilo.badge}>Evento</span>
        <h2 className={estilo.titulo}>{campanha.titulo}</h2>
        {}
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
      {}
      <div className={estilo.corpo}>
        <p className={estilo.descricao}>{campanha.descricao}</p>
        {}
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
              <div
                key={index}
                className="flex items-center gap-2 text-neutral-700 text-sm"
              >
                <CheckCircle className="w-4 h-4 text-violet-600" />
                <span>{topico}</span>
              </div>
            ))}
          </div>
        )}
        {}
        {onClick && (
          <button onClick={onClick} className={estilo.inscricao}>
            {campanha.cta || "Participar"}
          </button>
        )}
      </div>
    </div>
  );
};
const TemplateUrgente = ({ campanha, estilo, onClick }) => {
  return (
    <div className={estilo.container}>
      {}
      <div className={estilo.header}>
        <AlertCircle className={estilo.icone} />
        <div className="flex-1">
          <span className={estilo.badge}>URGENTE</span>
          <h2 className={estilo.titulo}>{campanha.titulo}</h2>
        </div>
      </div>
      {}
      <div className={estilo.corpo}>
        {}
        <div className={estilo.alerta}>
          <p className={estilo.alertaTexto}>⚠️ Requer atenção imediata</p>
        </div>
        <p className={estilo.descricao}>{campanha.descricao}</p>
        {}
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
          <div className="mt-4 flex items-center gap-2 bg-error/10 p-3 rounded-lg">
            <Phone className="w-5 h-5 text-error" />
            <div>
              <div className="text-xs text-neutral-600">Contato:</div>
              <div className="font-semibold text-neutral-800">
                {campanha.contato}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const TemplateInformativo = ({ campanha, estilo, onClick }) => {
  return (
    <div className={estilo.container}>
      {campanha.imagemURL && (
        <div className="relative">
          <img
            src={campanha.imagemURL}
            alt={campanha.titulo}
            className={estilo.imagem}
          />
          {campanha.imageCredit && (
            <div className="absolute bottom-0 right-0 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-tl-md">
              <p className="text-[10px] sm:text-xs text-white/95 italic font-light">
                {campanha.imageCredit}
              </p>
            </div>
          )}
        </div>
      )}
      <div className={estilo.corpo}>
        <h2 className={estilo.titulo}>{campanha.titulo}</h2>
        <p className={estilo.descricao}>{campanha.descricao}</p>
        {}
        {campanha.pdfURL && (
          <div className="mt-4">
            <PDFViewer
              pdfURL={campanha.pdfURL}
              pdfNome={campanha.pdfNome}
              height={500}
            />
          </div>
        )}
        {}
        <div className={estilo.footer}>
          <span className={estilo.dataPublicacao}>
            <Calendar className="w-4 h-4 inline mr-1" />
            {formatarData(campanha.criadoEm || new Date())}
          </span>
        </div>
        {onClick && (
          <button
            onClick={onClick}
            className="mt-4 text-info hover:text-primary-700 font-semibold text-sm flex items-center gap-1"
          >
            {campanha.cta || "Saiba Mais"}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
const formatarData = (data) => {
  if (!data) return "";
  const date = data instanceof Date ? data : new Date(data);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
const formatarPeriodo = (dataInicio, dataFim) => {
  if (!dataInicio) return "";
  const inicio = dataInicio instanceof Date ? dataInicio : new Date(dataInicio);
  if (!dataFim) {
    return `A partir de ${formatarData(inicio)}`;
  }
  const fim = dataFim instanceof Date ? dataFim : new Date(dataFim);
  if (inicio.toDateString() === fim.toDateString()) {
    return formatarData(inicio);
  }
  return `${inicio.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })} a ${fim.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}`;
};
export default CampanhaCard;
