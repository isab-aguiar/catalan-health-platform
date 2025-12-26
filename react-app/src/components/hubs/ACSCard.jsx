import { MapPin, Phone, Stethoscope } from 'lucide-react';

export default function ACSCard({
  name,
  esf,
  microarea,
  photo,
  phone,
  bio,
  team,
  streets,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-medium overflow-hidden border border-neutral-200 hover:shadow-strong transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={photo || '/placeholder-acs.jpg'}
            alt={`Foto de ${name}`}
            className="w-24 h-24 rounded-full object-cover border-4 border-primary-100 shadow-soft"
          />
          <div>
            <h3 className="text-2xl font-bold text-neutral-900">{name}</h3>
            <p className="text-md text-primary-700 font-semibold">{esf}</p>
            <p className="text-neutral-600">Microárea: {microarea}</p>
          </div>
        </div>

        {phone && (
          <div className="flex items-center gap-2 text-neutral-700 mb-4">
            <Phone size={18} className="text-primary-600" />
            <span>{phone}</span>
          </div>
        )}

        {bio && (
          <p className="text-sm text-neutral-700 leading-relaxed mb-6">{bio}</p>
        )}

        <div className="bg-neutral-50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
            <Stethoscope size={18} className="text-primary-600" />
            Equipe de Saúde
          </h4>
          <ul className="space-y-2 text-sm text-neutral-700">
            <li className="flex justify-between items-center">
              <span>Médico:</span>
              <span className="font-medium text-neutral-800">
                {team?.doctor || 'Não disponível'}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span>Enfermeira:</span>
              <span className="font-medium text-neutral-800">
                {team?.nurse || 'Não disponível'}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span>Dentista:</span>
              <span className="font-medium text-neutral-800">
                {team?.dentist || 'Não disponível'}
              </span>
            </li>
          </ul>
        </div>

        {streets && streets.length > 0 && (
          <div className="bg-neutral-50 rounded-lg p-4">
            <h4 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
              <MapPin size={18} className="text-primary-600" />
              Ruas de Cobertura
            </h4>
            <ul className="space-y-1 text-sm text-neutral-700">
              {streets.slice(0, 5).map((street, idx) => (
                <li key={idx} className="pl-4 border-l-2 border-primary-200">
                  {street}
                </li>
              ))}
              {streets.length > 5 && (
                <li className="text-primary-600 font-medium">
                  + {streets.length - 5} ruas
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
