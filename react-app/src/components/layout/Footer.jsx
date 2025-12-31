import {
  Phone,
  Clock,
  MapPin,
  Instagram,
  ChevronRight,
  Mail,
  Facebook,
  Youtube,
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoPrefeitura from '../../assets/logo_mobile.png';
import logoSemusa from '../../assets/logo-semusa.png';
import logoESF from '../../assets/logo-esf.png';
import { contactInfo, openingHours } from '../../config';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const quickLinks = [
    { name: 'Sala de Atendimento Administrativo', path: '/servicos/sala-9' },
    { name: 'Sala de Vacinação', path: '/servicos/vacinas' },
    { name: 'Sala de Agendamentos', path: '/servicos/sala-4' },
    { name: 'E-multi', path: '/equipe' },
    { name: 'Ouvidoria', path: '/ouvidoria' },
    { name: 'Contato', path: '/#contato', isAnchor: true },
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    if (link.isAnchor) {
      const scrollToElement = () => {
        const element = document.getElementById('contato');
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };
      if (location.pathname === '/') {
        scrollToElement();
      } else {
        navigate('/');
        setTimeout(scrollToElement, 300);
      }
    } else {
      navigate(link.path);
    }
  };

  return (
    <footer className="bg-neutral-100 text-neutral-900 mt-auto relative">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid md:grid-cols-2 gap-20">
          <div className="md:pr-8">
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

          <div>
            <h4 className="font-semibold text-lg mb-3 text-neutral-900 border-b border-neutral-300 pb-2">
              Fale Conosco
            </h4>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={18} className="text-neutral-500" />
                  <p className="font-semibold text-neutral-900 text-sm">
                    Endereço
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${contactInfo.address.main.mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block pl-7 text-sm text-neutral-700 hover:text-primary-600 transition-colors leading-relaxed"
                >
                  <p>{contactInfo.address.main.street}</p>
                  <p>{contactInfo.address.main.neighborhood}</p>
                  <p>{contactInfo.address.main.city} - {contactInfo.address.main.state}</p>
                  <p className="text-xs text-neutral-600 mt-1">
                    CEP: {contactInfo.address.main.cep}
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
                  <p>{openingHours.reception.weekdays}</p>
                  <p className="mt-2 text-neutral-900 font-medium">
                    Saúde na Hora: <br/>{openingHours.reception.saudeNaHora}
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
                  href={`tel:${contactInfo.phones.reception.tel}`}
                  className="block pl-7 text-sm text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                >
                  {contactInfo.phones.reception.display}
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
                  href={`mailto:${contactInfo.emails.general}`}
                  className="block pl-7 text-sm text-neutral-700 hover:text-primary-600 transition-colors break-all"
                >
                  {contactInfo.emails.general}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-300 mt-8 pt-6 text-center">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} Estratégia Saúde da Família ESF Catalão
            - Todos os direitos reservados
          </p>
         
        </div>
      </div>
    </footer>
  );
}
