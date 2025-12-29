import { Instagram, Facebook, Youtube } from "lucide-react";
import { socialMedia } from "../../config";
import logoESF from "../../assets/logo-esf.png";
import logoPrefeitura from "../../assets/logo_mobile.png";
import logoSemusa from "../../assets/logo-semusa.png";

/**
 * HomeSocialMedia - Seção de redes sociais
 * Exibe links para redes sociais da ESF, Prefeitura e SEMUSA
 */
export default function HomeSocialMedia() {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Acompanhe Nossas Redes Sociais
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Fique por dentro das novidades, campanhas e informações importantes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-primary-200 hover:shadow-xl transition-all">
            <div className="flex justify-center items-center mb-6">
              <img
                src={logoESF}
                alt="ESF Catalão - Estratégia Saúde da Família"
                className="w-full max-w-[280px] md:max-w-[500px] h-auto object-contain brightness-110 contrast-110 saturate-120"
              />
            </div>
            <div className="border-t border-neutral-200 pt-6">
              <p className="text-center text-sm font-medium text-neutral-600 mb-4 uppercase tracking-wide">
                ESF Catalão
              </p>
              <div className="flex justify-center">
                <a
                  href={socialMedia.esfCatalao.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  aria-label="Instagram ESF Catalão"
                >
                  <Instagram size={20} />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-neutral-200 hover:shadow-xl transition-all">
            <div className="flex justify-center items-center mb-6 h-28">
              <img
                src={logoPrefeitura}
                alt="Prefeitura de Divinópolis"
                className="h-20 w-auto object-contain"
              />
            </div>
            <div className="border-t border-neutral-200 pt-6">
              <p className="text-center text-sm font-medium text-neutral-600 mb-4 uppercase tracking-wide">
                Prefeitura de Divinópolis
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={socialMedia.prefeitura.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  aria-label="Instagram Prefeitura de Divinópolis"
                >
                  <Instagram size={20} />
                  <span>Instagram</span>
                </a>
                <a
                  href={socialMedia.prefeitura.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  aria-label="Facebook Prefeitura de Divinópolis"
                >
                  <Facebook size={20} />
                  <span>Facebook</span>
                </a>
                <a
                  href={socialMedia.prefeitura.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  aria-label="YouTube Prefeitura de Divinópolis"
                >
                  <Youtube size={20} />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-neutral-200 hover:shadow-xl transition-all">
            <div className="flex justify-center items-center mb-6 h-28">
              <img
                src={logoSemusa}
                alt="SEMUSA - Secretaria Municipal de Saúde"
                className="h-28 w-auto object-contain"
              />
            </div>
            <div className="border-t border-neutral-200 pt-6">
              <p className="text-center text-sm font-medium text-neutral-600 mb-4 uppercase tracking-wide">
                SEMUSA Divinópolis
              </p>
              <div className="flex justify-center">
                <a
                  href={socialMedia.semusa.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  aria-label="Instagram SEMUSA Divinópolis"
                >
                  <Instagram size={20} />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

