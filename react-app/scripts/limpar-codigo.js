import strip from 'strip-comments';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';


const padraoArquivos = '**/*.{js,jsx,ts,tsx,css}'; 

async function limpar() {
    console.log('🧹 Iniciando varredura COMPLETA (src, scripts, raiz)...');

    try {
        
        const arquivos = await glob(padraoArquivos, {
            ignore: [
                '**/node_modules/**', 
                '**/dist/**',        
                '**/build/**',        
                '**/.git/**',         
                '**/limpar-codigo.js' 
            ]
        });

        if (arquivos.length === 0) {
            console.log('⚠️ Nenhum arquivo encontrado.');
            return;
        }

        let contagem = 0;

        for (const arquivo of arquivos) {
            const caminhoCompleto = path.resolve(arquivo);
            
            try {
                const conteudoOriginal = fs.readFileSync(caminhoCompleto, 'utf8');
                
                
                const conteudoLimpo = strip(conteudoOriginal, {
                    line: true,     
                    block: true,  
                    keepProtected: false, 
                    preserveNewlines: false 
                });

                
                const conteudoFinal = conteudoLimpo.replace(/^\s*[\r\n]/gm, '');

                if (conteudoOriginal !== conteudoFinal) {
                    fs.writeFileSync(caminhoCompleto, conteudoFinal);
                    console.log(`✅ Limpo: ${arquivo}`);
                    contagem++;
                }
            } catch (erroLeitura) {
                
            }
        }

        console.log(`\n🎉 FIM! ${contagem} arquivos foram completamente limpos.`);
        
    } catch (err) {
        console.error('Erro:', err);
    }
}

limpar();