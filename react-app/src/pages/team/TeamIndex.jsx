import PageContainer from "../../components/layout/PageContainer";
import Card from "../../components/common/Card";
import BackButton from "../../components/common/BackButton";
import { professionalsData } from "../../data/professionals";
export default function TeamIndex() {
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto space-y-8">
        <BackButton />
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 pb-4 border-b border-neutral-200 whitespace-nowrap">
            E-multi
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Equipe Multiprofissional de Saúde
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionalsData.map((professional) => (
            <Card
              key={professional.id}
              title={professional.title}
              description={professional.description}
              icon={professional.icon}
              href={professional.path}
            />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
