import { Phone, Clock, MapPin, Instagram, ChevronRight, Hand, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logoPrefeitura from "../../assets/logo_mobile.png";

/**
 * Footer Component
 * Rodapé com informações de contato e links rápidos
 * Inspirado no footer da Prefeitura de Divinópolis
 */

export default function Footer() {
  const quickLinks = [
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/servicos" },
    { name: "Grupos", path: "/grupos" },
    { name: "Equipe", path: "/equipe" },
    { name: "ACS", path: "/acs" },
    { name: "Contato", path: "/#contato" },
  ];

  return (
    <footer className="bg-neutral-100 text-neutral-900 mt-auto relative">
      {/* Ícone de Acessibilidade - VLibras */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => {
            const vlibrasButton = document.querySelector('[vw-access-button]');
            if (vlibrasButton) {
              vlibrasButton.click();
            }
          }}
          className="bg-primary-600 hover:bg-primary-700 p-2 rounded transition-colors"
          aria-label="Acessibilidade - VLibras"
          title="Acessibilidade - VLibras"
        >
          <Hand size={20} className="text-white" />
        </button>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Seção Esquerda - Logo e Redes Sociais */}
          <div>
            {/* Logo Prefeitura - sem fundo branco */}
            <div className="mb-4">
              <img
                src={logoPrefeitura}
                alt="Prefeitura de Divinópolis"
                className="h-14 w-auto object-contain"
                style={{
                  imageRendering: 'high-quality',
                }}
              />
            </div>
            
            <div className="border-t border-neutral-300 pt-4 mt-4">
              <p className="text-neutral-700 text-sm mb-3">Acompanhe a gente!</p>
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

          {/* Seção Central - Informações de Contato */}
          <div>
            <div className="space-y-3">
              {/* Endereço */}
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-neutral-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-neutral-700">
                  <p>Rua Júlio Nogueira, 1320 - São José</p>
                  <p>CEP: 35501-170</p>
                </div>
              </div>

              {/* Horário */}
              <div className="flex items-start gap-2">
                <Clock size={18} className="text-neutral-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-neutral-700">
                  <p>Atendimento da ESF - Segunda a Sexta, das 07:00 às 17:00 horas.</p>
                  <p>Saúde na Hora: 17:00 às 22:00</p>
                </div>
              </div>

              {/* Telefone */}
              <div className="flex items-start gap-2">
                <Phone size={18} className="text-neutral-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-neutral-700">
                  <a
                    href="tel:+553732296080"
                    className="hover:text-primary-600 transition-colors underline-offset-2 hover:underline"
                  >
                    (37) 3229-6080
                  </a>
                </div>
              </div>

              {/* Email/Ouvidoria */}
              <div className="flex items-start gap-2">
                <Mail size={18} className="text-neutral-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-neutral-700">
                  <a
                    href="mailto:staff.sj21@gmail.com"
                    className="hover:text-primary-600 transition-colors underline-offset-2 hover:underline"
                  >
                    staff.sj21@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Seção Direita - Acesso Fácil */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-neutral-900 border-b border-neutral-300 pb-2">
              Acesso Fácil
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-sm text-neutral-700 hover:text-primary-600 transition-colors group"
                  >
                    <ChevronRight size={16} className="text-primary-600 group-hover:translate-x-1 transition-transform" />
                    {link.name.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-300 mt-8 pt-6 text-center">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} ESF CATALÃO - Prefeitura de Divinópolis
          </p>
        </div>
      </div>
    </footer>
  );
}
