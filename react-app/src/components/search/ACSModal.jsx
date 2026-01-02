import { useState } from 'react';
import { MapPin, Phone, Stethoscope, UserCircle2, Users, X } from 'lucide-react';
import { contactInfo } from '../../config';

// Mapeamento de nomes curtos para nomes completos - ACS
const nomesCompletosACS = {
  'wasley': 'Wasley Hudson Borges',
  'ênes júnior': 'Ênes Lino de Souza Júnior',
  'ênes': 'Ênes Lino de Souza Júnior',
  'enes júnior': 'Ênes Lino de Souza Júnior',
  'enes junior': 'Ênes Lino de Souza Júnior',
  'erika': 'Erika Roscoe',
  'renata': 'Renata Rodrigues Coimbra',
  'daniel': 'Daniel Henrique Ferreira Silva',
  'davi': 'Davi de Castro Faria',
  'matheus': 'Matheus José Ferreira Alves',
  'denivia': 'Denívia Miranda Santos',
  'rosana': 'Rosana da Silva Marçal',
  'marinete': 'Marinete Maria Silva',
  'thaciane': 'Thaciane Fonseca',
  'izabelle': 'Izabelle Cristina',
  'amanda': 'Amanda Cristina',
  'juliana': 'Juliana Aparecida',
};

// Mapeamento de nomes curtos para nomes completos - Médicos
const nomesCompletosMedicos = {
  'dr. frederico': 'Dr. Frederico Fonseca Campos',
  'dr. gustavo': 'Dr. Gustavo Henrique Silva',
  'dr. joão': 'Dr. João Paulo Ferreira',
  'dr. lúcio': 'Dr. Lúcio Flávio de Oliveira',
  'dr. lucio': 'Dr. Lúcio Flávio de Oliveira',
};

// Mapeamento de nomes curtos para nomes completos - Enfermeiras
const nomesCompletosEnfermeiras = {
  'enf. aline macedo': 'Enf. Aline Macedo Rodrigues',
  'enf. naiara': 'Enf. Naiara Cristina Santos',
  'enf. fabíola': 'Enf. Fabíola Cristina da Silva Oliveira',
  'enf. fabiola': 'Enf. Fabíola Cristina da Silva Oliveira',
  'enf. jéssica barros': 'Enf. Jéssica Barros de Souza',
  'enf. jessica barros': 'Enf. Jéssica Barros de Souza',
};

// Mapeamento de nomes curtos para nomes completos - Dentistas
const nomesCompletosDentistas = {
  'dra. helena': 'Dra. Helena Dias de Campos',
  'dra. mayra': 'Dra. Mayra Paula Morais Gama',
};

// Mapeamento de nomes curtos para nomes completos - ASB
const nomesCompletosASB = {
  'maycon': 'Maycon Alves Teixeira',
  'cibele': 'Cibele Ribeiro Coimbra Dias',
};

function getNomeCompleto(nome) {
  if (!nome) return nome;
  const nomeNormalizado = nome.trim().toLowerCase();
  return nomesCompletosACS[nomeNormalizado] || nome;
}

function getNomeCompletoMedico(nome) {
  if (!nome) return nome;
  const nomeNormalizado = nome.trim().toLowerCase();
  return nomesCompletosMedicos[nomeNormalizado] || nome;
}

function getNomeCompletoEnfermeira(nome) {
  if (!nome) return nome;
  const nomeNormalizado = nome.trim().toLowerCase();
  return nomesCompletosEnfermeiras[nomeNormalizado] || nome;
}

function getNomeCompletoDentista(nome) {
  if (!nome) return nome;
  const nomeNormalizado = nome.trim().toLowerCase();
  return nomesCompletosDentistas[nomeNormalizado] || nome;
}

function getNomeCompletoASB(nome) {
  if (!nome) return nome;
  const nomeNormalizado = nome.trim().toLowerCase();
  return nomesCompletosASB[nomeNormalizado] || nome;
}

function getGenderFromName(nome) {
  if (!nome) return 'feminino';
  const nomeNormalizado = nome.trim().toLowerCase();
  const primeiroNome = nomeNormalizado.split(' ')[0];
  const nomesMasculinos = [
    'wasley',
    'ênes',
    'davi',
    'matheus',
    'maycon',
    'josé',
    'joão',
    'pedro',
    'carlos',
    'paulo',
    'marcos',
    'lucas',
    'gabriel',
    'rafael',
    'felipe',
    'bruno',
    'rodrigo',
    'ricardo',
    'andré',
    'thiago',
    'guilherme',
    'daniel',
    'júnior',
    'junior',
    'jose',
    'antonio',
    'antônio',
  ];
  const nomesFemininos = [
    'erika',
    'renata',
    'isabel',
    'amanda',
    'izabelle',
    'aline',
    'helena',
    'maria',
    'ana',
    'juliana',
    'patricia',
    'fernanda',
    'carla',
    'sandra',
    'adriana',
    'vanessa',
    'tatiane',
    'cristiane',
    'silvana',
    'fabíola',
    'naiara',
    'denivia',
    'thaciane',
    'isabela',
  ];
  if (
    nomesMasculinos.includes(primeiroNome) ||
    nomesMasculinos.some((nomeM) => primeiroNome.includes(nomeM))
  ) {
    return 'masculino';
  }
  if (
    nomesFemininos.includes(primeiroNome) ||
    nomesFemininos.some((nomeF) => primeiroNome.includes(nomeF))
  ) {
    return 'feminino';
  }
  const ultimaLetra = primeiroNome.slice(-1);
  if (
    ultimaLetra === 'a' &&
    !primeiroNome.endsWith('joão') &&
    !primeiroNome.endsWith('marcos')
  ) {
    return 'feminino';
  }
  return 'feminino';
}
export default function ACSModal({ acs, onClose }) {
  const [imageError, setImageError] = useState(false);

  if (!acs) return null;

  const photoUrl = acs.photo || 'https://via.placeholder.com/500x500/2196F3/ffffff?text=ACS';
  const nomeOriginal = acs.nome || acs.acs;
  const nomeACS = getNomeCompleto(nomeOriginal);
  const isAreaDescoberta = nomeOriginal.includes('Área Descoberta');
  const isSaoJudas = acs.esf === 'ESF SÃO JUDAS';
  const genero = getGenderFromName(nomeOriginal);
  const tituloAgente =
    genero === 'masculino'
      ? 'Agente Comunitário de Saúde (ACS)'
      : 'Agente Comunitária de Saúde (ACS)';
  const microareaFormatada = acs.microarea
    ? String(acs.microarea).padStart(2, '0')
    : acs.microarea;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-2xl font-bold text-neutral-900">
              Agente Comunitário de Saúde
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Fechar modal"
            >
              <X size={24} className="text-neutral-600" />
            </button>
          </div>

          <div className="p-6">
            {!isAreaDescoberta && !isSaoJudas && (
              <div className="w-full max-w-md mx-auto mb-6">
                <div className="aspect-square w-full rounded-xl overflow-hidden border-4 border-primary-100 shadow-lg">
                  {!imageError ? (
                    <img
                      src={photoUrl}
                      alt={`Foto de ${nomeACS}`}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                      <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-neutral-900 mb-3">
                {nomeACS}
              </h3>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full font-semibold mb-4">
                <Users size={18} />
                {acs.esf}
              </div>
              <p className="text-neutral-600 mb-2">
                <strong>Microárea:</strong> {microareaFormatada}
              </p>
              {acs.phone && (
                <div className="flex items-center gap-2 text-neutral-600 justify-center">
                  <Phone size={16} />
                  <span>{acs.phone}</span>
                </div>
              )}
            </div>

            {!isAreaDescoberta && !isSaoJudas ? (
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 mb-6">
                <h4 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <UserCircle2 size={20} className="text-primary-600" />
                  Apresentação
                </h4>
                <div className="text-neutral-800 leading-relaxed text-lg">
                  {acs.bio ? (
                    <p>{acs.bio}</p>
                  ) : (
                    <>
                      <p className="mb-2">Olá!</p>
                      <p>
                        Meu nome é <strong>{nomeACS}</strong>, sou{' '}
                        {tituloAgente} da <strong>{acs.esf}</strong>,
                        responsável pela Microárea{' '}
                        <strong>{microareaFormatada}</strong>.
                      </p>
                      <p className="mt-2">
                        Estou à disposição para orientar e apoiar você e sua
                        família sempre que necessário.
                      </p>
                    </>
                  )}
                </div>
              </div>
            ) : isSaoJudas ? (
              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6 mb-6 border-l-4 border-secondary-500">
                <h4 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <UserCircle2 size={20} className="text-secondary-600" />
                  Informação Importante
                </h4>
                <div className="text-neutral-800 leading-relaxed text-lg">
                  <p className="mb-2">
                    <strong>Esta microárea pertence à UBS Morada Nova</strong>
                  </p>
                  <p className="mb-3">
                    Para atendimento, procure a UBS responsável:
                  </p>
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <p className="font-semibold text-neutral-900">
                      <strong>Endereço:</strong> {contactInfo.address.referenceUnits.esfMoradaNova.street} - {contactInfo.address.referenceUnits.esfMoradaNova.neighborhood}
                    </p>
                    <p className="font-semibold text-neutral-900">
                      <strong>Telefone:</strong> {contactInfo.phones.referenceUnits.esfMoradaNova.display.replace('(37) ', '')}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6 mb-6 border-l-4 border-accent-500">
                <h4 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <UserCircle2 size={20} className="text-accent-600" />
                  Informação
                </h4>
                <div className="text-neutral-800 leading-relaxed text-lg">
                  <p className="mb-2">
                    <strong>Área sem ACS no momento</strong>
                  </p>
                  <p>
                    Esta microárea ainda não possui um Agente Comunitário de
                    Saúde (ACS) designado. Em breve atualizaremos com a foto e
                    apresentação do responsável ACS da microárea selecionada.
                  </p>
                </div>
              </div>
            )}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <Stethoscope size={20} className="text-primary-600" />
                Equipe de Saúde da Família
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-neutral-600 mb-1">Médico(a)</p>
                  <p className="font-bold text-neutral-900">{getNomeCompletoMedico(acs.medico)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-neutral-600 mb-1">Enfermeira</p>
                  <p className="font-bold text-neutral-900">{getNomeCompletoEnfermeira(acs.enfermeira)}</p>
                </div>
                {!isSaoJudas && (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-neutral-600 mb-1">Dentista</p>
                    <p className="font-bold text-neutral-900">{getNomeCompletoDentista(acs.dentista)}</p>
                  </div>
                )}
                {acs.asb && !isSaoJudas && (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-neutral-600 mb-1">ASB</p>
                    <p className="font-bold text-neutral-900">{getNomeCompletoASB(acs.asb)}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-2 border-primary-200 rounded-xl p-6">
              <h4 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-primary-600" />
                Área de Cobertura - Rua Encontrada
              </h4>
              {isAreaDescoberta ? (
                <div className="bg-neutral-50 rounded-lg p-4">
                  <p className="text-neutral-700 text-base">
                    Em breve atualizaremos com os dados do ACS responsável.
                  </p>
                </div>
              ) : isSaoJudas ? (
                <div className="bg-primary-50 rounded-lg p-4">
                  <p className="font-bold text-primary-900 text-lg">
                    UBS Morada Nova / São Judas
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-primary-50 rounded-lg p-4">
                    <p className="font-bold text-primary-900 text-lg mb-1">
                      {acs.street}
                    </p>
                    <p className="text-sm text-primary-700">
                      Números: {acs.numberRange}
                    </p>
                  </div>
                  {acs.observacao && (
                    <div className="mt-4 p-3 bg-accent-50 border-l-4 border-accent-400 rounded">
                      <p className="text-sm text-accent-900">
                        <strong>Observação:</strong> {acs.observacao}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
