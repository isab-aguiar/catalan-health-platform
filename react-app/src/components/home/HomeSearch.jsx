import SearchSection from "../search/SearchSection";

export default function HomeSearch() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary-500 to-primary-700">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Encontre sua Equipe de Saúde
          </h2>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            Informe o nome da sua rua para localizar seu Agente Comunitário de
            Saúde e a equipe multiprofissional responsável
          </p>
        </div>
        <SearchSection />
      </div>
    </section>
  );
}
