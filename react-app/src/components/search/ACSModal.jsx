import { X, MapPin, Users, Phone, Stethoscope, UserCircle2 } from 'lucide-react';

/**
 * ACSModal Component
 * Modal para exibir informações detalhadas do ACS
 * Preparado para integração com Cloudinary
 */

/**
 * Função helper para detectar gênero pelo nome
 * Retorna 'masculino' ou 'feminino' baseado em padrões comuns de nomes brasileiros
 */
function getGenderFromName(nome) {
  if (!nome) return 'feminino'; // Padrão: feminino se não conseguir determinar

  const nomeNormalizado = nome.trim().toLowerCase();
  
  // Extrair primeiro nome (para nomes compostos)
  const primeiroNome = nomeNormalizado.split(' ')[0];

  // Nomes masculinos conhecidos
  const nomesMasculinos = [
    'wasley', 'ênes', 'davi', 'matheus', 'maycon', 'josé', 'joão', 'pedro',
    'carlos', 'paulo', 'marcos', 'lucas', 'gabriel', 'rafael', 'felipe',
    'bruno', 'rodrigo', 'ricardo', 'andré', 'thiago', 'guilherme', 'daniel',
    'júnior', 'junior', 'jose', 'jose', 'antonio', 'antônio'
  ];

  // Nomes femininos conhecidos
  const nomesFemininos = [
    'erika', 'renata', 'isabel', 'amanda', 'izabelle', 'aline', 'helena',
    'maria', 'ana', 'juliana', 'patricia', 'fernanda', 'carla', 'sandra',
    'adriana', 'vanessa', 'tatiane', 'cristiane', 'silvana', 'fabíola',
    'naiara', 'denivia', 'taciane', 'isabela', 'thaciene'
  ];

  // Verificar se o primeiro nome está na lista de masculinos
  if (nomesMasculinos.includes(primeiroNome) || nomesMasculinos.some(nomeM => primeiroNome.includes(nomeM))) {
    return 'masculino';
  }

  // Verificar se o primeiro nome está na lista de femininos
  if (nomesFemininos.includes(primeiroNome) || nomesFemininos.some(nomeF => primeiroNome.includes(nomeF))) {
    return 'feminino';
  }

  // Padrão: nomes terminados em 'a' são geralmente femininos (com exceções)
  const ultimaLetra = primeiroNome.slice(-1);
  if (ultimaLetra === 'a' && !primeiroNome.endsWith('joão') && !primeiroNome.endsWith('marcos')) {
    return 'feminino';
  }

  // Padrão padrão: feminino (mais comum em ACS)
  return 'feminino';
}

export default function ACSModal({ acs, onClose }) {
  if (!acs) return null;

  // Foto placeholder - pronto para Cloudinary
  const photoUrl = acs.photo || 'https://via.placeholder.com/500x500/2196F3/ffffff?text=ACS';

  // Detectar gênero do ACS
  const nomeACS = acs.nome || acs.acs;
  const isAreaDescoberta = nomeACS.includes('Área Descoberta');
  const isSaoJudas = acs.esf === 'ESF SÃO JUDAS';
  const genero = getGenderFromName(nomeACS);
  const tituloAgente = genero === 'masculino' 
    ? 'Agente Comunitário de Saúde (ACS)' 
    : 'Agente Comunitária de Saúde (ACS)';

  // Formatar número da microárea (garantir zero à esquerda se necessário)
  const microareaFormatada = acs.microarea 
    ? String(acs.microarea).padStart(2, '0')
    : acs.microarea;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header com botão fechar */}
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

          {/* Conteúdo do Modal */}
          <div className="p-6">
            {/* Foto Quadrada Grande - CENTRALIZADA NO TOPO (ocultar para áreas descobertas e São Judas) */}
            {!isAreaDescoberta && !isSaoJudas && (
              <div className="w-full max-w-md mx-auto mb-6">
                <div className="aspect-square w-full rounded-xl overflow-hidden border-4 border-primary-100 shadow-lg">
                  <img
                    src={photoUrl}
                    alt={`Foto de ${acs.nome || acs.acs}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback para ícone se a imagem falhar
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                          <svg class="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
            )}

            {/* Nome e Informações - CENTRALIZADO */}
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-neutral-900 mb-3">
                {acs.nome || acs.acs}
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

            {/* Apresentação Formatada */}
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
                      <p className="mb-2">
                        Olá!
                      </p>
                      <p>
                        Meu nome é <strong>{nomeACS}</strong>, sou {tituloAgente} da{' '}
                        <strong>{acs.esf}</strong>, responsável pela Microárea <strong>{microareaFormatada}</strong>.
                      </p>
                      <p className="mt-2">
                        Estou à disposição para orientar e apoiar você e sua família sempre que necessário.
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
                      <strong>Endereço:</strong> R. Castro Alves, 2085 - São José
                    </p>
                    <p className="font-semibold text-neutral-900">
                      <strong>Telefone:</strong> 3229-6086
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
                    Esta microárea ainda não possui um Agente Comunitário de Saúde (ACS) designado. 
                    Em breve atualizaremos com a foto e apresentação do responsável ACS da microárea selecionada.
                  </p>
                </div>
              </div>
            )}

            {/* Equipe de Saúde */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <Stethoscope size={20} className="text-primary-600" />
                Equipe de Saúde da Família
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-neutral-600 mb-1">Médico(a)</p>
                  <p className="font-bold text-neutral-900">{acs.medico}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-neutral-600 mb-1">Enfermeira</p>
                  <p className="font-bold text-neutral-900">{acs.enfermeira}</p>
                </div>
                {!isSaoJudas && (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-neutral-600 mb-1">Dentista</p>
                    <p className="font-bold text-neutral-900">{acs.dentista}</p>
                  </div>
                )}
                {acs.asb && !isSaoJudas && (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-neutral-600 mb-1">ASB</p>
                    <p className="font-bold text-neutral-900">{acs.asb}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Área de Cobertura */}
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

            {/* Botão de Ação */}
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
