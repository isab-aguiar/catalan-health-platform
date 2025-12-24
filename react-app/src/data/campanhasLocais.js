// =========================================
// CAMPANHAS LOCAIS
// =========================================
// Campanhas de exemplo usando imagens dos assets

import bronquioliteBanner from '../assets/campanhas/bronquiolite-banner-site.png';

/**
 * Campanhas locais (hardcoded) para exibição
 * Útil quando ainda não há campanhas no Firebase
 */
export const campanhasLocais = [
  {
    id: 'local-bronquiolite',
    titulo: 'Campanha de Prevenção à Bronquiolite',
    subtitulo: 'Proteja as crianças contra infecções respiratórias',
    descricao: 'Conheça os sintomas e as formas de prevenção da bronquiolite, uma infecção viral que afeta principalmente bebês e crianças pequenas.',
    categoria: 'campanha',
    template: 'educacao',
    imagemURL: bronquioliteBanner,
    urgente: false,
    destaque: true,
    ativo: true,
    exibirNaHomepage: false, // Não aparece na home, apenas em vacinas
    local: 'ESF Catalão',
    paginaDestino: 'vacinas', // Aparece apenas na página de vacinas
    cta: 'Saiba Mais',
    criadoEm: new Date(),
    isLocal: true // Flag para identificar campanhas locais
  }
];

export default campanhasLocais;

