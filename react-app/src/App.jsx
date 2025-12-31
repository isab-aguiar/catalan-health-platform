import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { Menu } from "lucide-react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";
const lazyLoad = (importFunc) => {
  return lazy(() =>
    importFunc().catch((error) => {
      console.error("Erro ao carregar componente:", error);
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
const Home = lazyLoad(() => import("./pages/Home"));
if (typeof window !== "undefined") {
  setTimeout(() => {
    import("./pages/Home").catch(() => {});
  }, 2000);
}
const SearchResultsPage = lazyLoad(() => import("./pages/SearchResultsPage"));
const ACSPage = lazyLoad(() => import("./pages/ACS"));
const NotFound = lazyLoad(() => import("./pages/NotFound"));
const ServicesIndex = lazyLoad(() => import("./pages/services/ServicesIndex"));
const Sala4 = lazyLoad(() => import("./pages/services/Sala4"));
const Sala9 = lazyLoad(() => import("./pages/services/Sala9"));
const Triagem = lazyLoad(() => import("./pages/services/Triagem"));
const Vacinas = lazyLoad(() => import("./pages/services/Vacinas"));
const Procedimentos = lazyLoad(() => import("./pages/services/Procedimentos"));
const Recepcao = lazyLoad(() => import("./pages/services/Recepcao"));
const ECG = lazyLoad(() => import("./pages/services/ECG"));
const Curativos = lazyLoad(() => import("./pages/services/Curativos"));
const Renovacao = lazyLoad(() => import("./pages/services/Renovacao"));
const Farmacia = lazyLoad(() => import("./pages/services/Farmacia"));
const FarmaciaDispensacao = lazyLoad(() => import("./pages/services/FarmaciaDispensacao"));
const PrevencaoHIV = lazyLoad(() => import("./pages/services/PrevencaoHIV"));
const Consultas = lazyLoad(() => import("./pages/services/Consultas"));
const BolsaFamilia = lazyLoad(() => import("./pages/services/BolsaFamilia"));
const GroupsIndex = lazyLoad(() => import("./pages/groups/GroupsIndex"));
const Hiperdia = lazyLoad(() => import("./pages/groups/Hiperdia"));
const Tabagismo = lazyLoad(() => import("./pages/groups/Tabagismo"));
const DoresCronicas = lazyLoad(() => import("./pages/groups/DoresCronicas"));
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
const REMSA = lazyLoad(() => import("./pages/REMSA"));
const CampanhaDetalhe = lazyLoad(() => import("./pages/CampanhaDetalhe"));
const Login = lazyLoad(() => import("./pages/admin/Login"));
const Painel = lazyLoad(() => import("./pages/admin/Painel"));
const Avisos = lazyLoad(() => import("./pages/admin/Avisos"));
const Campanhas = lazyLoad(() => import("./pages/admin/Campanhas"));
const Users = lazyLoad(() => import("./pages/admin/Users"));
const CorrigirPermissoes = lazyLoad(
  () => import("./pages/admin/CorrigirPermissoes")
);
const EstoqueVacinas = lazyLoad(() => import("./pages/admin/EstoqueVacinas"));
const OrientacoesPosConsulta = lazyLoad(() => import("./pages/admin/OrientacoesPosConsulta"));
const CalendarioAdmin = lazyLoad(() => import("./pages/admin/CalendarioAdmin"));
const EscalasTrabalho = lazyLoad(() => import("./pages/admin/EscalasTrabalho"));
const Notificacoes = lazyLoad(() => import("./pages/admin/Notificacoes"));
const OuvidoriaIndex = lazyLoad(() => import("./pages/services/OuvidoriaIndex"));
const Elogios = lazyLoad(() => import("./pages/services/Elogios"));
const Sugestoes = lazyLoad(() => import("./pages/services/Sugestoes"));
const Reclamacoes = lazyLoad(() => import("./pages/services/Reclamacoes"));
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <ErrorBoundary>
      <ModalProvider>
        <AuthProvider>
          <BrowserRouter>
          <ScrollToTop />
          <div className="flex min-h-screen overflow-x-hidden w-full">
            {}
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
            {}
            <div className="flex flex-col flex-1 min-w-0 overflow-x-hidden">
              <Header />
              <main className="flex-1 overflow-x-hidden w-full pt-[70px]">
                <Suspense fallback={<LoadingSpinner />}>
                  <ErrorBoundary>
                    <Routes>
                      {}
                      <Route path="/" element={<Home />} />
                      <Route
                        path="/search-results"
                        element={<SearchResultsPage />}
                      />
                      {}
                      <Route path="/servicos" element={<ServicesIndex />} />
                      <Route path="/servicos/sala-4" element={<Sala4 />} />
                      <Route path="/servicos/sala-9" element={<Sala9 />} />
                      <Route path="/servicos/triagem" element={<Triagem />} />
                      <Route path="/servicos/vacinas" element={<Vacinas />} />
                      <Route
                        path="/servicos/procedimentos"
                        element={<Procedimentos />}
                      />
                      <Route path="/servicos/recepcao" element={<Recepcao />} />
                      <Route path="/servicos/ecg" element={<ECG />} />
                      <Route
                        path="/servicos/curativos"
                        element={<Curativos />}
                      />
                      <Route
                        path="/servicos/renovacao"
                        element={<Renovacao />}
                      />
                      <Route path="/servicos/farmacia" element={<Farmacia />} />
                      <Route
                        path="/servicos/farmacia-dispensacao"
                        element={<FarmaciaDispensacao />}
                      />
                      <Route
                        path="/servicos/prevencao-hiv"
                        element={<PrevencaoHIV />}
                      />
                      <Route
                        path="/servicos/consultas"
                        element={<Consultas />}
                      />
                      <Route
                        path="/servicos/bolsa-familia"
                        element={<BolsaFamilia />}
                      />
                      <Route path="/ouvidoria" element={<OuvidoriaIndex />} />
                      <Route path="/ouvidoria/elogios" element={<Elogios />} />
                      <Route path="/ouvidoria/sugestoes" element={<Sugestoes />} />
                      <Route path="/ouvidoria/reclamacoes" element={<Reclamacoes />} />
                      {}
                      <Route path="/grupos" element={<GroupsIndex />} />
                      <Route path="/grupos/hiperdia" element={<Hiperdia />} />
                      <Route path="/grupos/tabagismo" element={<Tabagismo />} />
                      <Route
                        path="/grupos/dores-cronicas"
                        element={<DoresCronicas />}
                      />
                      {}
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
                      {}
                      <Route path="/acs" element={<ACSPage />} />
                      <Route path="/remsa" element={<REMSA />} />
                      <Route path="/campanhas/:id" element={<CampanhaDetalhe />} />
                      {}
                      <Route path="/admin/login" element={<Login />} />
                      <Route
                        path="/admin/corrigir-permissoes"
                        element={
                          <ProtectedRoute>
                            <CorrigirPermissoes />
                          </ProtectedRoute>
                        }
                      />
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
                        path="/admin/users"
                        element={
                          <ProtectedRoute requiredRole="admin">
                            <Users />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/estoque-vacinas"
                        element={
                          <ProtectedRoute>
                            <EstoqueVacinas />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/orientacoes-pos-consulta"
                        element={
                          <ProtectedRoute>
                            <OrientacoesPosConsulta />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/calendario"
                        element={
                          <ProtectedRoute>
                            <CalendarioAdmin />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/escalas"
                        element={
                          <ProtectedRoute>
                            <EscalasTrabalho />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/notificacoes"
                        element={
                          <ProtectedRoute>
                            <Notificacoes />
                          </ProtectedRoute>
                        }
                      />
                      {}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </ErrorBoundary>
                </Suspense>
              </main>
              <Footer />
            </div>
            {}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSidebarOpen(!isSidebarOpen);
              }}
              className="hidden lg:flex fixed top-0 right-0 z-[60] p-3 bg-white hover:bg-neutral-100 transition-colors"
              aria-label="Abrir menu"
            >
              <Menu size={24} className="text-neutral-700" />
            </button>
          </div>
          </BrowserRouter>
        </AuthProvider>
      </ModalProvider>
    </ErrorBoundary>
  );
}
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
