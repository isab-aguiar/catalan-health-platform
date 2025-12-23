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
    },
    {
      icon: Clock,
      label: "Horário",
      value: "Seg-Sex, 07:00 - 22:00",
    },
    {
      icon: MapPin,
      label: "Endereço",
      value: "Rua Júlio Nogueira, 1320 - São José, Divinópolis - MG",
    },
  ];

  return (
    <footer className="bg-neutral-900 text-white mt-auto">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-xl mb-3">UBS São José</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Unidade Básica de Saúde comprometida com o atendimento humanizado
              e de qualidade para toda a comunidade do bairro São José em
              Divinópolis.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-white">Contato</h4>
            <ul className="space-y-2">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex items-center gap-2">
                    <Icon
                      size={16}
                      className="text-primary-400 flex-shrink-0"
                    />
                    <p className="text-sm text-neutral-300">{item.value}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-6 pt-6 text-center">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} UBS São José
          </p>
        </div>
      </div>
    </footer>
  );
}
