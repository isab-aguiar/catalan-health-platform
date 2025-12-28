import PageContainer from "../components/layout/PageContainer";
import InfoBox from "../components/common/InfoBox";
import Alert from "../components/common/Alert";
import BackButton from "../components/common/BackButton";
import { MessageCircle, Instagram } from "lucide-react";
import remsaImage from "../assets/remsa/remsa.jpeg";

export default function REMSA() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900 mb-2 pb-3 border-b border-neutral-200 whitespace-nowrap">
            REMSA
          </h1>
          <p className="text-base text-neutral-600 mt-3">
            Programa de Residência Multiprofissional em Saúde do Adolescente
          </p>
        </div>

        <InfoBox title="Sobre o Programa" className="mb-6">
          <p className="text-neutral-700 leading-relaxed mb-4">
            O <strong>Programa de Residência Multiprofissional em Saúde do Adolescente (REMSA)</strong> é um programa de
            pós-graduação que capacita profissionais de diversas áreas da saúde para atuar de
            forma integrada no Sistema Único de Saúde (SUS).
          </p>
          <p className="text-neutral-700 leading-relaxed mb-4">
            Na UAPS São José, os residentes trabalham em equipe multiprofissional, promovendo
            uma abordagem integral e humanizada no atendimento à população, sempre com a
            orientação de preceptores experientes.
          </p>
          <p className="text-neutral-700 leading-relaxed">
            O programa tem como objetivo qualificar o cuidado em saúde, ampliando ações de
            promoção, prevenção e acompanhamento voltadas especialmente para crianças e
            adolescentes de 10 a 19 anos.
          </p>
        </InfoBox>

        <InfoBox title="Público-Alvo" className="mb-6">
          <p className="text-neutral-700 leading-relaxed">
            Crianças e adolescentes
            <br />
            <strong>Faixa etária:</strong> 10 a 19 anos.
          </p>
        </InfoBox>

        <InfoBox title="Serviços Oferecidos" className="mb-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-neutral-700 text-sm">
                Atendimento individual multiprofissional
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-neutral-700 text-sm">
                Acompanhamento do crescimento e desenvolvimento
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-neutral-700 text-sm">
                Atividades coletivas educativas e oficinas temáticas
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-neutral-700 text-sm">
                Grupos terapêuticos e oficinas semanais
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-neutral-700 text-sm">
                Orientações sobre autocuidado, saúde mental e hábitos de vida saudáveis
              </p>
            </div>
          </div>
        </InfoBox>

        <InfoBox title="Áreas de Atendimento" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-50 rounded-md p-4 border border-neutral-100">
              <h3 className="font-semibold text-neutral-900 mb-2 pb-2 border-b border-neutral-200">Fisioterapia</h3>
              <p className="text-neutral-600 text-sm mb-2 pb-2 mt-2 border-b border-neutral-100">Lais</p>
              <p className="text-neutral-600 text-sm">Preceptor responsável</p>
            </div>
            <div className="bg-neutral-50 rounded-md p-4 border border-neutral-100">
              <h3 className="font-semibold text-neutral-900 mb-2 pb-2 border-b border-neutral-200">Enfermagem</h3>
              <p className="text-neutral-600 text-sm mb-2 pb-2 mt-2 border-b border-neutral-100">Fernanda</p>
              <p className="text-neutral-600 text-sm">Preceptor responsável</p>
            </div>
            <div className="bg-neutral-50 rounded-md p-4 border border-neutral-100">
              <h3 className="font-semibold text-neutral-900 mb-2 pb-2 border-b border-neutral-200">Nutrição</h3>
              <p className="text-neutral-600 text-sm mb-2 pb-2 mt-2 border-b border-neutral-100">Marina</p>
              <p className="text-neutral-600 text-sm">Preceptor responsável</p>
            </div>
            <div className="bg-neutral-50 rounded-md p-4 border border-neutral-100">
              <h3 className="font-semibold text-neutral-900 mb-2 pb-2 border-b border-neutral-200">Odontologia</h3>
              <p className="text-neutral-600 text-sm mb-2 pb-2 mt-2 border-b border-neutral-100">Daiane</p>
              <p className="text-neutral-600 text-sm">Preceptor responsável</p>
            </div>
            <div className="bg-neutral-50 rounded-md p-4 border border-neutral-100">
              <h3 className="font-semibold text-neutral-900 mb-2 pb-2 border-b border-neutral-200">Serviço Social</h3>
              <p className="text-neutral-600 text-sm mb-2 pb-2 mt-2 border-b border-neutral-100">Residente responsável</p>
              <p className="text-neutral-600 text-sm">Preceptor responsável</p>
            </div>
            <div className="bg-neutral-50 rounded-md p-4 border border-neutral-100">
              <h3 className="font-semibold text-neutral-900 mb-2 pb-2 border-b border-neutral-200">Psicologia</h3>
              <p className="text-neutral-600 text-sm mb-2 pb-2 mt-2 border-b border-neutral-100">Luara</p>
              <p className="text-neutral-600 text-sm">Preceptor responsável</p>
            </div>
          </div>
        </InfoBox>

        <InfoBox title="Oficinas REMSA" className="mb-6">
          <p className="text-neutral-700 leading-relaxed mb-4">
            Participe das nossas oficinas semanais em diferentes locais da comunidade:
          </p>
          <div className="space-y-3">
            <div className="bg-neutral-50 rounded-md p-4 border border-neutral-100">
              <div className="flex items-start gap-3">
                <div className="w-20 flex-shrink-0">
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                    Terça
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-neutral-900 font-semibold mb-1"><strong>Horário:</strong> 17h00 às 18h00</p>
                  <p className="text-neutral-600 text-sm">
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
            <div className="bg-neutral-50 rounded-md p-4 border border-neutral-100">
              <div className="flex items-start gap-3">
                <div className="w-20 flex-shrink-0">
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                    Quarta
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-neutral-900 font-semibold mb-1"><strong>Horário:</strong> 08h00 às 09h30</p>
                  <p className="text-neutral-600 text-sm">
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
            <div className="bg-neutral-50 rounded-md p-4 border border-neutral-100">
              <div className="flex items-start gap-3">
                <div className="w-20 flex-shrink-0">
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                    Quinta
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-neutral-900 font-semibold mb-1"><strong>Horário:</strong> 17h00 às 18h00</p>
                  <p className="text-neutral-600 text-sm">
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
          <p className="text-neutral-700 leading-relaxed mb-3">
            Para ter acesso aos serviços da REMSA, compareça diretamente a uma das unidades participantes:
          </p>
          <p className="text-neutral-700 leading-relaxed mb-5">
            <strong>Atendimento:</strong> Por demanda ou agendamento pelo{" "}
            <a
              href="https://wa.me/5537984158457"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-success hover:text-green-700 font-semibold underline pl-1"
            >
              <MessageCircle size={16} className="inline" />
              WhatsApp
            </a>
          </p>

          <div className="space-y-4 mb-5">
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
              <h4 className="font-semibold text-neutral-900 text-sm mb-2">UAPS São José</h4>
              <a
                href="https://www.google.com/maps/search/?api=1&query=R.+Júlio+Nogueira,+1320+-+Bela+Vista,+Divinópolis+-+MG,+35501-207"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm mb-1 block"
              >
                R. Júlio Nogueira, 1320 - Bela Vista, Divinópolis - MG
              </a>
              <p className="text-neutral-600 text-sm mb-2">CEP: 35501-207</p>
              <div className="text-neutral-700 text-sm">
                <p className="mb-1"><strong>Atendimento ao Público:</strong></p>
                <p className="mb-0.5">Segunda a Sexta-feira</p>
                <p><strong>Horário:</strong> 07h00 às 19h00</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
              <h4 className="font-semibold text-neutral-900 text-sm mb-2">UAPS Icaraí</h4>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Av.+Belo+Horizonte,+264+-+Icaraí,+Divinópolis+-+MG,+35502-260"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm mb-1 block"
              >
                Av. Belo Horizonte, 264 - Icaraí, Divinópolis - MG
              </a>
              <p className="text-neutral-600 text-sm mb-2">CEP: 35502-260</p>
              <div className="text-neutral-700 text-sm">
                <p className="mb-1"><strong>Atendimento ao Público:</strong></p>
                <p className="mb-0.5">Segunda a Sexta-feira</p>
                <p><strong>Horário:</strong> 07h00 às 17h00</p>
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
            <div className="mb-6">
              <img
                src={remsaImage}
                alt="REMSA - Residência Multiprofissional em Saúde do Adolescente"
                className="w-full rounded-lg shadow-sm"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://wa.me/5537984158457"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 hover:shadow-md transition-shadow cursor-pointer block"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-success rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
                      WhatsApp
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-base sm:text-lg font-semibold text-neutral-900">
                        <MessageCircle size={18} className="text-success flex-shrink-0" />
                        <span>(37) 98415-8457</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <a
                href="https://www.instagram.com/remsasaojose/"
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
                        <Instagram size={18} className="text-pink-600 flex-shrink-0" />
                        <span>@remsasaojose</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
