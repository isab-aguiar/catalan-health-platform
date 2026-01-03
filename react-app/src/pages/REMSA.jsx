import { PageContainer } from "../components/layout";
import {
  InfoBox,
  BackButton,
  RecommendedReadingCarousel,
} from "../components/common";
import { MessageCircle, Instagram } from "lucide-react";
import remsaImage from "../assets/remsa/remsa.jpeg";
import { contactInfo, openingHours, socialMedia } from "../config";
import ImageWithCredit from "../components/common/ImageWithCredit";

export default function REMSA() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">REMSA</h1>
          <p className="text-primary-100 text-sm mt-1">
            Programa de Residência Multiprofissional em Saúde do Adolescente
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Sobre o Programa
          </h2>
          <p className="text-neutral-700 leading-relaxed mb-5">
            O{" "}
            <strong>
              Programa de Residência Multiprofissional em Saúde do Adolescente
              (REMSA)
            </strong>{" "}
            é um programa de pós-graduação que capacita profissionais de
            diversas áreas da saúde para atuar de forma integrada no Sistema
            Único de Saúde (SUS).
          </p>
          <p className="text-neutral-700 leading-relaxed mb-5">
            Na UAPS São José, os residentes trabalham em equipe
            multiprofissional, promovendo uma abordagem integral e humanizada no
            atendimento à população, sempre com a orientação de preceptores
            experientes.
          </p>
          <p className="text-neutral-700 leading-relaxed mb-5">
            O programa tem como objetivo qualificar o cuidado em saúde,
            ampliando ações de promoção, prevenção e acompanhamento voltadas
            especialmente para crianças e adolescentes de 10 a 19 anos.
          </p>
          <h3 className="font-bold text-blue-900 mb-4 text-base">
            Serviços Oferecidos:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Atendimento individual multiprofissional
                </strong>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Acompanhamento do crescimento e desenvolvimento
                </strong>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Atividades coletivas educativas e oficinas temáticas
                </strong>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Grupos terapêuticos e oficinas semanais
                </strong>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientações sobre autocuidado, saúde mental e hábitos de vida
                  saudáveis
                </strong>
              </div>
            </div>
          </div>
        </div>

        <InfoBox title="Público-Alvo" className="mb-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Crianças e adolescentes
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                <strong>Faixa etária:</strong> 10 a 19 anos
              </div>
            </div>
          </div>
        </InfoBox>

        <InfoBox title="Áreas de Atendimento" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <h3 className="font-semibold text-neutral-900 mb-2 text-sm">
                Fisioterapia
              </h3>
              <p className="text-neutral-700 text-sm mb-1">
                <strong>Residente:</strong> Lais
              </p>
              <p className="text-neutral-600 text-xs">Preceptor responsável</p>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <h3 className="font-semibold text-neutral-900 mb-2 text-sm">
                Enfermagem
              </h3>
              <p className="text-neutral-700 text-sm mb-1">
                <strong>Residente:</strong> Fernanda
              </p>
              <p className="text-neutral-600 text-xs">Preceptor responsável</p>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <h3 className="font-semibold text-neutral-900 mb-2 text-sm">
                Nutrição
              </h3>
              <p className="text-neutral-700 text-sm mb-1">
                <strong>Residente:</strong> Marina
              </p>
              <p className="text-neutral-600 text-xs">Preceptor responsável</p>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <h3 className="font-semibold text-neutral-900 mb-2 text-sm">
                Odontologia
              </h3>
              <p className="text-neutral-700 text-sm mb-1">
                <strong>Residente:</strong> Daiane
              </p>
              <p className="text-neutral-600 text-xs">Preceptor responsável</p>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <h3 className="font-semibold text-neutral-900 mb-2 text-sm">
                Serviço Social
              </h3>
              <p className="text-neutral-700 text-sm mb-1">
                <strong>Residente:</strong> Residente responsável
              </p>
              <p className="text-neutral-600 text-xs">Preceptor responsável</p>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <h3 className="font-semibold text-neutral-900 mb-2 text-sm">
                Psicologia
              </h3>
              <p className="text-neutral-700 text-sm mb-1">
                <strong>Residente:</strong> Luara
              </p>
              <p className="text-neutral-600 text-xs">Preceptor responsável</p>
            </div>
          </div>
        </InfoBox>

        <InfoBox title="Oficinas REMSA" className="mb-6">
          <p className="text-neutral-700 leading-relaxed mb-4 text-sm">
            Participe das nossas oficinas semanais em diferentes locais da
            comunidade:
          </p>
          <div className="space-y-3">
            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-20 flex-shrink-0">
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                    Terça
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-neutral-900 font-semibold mb-1 text-sm">
                    <strong>Horário:</strong>{" "}
                    {openingHours.remsa.workshops.tuesday.display}
                  </p>
                  <p className="text-neutral-700 text-sm">
                    <strong>Local:</strong>{" "}
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=R.+Alm.+Tamandaré,+415+-+São+José,+Divinópolis+-+MG,+35501-223"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Escola Henrique Galvão
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-20 flex-shrink-0">
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                    Quarta
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-neutral-900 font-semibold mb-1 text-sm">
                    <strong>Horário:</strong>{" "}
                    {openingHours.remsa.workshops.wednesday.display}
                  </p>
                  <p className="text-neutral-700 text-sm">
                    <strong>Local:</strong>{" "}
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=R.+Cataguáses,+344+-+Catalão,+Divinópolis+-+MG,+35501-227"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Quadra da igreja de São José Operário
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-20 flex-shrink-0">
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                    Quinta
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-neutral-900 font-semibold mb-1 text-sm">
                    <strong>Horário:</strong>{" "}
                    {openingHours.remsa.workshops.thursday.display}
                  </p>
                  <p className="text-neutral-700 text-sm">
                    <strong>Local:</strong>{" "}
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Av.+Amazonas,+881+-+Catalão,+Divinópolis+-+MG,+35501-635"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Escola Martin Cyprien
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </InfoBox>

        <InfoBox title="Como Acessar" className="mb-6">
          <p className="text-neutral-700 leading-relaxed mb-4 text-sm">
            Para ter acesso aos serviços da REMSA, compareça diretamente a uma
            das unidades participantes:
          </p>
          <p className="text-neutral-700 leading-relaxed mb-5 text-sm">
            <strong>Atendimento:</strong> Por demanda ou agendamento pelo{" "}
            <a
              href={`https://wa.me/${contactInfo.phones.whatsapp.remsa.wa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold underline pl-1"
            >
              <MessageCircle size={16} className="inline" />
              WhatsApp
            </a>
          </p>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 text-sm mb-2">
                UAPS São José
              </h4>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${contactInfo.address.main.mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm mb-1 block"
              >
                {contactInfo.address.main.street} -{" "}
                {contactInfo.address.main.neighborhood},{" "}
                {contactInfo.address.main.city} -{" "}
                {contactInfo.address.main.state}
              </a>
              <p className="text-neutral-600 text-sm mb-2">
                CEP: {contactInfo.address.main.cep}
              </p>
              <div className="text-neutral-700 text-sm">
                <p className="mb-1">
                  <strong>Atendimento ao Público:</strong>
                </p>
                <p className="mb-0.5">Segunda a Sexta-feira</p>
                <p>
                  <strong>Horário:</strong>{" "}
                  {openingHours.remsa.uapsSaoJose.weekdays}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 text-sm mb-2">
                UAPS Icaraí
              </h4>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${contactInfo.address.referenceUnits.uapsIcarai.mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm mb-1 block"
              >
                {contactInfo.address.referenceUnits.uapsIcarai.street} -{" "}
                {contactInfo.address.referenceUnits.uapsIcarai.neighborhood},{" "}
                {contactInfo.address.referenceUnits.uapsIcarai.city} -{" "}
                {contactInfo.address.referenceUnits.uapsIcarai.state}
              </a>
              <p className="text-neutral-600 text-sm mb-2">
                CEP: {contactInfo.address.referenceUnits.uapsIcarai.cep}
              </p>
              <div className="text-neutral-700 text-sm">
                <p className="mb-1">
                  <strong>Atendimento ao Público:</strong>
                </p>
                <p className="mb-0.5">Segunda a Sexta-feira</p>
                <p>
                  <strong>Horário:</strong>{" "}
                  {openingHours.remsa.uapsIcarai.weekdays}
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-neutral-50">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Conheça o Nosso Trabalho
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-1">
              Acompanhe nossas atividades e entre em contato
            </p>
          </div>
          <div className="p-4 sm:p-6">
            <div className="mb-6 flex justify-center items-center px-4 md:px-8 lg:px-12">
              <ImageWithCredit
                src={remsaImage}
                alt="REMSA - Residência Multiprofissional em Saúde do Adolescente"
                className="max-w-md sm:max-w-lg md:max-w-xl rounded-lg shadow-sm"
                centered={true}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <a
                href={`https://wa.me/${contactInfo.phones.whatsapp.remsa.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 hover:shadow-md transition-shadow cursor-pointer block"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
                      WhatsApp
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-base sm:text-lg font-semibold text-neutral-900">
                        <MessageCircle
                          size={18}
                          className="text-green-600 flex-shrink-0"
                        />
                        <span>{contactInfo.phones.whatsapp.remsa.display}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <a
                href={socialMedia.remsa.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 hover:shadow-md transition-shadow cursor-pointer block"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Instagram size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
                      Instagram
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-base sm:text-lg font-semibold text-neutral-900">
                        <Instagram
                          size={18}
                          className="text-pink-600 flex-shrink-0"
                        />
                        <span>{socialMedia.remsa.instagram.handle}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-4">
        <RecommendedReadingCarousel pageId="remsa" />
      </div>
    </PageContainer>
  );
}
