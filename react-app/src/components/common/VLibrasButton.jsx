import { useEffect, useState } from "react";
export default function VLibrasButton() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const handleClick = () => {
    const vlibrasButton = document.querySelector("[vw-access-button]");
    if (vlibrasButton) {
      vlibrasButton.click();
    }
  };
  if (!isVisible) return null;
  return (
    <button
      onClick={handleClick}
      className="vlibras-custom-button"
      aria-label="Ativar VLibras - Tradução para Libras"
      title="Tradução para Libras"
    >
      <img
        src="https://vlibras.gov.br/app/assets/imgs/vlibras-logo.png"
        alt="VLibras"
        className="vlibras-icon-img"
      />
    </button>
  );
}
