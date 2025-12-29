/**
 * HomeHero - Seção principal/banner da página inicial
 * Exibe o título principal e descrição da ESF Catalão
 */
export default function HomeHero() {
  return (
    <section className="pt-16 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="mb-3">
            <p className="text-base md:text-lg font-medium text-neutral-500 uppercase tracking-wider mb-2">
              Estratégia Saúde da Família
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-2">
              <span className="text-primary-600 font-display font-bold tracking-wide uppercase">
                ESF CATALÃO
              </span>
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed px-4">
            Atendimento humanizado e profissional para toda a comunidade das{" "}
            <span className="whitespace-nowrap">
              ESFs Bela Vista - Catalão - São José
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

