import { useState } from 'react';
import { Upload, CheckCircle, XCircle, AlertCircle, Database } from 'lucide-react';
import { importAllEmployees, checkExistingEmployees } from '../../scripts/importEmployeesToFirestore';

/**
 * Componente temporário para importar funcionários para o Firestore
 * Use este componente uma vez para fazer a migração inicial
 */
export default function ImportEmployees() {
  const [importing, setImporting] = useState(false);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [existingCount, setExistingCount] = useState(null);

  const handleCheckExisting = async () => {
    setChecking(true);
    setResult(null);

    try {
      const checkResult = await checkExistingEmployees();
      if (checkResult.success) {
        setExistingCount(checkResult.data.length);
      } else {
        setResult({
          success: false,
          message: `Erro ao verificar: ${checkResult.error}`
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Erro: ${error.message}`
      });
    } finally {
      setChecking(false);
    }
  };

  const handleImport = async () => {
    if (!window.confirm('Deseja importar todos os 48 funcionários para o Firestore? Esta ação irá sobrescrever dados existentes com o mesmo ID.')) {
      return;
    }

    setImporting(true);
    setResult(null);

    try {
      const importResult = await importAllEmployees();

      if (importResult.success) {
        setResult({
          success: true,
          message: importResult.message,
          stats: importResult.results
        });

        // Atualiza contagem de funcionários existentes
        await handleCheckExisting();
      } else {
        setResult({
          success: false,
          message: `Erro na importação: ${importResult.error}`
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Erro crítico: ${error.message}`
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Importar Funcionários para Firestore</h2>
            <p className="text-sm text-gray-600">Migração de dados do employees.js para o Firebase</p>
          </div>
        </div>

        {/* Informações */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Informações Importantes</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Este componente importa todos os 48 funcionários do arquivo employees.js</li>
                <li>• Os dados serão salvos na collection "employees" do Firestore</li>
                <li>• Funcionários com o mesmo ID serão atualizados (não duplicados)</li>
                <li>• Este é um processo seguro e pode ser executado múltiplas vezes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleCheckExisting}
            disabled={checking}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <Database className="w-5 h-5" />
            {checking ? 'Verificando...' : 'Verificar Existentes'}
          </button>

          <button
            onClick={handleImport}
            disabled={importing}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            <Upload className="w-5 h-5" />
            {importing ? 'Importando...' : 'Importar Todos (48 funcionários)'}
          </button>
        </div>

        {/* Contagem de existentes */}
        {existingCount !== null && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Funcionários já no Firestore:</strong> {existingCount}
            </p>
          </div>
        )}

        {/* Resultado */}
        {result && (
          <div className={`border-l-4 p-4 rounded-lg ${
            result.success
              ? 'bg-green-50 border-green-600'
              : 'bg-red-50 border-red-600'
          }`}>
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h3 className={`font-semibold mb-2 ${
                  result.success ? 'text-green-900' : 'text-red-900'
                }`}>
                  {result.success ? 'Importação Concluída!' : 'Erro na Importação'}
                </h3>
                <p className={`text-sm ${
                  result.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.message}
                </p>

                {/* Estatísticas */}
                {result.stats && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-white rounded p-3 border border-green-200">
                      <p className="text-xs text-gray-600">Sucesso</p>
                      <p className="text-2xl font-bold text-green-600">{result.stats.success}</p>
                    </div>
                    <div className="bg-white rounded p-3 border border-red-200">
                      <p className="text-xs text-gray-600">Falhas</p>
                      <p className="text-2xl font-bold text-red-600">{result.stats.failed}</p>
                    </div>
                  </div>
                )}

                {/* Erros */}
                {result.stats?.errors?.length > 0 && (
                  <div className="mt-4 bg-white rounded-lg p-3 border border-red-200">
                    <p className="text-sm font-semibold text-red-900 mb-2">Erros encontrados:</p>
                    <ul className="text-xs text-red-800 space-y-1">
                      {result.stats.errors.slice(0, 5).map((err, idx) => (
                        <li key={idx}>• {err.id}: {err.error}</li>
                      ))}
                      {result.stats.errors.length > 5 && (
                        <li className="text-red-600 italic">
                          ... e mais {result.stats.errors.length - 5} erros
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instruções pós-importação */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-900 mb-2">Após a importação:</h4>
          <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
            <li>Verifique os dados no Firestore Console do Firebase</li>
            <li>Teste a busca de funcionários nas páginas do site</li>
            <li>Considere remover este componente do código após a migração</li>
            <li>Configure regras de segurança para a collection "employees"</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
