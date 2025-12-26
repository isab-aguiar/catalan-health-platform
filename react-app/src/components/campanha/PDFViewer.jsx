import { useState } from "react";
import { FileText, Download, AlertCircle, Maximize2 } from "lucide-react";
export default function PDFViewer({
  pdfURL,
  pdfNome = "documento.pdf",
  className = "",
  height = 600,
  showControls = true,
}) {
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Handle iframe load error
  const handleError = () => {
    setLoadError(true);
    setIsLoading(false);
  };
  // Handle successful load
  const handleLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };
  // Download PDF
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfURL;
    link.download = pdfNome;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleFullscreen = () => {
    window.open(pdfURL, "_blank");
  };
  if (!pdfURL) return null;
  return (
    <div className={`relative ${className}`}>
      {}
      {showControls && (
        <div className="flex items-center justify-between bg-neutral-100 border border-neutral-300 rounded-t-lg px-4 py-2">
          <div className="flex items-center gap-2 text-neutral-700">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium truncate max-w-xs">
              {pdfNome}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-info-700 transition-colors text-sm"
              title="Baixar PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Baixar</span>
            </button>
            <button
              onClick={handleFullscreen}
              className="flex items-center gap-1 px-3 py-1 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors text-sm"
              title="Abrir em tela cheia"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Tela Cheia</span>
            </button>
          </div>
        </div>
      )}
      {}
      {isLoading && !loadError && (
        <div
          className="flex items-center justify-center bg-neutral-50 border border-neutral-300"
          style={{ height: `${height}px` }}
        >
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-info border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-neutral-600 text-sm">Carregando PDF...</p>
          </div>
        </div>
      )}
      {}
      {!loadError && (
        <iframe
          src={`${pdfURL}#toolbar=1&navpanes=0&scrollbar=1`}
          className={`w-full border border-neutral-300 ${showControls ? "rounded-b-lg" : "rounded-lg"} ${isLoading ? "hidden" : "block"}`}
          style={{ height: `${height}px` }}
          title={pdfNome}
          onLoad={handleLoad}
          onError={handleError}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      )}
      {}
      {loadError && (
        <div
          className="flex flex-col items-center justify-center bg-error/10 border border-red-200 rounded-lg p-8"
          style={{ height: `${height}px` }}
        >
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-error mb-2">
            Não foi possível exibir o PDF
          </h3>
          <p className="text-sm text-red-700 text-center mb-4 max-w-md">
            Seu navegador pode não suportar visualização de PDFs. Clique abaixo
            para baixar o documento.
          </p>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Baixar {pdfNome}
          </button>
        </div>
      )}
    </div>
  );
}
