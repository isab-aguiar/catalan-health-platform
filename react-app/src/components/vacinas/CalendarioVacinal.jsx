import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Baby,
  Users,
  User,
  UserCheck,
  Heart,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";
import mascoteZe from "../../assets/mascote-ze.png";
import pdfCrianca from "../../assets/arquivos-vacinas-pdf/Calendário Nacional de Vacinação - Criança.pdf";
import pdfAdolescente from "../../assets/arquivos-vacinas-pdf/Calendário Nacional de Vacinação - Adolescentes e jovens.pdf";
import pdfAdulto from "../../assets/arquivos-vacinas-pdf/Calendário Nacional de Vacinação - Adulto.pdf";
import pdfIdoso from "../../assets/arquivos-vacinas-pdf/Calendário Nacional de Vacinação - Idoso.pdf";
import pdfGestante from "../../assets/arquivos-vacinas-pdf/Calendário Nacional de Vacinação - Gestante.pdf";
function Alert({ type = "info", children }) {
  const types = {
    info: {
      bg: "bg-info/10",
      border: "border-info",
      text: "text-info",
      icon: "text-info",
    },
    warning: {
      bg: "bg-warning/10",
      border: "border-warning",
      text: "text-warning-dark",
      icon: "text-warning-dark",
    },
    success: {
      bg: "bg-success/10",
      border: "border-success",
      text: "text-success-dark",
      icon: "text-success",
    },
  };
  const style = types[type] || types.info;
  return (
    <div
      className={`${style.bg} ${style.border} border-l-4 p-4 rounded-r ${style.text}`}
    >
      <div className="flex gap-3">
        <AlertCircle
          size={20}
          className={`flex-shrink-0 mt-0.5 ${style.icon}`}
        />
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
export default function CalendarioVacinal() {
  const [perfilSelecionado, setPerfilSelecionado] = useState("gestante");
  const [categoriasAbertas, setCategoriasAbertas] = useState({});
  const pdfMap = {
    crianca: pdfCrianca,
    adolescente: pdfAdolescente,
    adulto: pdfAdulto,
    idoso: pdfIdoso,
    gestante: pdfGestante,
  };
  const toggleCategoria = (id) => {
    setCategoriasAbertas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const perfilIcones = {
    crianca: Baby,
    adolescente: Users,
    adulto: User,
    idoso: UserCheck,
    gestante: Heart,
  };
  const perfis = {
    crianca: {
      titulo: "Criança",
      faixaEtaria: "0 a 9 anos",
      cor: "bg-pink-500",
      corTexto: "text-pink-700",
      corBorda: "border-pink-500",
      corHover: "hover:bg-pink-50",
      descricao: "Criança (0 a 9 anos, 11 meses e 29 dias)",
      texto:
        "A vacinação é uma forma segura de proteger a criança contra doenças graves. O Calendário Nacional de Vacinação orienta quais vacinas são necessárias em cada idade. Nos primeiros 1000 dias de vida, a vacinação é essencial para o crescimento e desenvolvimento saudável.",
      categorias: [
        {
          id: "nascer",
          idade: "Ao nascer",
          vacinas: [
            {
              nome: "Vacina BCG",
              dose: "(dose única)",
              doencas:
                "formas graves e disseminadas da tuberculose e hanseníase",
            },
            {
              nome: "Vacina Hepatite B",
              dose: "(1 dose)",
              doencas: "hepatite B e hepatite D",
            },
          ],
        },
        {
          id: "2meses",
          idade: "2 meses",
          vacinas: [
            {
              nome: "Vacina penta (DTP+Hib+HB)",
              dose: "(1ª dose)",
              doencas:
                "difteria, tétano, coqueluche, infecções por Haemophilus influenzae B e hepatite B",
            },
            {
              nome: "Vacina poliomielite inativada VIP",
              dose: "(1ª dose)",
              doencas: "poliomielite (paralisia infantil)",
            },
            {
              nome: "Vacina pneumocócica 10-valente",
              dose: "(1ª dose)",
              doencas: "doenças pneumocócicas invasivas",
            },
            {
              nome: "Vacina rotavírus humano",
              dose: "(1ª dose)",
              doencas: "gastrenterite viral (diarreia e vômitos)",
            },
          ],
        },
        {
          id: "3meses",
          idade: "3 meses",
          vacinas: [
            {
              nome: "Vacina meningocócica C",
              dose: "(1ª dose)",
              doencas: "doenças meningocócicas pelo meningococo tipo C",
            },
          ],
        },
        {
          id: "4meses",
          idade: "4 meses",
          vacinas: [
            {
              nome: "Vacina penta (DTP+Hib+HB)",
              dose: "(2ª dose)",
              doencas:
                "difteria, tétano, coqueluche, infecções por Haemophilus influenzae B e hepatite B",
            },
            {
              nome: "Vacina poliomielite inativada VIP",
              dose: "(2ª dose)",
              doencas: "poliomielite (paralisia infantil)",
            },
            {
              nome: "Vacina pneumocócica 10-valente",
              dose: "(2ª dose)",
              doencas: "doenças pneumocócicas invasivas",
            },
            {
              nome: "Vacina rotavírus humano",
              dose: "(2ª dose)",
              doencas: "gastrenterite viral (diarreia e vômitos)",
            },
          ],
        },
        {
          id: "6meses",
          idade: "6 meses",
          vacinas: [
            {
              nome: "Vacina penta (DTP+Hib+HB)",
              dose: "(3ª dose)",
              doencas:
                "difteria, tétano, coqueluche, infecções por Haemophilus influenzae B e hepatite B",
            },
            {
              nome: "Vacina poliomielite inativada VIP",
              dose: "(3ª dose)",
              doencas: "poliomielite (paralisia infantil)",
            },
            {
              nome: "Vacina influenza trivalente",
              dose: "(1ª dose)",
              doencas: "gripe (influenza)",
            },
            {
              nome: "Vacina covid-19",
              dose: "(1ª dose)",
              doencas: "formas graves causadas pelo SARS-CoV-2",
            },
          ],
        },
        {
          id: "9meses",
          idade: "9 meses",
          vacinas: [
            {
              nome: "Vacina febre amarela",
              dose: "(1ª dose)",
              doencas: "febre amarela",
            },
          ],
        },
        {
          id: "12meses",
          idade: "12 meses",
          vacinas: [
            {
              nome: "Vacina pneumocócica 10-valente",
              dose: "(1 dose reforço)",
              doencas: "doenças pneumocócicas invasivas",
            },
            {
              nome: "Vacina meningocócica ACWY",
              dose: "(1 dose)",
              doencas:
                "doenças meningocócicas por meningococos tipo A, C, W e Y",
            },
            {
              nome: "Vacina tríplice viral SCR",
              dose: "(1 dose)",
              doencas:
                "sarampo, caxumba, rubéola e síndrome da rubéola congênita",
            },
          ],
        },
        {
          id: "15meses",
          idade: "15 meses",
          vacinas: [
            {
              nome: "Vacina DTP",
              dose: "(1ª dose reforço)",
              doencas: "difteria, tétano e coqueluche",
            },
            {
              nome: "Vacina poliomielite inativada VIP",
              dose: "(1ª dose reforço)",
              doencas: "poliomielite (paralisia infantil)",
            },
            {
              nome: "Vacina tetraviral SCRV",
              dose: "(1 dose)",
              doencas:
                "sarampo, caxumba, rubéola, síndrome da rubéola congênita e varicela",
            },
            {
              nome: "Vacina hepatite A",
              dose: "(1 dose)",
              doencas: "hepatite A",
            },
          ],
        },
        {
          id: "4anos",
          idade: "4 anos",
          vacinas: [
            {
              nome: "Vacina DTP",
              dose: "(2º reforço)",
              doencas: "difteria, tétano, coqueluche",
            },
            {
              nome: "Vacina febre amarela",
              dose: "(1 dose reforço)",
              doencas: "febre amarela",
            },
            {
              nome: "Vacina varicela",
              dose: "(1 dose)",
              doencas: "varicela ou catapora",
            },
          ],
        },
        {
          id: "9a14anos",
          idade: "9 a 14 anos",
          vacinas: [
            {
              nome: "Vacina HPV4",
              dose: "(1 dose)",
              doencas: "infecções causadas pelo papilomavírus humano",
            },
          ],
        },
      ],
    },
    adolescente: {
      titulo: "Adolescentes e jovens",
      faixaEtaria: "9 a 24 anos",
      cor: "bg-purple-600",
      corTexto: "text-purple-700",
      corBorda: "border-purple-600",
      corHover: "hover:bg-purple-50",
      descricao: "Adolescentes (10 a 19 anos) e jovens (20 a 24 anos)",
      texto:
        "A vacinação protege adolescentes e jovens contra doenças graves e contribui para uma vida adulta e futuras gestações mais saudáveis. O Calendário Nacional de Vacinação orienta quais vacinas são necessárias. Todas as vacinas do SUS são seguras e essenciais.",
      categorias: [
        {
          id: "9a14anos",
          idade: "9 a 14 anos",
          vacinas: [
            {
              nome: "Vacina HPV4",
              dose: "(1 dose)",
              doencas: "infecções causadas pelo papilomavírus humano",
            },
          ],
        },
        {
          id: "11a14anos",
          idade: "11 a 14 anos",
          vacinas: [
            {
              nome: "Vacina meningocócica ACWY",
              dose: "(1 dose)",
              doencas:
                "doenças meningocócicas causadas pela N. meningitidis tipo A, C, W-135 e Y",
            },
          ],
        },
        {
          id: "10a24anos",
          idade: "10 a 24 anos",
          vacinas: [
            {
              nome: "Vacina hepatite B",
              dose: "(3 doses, conforme histórico vacinal)",
              doencas: "hepatite B e hepatite D",
            },
            {
              nome: "Vacina dT",
              dose: "(3 doses, conforme histórico vacinal)",
              doencas: "difteria e tétano",
            },
            {
              nome: "Vacina febre amarela",
              dose: "(1 dose, conforme histórico vacinal)",
              doencas: "febre amarela",
            },
            {
              nome: "Vacina tríplice viral SCR",
              dose: "(2 doses, conforme histórico vacinal)",
              doencas:
                "sarampo, caxumba, rubéola e síndrome da rubéola congênita",
            },
          ],
        },
      ],
    },
    adulto: {
      titulo: "Adulto",
      faixaEtaria: "25 a 59 anos",
      cor: "bg-blue-600",
      corTexto: "text-primary-700",
      corBorda: "border-info",
      corHover: "hover:bg-info/10",
      descricao: "Adulto (25 a 59 anos)",
      texto:
        "Procure uma unidade de saúde e verifique seu Cartão de Vacinas. Mantenha atualizado conforme o Calendário Nacional de Vacinação - Adulto. Para as mulheres, fiquem atentas, mantenham suas vacinas em dia antes da gravidez, durante a gestação e no pós-parto.",
      categorias: [
        {
          id: "25a59anos",
          idade: "25 a 59 anos",
          vacinas: [
            {
              nome: "Vacina hepatite B",
              dose: "(3 doses, conforme histórico vacinal)",
              doencas: "hepatite B e hepatite D",
            },
            {
              nome: "Vacina dT",
              dose: "(3 doses, conforme histórico vacinal)",
              doencas: "difteria e tétano",
            },
            {
              nome: "Vacina febre amarela",
              dose: "(1 dose, conforme histórico vacinal)",
              doencas: "febre amarela",
            },
            {
              nome: "Vacina tríplice viral SCR",
              dose: "(conforme histórico vacinal)",
              doencas:
                "sarampo, caxumba, rubéola e síndrome da rubéola congênita",
            },
          ],
        },
      ],
    },
    idoso: {
      titulo: "Idoso",
      faixaEtaria: "a partir de 60 anos",
      cor: "bg-green-600",
      corTexto: "text-green-700",
      corBorda: "border-success",
      corHover: "hover:bg-success/10",
      descricao: "Idoso (a partir de 60 anos)",
      texto:
        "A vacinação promove uma vida saudável e contribui para a qualidade de vida e o bem-estar. Em todas as idades, as vacinas são essenciais para prevenir doenças graves. Os idosos devem manter o Cartão de Vacinas atualizado.",
      categorias: [
        {
          id: "60anos",
          idade: "A partir dos 60 anos",
          vacinas: [
            {
              nome: "Vacina hepatite B",
              dose: "(3 doses, conforme histórico vacinal)",
              doencas: "hepatite B e hepatite D",
            },
            {
              nome: "Vacina dT",
              dose: "(3 doses, conforme histórico vacinal)",
              doencas: "difteria e tétano",
            },
            {
              nome: "Vacina febre amarela",
              dose: "(1 dose, conforme histórico vacinal)",
              doencas: "febre amarela",
            },
            {
              nome: "Vacina tríplice viral SCR",
              dose: "(2 doses, conforme histórico vacinal)",
              doencas:
                "sarampo, caxumba, rubéola e síndrome da rubéola congênita",
            },
            {
              nome: "Vacina influenza trivalente",
              dose: "(1 dose anual)",
              doencas: "gripe (influenza)",
            },
            {
              nome: "Vacina covid-19",
              dose: "(1 dose semestral)",
              doencas: "formas graves causadas pelo SARS-CoV-2",
            },
          ],
        },
      ],
    },
    gestante: {
      titulo: "Gestante",
      faixaEtaria: "Durante a gestação",
      cor: "bg-rose-500",
      corTexto: "text-rose-700",
      corBorda: "border-rose-500",
      corHover: "hover:bg-rose-50",
      descricao: "Gestante (a gestante e seu bebê, até o nascimento)",
      texto:
        "A vacinação é uma forma segura de proteger a gestante e o bebê contra doenças graves. Na primeira consulta do pré-natal, é importante atualizar o Cartão de Vacinas e planejar as próximas doses indicadas. Cuidados nos primeiros 1000 dias garantem crescimento e desenvolvimento saudáveis.",
      categorias: [
        {
          id: "gravidez",
          idade: "Ao saber da gravidez",
          vacinas: [
            {
              nome: "Vacina hepatite B",
              dose: "(3 doses, conforme histórico vacinal)",
              doencas: "hepatite B e hepatite D",
            },
            {
              nome: "Vacina dT",
              dose: "(3 doses, conforme histórico vacinal)",
              doencas: "difteria e tétano",
            },
            {
              nome: "Vacina influenza trivalente",
              dose: "(1 dose por temporada)",
              doencas: "gripe (influenza)",
            },
            {
              nome: "Vacina covid-19",
              dose: "(1 dose a cada gestação)",
              doencas: "formas graves causadas pelo SARS-CoV-2",
            },
            {
              nome: "Vacina febre amarela",
              dose: "(1 dose, em casos excepcionais)",
              doencas: "febre amarela",
              obs: "Pode ser recomendada quando há alto risco e não é possível adiar, após avaliação do serviço de saúde.",
            },
          ],
        },
        {
          id: "20semanas",
          idade: "A partir da 20ª semana gestacional",
          vacinas: [
            {
              nome: "Vacina dTpa",
              dose: "(1 dose a partir da 20ª semana, em cada gestação)",
              doencas: "difteria, tétano e coqueluche",
            },
          ],
        },
        {
          id: "28semanas",
          idade: "A partir da 28ª semana gestacional",
          vacinas: [
            {
              nome: "Vacina contra Bronquiolite",
              dose: "(1 dose a partir da 28ª semana gestacional)",
              doencas:
                "bronquiolite causada pelo vírus sincicial respiratório (VSR)",
              obs: "Esta vacina protege o bebê antes mesmo dele nascer. Já está disponível no SUS. Procure uma Unidade Básica de Saúde.",
            },
          ],
        },
      ],
    },
  };
  const perfilAtual = perfis[perfilSelecionado];
  const handleDownloadPDF = () => {
    const pdfUrl = pdfMap[perfilSelecionado];
    if (!pdfUrl) {
      console.error("PDF não encontrado para o perfil:", perfilSelecionado);
      return;
    }
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `Calendario-Vacinacao-${perfilAtual.titulo}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="relative overflow-visible">
      <div className="bg-white rounded-lg shadow-lg overflow-visible relative">
        {}
        <div className="bg-blue-800 px-6">
          {}
          <div className="hidden md:flex md:flex-wrap md:gap-3 md:py-4">
            {Object.entries(perfis).map(([key, perfil]) => {
              const IconComponent = perfilIcones[key];
              return (
                <button
                  key={key}
                  onClick={() => setPerfilSelecionado(key)}
                  className={`flex items-center gap-3 px-5 py-2.5 rounded-lg font-medium text-sm
                  transition-all duration-200 ${
                    perfilSelecionado === key
                      ? "bg-white text-info shadow-md ring-2 ring-blue-500"
                      : "bg-blue-700 text-white hover:bg-info-600"
                  }`}
                >
                  <IconComponent size={18} strokeWidth={2.5} />
                  <span>{perfil.titulo}</span>
                </button>
              );
            })}
          </div>
          {}
          <div className="md:hidden py-4">
            <label
              htmlFor="perfil-select"
              className="block text-sm font-semibold text-white mb-2"
            >
              Selecione o perfil:
            </label>
            <div className="relative">
              <select
                id="perfil-select"
                value={perfilSelecionado}
                onChange={(e) => setPerfilSelecionado(e.target.value)}
                className="w-full appearance-none bg-white border-2 border-info
                rounded-lg px-4 py-3 pr-10 font-medium text-sm text-info
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                cursor-pointer"
              >
                {Object.entries(perfis).map(([key, perfil]) => (
                  <option key={key} value={key}>
                    {perfil.titulo}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-info pointer-events-none"
                size={18}
              />
            </div>
            {}
            <div className="mt-3 flex items-center gap-3 p-3 bg-info/10 rounded-lg border border-blue-200">
              {(() => {
                const IconComponent = perfilIcones[perfilSelecionado];
                return (
                  <div
                    className={`w-10 h-10 ${perfis[perfilSelecionado].cor}
                  rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <IconComponent
                      size={20}
                      className="text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                );
              })()}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-info truncate">
                  {perfis[perfilSelecionado].titulo}
                </p>
                <p className="text-xs text-primary-700 truncate">
                  <span className="font-medium">Faixa etária:</span>{" "}
                  {perfis[perfilSelecionado].faixaEtaria}
                </p>
              </div>
            </div>
          </div>
        </div>
        {}
        <div className="p-4 sm:p-5 md:p-6 lg:p-8 relative">
          {}
          <div
            className="bg-gradient-to-br from-blue-50 via-white to-blue-50
          rounded-xl p-5 mb-6 border border-blue-200 shadow-sm
          md:flex md:items-start md:gap-6 md:p-6"
          >
            {}
            {(() => {
              const IconComponent = perfilIcones[perfilSelecionado];
              return (
                <div
                  className={`flex-shrink-0 w-16 h-16 ${perfilAtual.cor}
                rounded-xl flex items-center justify-center shadow-md mb-4 md:mb-0
                md:w-20 md:h-20`}
                >
                  <IconComponent
                    size={32}
                    className="text-white"
                    strokeWidth={2}
                  />
                </div>
              );
            })()}
            {}
            <div className="flex-1">
              <h2
                className="text-base font-semibold text-neutral-900 mb-1 leading-tight
              md:text-lg"
              >
                {perfilAtual.titulo}
              </h2>
              <p className="text-xs font-normal text-neutral-600 mb-3 md:text-sm">
                <span className="font-medium">Faixa etária:</span>{" "}
                {perfilAtual.faixaEtaria}
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {perfilAtual.texto}
              </p>
            </div>
          </div>
          {}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-3">
              {}
              <div className="relative max-w-md order-2 md:order-1">
                <div className="bg-white border-2 border-info rounded-2xl p-4 shadow-lg relative">
                  <p className="text-sm md:text-base text-neutral-800 leading-relaxed flex items-start gap-2">
                    <Lightbulb
                      size={20}
                      className="text-info flex-shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span>
                      <span className="font-bold text-primary-700">
                        Importante:
                      </span>{" "}
                      Durante campanhas de vacinação, nosso horário pode ser
                      estendido. Acompanhe os comunicados oficiais da unidade.
                    </span>
                  </p>
                  {}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:-right-3 md:top-1/2 md:-translate-y-1/2 md:translate-x-0">
                    <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-blue-300 md:border-t-8 md:border-t-transparent md:border-b-8 md:border-b-transparent md:border-l-8 md:border-l-blue-300 md:border-r-0"></div>
                    <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 md:top-1/2 md:left-auto md:-left-[5px] md:-translate-y-1/2 md:translate-x-0 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-white md:border-t-[7px] md:border-t-transparent md:border-b-[7px] md:border-b-transparent md:border-l-[7px] md:border-l-white md:border-r-0"></div>
                  </div>
                </div>
              </div>
              {}
              <div className="flex-shrink-0 order-1 md:order-2">
                <img
                  src={mascoteZe}
                  alt="Zé Gotinha - Mascote da Vacinação"
                  className="w-32 h-auto sm:w-36 md:w-44 lg:w-48 xl:w-52 pointer-events-none"
                  style={{
                    maxHeight: "280px",
                    objectFit: "contain",
                    display: "block",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    padding: 0,
                    margin: 0,
                    imageRendering: "-webkit-optimize-contrast",
                    WebkitFontSmoothing: "antialiased",
                    shapeRendering: "geometricPrecision",
                  }}
                />
              </div>
            </div>
            {}
            <div
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(148, 163, 184, 0.3) 20%, rgba(148, 163, 184, 0.3) 80%, transparent)",
              }}
            ></div>
          </div>
          {}
          <div className="relative">
            {}
            <div
              className={`absolute left-5 md:left-5 top-0 bottom-0 w-0.5 ${perfilAtual.cor}`}
            ></div>
            {perfilAtual.categorias.map((categoria) => (
              <div
                key={categoria.id}
                className="relative mb-4 md:mb-6 last:mb-0"
              >
                {}
                <button
                  onClick={() => toggleCategoria(categoria.id)}
                  className={`relative flex items-center gap-4 w-full text-left group ${perfilAtual.corHover} rounded-lg transition-all`}
                >
                  {}
                  <div
                    className={`flex-shrink-0 w-10 h-10 md:w-11 md:h-11 ${perfilAtual.cor} rounded-full flex items-center justify-center z-10 border-3 border-white shadow-md`}
                  >
                    {categoriasAbertas[categoria.id] ? (
                      <ChevronUp
                        className="text-white"
                        size={18}
                        strokeWidth={2.5}
                      />
                    ) : (
                      <ChevronDown
                        className="text-white"
                        size={18}
                        strokeWidth={2.5}
                      />
                    )}
                  </div>
                  <div className="flex-1 py-2">
                    <h3 className="text-sm md:text-base font-semibold text-neutral-900 tracking-tight">
                      {categoria.idade}
                    </h3>
                  </div>
                </button>
                {}
                {categoriasAbertas[categoria.id] && (
                  <div
                    className="ml-12 md:ml-14 mt-3 md:mt-4 bg-neutral-50 rounded-lg p-4 md:p-5 border-l-4"
                    style={{ borderColor: perfilAtual.cor.replace("bg-", "#") }}
                  >
                    {categoria.vacinas.map((vacina, vidx) => (
                      <div
                        key={vidx}
                        className="mb-4 md:mb-5 last:mb-0 pb-4 md:pb-5 last:pb-0 border-b border-neutral-200 last:border-b-0"
                      >
                        {}
                        <h4 className="text-sm md:text-base font-bold text-neutral-900 mb-1 leading-tight tracking-tight">
                          {vacina.nome}
                        </h4>
                        {}
                        <p
                          className={`${perfilAtual.corTexto} font-medium text-xs md:text-sm mb-2`}
                        >
                          {vacina.dose}
                        </p>
                        {}
                        <p className="text-neutral-700 mb-0 leading-relaxed">
                          <span className="font-semibold text-xs md:text-sm">
                            Doenças evitadas:
                          </span>{" "}
                          <span className="text-primary-700 font-normal text-xs md:text-sm">
                            {vacina.doencas}
                          </span>
                        </p>
                        {}
                        {vacina.obs && (
                          <div className="mt-3 p-3 md:p-4 bg-warning/10 border-l-4 border-amber-400 rounded-r-md">
                            <p className="text-xs font-normal text-neutral-800 leading-relaxed">
                              <span className="font-bold">Observação:</span>{" "}
                              {vacina.obs}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {}
        <div className="text-center p-4 md:p-6 bg-neutral-50 border-t border-neutral-200">
          <button
            onClick={handleDownloadPDF}
            className="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600
            text-info font-semibold text-sm px-6 py-2.5 md:px-8 md:py-3
            rounded-lg shadow-md hover:shadow-lg transition-all duration-200
            inline-flex items-center gap-2 hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            <Download size={18} strokeWidth={2.5} className="flex-shrink-0" />
            <span className="hidden sm:inline">Baixar PDF do Calendário</span>
            <span className="sm:hidden">Baixar PDF</span>
          </button>
        </div>
        {}
        <div className="p-4 md:p-5 lg:p-6">
          <div className="bg-info/10 border-l-4 border-blue-500 p-4 md:p-5 rounded-r-lg">
            <p className="text-neutral-800 text-xs md:text-sm font-normal leading-relaxed">
              <span className="font-bold">Observação Importante:</span> Pessoas
              que apresentam condições clínicas especiais, congênitas ou
              adquiridas ao longo da vida, ou que possuem condições de saúde que
              as tornam mais vulneráveis a infecções, devem procurar os Centros
              de Referência para Imunobiológicos Especiais (CRIE) para avaliação
              e vacinação adequada às suas necessidades específicas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
