import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchSection from "../components/search/SearchSection";
import ImageGallery from "../components/common/ImageGallery";
import AvisosList from "../components/avisos/AvisosList";
import CampanhaCarousel from "../components/campanha/CampanhaCarousel";
import { useCampanhas } from "../hooks/useCampanhas";
import LoadingSpinner from "../components/common/LoadingSpinner";
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
  Droplet,
  Syringe,
} from "lucide-react";

// Lazy loading de imagens - carrega apenas quando necessário (melhora performance inicial)
const galleryImagesModules = import.meta.glob(
  "../assets/images/galeria-photos/*.{png,jpg,jpeg}",
  { eager: false }
);

const getCaptionFromFilename = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') return '';
  
  const filename = imagePath.split('/').pop().toLowerCase();
  
  const captionMap = [
    { 
      pattern: 'foto-unidade', 
      caption: 'Fachada da Unidade de Saúde ESF Catalão - Rua Júlio Nogueira, 1320, São José' 
    },
    { 
      pattern: 'equipe-esf-catalao-belavista-saojose', 
      caption: 'Equipe multiprofissional das ESFs Catalão, Bela Vista e São José reunida para foto oficial' 
    },
    { 
      pattern: 'equipe.jpg', 
      caption: 'Profissionais da equipe multiprofissional da ESF Catalão comprometidos com o cuidado integral à saúde' 
    },
    { 
      pattern: 'grupo-foco-na-saude', 
      caption: 'Grupo de atividades coletivas "Foco na Saúde" - Prevenção e diagnóstico do câncer de pele (Dezembro Laranja) e promoção da saúde' 
    },
    { 
      pattern: 'grupo-viva-leve', 
      caption: 'Grupo de atividades coletivas "Viva Leve" - Cuidado e orientação para pacientes com dor crônica e fibromialgia' 
    },
    { 
      pattern: 'outubro-rosa', 
      caption: 'Campanha Outubro Rosa - Conscientização e prevenção do câncer de mama na ESF Catalão' 
    },
    { 
      pattern: 'viver-bem-diabetes', 
      caption: 'Grupo de atividades coletivas "Viver Bem com Diabetes" - Educação e orientação para pacientes diabéticos' 
    },
  ];
  
  for (const { pattern, caption } of captionMap) {
    if (filename.includes(pattern.toLowerCase())) {
      return caption;
    }
  }
  
  const nameWithoutExt = filename.replace(/\.(png|jpg|jpeg)$/i, '');
  let formattedName = nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
  
  if (formattedName.toLowerCase().includes('grupo')) {
    const grupoName = formattedName.replace(/^grupo\s+/i, '').trim();
    return `Grupo de atividades coletivas "${grupoName}" - Promoção de saúde e bem-estar na comunidade`;
  }
  
  if (formattedName.toLowerCase().includes('evento') || 
      formattedName.toLowerCase().includes('campanha') ||
      formattedName.toLowerCase().includes('ação')) {
    return `${formattedName} realizado na ESF Catalão`;
  }
  
  return `${formattedName} - ESF Catalão`;
};

export default function Home() {
  // Buscar campanhas visuais
  const { campanhas, loading: loadingCampanhas } = useCampanhas();
  
  // Carregamento lazy das imagens da galeria (melhora performance inicial)
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  
  useEffect(() => {
    // Carrega imagens de forma assíncrona após o primeiro render
    const loadImages = async () => {
      try {
        const modules = await Promise.all(
          Object.keys(galleryImagesModules).map(path => galleryImagesModules[path]())
        );
        
        const imageEntries = modules.map((module, index) => ({
          src: module.default,
          caption: getCaptionFromFilename(Object.keys(galleryImagesModules)[index]),
        }));
        
        const fotoUnidade = imageEntries.find((img) => 
          img.src.includes('foto-unidade')
        );
        const outrasImagens = imageEntries.filter((img) => 
          !img.src.includes('foto-unidade')
        );
        
        outrasImagens.sort((a, b) => a.src.localeCompare(b.src));
        
        setGalleryImages(fotoUnidade ? [fotoUnidade, ...outrasImagens] : outrasImagens);
      } catch (error) {
        console.error('Erro ao carregar imagens da galeria:', error);
        setGalleryImages([]);
      } finally {
        setLoadingImages(false);
      }
    };
    
    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-16 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="mb-3">
              <p className="text-base md:text-lg font-medium text-neutral-500 uppercase tracking-wider mb-2">
                Estratégia Saúde da Família
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-2">
                <span className="text-primary-600 font-display font-bold tracking-wide uppercase">ESF CATALÃO</span>
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed px-4">
              Atendimento humanizado e profissional para toda a comunidade das <span className="whitespace-nowrap">ESFs Bela Vista - Catalão - São José</span>
            </p>
          </div>

          {/* Campanhas Visuais - Carrega somente se houver campanhas */}
          {!loadingCampanhas && campanhas && campanhas.length > 0 && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <p className="text-slate-600">
                  Confira as campanhas e eventos em destaque
                </p>
              </div>
              <CampanhaCarousel campanhas={campanhas} />
            </div>
          )}

          {/* Avisos Públicos */}
          <AvisosList />

          {/* Contact Information Section */}
          <div id="contato" className="bg-white rounded-lg shadow-md border border-neutral-200 mb-12">
            <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-neutral-50">
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                Informações de Contato
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base mt-1">
                Entre em contato conosco pelos canais abaixo
              </p>
            </div>

            <div className="p-4 sm:p-6">
              {/* Main Contact Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Reception */}
                <div className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
                        Recepção
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-1">
                            Telefone
                          </p>
                          <a
                            href="tel:+553732296080"
                            className="text-lg sm:text-xl font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
                          >
                            (37) 3229-6080
                          </a>
                        </div>
                        <div className="pt-2 border-t border-neutral-200">
                          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
                            Horário de Funcionamento
                          </p>
                          <div className="space-y-1 text-sm sm:text-base text-neutral-700">
                            <p>Segunda a Sexta: 07:00 - 17:00</p>
                            <p>Saúde na Hora: 17:00 - 22:00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Administrative Services */}
                <div className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
                        Administrativo
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
                            WhatsApp
                          </p>
                          <div className="space-y-2">
                            <a
                              href="https://wa.me/5537991770200"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-base sm:text-lg font-semibold text-neutral-900 hover:text-green-600 transition-colors"
                            >
                              <MessageCircle size={18} className="text-green-600 flex-shrink-0" />
                              <span>(37) 99177-0200</span>
                            </a>
                            <a
                              href="https://wa.me/5537991520024"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-base sm:text-lg font-semibold text-neutral-900 hover:text-green-600 transition-colors"
                            >
                              <MessageCircle size={18} className="text-green-600 flex-shrink-0" />
                              <span>(37) 99152-0024</span>
                            </a>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-neutral-200">
                          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
                            Horário de Atendimento ao Público
                          </p>
                          <p className="text-sm sm:text-base text-neutral-700">
                            07:00 às 12:00 | 13:00 às 16:30
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dentist */}
                <div className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Smile size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
                        Consultório Odontológico
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-1">
                            Telefone
                          </p>
                          <a
                            href="tel:+553732296082"
                            className="text-lg sm:text-xl font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
                          >
                            (37) 3229-6082
                          </a>
                        </div>
                        <div className="pt-2 border-t border-neutral-200">
                          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
                            Horário de Atendimento ao Público
                          </p>
                          <p className="text-sm sm:text-base text-neutral-700">
                            07:00 às 12:00 | 13:00 às 17:00
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pharmacy */}
                <div className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Pill size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
                        Farmácia
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-1">
                            Telefone
                          </p>
                          <a
                            href="tel:+553732296081"
                            className="text-lg sm:text-xl font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
                          >
                            (37) 3229-6081
                          </a>
                        </div>
                        <div className="pt-2 border-t border-neutral-200">
                          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
                            Horário de Atendimento ao Público
                          </p>
                          <p className="text-sm sm:text-base text-neutral-700">
                            07:30 às 16:00
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blood Collection */}
                <div className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Droplet size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
                        Coleta de Sangue
                      </h3>
                      <div className="space-y-3">
                        <div className="pt-2">
                          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
                            Horário de Atendimento ao Público
                          </p>
                          <p className="text-sm sm:text-base text-neutral-700 mb-1">
                            07:00 às 08:00
                          </p>
                          <p className="text-sm text-neutral-500 italic">
                            Mediante horário agendado
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
                        Endereço
                      </h3>
                      <div>
                        <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
                          Localização
                        </p>
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=Rua+Júlio+Nogueira+1320+São+José+Divinópolis+MG"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base text-neutral-700 hover:text-primary-600 transition-colors block leading-relaxed"
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
              </div>

              {/* Additional Info Bar */}
              <div className="bg-neutral-50 rounded-lg p-4 sm:p-5 border border-neutral-200">
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base text-neutral-700">
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
                    <span>@esfcatalao</span>
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

      {/* Image Gallery Section */}
      <section className="pt-8 pb-16 px-4 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              Nossa Unidade
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Conheça nossa equipe, estrutura e instalações
            </p>
          </div>
          {loadingImages ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : (
            <ImageGallery images={galleryImages} />
          )}
        </div>
      </section>

      {/* ACS Search Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Encontre sua Equipe de Saúde
            </h2>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
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
              className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-primary-200 group hover:border-accent-200 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-4 w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                <Users size={48} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900">
                Atividades Coletivas
              </h3>
              <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                Grupos de atividades coletivas e promoção de saúde
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:text-accent-700">
                <span>Consultar</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>

            <Link
              to="/equipe"
              className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-primary-200 group hover:border-secondary-200 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-4 w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-secondary-500 group-hover:text-white transition-colors">
                <BriefcaseMedical size={48} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900">
                Equipe E-multi
              </h3>
              <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                Conheça nossa equipe multiprofissional
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:text-secondary-700">
                <span>Consultar</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>

            <Link
              to="/servicos/vacinas"
              className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-primary-200 group hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-4 w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Syringe size={48} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900">
                Sala de Vacinação
              </h3>
              <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                Calendário Nacional de Vacinação e horários de atendimento
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:text-blue-700">
                <span>Consultar</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>

            <Link
              to="/educacao"
              className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-primary-200 group hover:border-green-200 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-4 w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <BookOpen size={48} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900">
                Educação em Saúde
              </h3>
              <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                Informações e orientações sobre saúde e prevenção
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:text-green-700">
                <span>Consultar</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>

            <Link
              to="/remsa"
              className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-primary-200 group hover:border-purple-200 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-4 w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <GraduationCap size={48} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900">
                REMSA
              </h3>
              <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                Residência Multiprofissional em Saúde
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:text-purple-700">
                <span>Consultar</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>

            <Link
              to="/acs"
              className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-primary-200 group hover:border-amber-200 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-4 w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <HeartHandshake size={48} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900">
                Agente Comunitário de Saúde
              </h3>
              <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                Encontre o ACS responsável pela sua área
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:text-amber-700">
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
      <section className="py-8 px-4 mb-8 bg-neutral-50 border-t border-b border-neutral-200">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone size={24} className="text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900">
              Atendimento de Urgência e Emergência
            </h3>
          </div>
          <p className="text-neutral-700 mb-3 text-center text-base">
            Em situações de emergência médica, acione imediatamente o Serviço de Atendimento Móvel de Urgência (SAMU) pelo telefone <span className="font-bold text-red-600">192</span>
          </p>
          <div className="text-center">
            <Link
              to="/educacao"
              className="inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900 underline transition-colors font-medium"
            >
              <span>Orientações para identificação de emergências clínicas</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
