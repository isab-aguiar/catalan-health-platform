// =========================================
// PAINEL DE CONTROLE ADMINISTRATIVO
// =========================================
// Página principal do sistema administrativo

import { useMemo, memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAvisos } from '../../hooks/useAvisos';
import { useAllCampanhas } from '../../hooks/useAllCampanhas';
import { useUsers } from '../../hooks/useUsers';
import { useVacinas } from '../../hooks/useVacinas';
import { usePermissions } from '../../hooks/usePermissions';
import AdminLayout from '../../layouts/AdminLayout';
import StatsCard from '../../components/admin/StatsCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { vacinas2025 } from '../../data/vacinas-sus';
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
  Syringe,
  CheckCircle2,
  XCircle,
  Plus,
  X
} from 'lucide-react';

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
        <span className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${getCategoriaColor(aviso.categoria)}`}>
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

AvisoItem.displayName = 'AvisoItem';

export default function Painel() {
  const { avisos, loading: avisosLoading, error: avisosError } = useAvisos();
  const { campanhas, loading: campanhasLoading } = useAllCampanhas();
  const { users, loading: usersLoading } = useUsers();
  const { vacinas, loading: vacinasLoading, updateVacina, createVacina } = useVacinas();
  const permissions = usePermissions();
  const [showModalVacina, setShowModalVacina] = useState(false);

  // Calcular estatísticas
  const stats = useMemo(() => {
    const totalAvisos = avisos.length;
    const avisosPublicos = avisos.filter(a => a.exibirNaHomepage).length;
    const totalUsers = users.length;
    const totalCampanhas = campanhas.length;
    const campanhasAtivas = campanhas.filter(c => c.ativo).length;

    console.log('📊 ESTATÍSTICAS DO PAINEL:');
    console.log('  - Total Avisos:', totalAvisos);
    console.log('  - Avisos Públicos:', avisosPublicos);
    console.log('  - Total Usuários:', totalUsers);
    console.log('  - Total Campanhas:', totalCampanhas, 'de', campanhas);
    console.log('  - Campanhas Ativas:', campanhasAtivas);

    return {
      totalAvisos,
      avisosPublicos,
      totalUsers,
      totalCampanhas,
      campanhasAtivas
    };
  }, [avisos, users, campanhas]);

  // Últimos avisos criados
  const ultimosAvisos = useMemo(() => {
    return [...avisos]
      .sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
        return dateB - dateA;
      })
      .slice(0, 5);
  }, [avisos]);

  // Formatar data
  const formatarData = (timestamp) => {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('pt-BR');
  };

  // Obter cor da categoria
  const getCategoriaColor = (categoria) => {
    const colors = {
      vacina: 'bg-blue-100 text-blue-800 border-blue-200',
      material: 'bg-green-100 text-green-800 border-green-200',
      campanha: 'bg-amber-100 text-amber-800 border-amber-200'
    };
    return colors[categoria] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  if (avisosLoading || (permissions.canManageUsers() && usersLoading) || vacinasLoading) {
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
        {/* Cabeçalho */}
        <div className="bg-white border border-slate-300 rounded-md shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-md flex items-center justify-center shadow-sm">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Painel de Controle</h1>
              <p className="text-slate-600 text-sm">Sistema de Gerenciamento - ESF Catalão</p>
            </div>
          </div>
        </div>

        {/* Erro geral */}
        {avisosError && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-md">
            <div className="flex gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-900">{avisosError}</div>
            </div>
          </div>
        )}

        {/* Cards de Estatísticas */}
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

        {/* Ações Rápidas */}
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
                  <h3 className="font-bold text-slate-900 text-base">Gerenciar Avisos</h3>
                  <p className="text-sm text-slate-600">
                    {permissions.canDeleteAvisos() ? 'Criar, editar e excluir avisos' : 'Criar e editar avisos'}
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
                  <h3 className="font-bold text-slate-900 text-base">Gerenciar Campanhas</h3>
                  <p className="text-sm text-slate-600">Editar, ativar ou excluir campanhas</p>
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
                  <h3 className="font-bold text-slate-900 text-base">Assistente Inteligente</h3>
                  <p className="text-sm text-slate-600">Gerar avisos e campanhas com IA</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </Link>
            )}

            {permissions.canManageUsers() && (
              <Link
                to="/admin/users"
                className="flex items-center gap-4 p-4 border-2 border-green-200 rounded-md hover:border-green-400 hover:bg-green-50 transition-all group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center group-hover:bg-green-600 transition-colors border border-green-200">
                  <Users className="w-6 h-6 text-green-700 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-base">Gerenciar Usuários</h3>
                  <p className="text-sm text-slate-600">Administrar usuários e permissões</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
              </Link>
            )}
          </div>
        </div>

        {/* Últimos Avisos Criados */}
        {ultimosAvisos.length > 0 && (
          <div className="bg-white rounded-md p-6 shadow-sm border border-slate-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Avisos Recentes</h2>
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

        {/* Painel de Controle de Vacinas */}
        <div className="bg-white rounded-md shadow-sm border border-slate-300 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-md flex items-center justify-center">
                  <Syringe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Programação de Vacinas</h2>
                  <p className="text-blue-100 text-sm">Gerencie quantidade, período e publicação das vacinas do SUS</p>
                </div>
              </div>
              <button
                onClick={() => setShowModalVacina(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-700 rounded-md hover:bg-blue-50 transition-colors font-semibold text-sm shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Nova Vacina
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700">Vacina</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Finalidade</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Público-Alvo</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Quantidade</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Início do Período</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Fim do Período</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Publicado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {vacinas.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-500">
                      Nenhuma vacina cadastrada. Execute o script de upload para carregar as vacinas.
                    </td>
                  </tr>
                ) : (
                  vacinas.map((vacina) => (
                    <VacinaRow
                      key={vacina.id}
                      vacina={vacina}
                      updateVacina={updateVacina}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Criar Vacina */}
        {showModalVacina && (
          <ModalCriarVacina
            onClose={() => setShowModalVacina(false)}
            onCreate={createVacina}
            vacinasExistentes={vacinas}
          />
        )}
      </div>
    </AdminLayout>
  );
}

// Modal para criar nova vacina
const ModalCriarVacina = memo(({ onClose, onCreate, vacinasExistentes = [] }) => {
  const [formData, setFormData] = useState({
    nome: '',
    finalidade: '',
    publicoAlvo: '',
    quantidade: 0,
    periodoInicio: '',
    periodoFim: '',
    publicado: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vacinaSelecionada, setVacinaSelecionada] = useState('');

  // Filtrar vacinas que ainda não foram cadastradas
  const vacinasDisponiveis = vacinas2025.filter((vacina) => {
    // Verificar se a vacina já existe (por ID ou nome)
    return !vacinasExistentes.some(
      (existente) =>
        existente.id === vacina.id ||
        existente.nome.toLowerCase() === vacina.nome.toLowerCase()
    );
  });

  // Preencher formulário quando selecionar uma vacina pré-definida
  const handleSelecionarVacina = (vacinaId) => {
    if (!vacinaId) {
      // Limpar formulário
      setFormData({
        nome: '',
        finalidade: '',
        publicoAlvo: '',
        quantidade: 0,
        periodoInicio: '',
        periodoFim: '',
        publicado: false
      });
      setVacinaSelecionada('');
      return;
    }

    const vacina = vacinas2025.find((v) => v.id === vacinaId);
    if (vacina) {
      setFormData({
        nome: vacina.nome,
        finalidade: vacina.finalidade,
        publicoAlvo: vacina.publicoAlvo,
        quantidade: vacina.quantidade || 0,
        periodoInicio: '',
        periodoFim: '',
        publicado: false
      });
      setVacinaSelecionada(vacinaId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validações
    if (!formData.nome.trim()) {
      setError('O nome da vacina é obrigatório');
      setLoading(false);
      return;
    }

    if (!formData.finalidade.trim()) {
      setError('A finalidade é obrigatória');
      setLoading(false);
      return;
    }

    if (!formData.publicoAlvo.trim()) {
      setError('O público-alvo é obrigatório');
      setLoading(false);
      return;
    }

    if (formData.periodoInicio && formData.periodoFim) {
      const inicio = new Date(formData.periodoInicio);
      const fim = new Date(formData.periodoFim);
      if (fim < inicio) {
        setError('A data de fim deve ser posterior à data de início');
        setLoading(false);
        return;
      }
    }

    const result = await onCreate({
      nome: formData.nome.trim(),
      finalidade: formData.finalidade.trim(),
      publicoAlvo: formData.publicoAlvo.trim(),
      quantidade: Number(formData.quantidade) || 0,
      periodoInicio: formData.periodoInicio || null,
      periodoFim: formData.periodoFim || null,
      publicado: formData.publicado
    });

    setLoading(false);

    if (result.success) {
      onClose();
      // Resetar formulário
      setFormData({
        nome: '',
        finalidade: '',
        publicoAlvo: '',
        quantidade: 0,
        periodoInicio: '',
        periodoFim: '',
        publicado: false
      });
    } else {
      setError(result.error || 'Erro ao criar vacina');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho do Modal */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-md flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Nova Vacina</h2>
              <p className="text-blue-100 text-sm">Adicione uma nova vacina ao sistema</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-md p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Modal */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-md">
              <div className="flex gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-900">{error}</div>
              </div>
            </div>
          )}

          {/* Seletor de Vacina Pré-definida */}
          {vacinasDisponiveis.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Ou selecione uma vacina pré-definida do SUS:
              </label>
              <select
                value={vacinaSelecionada}
                onChange={(e) => handleSelecionarVacina(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Selecione uma vacina --</option>
                {vacinasDisponiveis.map((vacina) => (
                  <option key={vacina.id} value={vacina.id}>
                    {vacina.nome}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-600 mt-2">
                {vacinasDisponiveis.length} vacina(s) disponível(is) para cadastro
              </p>
            </div>
          )}

          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nome da Vacina <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: BCG, Hepatite B, etc."
              required
            />
          </div>

          {/* Finalidade */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Finalidade <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.finalidade}
              onChange={(e) => setFormData({ ...formData, finalidade: e.target.value })}
              className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Prevenção das formas graves da tuberculose"
              rows="2"
              required
            />
          </div>

          {/* Público-Alvo */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Público-Alvo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.publicoAlvo}
              onChange={(e) => setFormData({ ...formData, publicoAlvo: e.target.value })}
              className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Crianças (Ao nascer até 4 anos)"
              required
            />
          </div>

          {/* Quantidade e Período */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Quantidade
              </label>
              <input
                type="number"
                min="0"
                value={formData.quantidade}
                onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Início do Período
              </label>
              <input
                type="date"
                value={formData.periodoInicio}
                onChange={(e) => setFormData({ ...formData, periodoInicio: e.target.value })}
                className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Fim do Período
              </label>
              <input
                type="date"
                value={formData.periodoFim}
                onChange={(e) => setFormData({ ...formData, periodoFim: e.target.value })}
                className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Publicado */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="publicado"
              checked={formData.publicado}
              onChange={(e) => setFormData({ ...formData, publicado: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="publicado" className="text-sm font-semibold text-slate-700">
              Publicar imediatamente (visível na página pública)
            </label>
          </div>

          {/* Botões */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors font-semibold"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Criando...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Criar Vacina
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

ModalCriarVacina.displayName = 'ModalCriarVacina';

// Componente para linha da tabela de vacinas
const VacinaRow = memo(({ vacina, updateVacina }) => {
  // Função auxiliar para converter Timestamp para string de data
  const timestampToDateString = (timestamp) => {
    if (!timestamp) return '';
    if (timestamp.toDate) {
      return timestamp.toDate().toISOString().split('T')[0];
    }
    if (timestamp instanceof Date) {
      return timestamp.toISOString().split('T')[0];
    }
    if (typeof timestamp === 'string') {
      return timestamp.split('T')[0];
    }
    return '';
  };

  const [quantidade, setQuantidade] = useState(vacina.quantidade || 0);
  const [periodoInicio, setPeriodoInicio] = useState(timestampToDateString(vacina.periodoInicio));
  const [periodoFim, setPeriodoFim] = useState(timestampToDateString(vacina.periodoFim));
  const [publicado, setPublicado] = useState(vacina.publicado ?? false);

  // Sincronizar estado quando vacina mudar (atualização do Firestore)
  useEffect(() => {
    setQuantidade(vacina.quantidade || 0);
    setPeriodoInicio(timestampToDateString(vacina.periodoInicio));
    setPeriodoFim(timestampToDateString(vacina.periodoFim));
    setPublicado(vacina.publicado ?? false);
  }, [vacina]);

  const handleUpdate = async (campo, valor) => {
    await updateVacina(vacina.id, campo, valor);
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="p-4">
        <div className="font-semibold text-slate-900">{vacina.nome}</div>
      </td>
      <td className="p-4 text-slate-600">{vacina.finalidade}</td>
      <td className="p-4 text-slate-600">{vacina.publicoAlvo}</td>
      <td className="p-4">
        <input
          type="number"
          min="0"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          onBlur={(e) => handleUpdate('quantidade', Number(e.target.value))}
          className="w-24 border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </td>
      <td className="p-4">
        <input
          type="date"
          value={periodoInicio}
          onChange={(e) => setPeriodoInicio(e.target.value)}
          onBlur={(e) => handleUpdate('periodoInicio', e.target.value ? new Date(e.target.value) : null)}
          className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </td>
      <td className="p-4">
        <input
          type="date"
          value={periodoFim}
          onChange={(e) => setPeriodoFim(e.target.value)}
          onBlur={(e) => handleUpdate('periodoFim', e.target.value ? new Date(e.target.value) : null)}
          className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </td>
      <td className="p-4">
        <button
          onClick={() => {
            const novoStatus = !publicado;
            setPublicado(novoStatus);
            handleUpdate('publicado', novoStatus);
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            publicado
              ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300'
          }`}
        >
          {publicado ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Sim
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4" />
              Não
            </>
          )}
        </button>
      </td>
    </tr>
  );
});

VacinaRow.displayName = 'VacinaRow';
