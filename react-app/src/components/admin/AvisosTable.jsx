import { useState, useMemo, memo } from "react";
import {
  Edit,
  Trash2,
  Calendar,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PermissionGate from "../auth/PermissionGate";
function AvisosTable({ avisos, onEdit, onDelete, deleteLoading }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("todas");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const filteredAvisos = useMemo(() => {
    return avisos.filter((aviso) => {
      if (filterCategoria !== "todas" && aviso.categoria !== filterCategoria) {
        return false;
      }
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          aviso.titulo?.toLowerCase().includes(searchLower) ||
          aviso.descricao?.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }, [avisos, searchTerm, filterCategoria]);
  const totalPages = Math.ceil(filteredAvisos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAvisos = filteredAvisos.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  const handleFilterCategoria = (value) => {
    setFilterCategoria(value);
    setCurrentPage(1);
  };
  const formatarData = (timestamp) => {
    if (!timestamp) return "-";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("pt-BR");
  };
  const getCategoriaColor = (categoria) => {
    const colors = {
      vacina: "bg-info/10 text-blue-800 border-blue-200",
      material: "bg-success/10 text-green-800 border-green-200",
      campanha: "bg-warning/20 text-amber-800 border-amber-200",
    };
    return colors[categoria] || "bg-neutral-100 text-neutral-800 border-neutral-200";
  };
  const getCategoriaLabel = (categoria) => {
    const labels = {
      vacina: "Vacina",
      material: "Material",
      campanha: "Campanha",
    };
    return labels[categoria] || categoria;
  };
  return (
    <div className="bg-white rounded-md shadow-sm border border-neutral-300">
      {}
      <div className="p-4 border-b border-neutral-300 bg-neutral-50">
        <div className="flex flex-col sm:flex-row gap-3">
          {}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar por título ou descrição..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          {}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-400 hidden sm:block" />
            <select
              value={filterCategoria}
              onChange={(e) => handleFilterCategoria(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
            >
              <option value="todas">Todas as Categorias</option>
              <option value="vacina">Vacina</option>
              <option value="material">Material</option>
              <option value="campanha">Campanha</option>
            </select>
          </div>
        </div>
        {}
        <p className="text-sm text-neutral-600 mt-3 font-medium">
          {filteredAvisos.length}{" "}
          {filteredAvisos.length === 1
            ? "aviso encontrado"
            : "avisos encontrados"}
        </p>
      </div>
      {}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-100 border-b border-neutral-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Título do Aviso
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Situação
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 bg-white">
            {paginatedAvisos.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-neutral-500 text-sm"
                >
                  Nenhum aviso encontrado com os critérios selecionados
                </td>
              </tr>
            ) : (
              paginatedAvisos.map((aviso) => (
                <tr
                  key={aviso.id}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">
                        {aviso.titulo}
                      </p>
                      <p className="text-sm text-neutral-600 line-clamp-1 mt-0.5">
                        {aviso.descricao}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-md text-xs font-semibold border ${getCategoriaColor(aviso.categoria)}`}
                    >
                      {getCategoriaLabel(aviso.categoria)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      {formatarData(aviso.data)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {aviso.exibirNaHomepage ? (
                      <span className="inline-flex px-3 py-1 bg-success/10 text-green-800 border border-green-200 rounded-md text-xs font-semibold">
                        Público
                      </span>
                    ) : (
                      <span className="inline-flex px-3 py-1 bg-neutral-100 text-neutral-700 border border-neutral-200 rounded-md text-xs font-semibold">
                        Rascunho
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <PermissionGate requiredPermission="canEditAvisos">
                        <button
                          onClick={() => onEdit(aviso)}
                          className="p-2 text-info hover:bg-info/10 rounded-md transition-colors border border-transparent hover:border-blue-200"
                          title="Editar Aviso"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </PermissionGate>
                      <PermissionGate requiredPermission="canDeleteAvisos">
                        <button
                          onClick={() => onDelete(aviso.id)}
                          disabled={deleteLoading === aviso.id}
                          className="p-2 text-error hover:bg-error/10 rounded-md transition-colors disabled:opacity-50 border border-transparent hover:border-red-200"
                          title="Excluir Aviso"
                        >
                          {deleteLoading === aviso.id ? (
                            <div className="w-4 h-4 border-2 border-error border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </PermissionGate>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-neutral-300 bg-neutral-50 flex items-center justify-between">
          <p className="text-sm text-neutral-700 font-medium">
            Página {currentPage} de {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-neutral-600 hover:bg-neutral-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-neutral-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-neutral-600 hover:bg-neutral-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-neutral-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default memo(AvisosTable);
