import { Phone, Mail, Instagram, Hospital } from "lucide-react";
import { contactInfo, socialMedia } from "../../config";
import ContactCard from "./ContactCard";

export default function HomeContact() {
  return (
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <ContactCard type="reception" />
          <ContactCard type="administrative" />
          <ContactCard type="dental" />
          <ContactCard type="pharmacy" />
          <ContactCard type="bloodCollection" />
          <ContactCard type="address" />
        </div>

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
  );
}
