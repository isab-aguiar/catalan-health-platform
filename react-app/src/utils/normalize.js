export function normalize(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function removeStreetPrefix(str) {
  if (!str) return "";
  let result = str.trim();

  result = result.replace(/^(rua|r\.?)\s+/i, "");

  result = result.replace(/^(av\.?)\s+/i, "avenida ");
  result = result.replace(/^(trav\.?)\s+/i, "travessa ");
  result = result.replace(/^(pça\.?|praça)\s+/i, "praça ");
  return result.trim();
}
