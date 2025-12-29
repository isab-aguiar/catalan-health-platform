import { useEffect, useState } from "react";

export default function VLibrasButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Aguardar um tempo para que o VLibras seja carregado
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    // Procurar pelo botão nativo do VLibras
    const vlibrasButton = document.querySelector("[vw-access-button]");
    if (vlibrasButton) {
      // Simular clique no botão nativo
      vlibrasButton.click();
    } else {
      // Tentar inicializar VLibras se não encontrou o botão
      if (window.VLibras && window.VLibras.Widget) {
        console.log("VLibras widget iniciado pelo botão React");
      }
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 p-2 opacity-80 hover:opacity-100 transition-opacity duration-200 bg-white rounded-full shadow-lg hover:shadow-xl"
      aria-label="Ativar VLibras - Tradução para Libras"
      title="Tradução para Libras"
      style={{
        cursor: "pointer",
        width: "64px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!imageLoaded && (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-blue-600"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">
            VL
          </text>
        </svg>
      )}
      <img
        src="https://vlibras.gov.br/app//assets/access_icon.svg"
        alt="VLibras"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(false)}
        className="w-14 h-14 object-contain"
        style={{
          pointerEvents: "auto",
          display: imageLoaded ? "block" : "none",
        }}
      />
    </button>
  );
}
