import { Link } from "react-router-dom";
import SearchSection from "../components/search/SearchSection";
import {
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Hospital,
  Users,
  BriefcaseMedical,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Building2,
  Pill,
  Smile,
  Mail,
  MessageCircle,
  Instagram,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4">
              Bem-vindo à <span className="text-primary-600">UBS São José</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
              Atendimento humanizado e profissional para toda a comunidade
            </p>
          </div>

          {/* Contact Information Section */}
          <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-12">
            <div className="border-b border-neutral-200 px-6 py-4 bg-neutral-50">
              <h2 className="text-2xl font-semibold text-neutral-900">
                Informações de Contato
              </h2>
              <p className="text-neutral-600 text-sm mt-1">
                Entre em contato conosco pelos canais abaixo
              </p>
            </div>

            <div className="p-6">
              {/* Main Contact Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Phone Numbers */}
                <div className="bg-white rounded-lg p-5 border border-neutral-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-2 text-sm">
                        Recepção
                      </h3>
                      <a
                        href="tel:+553732296080"
                        className="text-sm text-neutral-700 hover:text-primary-600 hover:underline transition-colors block"
                      >
                        (37) 3229-6080
                      </a>
                    </div>
                  </div>
                </div>

                {/* Administrative Services */}
                <div className="bg-white rounded-lg p-5 border border-neutral-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-2 text-sm">
                        Administrativo
                      </h3>
                      <a
                        href="https://wa.me/5537991770200"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-neutral-700 hover:text-green-600 hover:underline transition-colors mb-1"
                      >
                        <MessageCircle size={14} className="text-green-600" />
                        <span>(37) 99177-0200</span>
                      </a>
                      <a
                        href="https://wa.me/5537991520024"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-neutral-700 hover:text-green-600 hover:underline transition-colors mb-2"
                      >
                        <MessageCircle size={14} className="text-green-600" />
                        <span>(37) 99152-0024</span>
                      </a>
                      <p className="text-sm text-neutral-600">
                        Horário: 07:00 - 16:00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dentist */}
                <div className="bg-white rounded-lg p-5 border border-neutral-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Smile size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-2 text-sm">
                        Consultório Odontológico
                      </h3>
                      <a
                        href="tel:+553732296082"
                        className="text-sm text-neutral-700 hover:text-primary-600 hover:underline transition-colors block mb-2"
                      >
                        (37) 3229-6082
                      </a>
                      <p className="text-sm text-neutral-600">
                        Horário: 07:00 - 16:00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pharmacy */}
                <div className="bg-white rounded-lg p-5 border border-neutral-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Pill size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-2 text-sm">
                        Farmácia
                      </h3>
                      <a
                        href="tel:+553732296081"
                        className="text-sm text-neutral-700 hover:text-primary-600 hover:underline transition-colors block mb-2"
                      >
                        (37) 3229-6081
                      </a>
                      <p className="text-sm text-neutral-600">
                        Horário: 07:00 - 16:00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-white rounded-lg p-5 border border-neutral-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-2 text-sm">
                        Horário de Atendimento
                      </h3>
                      <p className="text-sm text-neutral-700 mb-1">
                        Segunda a Sexta: 07:00 - 17:00
                      </p>
                      <p className="text-sm text-neutral-700 mb-1">
                        Saúde na Hora: 17:00 - 22:00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white rounded-lg p-5 border border-neutral-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-2 text-sm">
                        Endereço
                      </h3>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Rua+Júlio+Nogueira+1320+São+José+Divinópolis+MG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-700 hover:text-primary-600 hover:underline transition-colors block"
                      >
                        Rua Júlio Nogueira, 1320
                        <br />
                        Bairro São José
                        <br />
                        Divinópolis - MG
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info Bar */}
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-700">
                  <a
                    href="mailto:staff.sj21@gmail.com"
                    className="flex items-center gap-2 hover:text-primary-600 hover:underline transition-colors"
                  >
                    <Mail size={16} className="text-neutral-600" />
                    <span>staff.sj21@gmail.com</span>
                  </a>
                  <div className="hidden md:block w-px h-4 bg-neutral-300"></div>
                  <a
                    href="https://instagram.com/esfcatalao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-pink-600 hover:underline transition-colors"
                  >
                    <Instagram size={16} className="text-neutral-600" />
                    <span>@ubssaojose</span>
                  </a>
                  <div className="hidden md:block w-px h-4 bg-neutral-300"></div>
                  <a
                    href="tel:192"
                    className="flex items-center gap-2 hover:text-error hover:underline transition-colors"
                  >
                    <Phone size={16} className="text-neutral-600" />
                    <span>Emergência SAMU: 192</span>
                  </a>
                  <div className="hidden md:block w-px h-4 bg-neutral-300"></div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=UPA+Padre+Roberto+Divinópolis+MG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary-600 hover:underline transition-colors"
                  >
                    <Hospital size={16} className="text-neutral-600" />
                    <span>Plantão 24h: UPA Padre Roberto</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACS Search Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Encontre sua Equipe de Saúde
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Informe o nome da sua rua para localizar seu Agente Comunitário de
              Saúde e a equipe multiprofissional responsável
            </p>
          </div>
          <SearchSection />
        </div>
      </section>

      {/* Hubs Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3 text-center">
            Explore Nossos Serviços
          </h2>
          <p className="text-lg text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
            Navegue pelos diferentes serviços e profissionais disponíveis na
            unidade
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/servicos"
              className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-primary-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-4 w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <Hospital size={48} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900">
                Serviços
              </h3>
              <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                Todos os serviços e atendimentos disponíveis
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                <span>Consultar</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>

            <Link
              to="/grupos"
              className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-accent-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-4 w-16 h-16 rounded-2xl bg-accent-100 flex items-center justify-center text-accent-600 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                <Users size={48} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900">
                Grupos de Atividades Coletivas
              </h3>
              <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                Grupo de Atividade Coletiva
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-accent-600 group-hover:text-accent-700">
                <span>Consultar</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>

            <Link
              to="/equipe"
              className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-secondary-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-4 w-16 h-16 rounded-2xl bg-secondary-100 flex items-center justify-center text-secondary-600 group-hover:bg-secondary-500 group-hover:text-white transition-colors">
                <BriefcaseMedical size={48} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900">
                Equipe E-multi
              </h3>
              <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                Conheça nossa equipe multiprofissional
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-secondary-600 group-hover:text-secondary-700">
                <span>Consultar</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>

            <Link
              to="/educacao"
              className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-green-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-4 w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <BookOpen size={48} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900">
                Educação em Saúde
              </h3>
              <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                Informações e orientações sobre saúde e prevenção
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-green-600 group-hover:text-green-700">
                <span>Consultar</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>

            <Link
              to="/remsa"
              className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-purple-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-4 w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <GraduationCap size={48} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900">
                REMSA
              </h3>
              <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                Residência Multiprofissional em Saúde
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 group-hover:text-purple-700">
                <span>Consultar</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>

            <Link
              to="/acs"
              className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-amber-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-4 w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <HeartHandshake size={48} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900">
                Agente Comunitário de Saúde
              </h3>
              <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                Encontre o ACS responsável pela sua área
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 group-hover:text-amber-700">
                <span>Consultar</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-8 px-4 bg-error/10 border-t border-b border-error/30">
        <div className="container mx-auto max-w-6xl text-center">
          <h3 className="text-xl md:text-2xl font-bold text-error mb-2">
            🚨 Emergência? Ligue 192 (SAMU)
          </h3>
          <p className="text-error/80 mb-3">
            Para casos graves, ligue imediatamente para o SAMU - 192
          </p>
          <Link
            to="/educacao"
            className="inline-block text-sm text-error/90 hover:text-error underline transition-colors"
          >
            Saiba como identificar uma emergência clínica
          </Link>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 px-4 bg-neutral-900 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h3 className="text-2xl font-bold mb-4">Precisa de Ajuda?</h3>
          <p className="text-neutral-300 mb-6">
            Nossa equipe está pronta para melhor atendê-lo de segunda a
            sexta-feira
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/servicos/sala-4"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-semibold transition-colors"
            >
              Como Agendar uma Consulta?
            </Link>
            <Link
              to="/acs"
              className="px-6 py-3 bg-white text-neutral-900 hover:bg-neutral-100 rounded-lg font-semibold transition-colors"
            >
              Encontrar Meu Agente de Saúde
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
