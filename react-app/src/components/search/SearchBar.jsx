import { Search } from "lucide-react";
export default function SearchBar({
  value,
  onChange,
  onKeyDown,
  placeholder = "Ex: Rua Amazonas 330 ou Av Amazonas 330",
  className = "",
  autoFocus = false,
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-disabled"
          size={22}
          strokeWidth={2}
        />
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label="Buscar endereço"
          className="w-full pl-12 pr-4 py-3.5 text-base md:text-lg text-text-primary
                   bg-white border-2 border-neutral-300 rounded-lg
                   focus:border-primary focus:ring-2 focus:ring-primary/20
                   outline-none transition-all
                   placeholder:text-text-disabled"
        />
      </div>
    </div>
  );
}
