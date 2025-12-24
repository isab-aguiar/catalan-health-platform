import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { Menu } from "lucide-react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

/**
 * App Component
 * Root component com React Router e layout global
 */

// Helper para lazy loading com tratamento de erro robusto
const lazyLoad = (importFunc) => {
  return lazy(() =>
    importFunc().catch((error) => {
      console.error("Erro ao carregar componente:", error);
      // Retornar um componente de erro como fallback
      return {
        default: () => (
          <div className="flex items-center justify-center min-h-screen bg-neutral-50">
            <div className="text-center p-8 max-w-md">
              <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                Erro ao carregar página
              </h1>
              <p className="text-neutral-600 mb-6">
                Não foi possível carregar esta página. Por favor, recarregue a
                página.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
              >
                Recarregar Página
              </button>
            </div>
          </div>
        ),
      };
    })
  );
};

// Lazy load pages
const Home = lazyLoad(() => import("./pages/Home"));
const SearchResultsPage = lazyLoad(() => import("./pages/SearchResultsPage"));
const ACSPage = lazyLoad(() => import("./pages/ACS"));
const NotFound = lazyLoad(() => import("./pages/NotFound"));

// Services
const ServicesIndex = lazyLoad(() => import("./pages/services/ServicesIndex"));
const Sala4 = lazyLoad(() => import("./pages/services/Sala4"));
const Sala9 = lazyLoad(() => import("./pages/services/Sala9"));
const Triagem = lazyLoad(() => import("./pages/services/Triagem"));
const Vacinas = lazyLoad(() => import("./pages/services/Vacinas"));
const Medicacao = lazyLoad(() => import("./pages/services/Medicacao"));
const Recepcao = lazyLoad(() => import("./pages/services/Recepcao"));
const ECG = lazyLoad(() => import("./pages/services/ECG"));
const Curativos = lazyLoad(() => import("./pages/services/Curativos"));
const Renovacao = lazyLoad(() => import("./pages/services/Renovacao"));
const Farmacia = lazyLoad(() => import("./pages/services/Farmacia"));

// Groups
const GroupsIndex = lazyLoad(() => import("./pages/groups/GroupsIndex"));
const Hiperdia = lazyLoad(() => import("./pages/groups/Hiperdia"));
const Tabagismo = lazyLoad(() => import("./pages/groups/Tabagismo"));
const DoresCronicas = lazyLoad(() => import("./pages/groups/DoresCronicas"));

// Team
const TeamIndex = lazyLoad(() => import("./pages/team/TeamIndex"));
const Enfermeiras = lazyLoad(() => import("./pages/team/Enfermeiras"));
const Medicos = lazyLoad(() => import("./pages/team/Medicos"));
const Farmaceutica = lazyLoad(() => import("./pages/team/Farmaceutica"));
const Psicologa = lazyLoad(() => import("./pages/team/Psicologa"));
const Ginecologista = lazyLoad(() => import("./pages/team/Ginecologista"));
const Fisioterapeuta = lazyLoad(() => import("./pages/team/Fisioterapeuta"));
const AssistenteSocial = lazyLoad(
  () => import("./pages/team/AssistenteSocial")
);
const Dentistas = lazyLoad(() => import("./pages/team/Dentistas"));
const Pediatra = lazyLoad(() => import("./pages/team/Pediatra"));

// Special
const REMSA = lazyLoad(() => import("./pages/REMSA"));
const Educacao = lazyLoad(() => import("./pages/Educacao"));

// Admin
const Login = lazyLoad(() => import("./pages/admin/Login"));
const Painel = lazyLoad(() => import("./pages/admin/Painel"));
const Avisos = lazyLoad(() => import("./pages/admin/Avisos"));
const Campanhas = lazyLoad(() => import("./pages/admin/Campanhas"));
const Users = lazyLoad(() => import("./pages/admin/Users"));
const ChatIA = lazyLoad(() => import("./pages/admin/ChatIA"));

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
        <div className="flex min-h-screen overflow-x-hidden w-full">
          {/* Sidebar para desktop */}
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Conteúdo principal */}
          <div className="flex flex-col flex-1 min-w-0 overflow-x-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden w-full pt-[70px]">
              <Suspense fallback={<LoadingSpinner />}>
                <ErrorBoundary>
                  <Routes>
                    {/* Home */}
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/search-results"
                      element={<SearchResultsPage />}
                    />

                    {/* Services Hub */}
                    <Route path="/servicos" element={<ServicesIndex />} />
                    <Route path="/servicos/sala-4" element={<Sala4 />} />
                    <Route path="/servicos/sala-9" element={<Sala9 />} />
                    <Route path="/servicos/triagem" element={<Triagem />} />
                    <Route path="/servicos/vacinas" element={<Vacinas />} />
                    <Route path="/servicos/medicacao" element={<Medicacao />} />
                    <Route path="/servicos/recepcao" element={<Recepcao />} />
                    <Route path="/servicos/ecg" element={<ECG />} />
                    <Route path="/servicos/curativos" element={<Curativos />} />
                    <Route path="/servicos/renovacao" element={<Renovacao />} />
                    <Route path="/servicos/farmacia" element={<Farmacia />} />

                    {/* Groups Hub */}
                    <Route path="/grupos" element={<GroupsIndex />} />
                    <Route path="/grupos/hiperdia" element={<Hiperdia />} />
                    <Route path="/grupos/tabagismo" element={<Tabagismo />} />
                    <Route
                      path="/grupos/dores-cronicas"
                      element={<DoresCronicas />}
                    />

                    {/* Team Hub */}
                    <Route path="/equipe" element={<TeamIndex />} />
                    <Route
                      path="/equipe/enfermeiras"
                      element={<Enfermeiras />}
                    />
                    <Route path="/equipe/medicos" element={<Medicos />} />
                    <Route
                      path="/equipe/farmaceutica"
                      element={<Farmaceutica />}
                    />
                    <Route path="/equipe/psicologa" element={<Psicologa />} />
                    <Route
                      path="/equipe/ginecologista"
                      element={<Ginecologista />}
                    />
                    <Route
                      path="/equipe/fisioterapeuta"
                      element={<Fisioterapeuta />}
                    />
                    <Route
                      path="/equipe/assistente-social"
                      element={<AssistenteSocial />}
                    />
                    <Route path="/equipe/dentistas" element={<Dentistas />} />
                    <Route path="/equipe/pediatra" element={<Pediatra />} />

                    {/* Special Pages */}
                    <Route path="/acs" element={<ACSPage />} />
                    <Route path="/remsa" element={<REMSA />} />
                    <Route path="/educacao" element={<Educacao />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<Login />} />
                    <Route 
                      path="/admin/painel" 
                      element={
                        <ProtectedRoute>
                          <Painel />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/avisos" 
                      element={
                        <ProtectedRoute>
                          <Avisos />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/campanhas" 
                      element={
                        <ProtectedRoute>
                          <Campanhas />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/chat-ia" 
                      element={
                        <ProtectedRoute>
                          <ChatIA />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/users" 
                      element={
                        <ProtectedRoute requiredRole="admin">
                          <Users />
                        </ProtectedRoute>
                      } 
                    />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ErrorBoundary>
              </Suspense>
            </main>
            <Footer />
          </div>

          {/* Botão de Menu Fixo - Canto Superior Direito (Desktop) */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex fixed top-0 right-0 z-50 p-3 bg-white hover:bg-neutral-100 transition-colors"
            aria-label="Abrir menu"
          >
            <Menu size={24} className="text-neutral-700" />
          </button>
        </div>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

// Placeholder para 404
function NotFoundPlaceholder() {
  return (
    <div className="container-custom py-16 text-center">
      <h1 className="text-4xl font-heading font-bold text-neutral-900 mb-4">
        404 - Página não encontrada
      </h1>
      <p className="text-neutral-600 mb-8">
        A página que você procura não existe ou está em desenvolvimento.
      </p>
      <a
        href="/"
        className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        Voltar para Início
      </a>
    </div>
  );
}

export default App;
