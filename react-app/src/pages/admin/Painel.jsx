import { useMemo, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAvisos } from "../../hooks/useAvisos";
import { useAllCampanhas } from "../../hooks/useAllCampanhas";
import { useUsers } from "../../hooks/useUsers";
import { usePermissions } from "../../hooks/usePermissions";
import AdminLayout from "../../layouts/AdminLayout";
import StatsCard from "../../components/admin/StatsCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import {
  Bell,
  Users,
  Eye,
  ArrowRight,
  MessageSquare,
  Calendar,
  Shield,
  AlertCircle,
  Megaphone,
  Package,
} from "lucide-react";
const AvisoItem = memo(({ aviso, getCategoriaColor, formatarData }) => (
  <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors border border-slate-200">
    <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0 border border-blue-200">
      <Bell className="w-5 h-5 text-blue-700" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <h3 className="font-semibold text-slate-900 truncate text-sm">
          {aviso.titulo}
        </h3>
        <span
          className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${getCategoriaColor(aviso.categoria)}`}
        >
          {aviso.categoria}
        </span>
        {aviso.exibirNaHomepage && (
          <span className="px-2 py-0.5 bg-green-100 text-green-800 border border-green-200 rounded-md text-xs font-semibold">
            Público
          </span>
        )}
      </div>
      <p className="text-sm text-slate-600 line-clamp-2 mb-2">
        {aviso.descricao}
      </p>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Calendar className="w-3 h-3" />
        <span>{formatarData(aviso.createdAt)}</span>
      </div>
    </div>
  </div>
));
AvisoItem.displayName = "AvisoItem";
export default function Painel() {
  const { avisos, loading: avisosLoading, error: avisosError } = useAvisos();
  const { campanhas, loading: campanhasLoading } = useAllCampanhas();
  const { users, loading: usersLoading } = useUsers();
  const permissions = usePermissions();
  const stats = useMemo(() => {
    const totalAvisos = avisos.length;
    const avisosPublicos = avisos.filter((a) => a.exibirNaHomepage).length;
    const totalUsers = users.length;
    const totalCampanhas = campanhas.length;
    const campanhasAtivas = campanhas.filter((c) => c.ativo).length;
    console.log("📊 ESTATÍSTICAS DO PAINEL:");
    console.log("  - Total Avisos:", totalAvisos);
    console.log("  - Avisos Públicos:", avisosPublicos);
    console.log("  - Total Usuários:", totalUsers);
    console.log("  - Total Campanhas:", totalCampanhas, "de", campanhas);
    console.log("  - Campanhas Ativas:", campanhasAtivas);
    return {
      totalAvisos,
      avisosPublicos,
      totalUsers,
      totalCampanhas,
      campanhasAtivas,
    };
  }, [avisos, users, campanhas]);
  const ultimosAvisos = useMemo(() => {
    return [...avisos]
      .sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
        return dateB - dateA;
      })
      .slice(0, 5);
  }, [avisos]);
  const formatarData = (timestamp) => {
    if (!timestamp) return "-";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("pt-BR");
  };
  const getCategoriaColor = (categoria) => {
    const colors = {
      vacina: "bg-blue-100 text-blue-800 border-blue-200",
      material: "bg-green-100 text-green-800 border-green-200",
      campanha: "bg-amber-100 text-amber-800 border-amber-200",
    };
    return colors[categoria] || "bg-slate-100 text-slate-800 border-slate-200";
  };
  if (avisosLoading || (permissions.canManageUsers() && usersLoading)) {
    return (
      <AdminLayout currentPage="dashboard">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout currentPage="dashboard">
      <div className="max-w-7xl mx-auto space-y-6">
        {}
        <div className="bg-white border border-slate-300 rounded-md shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-md flex items-center justify-center shadow-sm">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Painel de Controle
              </h1>
              <p className="text-slate-600 text-sm">
                Sistema de Gerenciamento - ESF Catalão
              </p>
            </div>
          </div>
        </div>
        {}
        {avisosError && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-md">
            <div className="flex gap-3">
              <AlertCircle
                size={20}
                className="text-red-600 flex-shrink-0 mt-0.5"
              />
              <div className="text-sm text-red-900">{avisosError}</div>
            </div>
          </div>
        )}
        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          <StatsCard
            icon={Bell}
            title="Total de Avisos Cadastrados"
            value={stats.totalAvisos}
            subtitle="Avisos registrados no sistema"
            bgColor="bg-blue-600"
            iconColor="text-blue-600"
          />
          <StatsCard
            icon={Eye}
            title="Avisos Públicos Ativos"
            value={stats.avisosPublicos}
            subtitle="Visíveis na página inicial"
            bgColor="bg-green-600"
            iconColor="text-green-600"
          />
          <StatsCard
            icon={Megaphone}
            title="Total de Campanhas"
            value={stats.totalCampanhas}
            subtitle="Campanhas criadas"
            bgColor="bg-purple-600"
            iconColor="text-purple-600"
          />
          {permissions.canManageUsers() && (
            <StatsCard
              icon={Users}
              title="Usuários Cadastrados"
              value={stats.totalUsers}
              subtitle="Total de usuários no sistema"
              bgColor="bg-amber-600"
              iconColor="text-amber-600"
            />
          )}
          {!permissions.canManageUsers() && (
            <StatsCard
              icon={Megaphone}
              title="Campanhas Ativas"
              value={stats.campanhasAtivas}
              subtitle="Visíveis no site"
              bgColor="bg-teal-600"
              iconColor="text-teal-600"
            />
          )}
        </div>
        {}
        <div className="bg-white rounded-md p-6 shadow-sm border border-slate-300">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-blue-600" />
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {permissions.canViewAvisos() && (
              <Link
                to="/admin/avisos"
                className="flex items-center gap-4 p-4 border-2 border-blue-200 rounded-md hover:border-blue-400 hover:bg-blue-50 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center group-hover:bg-blue-600 transition-colors border border-blue-200">
                  <Bell className="w-6 h-6 text-blue-700 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-base">
                    Gerenciar Avisos
                  </h3>
                  <p className="text-sm text-slate-600">
                    {permissions.canDeleteAvisos()
                      ? "Criar, editar e excluir avisos"
                      : "Criar e editar avisos"}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </Link>
            )}
            {permissions.canViewAvisos() && (
              <Link
                to="/admin/campanhas"
                className="flex items-center gap-4 p-4 border-2 border-green-200 rounded-md hover:border-green-400 hover:bg-green-50 transition-all group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center group-hover:bg-green-600 transition-colors border border-green-200">
                  <Megaphone className="w-6 h-6 text-green-700 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-base">
                    Gerenciar Campanhas
                  </h3>
                  <p className="text-sm text-slate-600">
                    Editar, ativar ou excluir campanhas
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
              </Link>
            )}
            {permissions.canCreateAvisos() && (
              <Link
                to="/admin/chat-ia"
                className="flex items-center gap-4 p-4 border-2 border-purple-200 rounded-md hover:border-purple-400 hover:bg-purple-50 transition-all group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center group-hover:bg-purple-600 transition-colors border border-purple-200">
                  <MessageSquare className="w-6 h-6 text-purple-700 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-base">
                    Assistente Inteligente
                  </h3>
                  <p className="text-sm text-slate-600">
                    Gerar avisos e campanhas com IA
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </Link>
            )}
            <Link
              to="/admin/estoque-vacinas"
              className="flex items-center gap-4 p-4 border-2 border-slate-300 rounded-md hover:border-slate-500 hover:bg-slate-50 transition-all group"
            >
              <div className="w-12 h-12 bg-slate-200 rounded-md flex items-center justify-center group-hover:bg-slate-700 transition-colors border border-slate-300">
                <Package className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-base">
                  Estoque de Vacinas
                </h3>
                <p className="text-sm text-slate-600">
                  Visualizar e controlar o estoque de vacinas
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1 transition-all" />
            </Link>
            {permissions.canManageUsers() && (
              <Link
                to="/admin/users"
                className="flex items-center gap-4 p-4 border-2 border-green-200 rounded-md hover:border-green-400 hover:bg-green-50 transition-all group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center group-hover:bg-green-600 transition-colors border border-green-200">
                  <Users className="w-6 h-6 text-green-700 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-base">
                    Gerenciar Usuários
                  </h3>
                  <p className="text-sm text-slate-600">
                    Administrar usuários e permissões
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
              </Link>
            )}
          </div>
        </div>
        {}
        {ultimosAvisos.length > 0 && (
          <div className="bg-white rounded-md p-6 shadow-sm border border-slate-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Avisos Recentes
              </h2>
              <Link
                to="/admin/avisos"
                className="text-sm text-blue-700 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline"
              >
                Visualizar Todos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {ultimosAvisos.map((aviso) => (
                <AvisoItem
                  key={aviso.id}
                  aviso={aviso}
                  getCategoriaColor={getCategoriaColor}
                  formatarData={formatarData}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
