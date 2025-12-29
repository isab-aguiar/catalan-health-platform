import { Phone, Building2, Smile, Pill, Droplet, MapPin, MessageCircle } from "lucide-react";
import { contactInfo, openingHours } from "../../config";

/**
 * ContactCard - Card individual de informação de contato
 * @param {string} type - Tipo de contato (reception, administrative, dental, pharmacy, bloodCollection, address)
 */
export default function ContactCard({ type }) {
  const cards = {
    reception: {
      icon: Phone,
      iconBg: "bg-primary-600",
      title: "Recepção",
      content: (
        <>
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
        </>
      ),
    },
    administrative: {
      icon: Building2,
      iconBg: "bg-neutral-700",
      title: "Administrativo",
      content: (
        <>
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
                <MessageCircle size={18} className="text-success flex-shrink-0" />
                <span>{contactInfo.phones.whatsapp.admin1.display}</span>
              </a>
              <a
                href={`https://wa.me/${contactInfo.phones.whatsapp.admin2.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base sm:text-lg font-semibold text-neutral-900 hover:text-success transition-colors"
              >
                <MessageCircle size={18} className="text-success flex-shrink-0" />
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
        </>
      ),
    },
    dental: {
      icon: Smile,
      iconBg: "bg-blue-600",
      title: "Consultório Odontológico",
      content: (
        <>
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
        </>
      ),
    },
    pharmacy: {
      icon: Pill,
      iconBg: "bg-purple-600",
      title: "Farmácia",
      content: (
        <>
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
        </>
      ),
    },
    bloodCollection: {
      icon: Droplet,
      iconBg: "bg-red-700",
      title: "Coleta de Sangue",
      content: (
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
      ),
    },
    address: {
      icon: MapPin,
      iconBg: "bg-green-600",
      title: "Endereço",
      content: (
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
      ),
    },
  };

  const card = cards[type];
  if (!card) return null;

  const IconComponent = card.icon;

  return (
    <div className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 ${card.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <IconComponent size={24} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
            {card.title}
          </h3>
          <div className="space-y-3">{card.content}</div>
        </div>
      </div>
    </div>
  );
}

