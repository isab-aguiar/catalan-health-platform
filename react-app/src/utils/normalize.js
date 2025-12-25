export function normalize(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove marcas diacríticas (acentos)
    .toLowerCase()
    .trim();
}
/**
 * Remove ou normaliza prefixos de rua comuns
 * Permite que usuários digitem "Rua X", "R. X", "Av X" e ainda encontrem resultados
 *
 * @param {string} str - String para processar (já deve estar normalizada)
 * @returns {string} String sem prefixos desnecessários
 *
 * @example
 * removeStreetPrefix("rua castro alves") // "castro alves"
 * removeStreetPrefix("r. castro alves")  // "castro alves"
 * removeStreetPrefix("av amazonas")      // "avenida amazonas"
 * removeStreetPrefix("castro alves")     // "castro alves" (inalterado)
 */
export function removeStreetPrefix(str) {
  if (!str) return "";
  let result = str.trim();
  // Remove "Rua", "R.", "R" (prefixo que usuários adicionam mas não está no banco)
  result = result.replace(/^(rua|r\.?)\s+/i, "");
  // Normaliza abreviações para formato completo (como está no banco)
  result = result.replace(/^(av\.?)\s+/i, "avenida ");
  result = result.replace(/^(trav\.?)\s+/i, "travessa ");
  result = result.replace(/^(pça\.?|praça)\s+/i, "praça ");
  return result.trim();
}
