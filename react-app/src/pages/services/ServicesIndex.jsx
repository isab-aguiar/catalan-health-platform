import { Link } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import Card from "../../components/common/Card";
import { allPages, serviceCategories } from "../../data/services";
import BackButton from "../../components/common/BackButton";

export default function ServicesIndex() {
  // Verificação de segurança
  if (!allPages || !serviceCategories) {
    return (
      <PageContainer>
        <div className="max-w-6xl mx-auto text-center py-16">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Erro ao carregar dados
          </h1>
        </div>
      </PageContainer>
    );
  }

  const services = allPages.filter(page => page && page.category === "services");

  if (!services || services.length === 0) {
    return (
      <PageContainer>
        <div className="max-w-6xl mx-auto text-center py-16">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Nenhum serviço encontrado
          </h1>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto space-y-8">
        <BackButton />
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Serviços
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Conheça todos os serviços e atendimentos disponíveis na unidade
          </p>
        </div>

        {serviceCategories.map((category, index) => {
          if (!category || !category.services) return null;
          
          const categoryServices = services.filter(s => s && category.services.includes(s.id));
          
          if (categoryServices.length === 0) return null;
          
          return (
            <div key={category.name || index} className="space-y-4">
              <h2 className="text-2xl font-bold text-neutral-900">
                {category.name}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryServices.map((service) => {
                  if (!service || !service.id) return null;
                  
                  return (
                    <Card
                      key={service.id}
                      title={service.title || "Serviço"}
                      description={service.description || ""}
                      icon={service.icon}
                      href={service.path}
                      colorScheme={service.colorScheme || 'primary'}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
