import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchSection from "../components/search/SearchSection";
import { ImageGallery, LoadingSpinner } from "../components/common";
import AvisosList from "../components/avisos/AvisosList";
import CampanhaCarousel from "../components/campanha/CampanhaCarousel";
import CampanhaInfoCard from "../components/campaign/CampanhaInfoCard";
import { useCampanhas } from "../hooks/useCampanhas";
import { useAuth } from "../contexts/AuthContext";
import { usePermissions } from "../hooks/usePermissions";
import { contactInfo, openingHours, socialMedia } from "../config";
import {
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Hospital,
  Users,
  BriefcaseMedical,
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
  Facebook,
  Youtube,
  Calendar,
  PillBottle,
  HandHeart,
  MessageSquareHeart,
  LayoutDashboard,
  Bell,
  Megaphone,
  Package,
  ClipboardList,
  CalendarDays,
  BellDot,
} from "lucide-react";
import logoPrefeitura from "../assets/logo_mobile.png";
import logoSemusa from "../assets/logo-semusa.png";
import logoESF from "../assets/logo-esf.png";

const galleryImagesModules = import.meta.glob(
  "../assets/images/galeria-photos/*.{png,jpg,jpeg}",
  { eager: false }
);
const getCaptionFromFilename = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") return "";
  const filename = imagePath.split("/").pop().toLowerCase();
  const captionMap = [
    {
      pattern: "foto-unidade",
      caption:
        `Fachada da Unidade de Saúde ESF Catalão - ${contactInfo.address.main.street}, ${contactInfo.address.main.neighborhood}`,
    },
    {
      pattern: "equipe-esf-catalao-belavista-saojose",
      caption:
        "Equipe multiprofissional das ESFs Catalão, Bela Vista e São José reunida para foto oficial",
    },
    {
      pattern: "equipe.jpg",
      caption:
        "Profissionais da equipe multiprofissional da ESF Catalão comprometidos com o cuidado integral à saúde",
    },
    {
      pattern: "grupo-foco-na-saude",
      caption:
        'Grupo de atividades coletivas "Foco na Saúde" - Prevenção e diagnóstico do câncer de pele (Dezembro Laranja) e promoção da saúde',
    },
    {
      pattern: "grupo-viva-leve",
      caption:
        'Grupo de atividades coletivas "Viva Leve" - Cuidado e orientação para pacientes com dor crônica e fibromialgia',
    },
    {
      pattern: "outubro-rosa",
      caption:
        "Campanha Outubro Rosa - Conscientização e prevenção do câncer de mama na ESF Catalão",
    },
    {
      pattern: "viver-bem-diabetes",
      caption:
        'Grupo de atividades coletivas "Viver Bem com Diabetes" - Educação e orientação para pacientes diabéticos',
    },
  ];
  for (const { pattern, caption } of captionMap) {
    if (filename.includes(pattern.toLowerCase())) {
      return caption;
    }
  }
  const nameWithoutExt = filename.replace(/\.(png|jpg|jpeg)$/i, "");
  let formattedName = nameWithoutExt
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  if (formattedName.toLowerCase().includes("grupo")) {
    const grupoName = formattedName.replace(/^grupo\s+/i, "").trim();
    return `Grupo de atividades coletivas "${grupoName}" - Promoção de saúde e bem-estar na comunidade`;
  }
  if (
    formattedName.toLowerCase().includes("evento") ||
    formattedName.toLowerCase().includes("campanha") ||
    formattedName.toLowerCase().includes("ação")
  ) {
    return `${formattedName} realizado na ESF Catalão`;
  }
  return `${formattedName} - ESF Catalão`;
};
export default function Home() {
  const { campanhas, loading: loadingCampanhas } = useCampanhas();
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const { currentUser, isActive } = useAuth();
  const permissions = usePermissions();
  const isAuthenticated = currentUser && isActive;
  useEffect(() => {
    const loadImages = async () => {
      try {
        const modules = await Promise.all(
          Object.keys(galleryImagesModules).map((path) =>
            galleryImagesModules[path]()
          )
        );
        const imageEntries = modules.map((module, index) => ({
          src: module.default,
          caption: getCaptionFromFilename(
            Object.keys(galleryImagesModules)[index]
          ),
          credit: "Créditos: ESF Catalão - Arquivo próprio",
        }));
        const fotoUnidade = imageEntries.find((img) =>
          img.src.includes("foto-unidade")
        );
        const outrasImagens = imageEntries.filter(
          (img) => !img.src.includes("foto-unidade")
        );
        outrasImagens.sort((a, b) => a.src.localeCompare(b.src));
        setGalleryImages(
          fotoUnidade ? [fotoUnidade, ...outrasImagens] : outrasImagens
        );
      } catch (error) {
        console.error("Erro ao carregar imagens da galeria:", error);
        setGalleryImages([]);
      } finally {
        setLoadingImages(false);
      }
    };
    loadImages();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {}
      <section className="pt-16 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="mb-3">
              <p className="text-base md:text-lg font-medium text-neutral-500 uppercase tracking-wider mb-2">
                Estratégia Saúde da Família
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-2">
                <span className="text-primary-600 font-display font-bold tracking-wide uppercase">
                  ESF CATALÃO
                </span>
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed px-4">
              Atendimento humanizado e profissional para toda a comunidade das{" "}
              <span className="whitespace-nowrap">
                ESFs Bela Vista - Catalão - São José
              </span>
            </p>
          </div>
          {}
          {!loadingCampanhas && campanhas && campanhas.length > 0 && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <p className="text-neutral-600">
                  Confira as campanhas e eventos em destaque
                </p>
              </div>
              <CampanhaCarousel campanhas={campanhas} />

              {/* Card de informações abaixo do carrossel */}
              {campanhas.length > 0 && campanhas[0] && (
                <div className="mt-6">
                  <CampanhaInfoCard campanha={campanhas[0]} />
                </div>
              )}
            </div>
          )}
          {}
          <AvisosList />
          {}
          <div
            id="contato"
            className="bg-white rounded-lg shadow-md border border-neutral-200 mb-12"
          >
            <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-neutral-50">
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                Informações de Contato
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base mt-1">
                Entre em contato conosco pelos canais abaixo
              </p>
            </div>
            <div className="p-4 sm:p-6">
              {}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {}
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
                            href={`tel:${contactInfo.phones.reception.tel}`}
                            className="text-lg sm:text-xl font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
                          >
                            {contactInfo.phones.reception.display}
                          </a>
                        </div>
                        <div className="pt-2 border-t border-neutral-200">
                          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
                            Horário de Funcionamento
                          </p>
                          <div className="space-y-1 text-sm sm:text-base text-neutral-700">
                            <p>Segunda a Sexta: {openingHours.reception.weekdays}</p>
                            <p>Saúde na Hora: {openingHours.reception.saudeNaHora}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {}
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
                              href={`https://wa.me/${contactInfo.phones.whatsapp.admin1.wa}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-base sm:text-lg font-semibold text-neutral-900 hover:text-success transition-colors"
                            >
                              <MessageCircle
                                size={18}
                                className="text-success flex-shrink-0"
                              />
                              <span>{contactInfo.phones.whatsapp.admin1.display}</span>
                            </a>
                            <a
                              href={`https://wa.me/${contactInfo.phones.whatsapp.admin2.wa}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-base sm:text-lg font-semibold text-neutral-900 hover:text-success transition-colors"
                            >
                              <MessageCircle
                                size={18}
                                className="text-success flex-shrink-0"
                              />
                              <span>{contactInfo.phones.whatsapp.admin2.display}</span>
                            </a>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-neutral-200">
                          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
                            Horário de Atendimento ao Público
                          </p>
                          <p className="text-sm sm:text-base text-neutral-700">
                            {openingHours.administrative.full}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {}
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
                            href={`tel:${contactInfo.phones.dental.tel}`}
                            className="text-lg sm:text-xl font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
                          >
                            {contactInfo.phones.dental.display}
                          </a>
                        </div>
                        <div className="pt-2 border-t border-neutral-200">
                          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
                            Horário de Atendimento ao Público
                          </p>
                          <p className="text-sm sm:text-base text-neutral-700">
                            {openingHours.dental.full}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {}
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
                            href={`tel:${contactInfo.phones.pharmacy.tel}`}
                            className="text-lg sm:text-xl font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
                          >
                            {contactInfo.phones.pharmacy.display}
                          </a>
                        </div>
                        <div className="pt-2 border-t border-neutral-200">
                          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
                            Horário de Atendimento ao Público
                          </p>
                          <p className="text-sm sm:text-base text-neutral-700">
                            {openingHours.pharmacy.full}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {}
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
                            {openingHours.bloodCollection.time}
                          </p>
                          <p className="text-sm text-neutral-500 italic">
                            {openingHours.bloodCollection.note}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {}
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
                          href={`https://www.google.com/maps/search/?api=1&query=${contactInfo.address.main.mapsQuery}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base text-neutral-700 hover:text-primary-600 transition-colors block leading-relaxed"
                        >
                          {contactInfo.address.main.street}
                          <br />
                          {contactInfo.address.main.neighborhood}
                          <br />
                          {contactInfo.address.main.city} - {contactInfo.address.main.state}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {}
              <div className="bg-neutral-50 rounded-lg p-4 sm:p-5 border border-neutral-200">
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base text-neutral-700">
                  <a
                    href={`mailto:${contactInfo.emails.general}`}
                    className="flex items-center gap-2 hover:text-primary-600 hover:underline transition-colors"
                  >
                    <Mail size={16} className="text-neutral-600" />
                    <span>{contactInfo.emails.general}</span>
                  </a>
                  <div className="hidden md:block w-px h-4 bg-neutral-300"></div>
                  <a
                    href={socialMedia.esfCatalao.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-pink-600 hover:underline transition-colors"
                  >
                    <Instagram size={16} className="text-neutral-600" />
                    <span>{socialMedia.esfCatalao.instagram.handle}</span>
                  </a>
                  <div className="hidden md:block w-px h-4 bg-neutral-300"></div>
                  <a
                    href={`tel:${contactInfo.emergency.samu.tel}`}
                    className="flex items-center gap-2 hover:text-error hover:underline transition-colors"
                  >
                    <Phone size={16} className="text-neutral-600" />
                    <span>Emergência SAMU: {contactInfo.emergency.samu.display}</span>
                  </a>
                  <div className="hidden md:block w-px h-4 bg-neutral-300"></div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${contactInfo.emergency.upa.mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary-600 hover:underline transition-colors"
                  >
                    <Hospital size={16} className="text-neutral-600" />
                    <span>Plantão 24h: {contactInfo.emergency.upa.name}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}
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
      {}
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
      {}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3 text-center">
            Explore Nossos Serviços
          </h2>
          <p className="text-lg text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
            Navegue pelos diferentes serviços e profissionais disponíveis na
            unidade
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Link
              to="/servicos"
              className="relative overflow-hidden rounded-2xl p-4 md:p-8 bg-white border-2 border-primary-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <Hospital className="w-6 h-6 md:w-12 md:h-12" strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 text-neutral-900">
                Serviços
              </h3>
              <p className="text-neutral-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                Todos os serviços e atendimentos disponíveis
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                <span>Consultar</span>
                <ArrowRight
                  size={16}
                  className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
            <Link
              to="/grupos"
              className="relative overflow-hidden rounded-2xl p-4 md:p-8 bg-white border-2 border-primary-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <Users className="w-6 h-6 md:w-12 md:h-12" strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 text-neutral-900">
                Atividades Coletivas
              </h3>
              <p className="text-neutral-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                Grupos de atividades coletivas e promoção de saúde
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                <span>Consultar</span>
                <ArrowRight
                  size={16}
                  className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
            <Link
              to="/equipe"
              className="relative overflow-hidden rounded-2xl p-4 md:p-8 bg-white border-2 border-primary-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <BriefcaseMedical className="w-6 h-6 md:w-12 md:h-12" strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 text-neutral-900 whitespace-nowrap">
                E-multi
              </h3>
              <p className="text-neutral-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                Equipe Multiprofissional de Saúde
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                <span>Consultar</span>
                <ArrowRight
                  size={16}
                  className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
            <Link
              to="/servicos/vacinas"
              className="relative overflow-hidden rounded-2xl p-4 md:p-8 bg-white border-2 border-primary-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <Syringe className="w-6 h-6 md:w-12 md:h-12" strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 text-neutral-900">
                Sala de Vacinação
              </h3>
              <p className="text-neutral-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                Calendário Nacional de Vacinação e horários de atendimento
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                <span>Consultar</span>
                <ArrowRight
                  size={16}
                  className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
            <Link
              to="/remsa"
              className="relative overflow-hidden rounded-2xl p-4 md:p-8 bg-white border-2 border-primary-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6 md:w-12 md:h-12" strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 text-neutral-900">
                REMSA
              </h3>
              <p className="text-neutral-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                Programa de Residência Multiprofissional em Saúde do Adolescente
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                <span>Consultar</span>
                <ArrowRight
                  size={16}
                  className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
            <Link
              to="/servicos/sala-4"
              className="relative overflow-hidden rounded-2xl p-4 md:p-8 bg-white border-2 border-primary-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <Calendar className="w-6 h-6 md:w-12 md:h-12" strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 text-neutral-900">
                Sala de Agendamento
              </h3>
              <p className="text-neutral-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                Agende consultas, exames e procedimentos
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                <span>Consultar</span>
                <ArrowRight
                  size={16}
                  className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
            <Link
              to="/servicos/consultas"
              className="relative overflow-hidden rounded-2xl p-4 md:p-8 bg-white border-2 border-primary-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <Users className="w-6 h-6 md:w-12 md:h-12" strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 text-neutral-900">
                Consultas Médicas
              </h3>
              <p className="text-neutral-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                Consultas médicas, psicológicas e especializadas
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                <span>Consultar</span>
                <ArrowRight
                  size={16}
                  className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
            <Link
              to="/servicos/farmacia"
              className="relative overflow-hidden rounded-2xl p-4 md:p-8 bg-white border-2 border-primary-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <PillBottle className="w-6 h-6 md:w-12 md:h-12" strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 text-neutral-900">
                Farmácia
              </h3>
              <p className="text-neutral-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                Retirada de medicamentos e renovação de receitas
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                <span>Consultar</span>
                <ArrowRight
                  size={16}
                  className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
            <Link
              to="/ouvidoria"
              className="relative overflow-hidden rounded-2xl p-4 md:p-8 bg-white border-2 border-primary-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <MessageSquareHeart className="w-6 h-6 md:w-12 md:h-12" strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 text-neutral-900">
                Ouvidoria
              </h3>
              <p className="text-neutral-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                Envie elogios, sugestões ou reclamações. Sua opinião é importante!
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                <span>Enviar Feedback</span>
                <ArrowRight
                  size={16}
                  className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
            <Link
              to="/servicos/bolsa-familia"
              className="relative overflow-hidden rounded-2xl p-4 md:p-8 bg-white border-2 border-primary-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <HandHeart className="w-6 h-6 md:w-12 md:h-12" strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 text-neutral-900">
                Bolsa Família e Serviço Social
              </h3>
              <p className="text-neutral-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                Benefícios sociais, CadÚnico e assistência
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                <span>Consultar</span>
                <ArrowRight
                  size={16}
                  className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
            <Link
              to="/acs"
              className="relative overflow-hidden rounded-2xl p-4 md:p-8 bg-white border-2 border-primary-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div className="mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <HeartHandshake className="w-6 h-6 md:w-12 md:h-12" strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 text-neutral-900">
                Agente Comunitário de Saúde
              </h3>
              <p className="text-neutral-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                Encontre o ACS responsável pela sua área
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                <span>Consultar</span>
                <ArrowRight
                  size={16}
                  className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* Seção de Redes Sociais */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              Acompanhe Nossas Redes Sociais
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Fique por dentro das novidades, campanhas e informações importantes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* ESF Catalão */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-primary-200 hover:shadow-xl transition-all">
              <div className="flex justify-center items-center mb-6">
                <img
                  src={logoESF}
                  alt="ESF Catalão - Estratégia Saúde da Família"
                  className="w-full max-w-[280px] md:max-w-[500px] h-auto object-contain"
                  style={{ filter: 'brightness(1.1) contrast(1.1) saturate(1.2)' }}
                />
              </div>
              <div className="border-t border-neutral-200 pt-6">
                <p className="text-center text-sm font-medium text-neutral-600 mb-4 uppercase tracking-wide">
                  ESF Catalão
                </p>
                <div className="flex justify-center">
                  <a
                    href={socialMedia.esfCatalao.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    aria-label="Instagram ESF Catalão"
                  >
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Prefeitura de Divinópolis */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-neutral-200 hover:shadow-xl transition-all">
              <div className="flex justify-center items-center mb-6 h-28">
                <img
                  src={logoPrefeitura}
                  alt="Prefeitura de Divinópolis"
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="border-t border-neutral-200 pt-6">
                <p className="text-center text-sm font-medium text-neutral-600 mb-4 uppercase tracking-wide">
                  Prefeitura de Divinópolis
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={socialMedia.prefeitura.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    aria-label="Instagram Prefeitura de Divinópolis"
                  >
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={socialMedia.prefeitura.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    aria-label="Facebook Prefeitura de Divinópolis"
                  >
                    <Facebook size={20} />
                    <span>Facebook</span>
                  </a>
                  <a
                    href={socialMedia.prefeitura.youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    aria-label="YouTube Prefeitura de Divinópolis"
                  >
                    <Youtube size={20} />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>

            {/* SEMUSA */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-neutral-200 hover:shadow-xl transition-all">
              <div className="flex justify-center items-center mb-6 h-28">
                <img
                  src={logoSemusa}
                  alt="SEMUSA - Secretaria Municipal de Saúde"
                  className="h-28 w-auto object-contain"
                />
              </div>
              <div className="border-t border-neutral-200 pt-6">
                <p className="text-center text-sm font-medium text-neutral-600 mb-4 uppercase tracking-wide">
                  SEMUSA Divinópolis
                </p>
                <div className="flex justify-center">
                  <a
                    href={socialMedia.semusa.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    aria-label="Instagram SEMUSA Divinópolis"
                  >
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}
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
            Em situações de emergência médica, acione imediatamente o Serviço de
            Atendimento Móvel de Urgência (SAMU) pelo telefone{" "}
            <span className="font-bold text-error">{contactInfo.emergency.samu.display}</span>
          </p>
        </div>
      </section>
    </div>
  );
}
