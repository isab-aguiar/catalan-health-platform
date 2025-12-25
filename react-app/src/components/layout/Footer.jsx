import {
  Phone,
  Clock,
  MapPin,
  Instagram,
  ChevronRight,
  Mail,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoPrefeitura from "../../assets/logo_mobile.png";
export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const quickLinks = [
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/servicos" },
    { name: "Sala de Vacinação", path: "/servicos/vacinas" },
    { name: "Grupos", path: "/grupos" },
    { name: "Equipe", path: "/equipe" },
    { name: "ACS", path: "/acs" },
    { name: "Contato", path: "/#contato", isAnchor: true },
  ];
  const handleLinkClick = (e, link) => {
    e.preventDefault();
    if (link.isAnchor) {
      const scrollToElement = () => {
        const element = document.getElementById("contato");
        if (element) {
          const yOffset = -80;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      };
      if (location.pathname === "/") {
        scrollToElement();
      } else {
        navigate("/");
        setTimeout(scrollToElement, 300);
      }
    } else {
      if (location.pathname === link.path) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(link.path);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      }
    }
  };
  return (
    <footer className="bg-neutral-100 text-neutral-900 mt-auto relative">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <img
                src={logoPrefeitura}
                alt="Prefeitura de Divinópolis"
                className="h-14 w-auto object-contain"
                style={{
                  imageRendering: "high-quality",
                }}
              />
            </div>
            <div className="border-t border-neutral-300 pt-4 mt-4">
              <p className="text-neutral-700 text-sm mb-3">
                Acompanhe a gente!
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/esfcatalao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-700 hover:bg-primary-600 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} className="text-white" />
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={18} className="text-neutral-500" />
                  <p className="font-semibold text-neutral-900 text-sm">
                    Endereço
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Rua+Júlio+Nogueira+1320+São+José+Divinópolis+MG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block pl-7 text-sm text-neutral-700 hover:text-primary-600 transition-colors leading-relaxed"
                >
                  <p>Rua Júlio Nogueira, nº 1320</p>
                  <p>Bairro São José</p>
                  <p>Divinópolis - MG</p>
                  <p className="text-xs text-neutral-600 mt-1">
                    CEP: 35501-170
                  </p>
                </a>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={18} className="text-neutral-500" />
                  <p className="font-semibold text-neutral-900 text-sm">
                    Horário de Atendimento
                  </p>
                </div>
                <div className="pl-7 text-sm text-neutral-700 leading-relaxed">
                  <p>Segunda a Sexta-feira</p>
                  <p>07h00 às 17h00</p>
                  <p className="mt-2 text-neutral-900 font-medium">
                    Saúde na Hora: 17h00 às 22h00
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={18} className="text-neutral-500" />
                  <p className="font-semibold text-neutral-900 text-sm">
                    Telefone
                  </p>
                </div>
                <a
                  href="tel:+553732296080"
                  className="block pl-7 text-sm text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                >
                  (37) 3229-6080
                </a>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={18} className="text-neutral-500" />
                  <p className="font-semibold text-neutral-900 text-sm">
                    E-mail
                  </p>
                </div>
                <a
                  href="mailto:staff.sj21@gmail.com"
                  className="block pl-7 text-sm text-neutral-700 hover:text-primary-600 transition-colors break-all"
                >
                  staff.sj21@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3 text-neutral-900 border-b border-neutral-300 pb-2">
              Acesso Fácil
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={(e) => handleLinkClick(e, link)}
                    className="flex items-center gap-2 text-sm text-neutral-700 hover:text-primary-600 transition-colors group"
                  >
                    <ChevronRight
                      size={16}
                      className="text-primary-600 group-hover:translate-x-1 transition-transform"
                    />
                    {link.name.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-300 mt-8 pt-6 text-center">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} Estratégia Saúde da Família ESF Catalão
            - Todos os direitos reservados
          </p>
          <p className="text-xs text-neutral-500 mt-2">
            Unidade de Saúde vinculada à Secretaria Municipal de Saúde de
            Divinópolis/MG
          </p>
        </div>
      </div>
    </footer>
  );
}
