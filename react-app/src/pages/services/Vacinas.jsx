import { AlertCircle, Syringe, MapPin, Phone, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import CalendarioVacinal from "../../components/vacinas/CalendarioVacinal";
import VacinasDisponiveis from "../../components/vacinas/VacinasDisponiveis";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import PageContainer from "../../components/layout/PageContainer";
import { Alert } from "../../components/common/Alert";
import InfoBox from "../../components/common/InfoBox";
import { contactInfo, openingHours } from "../../config";
export default function Vacinas() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-xl md:text-3xl font-bold text-slate-900 whitespace-normal md:whitespace-nowrap"
              >
                Sala de Vacinação
              </h1>
              <p
                className="text-slate-500 text-xs mt-1"
              >
                Estratégia Saúde da Família Bela Vista - Catalão - São José
              </p>
            </div>
          </div>
        </div>
        {}
        <CampanhasPaginaWrapper pagina="vacinas" />
        {}
        <AvisosPaginaWrapper pagina="vacinas" />
        {}
        <div className="mb-6">
          <CalendarioVacinal />
        </div>
        {}
        <InfoBox title="Horários de Atendimento">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Período
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Horário
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Profissional Responsável
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Manhã</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    {openingHours.vaccines.morning.display}
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Profissional Responsável:<br/>
                    Thaciane Souza<br/>
                    Função: Técnica de Enfermagem
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Tarde</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    {openingHours.vaccines.afternoon.display}
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Profissional Responsável:<br/>
                    Tatiane Aparecida<br/>
                    Função: Técnica de Enfermagem
                  </td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Saúde na Hora</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    {openingHours.vaccines.saudeNaHora.display}
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Profissional Responsável:<br/>
                    Alessandra Silva<br/>
                    Função: Técnica de Enfermagem
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Alert type="info">
              <p className="text-slate-800 text-xs md:text-sm font-normal leading-relaxed">
                <strong>Observações Importantes:</strong> O atendimento na Sala
                de Vacinas é realizado de forma livre, por ordem de chegada.
                Antes de se dirigir à sala de vacinas, é obrigatório realizar o
                cadastro na recepção da unidade para abertura da ficha de
                atendimento. <strong>Exceção:</strong> A aplicação da vacina BCG
                em recém-nascidos requer agendamento prévio, que deve ser
                realizado na{" "}
                <Link
                  to="/services/sala4"
                  className="text-blue-700 font-semibold hover:text-blue-800 underline"
                >
                  Sala de Agendamentos
                </Link>
                .
              </p>
            </Alert>
          </div>
        </InfoBox>
        {}
        <InfoBox highlight={true}>
          {}
          <div className="mb-6">
            <VacinasDisponiveis />
          </div>
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Documentos Necessários</h2>
          </div>
          <p className="text-slate-700 mb-4 text-sm">
            Para vacinação, é obrigatória a apresentação da seguinte
            documentação:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Documento de Identificação com Foto
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Documento de identidade com foto e/ou Carteira de Habilitação do titular
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  CPF - Cadastro de Pessoa Física
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Documento físico original ou número do CPF do titular
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Carteira de Vacinação
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Quando disponível, para registro das doses aplicadas
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Alert type="info">
              <p className="text-slate-800 text-xs md:text-sm font-normal leading-relaxed">
                <strong>Observação sobre Carteira de Vacinação:</strong>{" "}
                Apresente sua carteira de vacinação em todas as consultas, mesmo
                que considere estar em dia. A equipe de saúde pode identificar
                vacinas que necessitam de reforço ou atualização conforme o
                calendário nacional.
              </p>
            </Alert>
          </div>
        </InfoBox>

        {/* Seção Profilaxia da Raiva Humana */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  Profilaxia da Raiva Humana
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base mt-1">
                  Atendimento especializado com vacina e soro antirrábico
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Sobre o Tratamento */}
            <div className="mb-6">
              <h3 className="font-semibold text-neutral-800 text-lg mb-4">
                Sobre o Tratamento
              </h3>
              <p className="text-neutral-700 leading-relaxed mb-4">
                A profilaxia da raiva humana é composta por dois tipos de imunobiológicos,
                indicados conforme a gravidade da exposição ao vírus (mordidas, arranhões
                ou contato com mucosas de animais suspeitos ou confirmados):
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-5">
                {/* Vacina */}
                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                  <div className="flex items-start gap-3">
                    <Syringe size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">
                        Vacina Antirrábica
                      </h4>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        Estimula o sistema imunológico a produzir seus próprios anticorpos
                        contra o vírus da raiva. É utilizada na prevenção da doença após
                        exposições de risco, promovendo imunidade ativa.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Soro */}
                <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield size={20} className="text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-2">
                        Imunoglobulina (Soro) Antirrábica
                      </h4>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        Indicada para casos graves ou específicos. Fornece anticorpos prontos
                        para uma proteção imediata enquanto o organismo desenvolve a resposta
                        vacinal, conferindo imunidade passiva.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Critérios de Atendimento */}
            <div className="bg-amber-50 border-l-4 border-amber-600 rounded-r-lg p-5 mb-6">
              <h3 className="font-semibold text-amber-900 text-lg mb-4">
                Critérios de Atendimento
              </h3>
              <div className="space-y-3 text-sm text-neutral-700">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong className="text-amber-900">Atenção:</strong> A aplicação destes
                    imunobiológicos segue rigorosamente os protocolos definidos pelo Ministério da Saúde.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong className="text-amber-900">Avaliação Obrigatória:</strong> A administração
                    da vacina ou do soro é condicionada à avaliação profissional prévia no local de atendimento.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong className="text-amber-900">Exclusividade:</strong> As unidades listadas
                    abaixo são referências técnicas para este procedimento. Elas não realizam atendimentos
                    de rotina ou outras vacinações fora deste escopo específico nos horários indicados.
                  </p>
                </div>
              </div>
            </div>

            {/* Unidades de Referência */}
            <div className="mb-4">
              <h3 className="font-semibold text-neutral-800 text-lg mb-4">
                Unidades de Referência
              </h3>
              <p className="text-neutral-700 mb-5 text-sm">
                Relação das unidades de saúde habilitadas para a aplicação da vacina e do soro antirrábico:
              </p>

              <div className="space-y-4">
                {/* Central de Imunização */}
                <div className="bg-white border-2 border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-neutral-900 mb-3 text-base">
                    Central de Imunização
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${contactInfo.address.referenceUnits.centralImunizacao.mapsQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-700 hover:text-primary-600 transition-colors"
                      >
                        {contactInfo.address.referenceUnits.centralImunizacao.street} – {contactInfo.address.referenceUnits.centralImunizacao.neighborhood}
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <div className="flex flex-wrap gap-2">
                        <a href={`tel:${contactInfo.phones.referenceUnits.centralImunizacao.tel}`} className="text-neutral-700 hover:text-primary-600 transition-colors">
                          {contactInfo.phones.referenceUnits.centralImunizacao.display}
                        </a>
                        {contactInfo.phones.referenceUnits.centralImunizacao.extensions.map((ext, idx) => (
                          <span key={idx}>
                            <span className="text-neutral-400">/</span>
                            <a href={`tel:+55373229${ext}`} className="text-neutral-700 hover:text-primary-600 transition-colors">
                              {ext}
                            </a>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-neutral-700">{openingHours.referenceUnits.centralImunizacao.full}</p>
                    </div>
                  </div>
                </div>

                {/* ESF Afonso Pena */}
                <div className="bg-white border-2 border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-neutral-900 mb-3 text-base">
                    ESF Afonso Pena
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${contactInfo.address.referenceUnits.esfAfonsoPena.mapsQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-700 hover:text-primary-600 transition-colors"
                      >
                        {contactInfo.address.referenceUnits.esfAfonsoPena.street} – {contactInfo.address.referenceUnits.esfAfonsoPena.neighborhood}
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <div className="flex flex-wrap gap-2">
                        <a href={`tel:${contactInfo.phones.referenceUnits.esfAfonsoPena.tel}`} className="text-neutral-700 hover:text-primary-600 transition-colors">
                          {contactInfo.phones.referenceUnits.esfAfonsoPena.display}
                        </a>
                        {contactInfo.phones.referenceUnits.esfAfonsoPena.extensions.map((ext, idx) => (
                          <span key={idx}>
                            <span className="text-neutral-400">/</span>
                            <a href={`tel:+55373229${ext}`} className="text-neutral-700 hover:text-primary-600 transition-colors">
                              {ext}
                            </a>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-neutral-700">{openingHours.referenceUnits.esfAfonsoPena.full}</p>
                    </div>
                  </div>
                </div>

                {/* ESF Niterói */}
                <div className="bg-white border-2 border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-neutral-900 mb-3 text-base">
                    ESF Niterói
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${contactInfo.address.referenceUnits.esfNiteroi.mapsQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-700 hover:text-primary-600 transition-colors"
                      >
                        {contactInfo.address.referenceUnits.esfNiteroi.street} – {contactInfo.address.referenceUnits.esfNiteroi.neighborhood}
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <div className="flex flex-wrap gap-2">
                        <a href={`tel:${contactInfo.phones.referenceUnits.esfNiteroi.tel}`} className="text-neutral-700 hover:text-primary-600 transition-colors">
                          {contactInfo.phones.referenceUnits.esfNiteroi.display}
                        </a>
                        {contactInfo.phones.referenceUnits.esfNiteroi.extensions.map((ext, idx) => (
                          <span key={idx}>
                            <span className="text-neutral-400">/</span>
                            <a href={`tel:+55373229${ext}`} className="text-neutral-700 hover:text-primary-600 transition-colors">
                              {ext}
                            </a>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-neutral-700">{openingHours.referenceUnits.esfNiteroi.full}</p>
                    </div>
                  </div>
                </div>

                {/* ESF Planalto */}
                <div className="bg-white border-2 border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-neutral-900 mb-3 text-base">
                    ESF Planalto
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${contactInfo.address.referenceUnits.esfPlanalto.mapsQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-700 hover:text-primary-600 transition-colors"
                      >
                        {contactInfo.address.referenceUnits.esfPlanalto.street} – {contactInfo.address.referenceUnits.esfPlanalto.neighborhood}
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <div className="flex flex-wrap gap-2">
                        <a href={`tel:${contactInfo.phones.referenceUnits.esfPlanalto.tel}`} className="text-neutral-700 hover:text-primary-600 transition-colors">
                          {contactInfo.phones.referenceUnits.esfPlanalto.display}
                        </a>
                        {contactInfo.phones.referenceUnits.esfPlanalto.extensions.map((ext, idx) => (
                          <span key={idx}>
                            <span className="text-neutral-400">/</span>
                            <a href={`tel:+55373229${ext}`} className="text-neutral-700 hover:text-primary-600 transition-colors">
                              {ext}
                            </a>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-neutral-700">{openingHours.referenceUnits.esfPlanalto.full}</p>
                    </div>
                  </div>
                </div>

                {/* ESF Morada Nova / São Judas Tadeu */}
                <div className="bg-white border-2 border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-neutral-900 mb-3 text-base">
                    ESF Morada Nova / São Judas Tadeu
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${contactInfo.address.referenceUnits.esfMoradaNova.mapsQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-700 hover:text-primary-600 transition-colors"
                      >
                        {contactInfo.address.referenceUnits.esfMoradaNova.street} – {contactInfo.address.referenceUnits.esfMoradaNova.neighborhood}
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <a href={`tel:${contactInfo.phones.referenceUnits.esfMoradaNova.tel}`} className="text-neutral-700 hover:text-primary-600 transition-colors">
                        {contactInfo.phones.referenceUnits.esfMoradaNova.display}
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-neutral-700">{openingHours.referenceUnits.esfMoradaNova.full}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Aviso Final */}
            <div className="bg-red-50 border-l-4 border-red-600 rounded-r-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-neutral-700">
                  <p className="font-semibold text-red-900 mb-2">Importante</p>
                  <p className="leading-relaxed">
                    Em caso de exposição ao vírus da raiva (mordida, arranhão ou contato com mucosas de
                    animais), procure imediatamente uma das unidades de referência listadas acima.
                    O tratamento profilático deve ser iniciado o mais breve possível para garantir sua eficácia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="vacinas" />
      </div>
    </PageContainer>
  );
}
