import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import BackButton from "../components/common/BackButton";
import RecommendedReadingCarousel from "../components/common/RecommendedReadingCarousel";
import "./Educacao.css";

export default function Educacao() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        <div id="content">
          {/* BANNER: Full Width */}
          <div className="row">
            <div className="column col-md-12" style={{ padding: 0 }}>
              <div className="cover-banner-tile">
                <img
                  src="https://www.gov.br/saude/pt-br/composicao/saes/samu-192/samu-192/@@govbr.institucional.banner/a21c3a5b-1121-4021-9c8b-830072e4c022/@@images/464d5644-116c-4392-bcf9-d765e9148032.png"
                  alt="Serviço de Atendimento Móvel de Urgência - SAMU 192"
                />
              </div>
            </div>
          </div>

          {/* CONTEÚDO BRANCO: Com container-limit */}
          <div className="row box-branco">
            <div className="container-limit">
              <div className="column col-md-12">
                <div className="cover-richtext-tile">
                  <p className="callout">
                    O{" "}
                    <strong>
                      Serviço de Atendimento Móvel de Urgência - SAMU 192
                    </strong>{" "}
                    é um dos componentes da Política Nacional de Atenção às
                    Urgências do Ministério da Saúde e faz parte da Rede
                    Assistencial <strong>Pré-Hospitalar Móvel</strong> de
                    atendimento às urgências.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TILE EM ALTA: Com container-limit */}
          <div className="row tile-em-alta">
            <div className="container-limit">
              <div className="column col-md-12">
                <div className="cover-richtext-tile">
                  <p>
                    O atendimento <strong>pré-hospitalar móvel</strong> em
                    situações de urgência é caracterizado pela busca precoce da
                    vítima após a ocorrência de um incidente que afete sua
                    saúde, seja de natureza clínica, cirúrgica, traumática ou
                    psiquiátrica.
                  </p>
                  <ul>
                    <li>
                      O serviço é <strong>gratuito</strong>, acessado pelo{" "}
                      <strong>
                        <a href="tel://192">número 192</a>
                      </strong>
                      , funciona{" "}
                      <strong>24 horas por dia e 07 dias por semana</strong>.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* BOX COLORIDO: Row é Full Width, conteúdo é limitado */}
          <div className="row box-colorido">
            <div className="container-limit">
              <div className="row-content">
                <div className="column col-md-12">
                  <div className="outstanding-header">
                    <h2 className="outstanding-title">
                      Quando chamar o SAMU 192?
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOX ESCURO: Row é Full Width (fundo bege), conteúdo é limitado */}
          <div className="row box-escuro">
            <div className="container-limit">
              <div className="column col-md-12">
                <div className="cover-richtext-tile">
                  <ul>
                    <li>
                      <strong>
                        O atendimento começa pelo chamado telefônico (gratuito)
                      </strong>
                      . Técnicos coletam as primeiras informações.
                    </li>
                    <li>
                      As chamadas vão para o <strong>Médico Regulador</strong>,
                      que orienta o socorro e aciona ambulâncias se necessário.
                    </li>
                    <li>
                      A prioridade é{" "}
                      <strong>
                        prestar o atendimento no menor tempo possível
                      </strong>
                      , enviando ambulâncias, motolâncias ou aeromédicos.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* LISTA BLOCOS: Row é Full Width (Foto Laranja), conteúdo é limitado */}
          <div className="row lista-blocos">
            <div className="container-limit">
              <div className="row-content">
                <div className="column">
                  <div className="outstanding-header">
                    <h2 className="outstanding-title">Quando chamar</h2>
                  </div>
                  <div className="cover-richtext-tile">
                    <ul>
                      <li>Problemas cardio-respiratórios;</li>
                      <li>Intoxicação exógena e envenenamento;</li>
                      <li>Queimaduras graves;</li>
                      <li>Trabalhos de parto com risco;</li>
                      <li>Tentativas de suicídio;</li>
                      <li>Crises hipertensivas e dores no peito súbitas;</li>
                      <li>Acidentes/traumas com vítimas;</li>
                      <li>Afogamentos;</li>
                      <li>Choque elétrico;</li>
                      <li>Suspeita de Infarto ou AVC;</li>
                      <li>Agressão por arma de fogo ou branca;</li>
                    </ul>
                  </div>
                </div>

                <div className="column">
                  <div className="outstanding-header">
                    <h2 className="outstanding-title">Quando não chamar</h2>
                  </div>
                  <div className="cover-richtext-tile">
                    <ul>
                      <li>Febre prolongada;</li>
                      <li>Dores crônicas;</li>
                      <li>Vômito e diarreia;</li>
                      <li>Transporte para consulta médica simples;</li>
                      <li>Dor de dente;</li>
                      <li>Trocas de sonda;</li>
                      <li>Corte com pouco sangramento;</li>
                      <li>Entorses;</li>
                      <li>Cólicas renais;</li>
                    </ul>
                    <p
                      style={{
                        background: "#FFEDDF",
                        borderLeft: "5px solid #C90000",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      <strong>Importante:</strong> Nestes casos, procure a
                      Unidade Básica de Saúde ou UPA mais próxima.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DICAS: Com container-limit */}
          <div className="row">
            <div className="container-limit">
              <div className="column col-md-12">
                <h2 className="outstanding-title-dicas">
                  Dicas para quem ligar para o SAMU 192
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="dicas__container">
              <div className="dicas__linha"></div>

              <div className="dicas__card">
                <div className="dicas__texto">
                  Em caso de acidente{" "}
                  <strong>verifique a quantidade de vítimas</strong>, o estado
                  de consciência delas e se alguma delas está presa ás
                  ferragens;
                </div>
              </div>

              <div className="dicas__card">
                <div className="dicas__texto">
                  <strong>Não dê água aos acidentados;</strong>
                </div>
              </div>

              <div className="dicas__card">
                <div className="dicas__texto">
                  Em caso de acidente com motos:{" "}
                  <strong>não toque nas vítimas</strong>, não retire o
                  capacete;
                </div>
              </div>

              <div className="dicas__card">
                <div className="dicas__texto">
                  <strong>Sinalize as vias</strong> com galhos de arvore e
                  triângulo de sinalização;
                </div>
              </div>

              <div className="dicas__card">
                <div className="dicas__texto">
                  <strong>
                    <a
                      href="tel://192"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      Ligue para o 192
                    </a>
                  </strong>{" "}
                  e siga as orientações do Médico Regulador.
                </div>
              </div>
            </div>
          </div>

          {/* FONTE/REFERÊNCIA */}
          <div className="row">
            <div className="container-limit">
              <div className="column col-md-12">
                <div className="fonte-referencia">
                  <p>
                    Conteúdo baseado na página oficial do{" "}
                    <a
                      href="https://www.gov.br/saude/pt-br/composicao/saes/samu-192"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      SAMU 192 - Ministério da Saúde
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="educacao" />
      </div>
    </PageContainer>
  );
}
