import { useState, useEffect } from 'react';
import { Users, Calendar, Clock, RefreshCw } from 'lucide-react';
import { getAllEmployees } from '../../services/employeesService';

/**
 * Componente para exibir escala de profissionais filtrada por:
 * - Departamento (ex: tecnicoEnfermagem)
 * - Estação de trabalho (ex: Sala de Curativos, Triagem, etc)
 */
export default function EscalaProfissionais({
  titulo = "Profissionais Escalados",
  department,
  workStation,
  showWeeklySchedule = false
}) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, [department, workStation]);

  async function loadEmployees() {
    setLoading(true);
    setError(null);

    try {
      const result = await getAllEmployees();

      if (!result.success) {
        throw new Error(result.error);
      }

      // Filtrar por departamento e/ou estação de trabalho
      let filtered = result.data;

      if (department) {
        filtered = filtered.filter(emp => emp.department === department);
      }

      if (workStation) {
        filtered = filtered.filter(emp => {
          if (!emp.workStation) return false;

          // Verificar formato simples (location + shift)
          if (emp.workStation.location === workStation) {
            return true;
          }

          // Verificar formato com morning/afternoon
          if (emp.workStation.morning?.location === workStation ||
              emp.workStation.afternoon?.location === workStation) {
            return true;
          }

          return false;
        });
      }

      // Ordenar por nome
      filtered.sort((a, b) => a.displayName.localeCompare(b.displayName));

      setEmployees(filtered);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar profissionais:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-8">
        <div className="flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-neutral-600 text-sm">Carregando escalas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm">
          <strong>Erro ao carregar escalas:</strong> {error}
        </p>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <Users className="w-12 h-12 text-neutral-300" />
          <p className="text-neutral-600 text-sm">
            Nenhum profissional escalado no momento
          </p>
          <p className="text-neutral-500 text-xs">
            As escalas serão atualizadas em breve
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5">
      <h3 className="font-semibold text-neutral-800 mb-4 pb-3 border-b border-neutral-300 text-sm flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-600" />
        {titulo}
      </h3>

      {/* Versão Desktop */}
      <div className="hidden md:block">
        <table className="w-full border-collapse border border-neutral-300">
          <thead>
            <tr className="bg-neutral-100">
              <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                Profissional
              </th>
              <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                Cargo
              </th>
              <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                Horário
              </th>
              {showWeeklySchedule && (
                <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                  Atividades Semanais
                </th>
              )}
            </tr>
          </thead>
          <tbody className="text-sm">
            {employees.map((emp) => (
              <tr key={emp.id} className="bg-white">
                <td className="border border-neutral-300 px-4 py-3">
                  <strong className="text-neutral-800">{emp.displayName}</strong>
                  {emp.esf && (
                    <div className="text-xs text-blue-600 mt-1">
                      ESF {emp.esf.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </div>
                  )}
                </td>
                <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                  {emp.roleBase || emp.role}
                </td>
                <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                  <div className="space-y-1">
                    {emp.schedule?.morning?.enabled && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-blue-600" />
                        <span className="text-xs">Manhã: {emp.schedule.morning.display}</span>
                      </div>
                    )}
                    {emp.schedule?.afternoon?.enabled && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span className="text-xs">Tarde: {emp.schedule.afternoon.display}</span>
                      </div>
                    )}
                  </div>
                </td>
                {showWeeklySchedule && emp.weeklySchedule && (
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <div className="space-y-1 text-xs">
                      {Object.entries(emp.weeklySchedule).map(([dia, atividades]) => (
                        <div key={dia} className="flex gap-2">
                          <strong className="text-neutral-800 w-16 capitalize">{dia}:</strong>
                          <div>
                            {atividades.morning && <div>Manhã: {atividades.morning}</div>}
                            {atividades.afternoon && <div>Tarde: {atividades.afternoon}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Versão Mobile */}
      <div className="md:hidden space-y-3">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-white border border-neutral-200 rounded-lg p-4">
            <div className="mb-3 pb-3 border-b border-neutral-200">
              <div className="font-semibold text-neutral-800 mb-1">
                {emp.displayName}
              </div>
              <div className="text-xs text-neutral-600">{emp.roleBase || emp.role}</div>
              {emp.esf && (
                <div className="text-xs text-blue-600 mt-1">
                  ESF {emp.esf.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-neutral-500 mb-1 font-medium">Horários:</p>
                <div className="space-y-1">
                  {emp.schedule?.morning?.enabled && (
                    <div className="flex items-center gap-2 text-xs text-neutral-700">
                      <Clock className="w-3 h-3 text-blue-600" />
                      Manhã: {emp.schedule.morning.display}
                    </div>
                  )}
                  {emp.schedule?.afternoon?.enabled && (
                    <div className="flex items-center gap-2 text-xs text-neutral-700">
                      <Clock className="w-3 h-3 text-amber-600" />
                      Tarde: {emp.schedule.afternoon.display}
                    </div>
                  )}
                </div>
              </div>

              {showWeeklySchedule && emp.weeklySchedule && (
                <div className="pt-2 border-t border-neutral-200">
                  <p className="text-xs text-neutral-500 mb-2 font-medium">Agenda Semanal:</p>
                  <div className="space-y-1 text-xs">
                    {Object.entries(emp.weeklySchedule).map(([dia, atividades]) => (
                      <div key={dia}>
                        <strong className="text-neutral-800 capitalize">{dia}:</strong>
                        {atividades.morning && <div className="ml-4">Manhã: {atividades.morning}</div>}
                        {atividades.afternoon && <div className="ml-4">Tarde: {atividades.afternoon}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-300">
        <p className="text-xs text-neutral-500 italic text-center">
          Escalas atualizadas automaticamente • Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
}
