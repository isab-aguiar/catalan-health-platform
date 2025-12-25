import strip from 'strip-comments';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

// Configuração: Onde procurar arquivos
const padraoArquivos = 'src/**/*.{js,jsx,ts,tsx,css}'; 

async function limpar() {
    console.log('🧹 Iniciando limpeza TOTAL de comentários (Modo ESM)...');

    try {
        // Busca arquivos usando a versão moderna do glob (com await)
        const arquivos = await glob(padraoArquivos);

        if (arquivos.length === 0) {
            console.log('⚠️ Nenhum arquivo encontrado na pasta src.');
            return;
        }

        let contagem = 0;

        for (const arquivo of arquivos) {
            const caminhoCompleto = path.resolve(arquivo);
            
            try {
                const conteudoOriginal = fs.readFileSync(caminhoCompleto, 'utf8');
                
                // Remove comentários mantendo a estrutura segura
                const conteudoLimpo = strip(conteudoOriginal, {
                    line: true,
                    block: true,
                    keepProtected: false 
                });

                // Só grava se houve mudança
                if (conteudoOriginal !== conteudoLimpo) {
                    fs.writeFileSync(caminhoCompleto, conteudoLimpo);
                    console.log(`✅ Limpo: ${arquivo}`);
                    contagem++;
                }
            } catch (erroLeitura) {
                console.error(`Erro ao ler ${arquivo}:`, erroLeitura.message);
            }
        }

        console.log(`\n🎉 Concluído! ${contagem} arquivos foram limpos.`);
        
    } catch (err) {
        console.error('Erro fatal ao buscar arquivos:', err);
    }
}

limpar();