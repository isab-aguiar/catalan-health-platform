import { Phone, Clock, MapPin } from "lucide-react";

/**
 * Footer Component
 * Rodapé com informações de contato e links rápidos
 */

export default function Footer() {
  const contactInfo = [
    {
      icon: Phone,
      label: "Telefone",
      value: "(37) 3229-6080",
      link: "tel:+553732296080",
    },
    {
      icon: Clock,
      label: "Horário",
      value: ["Segunda a Sexta: 07:00 - 17:00", "Saúde na Hora: 17:00 - 22:00"],
    },
    {
      icon: MapPin,
      label: "Endereço",
      value: "Rua Júlio Nogueira, 1320 - São José, Divinópolis - MG",
      link: "https://www.google.com/maps/search/?api=1&query=Rua+Júlio+Nogueira+1320+São+José+Divinópolis+MG",
    },
  ];

  return (
    <footer className="bg-neutral-900 text-white mt-auto">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* About */}
          <div>
            <h3 className="font-display font-bold text-lg md:text-xl mb-3 text-white tracking-wide uppercase">ESF Catalão</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Estratégia Saúde da Família comprometida com o atendimento humanizado
              para toda a comunidade das ESFs Bela Vista -  Catalão - São José
              em Divinópolis - Minas Gerais.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-white">Contato</h4>
            <ul className="space-y-2">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                let content;
                
                if (item.link) {
                  content = (
                    <a
                      href={item.link}
                      target={item.link.startsWith('http') ? '_blank' : undefined}
                      rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-neutral-300 hover:text-primary-400 transition-colors cursor-pointer underline-offset-2 hover:underline"
                    >
                      {item.value}
                    </a>
                  );
                } else if (Array.isArray(item.value)) {
                  content = (
                    <div className="text-sm text-neutral-300 space-y-1">
                      {item.value.map((line, lineIndex) => (
                        <p key={lineIndex}>{line}</p>
                      ))}
                    </div>
                  );
                } else {
                  content = (
                    <p className="text-sm text-neutral-300">{item.value}</p>
                  );
                }
                
                return (
                  <li key={index} className="flex items-start gap-2">
                    <Icon
                      size={16}
                      className="text-primary-400 flex-shrink-0 mt-0.5"
                    />
                    {content}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-6 pt-6 text-center">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} ESF Catalão
          </p>
        </div>
      </div>
    </footer>
  );
}
