import PageContainer from "../components/layout/PageContainer";
import InfoBox from "../components/common/InfoBox";
import Alert from "../components/common/Alert";
import BackButton from "../components/common/BackButton";
import {
  GraduationCap,
  Hospital,
  Users,
  DollarSign,
  BookOpen,
  Mail,
  Phone,
  Clock,
  FileText,
  CheckCircle,
} from "lucide-react";

export default function REMSA() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {/* Cabeçalho */}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Residência Multiprofissional em Saúde (REMSA)
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                UBS São José - Atenção Primária à Saúde
              </p>
            </div>
          </div>
        </div>

        {/* O que é a REMSA */}
        <InfoBox title="O que é a REMSA?">
          <p className="text-slate-700 leading-relaxed mb-5">
            A <strong>Residência Multiprofissional em Saúde (REMSA)</strong> é
            um programa de pós-graduação lato sensu que oferece especialização
            em serviço, com foco na Atenção Primária à Saúde e na Estratégia
            Saúde da Família. É uma parceria entre a{" "}
            <strong>Universidade Federal de São João del-Rei (UFSJ)</strong> e a{" "}
            <strong>Prefeitura Municipal de Divinópolis</strong>.
          </p>
          <p className="text-slate-700 leading-relaxed">
            O programa promove a formação de profissionais qualificados para
            atuar de forma integrada e humanizada no Sistema Único de Saúde
            (SUS), contribuindo para a melhoria da qualidade dos serviços
            oferecidos à população.
          </p>
        </InfoBox>

        {/* O que o REMSA oferece */}
        <InfoBox title="O que o REMSA oferece?">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Bolsa Integral
                </strong>
                <p className="text-slate-700 text-sm mt-1">
                  Residentes recebem <strong>bolsa integral</strong> durante
                  todo o período de formação (24 meses)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Certificação Reconhecida pelo MEC
                </strong>
                <p className="text-slate-700 text-sm mt-1">
                  Título de especialista em Atenção Primária à Saúde e
                  Estratégia Saúde da Família, reconhecido pelo Ministério da
                  Educação
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Formação Teórica e Prática
                </strong>
                <p className="text-slate-700 text-sm mt-1">
                  Integração entre teoria e prática, com aulas, seminários e
                  atuação direta no atendimento à comunidade
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Vivência Real no SUS
                </strong>
                <p className="text-slate-700 text-sm mt-1">
                  Atuação em Unidades de Atenção Primária, como a UBS São José,
                  com experiência prática no Sistema Único de Saúde
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Formação Multiprofissional
                </strong>
                <p className="text-slate-700 text-sm mt-1">
                  Trabalho em equipe multiprofissional e interdisciplinar,
                  promovendo a integração entre diferentes áreas da saúde
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Preceptoria Qualificada
                </strong>
                <p className="text-slate-700 text-sm mt-1">
                  Acompanhamento por preceptores experientes e qualificados
                  durante todo o período de formação
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Áreas Profissionais */}
        <InfoBox title="Áreas Profissionais Aceitas">
          <p className="text-slate-700 mb-5">
            O programa é multiprofissional e aceita residentes de diversas áreas
            da saúde:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Enfermagem</strong>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Odontologia</strong>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Fisioterapia</strong>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Nutrição</strong>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Farmácia</strong>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Psicologia</strong>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Educação Física
                </strong>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Fonoaudiologia
                </strong>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Como ter acesso */}
        <InfoBox title="Como ter acesso ao programa?">
          <p className="text-slate-700 leading-relaxed mb-5">
            O ingresso na REMSA ocorre através de{" "}
            <strong>processo seletivo</strong> realizado anualmente. O processo
            é coordenado pela UFSJ em parceria com a Prefeitura Municipal de
            Divinópolis.
          </p>

          <h3 className="font-semibold text-slate-800 mb-3 text-sm">
            Requisitos para Inscrição:
          </h3>
          <div className="space-y-3 mb-5">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-slate-700 text-sm">
                  Possuir diploma de graduação em uma das áreas profissionais
                  aceitas pelo programa
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-slate-700 text-sm">
                  Estar registrado no conselho profissional da respectiva área
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-slate-700 text-sm">
                  Disponibilidade para dedicação exclusiva ao programa (60 horas
                  semanais)
                </p>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-slate-800 mb-3 text-sm">
            Processo Seletivo:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-slate-700 text-sm">
                  <strong>Inscrição:</strong> Período de inscrições divulgado
                  anualmente através de edital publicado pela UFSJ
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-slate-700 text-sm">
                  <strong>Prova:</strong> Avaliação de conhecimentos específicos
                  da área profissional
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-slate-700 text-sm">
                  <strong>Entrevista:</strong> Avaliação de perfil e motivação
                  para atuação na Atenção Primária à Saúde
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-slate-700 text-sm">
                  <strong>Classificação:</strong> Divulgação dos resultados e
                  convocação dos aprovados
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Características do Programa */}
        <InfoBox title="Características do Programa">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Duração</strong>
                <p className="text-slate-700 text-sm mt-1">
                  <strong>2 anos</strong> (24 meses) de formação em serviço, com
                  carga horária semanal de 60 horas dedicadas exclusivamente ao
                  programa
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Modalidade</strong>
                <p className="text-slate-700 text-sm mt-1">
                  Pós-graduação <strong>lato sensu</strong> com título de
                  especialista reconhecido pelo Ministério da Educação (MEC)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Carga Horária
                </strong>
                <p className="text-slate-700 text-sm mt-1">
                  60 horas semanais de dedicação exclusiva ao programa
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Abordagem</strong>
                <p className="text-slate-700 text-sm mt-1">
                  <strong>Multiprofissional e interdisciplinar</strong>,
                  promovendo o trabalho em equipe entre diferentes áreas da
                  saúde
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* UBS São José como Campo de Prática */}
        <InfoBox title="UBS São José como Campo de Prática" variant="highlight">
          <p className="text-slate-700 leading-relaxed mb-5">
            A <strong>UBS São José</strong> é um dos principais campos de
            atuação da REMSA em Divinópolis. Nossa unidade recebe residentes de
            diferentes áreas que, juntamente com a equipe local, desenvolvem
            atividades como:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Assistência Integral
                </strong>
                <p className="text-slate-700 text-sm mt-1">
                  Atendimento multiprofissional, considerando aspectos físicos,
                  emocionais e sociais
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Grupos e Atividades Coletivas
                </strong>
                <p className="text-slate-700 text-sm mt-1">
                  Organização de grupos e atividades coletivas, de promoção da saúde na
                  comunidade
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Visitas Domiciliares
                </strong>
                <p className="text-slate-700 text-sm mt-1">
                  Realização de atendimentos no domicílio para pessoas com
                  dificuldade de locomoção
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Educação em Saúde
                </strong>
                <p className="text-slate-700 text-sm mt-1">
                  Promoção de ações educativas sobre prevenção de doenças e
                  qualidade de vida
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Parceria */}
        <InfoBox title="Parceria UFSJ e Prefeitura">
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-slate-800 mb-3 text-sm">
                UFSJ - Universidade Federal de São João del-Rei
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                A <strong>Universidade Federal de São João del-Rei</strong> é
                responsável pela coordenação acadêmica, supervisão pedagógica,
                aulas teóricas e emissão dos certificados de especialização.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-3 text-sm">
                Prefeitura Municipal de Divinópolis
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                A <strong>Prefeitura Municipal</strong> oferece os campos de
                prática (unidades de saúde), preceptoria local, infraestrutura e
                pagamento das bolsas aos residentes.
              </p>
            </div>
          </div>
        </InfoBox>

        {/* Informações e Contato */}
        <div className="mb-6">
          <Alert type="info">
            <strong>Quer saber mais sobre a REMSA?</strong>
            <br />
            Entre em contato com a coordenação do programa na UFSJ ou fale com a
            equipe da UBS São José para obter informações sobre editais,
            processo seletivo e requisitos.
          </Alert>
        </div>
      </div>
    </PageContainer>
  );
}
