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
  Building2,
  AlertCircle,
  Megaphone,
  Package,
  ClipboardList,
  CalendarDays,
  BellDot,
  MessageSquareHeart,
} from "lucide-react";
const AvisoItem = memo(({ aviso, getCategoriaColor, formatarData }) => (
  <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-md hover:bg-neutral-100 transition-colors border border-neutral-200">
    <div className="w-10 h-10 bg-info/10 rounded-md flex items-center justify-center flex-shrink-0 border border-blue-200">
      <Bell className="w-5 h-5 text-primary-700" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <h3 className="font-semibold text-neutral-900 truncate text-sm">
          {aviso.titulo}
        </h3>
        <span
          className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${getCategoriaColor(aviso.categoria)}`}
        >
          {aviso.categoria}
        </span>
        {aviso.exibirNaHomepage && (
          <span className="px-2 py-0.5 bg-success/10 text-green-800 border border-green-200 rounded-md text-xs font-semibold">
            Público
          </span>
        )}
      </div>
      <p className="text-sm text-neutral-600 line-clamp-2 mb-2">
        {aviso.descricao}
      </p>
      <div className="flex items-center gap-2 text-xs text-neutral-500">
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
      vacina: "bg-info/10 text-blue-800 border-blue-200",
      material: "bg-success/10 text-green-800 border-green-200",
      campanha: "bg-warning/20 text-amber-800 border-amber-200",
    };
    return colors[categoria] || "bg-neutral-100 text-neutral-800 border-neutral-200";
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
      <div className="space-y-6">
        {}
        <div className="bg-white border border-neutral-300 rounded-md shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-700 rounded-md flex items-center justify-center shadow-sm">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                Painel de Controle
              </h1>
              <p className="text-neutral-600 text-sm">
                Sistema de Gerenciamento - ESF Catalão
              </p>
            </div>
          </div>
        </div>
        {}
        {avisosError && (
          <div className="bg-error/10 border-l-4 border-error p-4 rounded-r-md">
            <div className="flex gap-3">
              <AlertCircle
                size={20}
                className="text-error flex-shrink-0 mt-0.5"
              />
              <div className="text-sm text-error">{avisosError}</div>
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
            iconColor="text-info"
          />
          <StatsCard
            icon={Eye}
            title="Avisos Públicos Ativos"
            value={stats.avisosPublicos}
            subtitle="Visíveis na página inicial"
            bgColor="bg-green-600"
            iconColor="text-success"
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
              iconColor="text-warning-dark"
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
        <div className="bg-white rounded-md p-6 shadow-sm border border-neutral-300">
          <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-info" />
            Acesso Rápido
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {permissions.canViewAvisos() && (
              <Link
                to="/admin/avisos"
                className="flex flex-col items-center gap-3 p-4 border-2 border-blue-200 rounded-md hover:border-blue-400 hover:bg-info/10 transition-all group"
              >
                <div className="w-12 h-12 bg-info/10 rounded-md flex items-center justify-center group-hover:bg-info-600 transition-colors border border-blue-200">
                  <Bell className="w-6 h-6 text-primary-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-neutral-900 text-sm text-center">
                  Gerenciar Avisos
                </h3>
              </Link>
            )}
            {permissions.canViewAvisos() && (
              <Link
                to="/admin/campanhas"
                className="flex flex-col items-center gap-3 p-4 border-2 border-green-200 rounded-md hover:border-green-400 hover:bg-success/10 transition-all group"
              >
                <div className="w-12 h-12 bg-success/10 rounded-md flex items-center justify-center group-hover:bg-green-600 transition-colors border border-green-200">
                  <Megaphone className="w-6 h-6 text-green-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-neutral-900 text-sm text-center">
                  Gerenciar Campanhas
                </h3>
              </Link>
            )}
            {permissions.canManageUsers() && (
              <Link
                to="/admin/users"
                className="flex flex-col items-center gap-3 p-4 border-2 border-amber-200 rounded-md hover:border-amber-400 hover:bg-warning/10 transition-all group"
              >
                <div className="w-12 h-12 bg-warning/10 rounded-md flex items-center justify-center group-hover:bg-amber-600 transition-colors border border-amber-200">
                  <Users className="w-6 h-6 text-amber-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-neutral-900 text-sm text-center">
                  Gerenciar Usuários
                </h3>
              </Link>
            )}
            <Link
              to="/admin/estoque-vacinas"
              className="flex flex-col items-center gap-3 p-4 border-2 border-neutral-300 rounded-md hover:border-neutral-500 hover:bg-neutral-50 transition-all group"
            >
              <div className="w-12 h-12 bg-neutral-200 rounded-md flex items-center justify-center group-hover:bg-neutral-700 transition-colors border border-neutral-300">
                <Package className="w-6 h-6 text-neutral-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-neutral-900 text-sm text-center">
                Estoque de Vacinas
              </h3>
            </Link>
            <Link
              to="/admin/orientacoes-pos-consulta"
              className="flex flex-col items-center gap-3 p-4 border-2 border-purple-200 rounded-md hover:border-purple-400 hover:bg-purple-50 transition-all group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center group-hover:bg-purple-600 transition-colors border border-purple-200">
                <ClipboardList className="w-6 h-6 text-purple-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-neutral-900 text-sm text-center">
                Orientações Pós-Consulta
              </h3>
            </Link>
            <Link
              to="/admin/calendario"
              className="flex flex-col items-center gap-3 p-4 border-2 border-indigo-200 rounded-md hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-md flex items-center justify-center group-hover:bg-indigo-600 transition-colors border border-indigo-200">
                <Calendar className="w-6 h-6 text-indigo-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-neutral-900 text-sm text-center">
                Calendário de Eventos
              </h3>
            </Link>
            <Link
              to="/admin/escalas"
              className="flex flex-col items-center gap-3 p-4 border-2 border-teal-200 rounded-md hover:border-teal-400 hover:bg-teal-50 transition-all group"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-md flex items-center justify-center group-hover:bg-teal-600 transition-colors border border-teal-200">
                <CalendarDays className="w-6 h-6 text-teal-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-neutral-900 text-sm text-center">
                Escalas de Trabalho
              </h3>
            </Link>
            <Link
              to="/admin/notificacoes"
              className="flex flex-col items-center gap-3 p-4 border-2 border-pink-200 rounded-md hover:border-pink-400 hover:bg-pink-50 transition-all group"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-md flex items-center justify-center group-hover:bg-pink-600 transition-colors border border-pink-200">
                <BellDot className="w-6 h-6 text-pink-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-neutral-900 text-sm text-center">
                Notificações
              </h3>
            </Link>
            <Link
              to="/admin/feedbacks"
              className="flex flex-col items-center gap-3 p-4 border-2 border-rose-200 rounded-md hover:border-rose-400 hover:bg-rose-50 transition-all group"
            >
              <div className="w-12 h-12 bg-rose-100 rounded-md flex items-center justify-center group-hover:bg-rose-600 transition-colors border border-rose-200">
                <MessageSquareHeart className="w-6 h-6 text-rose-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-neutral-900 text-sm text-center">
                Feedbacks e Ouvidoria
              </h3>
            </Link>
          </div>
        </div>
        {}
        <div className="bg-white rounded-md p-6 shadow-sm border border-neutral-300">
          <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-info" />
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {permissions.canViewAvisos() && (
              <Link
                to="/admin/avisos"
                className="flex items-center gap-4 p-4 border-2 border-blue-200 rounded-md hover:border-blue-400 hover:bg-info/10 transition-all group"
              >
                <div className="w-12 h-12 bg-info/10 rounded-md flex items-center justify-center group-hover:bg-info-600 transition-colors border border-blue-200">
                  <Bell className="w-6 h-6 text-primary-700 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-neutral-900 text-base">
                    Gerenciar Avisos
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {permissions.canDeleteAvisos()
                      ? "Criar, editar e excluir avisos"
                      : "Criar e editar avisos"}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-info group-hover:translate-x-1 transition-all" />
              </Link>
            )}
            {permissions.canViewAvisos() && (
              <Link
                to="/admin/campanhas"
                className="flex items-center gap-4 p-4 border-2 border-green-200 rounded-md hover:border-green-400 hover:bg-success/10 transition-all group"
              >
                <div className="w-12 h-12 bg-success/10 rounded-md flex items-center justify-center group-hover:bg-green-600 transition-colors border border-green-200">
                  <Megaphone className="w-6 h-6 text-green-700 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-neutral-900 text-base">
                    Gerenciar Campanhas
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Editar, ativar ou excluir campanhas
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-success group-hover:translate-x-1 transition-all" />
              </Link>
            )}
            <Link
              to="/admin/calendario"
              className="flex items-center gap-4 p-4 border-2 border-purple-200 rounded-md hover:border-purple-400 hover:bg-purple-50 transition-all group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center group-hover:bg-purple-600 transition-colors border border-purple-200">
                <Calendar className="w-6 h-6 text-purple-700 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-neutral-900 text-base">
                  Calendário
                </h3>
                <p className="text-sm text-neutral-600">
                  Gerenciar reuniões, lembretes e agendamentos
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              to="/admin/escalas"
              className="flex items-center gap-4 p-4 border-2 border-teal-200 rounded-md hover:border-teal-400 hover:bg-teal-50 transition-all group"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-md flex items-center justify-center group-hover:bg-teal-600 transition-colors border border-teal-200">
                <Users className="w-6 h-6 text-teal-700 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-neutral-900 text-base">
                  Escalas de Trabalho
                </h3>
                <p className="text-sm text-neutral-600">
                  Visualizar e montar escalas mensais
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              to="/admin/estoque-vacinas"
              className="flex items-center gap-4 p-4 border-2 border-neutral-300 rounded-md hover:border-neutral-500 hover:bg-neutral-50 transition-all group"
            >
              <div className="w-12 h-12 bg-neutral-200 rounded-md flex items-center justify-center group-hover:bg-neutral-700 transition-colors border border-neutral-300">
                <Package className="w-6 h-6 text-neutral-700 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-neutral-900 text-base">
                  Estoque de Vacinas
                </h3>
                <p className="text-sm text-neutral-600">
                  Visualizar e controlar o estoque de vacinas
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-700 group-hover:translate-x-1 transition-all" />
            </Link>
            {permissions.canManageUsers() && (
              <Link
                to="/admin/users"
                className="flex items-center gap-4 p-4 border-2 border-green-200 rounded-md hover:border-green-400 hover:bg-success/10 transition-all group"
              >
                <div className="w-12 h-12 bg-success/10 rounded-md flex items-center justify-center group-hover:bg-green-600 transition-colors border border-green-200">
                  <Users className="w-6 h-6 text-green-700 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-neutral-900 text-base">
                    Gerenciar Usuários
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Administrar usuários e permissões
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-success group-hover:translate-x-1 transition-all" />
              </Link>
            )}
          </div>
        </div>
        {}
        {ultimosAvisos.length > 0 && (
          <div className="bg-white rounded-md p-6 shadow-sm border border-neutral-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-900">
                Avisos Recentes
              </h2>
              <Link
                to="/admin/avisos"
                className="text-sm text-primary-700 hover:text-primary-800 font-semibold flex items-center gap-1 hover:underline"
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
