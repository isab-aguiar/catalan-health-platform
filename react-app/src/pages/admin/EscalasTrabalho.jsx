import { useState, useEffect } from "react";
import { getAllEmployees, updateEmployee } from "../../services/employeesService";
import { Save, Edit2, X } from "lucide-react";

export default function EscalasTrabalho() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    const result = await getAllEmployees();
    if (result.success) {
      setEmployees(result.data);
    }
    setLoading(false);
  };

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setEditData({
      workStation: employee.workStation || { location: "", shift: "" },
      schedule: employee.schedule || {
        morning: { start: "07h00", end: "11h00", display: "07h00 às 11h00", enabled: true },
        afternoon: { start: "13h00", end: "16h00", display: "13h00 às 16h00", enabled: true }
      }
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSave = async (employeeId) => {
    setSaving(true);
    setMessage(null);

    const updates = {
      workStation: editData.workStation,
      schedule: editData.schedule
    };

    const result = await updateEmployee(employeeId, updates);

    if (result.success) {
      setMessage({ type: "success", text: "Escala atualizada com sucesso!" });
      await loadEmployees();
      setEditingId(null);
      setEditData({});
    } else {
      setMessage({ type: "error", text: "Erro ao atualizar escala: " + result.error });
    }

    setSaving(false);
  };

  const handleWorkStationChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      workStation: {
        ...prev.workStation,
        [field]: value
      }
    }));
  };

  const handleScheduleChange = (period, field, value) => {
    setEditData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [period]: {
          ...prev.schedule[period],
          [field]: value
        }
      }
    }));
  };

  const filteredEmployees = employees.filter(emp => {
    if (filter === "all") return emp.active !== false;
    return emp.department === filter && emp.active !== false;
  });

  const departments = [...new Set(employees.map(e => e.department))].filter(Boolean);

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Escalas de Trabalho</h1>
        <p className="text-neutral-600">Gerencie as escalas e estações de trabalho dos profissionais</p>
      </div>

      {message && (
        <div className={`p-4 mb-4 rounded ${
          message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {message.text}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Filtrar por Departamento
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todos os Departamentos</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-100 border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Profissional
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Cargo
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Estação de Trabalho
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Turno
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Horário Manhã
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Horário Tarde
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredEmployees.map(employee => (
                <tr key={employee.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3 text-sm text-neutral-900">
                    {employee.displayName || employee.fullName}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {employee.role}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {editingId === employee.id ? (
                      <input
                        type="text"
                        value={editData.workStation?.location || ""}
                        onChange={(e) => handleWorkStationChange("location", e.target.value)}
                        className="w-full px-2 py-1 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Ex: Recepção"
                      />
                    ) : (
                      <span className="text-neutral-700">
                        {employee.workStation?.location ||
                         employee.workStation?.morning?.location ||
                         employee.workStation?.afternoon?.location ||
                         "-"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {editingId === employee.id ? (
                      <select
                        value={editData.workStation?.shift || ""}
                        onChange={(e) => handleWorkStationChange("shift", e.target.value)}
                        className="w-full px-2 py-1 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Selecione</option>
                        <option value="morning">Manhã</option>
                        <option value="afternoon">Tarde</option>
                        <option value="both">Integral</option>
                      </select>
                    ) : (
                      <span className="text-neutral-700">
                        {employee.workStation?.shift === "morning" ? "Manhã" :
                         employee.workStation?.shift === "afternoon" ? "Tarde" :
                         employee.workStation?.shift === "both" ? "Integral" : "-"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {editingId === employee.id ? (
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={editData.schedule?.morning?.display || ""}
                          onChange={(e) => handleScheduleChange("morning", "display", e.target.value)}
                          className="w-full px-2 py-1 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Ex: 07h00 às 11h00"
                        />
                        <label className="flex items-center text-xs">
                          <input
                            type="checkbox"
                            checked={editData.schedule?.morning?.enabled || false}
                            onChange={(e) => handleScheduleChange("morning", "enabled", e.target.checked)}
                            className="mr-1"
                          />
                          Ativo
                        </label>
                      </div>
                    ) : (
                      <span className={`text-neutral-700 ${!employee.schedule?.morning?.enabled ? "text-neutral-400" : ""}`}>
                        {employee.schedule?.morning?.enabled ?
                          employee.schedule.morning.display || "-" :
                          "Inativo"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {editingId === employee.id ? (
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={editData.schedule?.afternoon?.display || ""}
                          onChange={(e) => handleScheduleChange("afternoon", "display", e.target.value)}
                          className="w-full px-2 py-1 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Ex: 13h00 às 16h00"
                        />
                        <label className="flex items-center text-xs">
                          <input
                            type="checkbox"
                            checked={editData.schedule?.afternoon?.enabled || false}
                            onChange={(e) => handleScheduleChange("afternoon", "enabled", e.target.checked)}
                            className="mr-1"
                          />
                          Ativo
                        </label>
                      </div>
                    ) : (
                      <span className={`text-neutral-700 ${!employee.schedule?.afternoon?.enabled ? "text-neutral-400" : ""}`}>
                        {employee.schedule?.afternoon?.enabled ?
                          employee.schedule.afternoon.display || "-" :
                          "Inativo"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === employee.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(employee.id)}
                          disabled={saving}
                          className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-50"
                          title="Salvar"
                        >
                          <Save size={18} />
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={saving}
                          className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                          title="Cancelar"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(employee)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Editar"
                      >
                        <Edit2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-8 text-neutral-500">
          Nenhum profissional encontrado para este departamento.
        </div>
      )}
    </div>
  );
}
