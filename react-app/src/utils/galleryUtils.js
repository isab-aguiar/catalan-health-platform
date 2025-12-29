/**
 * Utilitários para processamento de imagens da galeria
 */

const galleryImagesModules = import.meta.glob(
  "../assets/images/galeria-photos/*.{png,jpg,jpeg}",
  { eager: false }
);

const getCaptionFromFilename = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") return "";
  const filename = imagePath.split("/").pop().toLowerCase();
  const captionMap = [
    {
      pattern: "foto-unidade",
      caption: `Fachada da Unidade de Saúde ESF Catalão - Rua Júlio Nogueira, 1320, Bairro São José`,
    },
    {
      pattern: "equipe-esf-catalao-belavista-saojose",
      caption:
        "Equipe multiprofissional das ESFs Catalão, Bela Vista e São José reunida para foto oficial",
    },
    {
      pattern: "equipe.jpg",
      caption:
        "Profissionais da equipe multiprofissional da ESF Catalão comprometidos com o cuidado integral à saúde",
    },
    {
      pattern: "grupo-foco-na-saude",
      caption:
        'Grupo de atividades coletivas "Foco na Saúde" - Prevenção e diagnóstico do câncer de pele (Dezembro Laranja) e promoção da saúde',
    },
    {
      pattern: "grupo-viva-leve",
      caption:
        'Grupo de atividades coletivas "Viva Leve" - Cuidado e orientação para pacientes com dor crônica e fibromialgia',
    },
    {
      pattern: "outubro-rosa",
      caption:
        "Campanha Outubro Rosa - Conscientização e prevenção do câncer de mama na ESF Catalão",
    },
    {
      pattern: "viver-bem-diabetes",
      caption:
        'Grupo de atividades coletivas "Viver Bem com Diabetes" - Educação e orientação para pacientes diabéticos',
    },
  ];
  for (const { pattern, caption } of captionMap) {
    if (filename.includes(pattern.toLowerCase())) {
      return caption;
    }
  }
  const nameWithoutExt = filename.replace(/\.(png|jpg|jpeg)$/i, "");
  let formattedName = nameWithoutExt
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  if (formattedName.toLowerCase().includes("grupo")) {
    const grupoName = formattedName.replace(/^grupo\s+/i, "").trim();
    return `Grupo de atividades coletivas "${grupoName}" - Promoção de saúde e bem-estar na comunidade`;
  }
  if (
    formattedName.toLowerCase().includes("evento") ||
    formattedName.toLowerCase().includes("campanha") ||
    formattedName.toLowerCase().includes("ação")
  ) {
    return `${formattedName} realizado na ESF Catalão`;
  }
  return `${formattedName} - ESF Catalão`;
};

export const loadGalleryImages = async () => {
  try {
    const modules = await Promise.all(
      Object.keys(galleryImagesModules).map((path) =>
        galleryImagesModules[path]()
      )
    );
    const imageEntries = modules.map((module, index) => ({
      src: module.default,
      caption: getCaptionFromFilename(
        Object.keys(galleryImagesModules)[index]
      ),
      credit: "Créditos: ESF Catalão - Arquivo próprio",
    }));
    const fotoUnidade = imageEntries.find((img) =>
      img.src.includes("foto-unidade")
    );
    const outrasImagens = imageEntries.filter(
      (img) => !img.src.includes("foto-unidade")
    );
    outrasImagens.sort((a, b) => a.src.localeCompare(b.src));
    return fotoUnidade ? [fotoUnidade, ...outrasImagens] : outrasImagens;
  } catch (error) {
    console.error("Erro ao carregar imagens da galeria:", error);
    return [];
  }
};

