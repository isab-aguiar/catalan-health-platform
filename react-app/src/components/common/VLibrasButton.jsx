import { useEffect, useState, useCallback } from "react";

export default function VLibrasButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [vlibrasReady, setVlibrasReady] = useState(false);

  const checkVLibrasAvailability = useCallback(() => {
    const vlibrasButton = document.querySelector("[vw-access-button]");
    const vlibrasWidget = window.VLibras && window.VLibras.Widget;
    return !!(vlibrasButton || vlibrasWidget);
  }, []);

  const reinitializeVLibras = useCallback(() => {
    if (
      window.VLibras &&
      window.VLibras.Widget &&
      !document.querySelector("[vw-access-button]")
    ) {
      try {
        new window.VLibras.Widget("https://vlibras.gov.br/app");
        console.log("VLibras reinicializado pelo componente React");
      } catch (error) {
        console.warn("Erro ao reinicializar VLibras:", error);
      }
    }
  }, []);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20;

    const checkAndInit = () => {
      if (checkVLibrasAvailability()) {
        setVlibrasReady(true);
        setIsVisible(true);

        setTimeout(() => {
          if (typeof window.fixVLibrasPosition === "function") {
            window.fixVLibrasPosition();
          }
        }, 500);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkAndInit, 500);
      } else {
        setIsVisible(true);
      }
    };

    const timer = setTimeout(checkAndInit, 1500);

    const handleRouteChange = () => {
      setTimeout(() => {
        if (typeof window.fixVLibrasPosition === "function") {
          window.fixVLibrasPosition();
        }
      }, 500);
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [checkVLibrasAvailability]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const vlibrasButton = document.querySelector("[vw-access-button]");

    if (vlibrasButton) {
      vlibrasButton.click();

      if ("ontouchstart" in window) {
        const touchEvent = new TouchEvent("touchend", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        vlibrasButton.dispatchEvent(touchEvent);
      }
    } else {
      reinitializeVLibras();

      setTimeout(() => {
        const button = document.querySelector("[vw-access-button]");
        if (button) {
          button.click();
        }
      }, 1000);
    }

    setTimeout(() => {
      if (typeof window.fixVLibrasPosition === "function") {
        window.fixVLibrasPosition();
      }
    }, 300);
  };

  if (!isVisible || vlibrasReady) return null;

  return (
    <button
      onClick={handleClick}
      onTouchEnd={handleClick}
      className="fixed z-[9999998] p-2 opacity-90 hover:opacity-100 active:opacity-100 transition-opacity duration-200 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      aria-label="Ativar VLibras - Tradução para Libras"
      title="Tradução para Libras (VLibras)"
      style={{
        cursor: "pointer",
        width: "56px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bottom: "20px",
        right: "10px",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
        minWidth: "44px",
        minHeight: "44px",
      }}
    >
      {!imageLoaded && (
        <div className="flex items-center justify-center w-full h-full">
          <span className="text-white font-bold text-lg">VL</span>
        </div>
      )}
      <img
        src="https://vlibras.gov.br/app/assets/access_icon.svg"
        alt="VLibras - Tradução para Libras"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(false)}
        className="w-10 h-10 object-contain filter brightness-0 invert"
        style={{
          pointerEvents: "none",
          display: imageLoaded ? "block" : "none",
        }}
        loading="lazy"
      />
    </button>
  );
}
