import { Phone } from "lucide-react";
import { contactInfo } from "../../config";

export default function HomeEmergency() {
  return (
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
          <span className="font-bold text-error">
            {contactInfo.emergency.samu.display}
          </span>
        </p>
      </div>
    </section>
  );
}
