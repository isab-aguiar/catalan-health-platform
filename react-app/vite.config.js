import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separar node_modules em chunks específicos para melhor cache e carregamento
          if (id.includes('node_modules')) {
            // Firebase é grande (~200-300KB) - separar em chunk próprio
            // Firebase v9+ já faz tree-shaking, mas ainda é grande quando todos os serviços são usados
            if (id.includes('firebase')) {
              return 'firebase-vendor';
            }
            
            // React e React Router juntos (são pequenos e frequentemente usados juntos)
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            
            // Lucide-react pode ser grande se muitos ícones forem usados (~100KB+)
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            
            // html2pdf.js é uma biblioteca grande (~200KB) e usada apenas em alguns lugares
            // Ideal para code splitting adicional se necessário
            if (id.includes('html2pdf')) {
              return 'pdf-vendor';
            }
            
            // Outras dependências pequenas juntas (fuse.js, etc)
            return 'vendor';
          }
        },
      },
    },
    sourcemap: false,
    minify: 'esbuild', // Usar esbuild que já vem com Vite
    chunkSizeWarningLimit: 600, // Aumentar o limite para 600KB (padrão é 500KB)
  },
})
