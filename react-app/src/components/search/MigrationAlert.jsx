import { AlertTriangle, MapPin, Phone, FileText, X } from "lucide-react";
export default function MigrationAlert({ migrationInfo, onClose }) {
  return (
    <>
      {}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />
      {}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-strong max-w-2xl w-full animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {}
          <div className="bg-accent-500 px-6 py-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle size={32} className="text-white" />
              <h2 className="text-2xl font-bold text-white">
                Área Transferida
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Fechar"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
          {}
          <div className="p-8">
            {}
            <div className="bg-accent-50 border-2 border-accent-400 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-accent-900 mb-3">
                Atenção! Esta área não pertence mais à ESF Catalão
              </h3>
              <p className="text-accent-800 text-lg mb-2">
                A área de São Judas foi transferida para:
              </p>
              <p className="text-2xl font-bold text-accent-900">
                {migrationInfo.esf}
              </p>
            </div>
            {}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-neutral-50 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <Phone
                    className="text-primary-600 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Telefone</p>
                    <p className="text-lg font-bold text-neutral-900">
                      {migrationInfo.telefone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-neutral-50 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="text-primary-600 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Endereço</p>
                    <p className="text-sm font-semibold text-neutral-900 leading-relaxed">
                      {migrationInfo.endereco}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {}
            <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <FileText
                  className="text-primary-600 flex-shrink-0"
                  size={28}
                />
                <div>
                  <h4 className="text-lg font-bold text-primary-900 mb-3">
                    Como Atualizar Seu Cadastro
                  </h4>
                  <p className="text-primary-800 mb-4">
                    Para atualizar seu cadastro e receber atendimento pela nova
                    ESF, compareça ao endereço acima com os seguintes
                    documentos:
                  </p>
                  <ul className="space-y-2 text-primary-900">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 font-bold mt-1">•</span>
                      <span>
                        <strong>Documento de identidade com foto</strong>
                        <span className="text-sm text-primary-700">
                          {" "}
                          (RG ou CNH )
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 font-bold mt-1">•</span>
                      <span>
                        <strong>Comprovante de endereço atualizado</strong>
                        <span className="text-sm text-primary-700">
                          {" "}
                          (emitido há no máximo 30 dias)
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {}
            {migrationInfo.observacao && (
              <div className="mt-6 p-4 bg-neutral-100 rounded-lg">
                <p className="text-sm text-neutral-700">
                  <strong>Observação:</strong> {migrationInfo.observacao}
                </p>
              </div>
            )}
            {}
            <div className="mt-8 flex justify-center">
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
