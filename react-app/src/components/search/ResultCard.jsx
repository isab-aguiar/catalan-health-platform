import { Activity, MapPin, Stethoscope, User, Users } from 'lucide-react';
import Alert from '../common/Alert';
import Badge from '../common/Badge';

export default function ResultCard({ result }) {
  return (
    <div className="bg-white border-2 border-primary rounded-lg p-5 md:p-6 shadow-card animate-slide-up">
      <div className="flex items-start justify-between mb-5 pb-4 border-b border-neutral-200">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2">
            {result.street}
          </h3>
          <div className="flex items-center gap-2 text-text-secondary">
            <MapPin size={18} strokeWidth={2} />
            <span className="text-sm font-medium">{result.numberRange}</span>
          </div>
        </div>
        <Badge variant="primary" size="lg">
          Microárea {result.microarea}
        </Badge>
      </div>

      <div className="bg-bg-body rounded-lg p-5 mb-4">
        <h4 className="font-bold text-text-primary mb-4 flex items-center gap-2 text-base">
          <Users size={20} className="text-primary" strokeWidth={2} />
          Equipe de Saúde da Família
        </h4>
        <div className="space-y-3.5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary-surface rounded-md flex items-center justify-center flex-shrink-0">
              <Activity size={20} className="text-primary" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-medium">Equipe</p>
              <p className="font-semibold text-text-primary text-sm">
                {result.esf}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-md flex items-center justify-center flex-shrink-0">
              <User size={20} className="text-secondary" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-medium">
                Agente Comunitário de Saúde
              </p>
              <p className="font-semibold text-text-primary text-sm">
                {result.acs}
              </p>
            </div>
          </div>

          {result.medico && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-md flex items-center justify-center flex-shrink-0">
                <Stethoscope
                  size={20}
                  className="text-accent"
                  strokeWidth={2}
                />
              </div>
              <div>
                <p className="text-xs text-text-secondary font-medium">
                  Médico(a)
                </p>
                <p className="font-semibold text-text-primary text-sm">
                  {result.medico}
                </p>
              </div>
            </div>
          )}

          {result.enfermeira && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-md flex items-center justify-center flex-shrink-0">
                <Activity size={20} className="text-success" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs text-text-secondary font-medium">
                  Enfermeiro(a)
                </p>
                <p className="font-semibold text-text-primary text-sm">
                  {result.enfermeira}
                </p>
              </div>
            </div>
          )}

          {result.dentista && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-secondary-100 rounded-md flex items-center justify-center flex-shrink-0">
                <User
                  size={20}
                  className="text-secondary-700"
                  strokeWidth={2}
                />
              </div>
              <div>
                <p className="text-xs text-text-secondary font-medium">
                  Dentista
                </p>
                <p className="font-semibold text-text-primary text-sm">
                  {result.dentista}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {result.observacao && (
        <Alert type="info" className="text-sm">
          <strong>Observação:</strong> {result.observacao}
        </Alert>
      )}
    </div>
  );
}
