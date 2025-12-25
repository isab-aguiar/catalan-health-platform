export function parseNumberRange(rangeStr) {
  if (!rangeStr) {
    return { type: "any", raw: rangeStr };
  }
  const result = {
    raw: rangeStr,
    type: null,
    min: null,
    max: null,
    filter: null,
    numbers: null,
    exceptions: null,
    additional: null,
    odd: null,
    even: null,
  };
  const normalized = rangeStr.toLowerCase();
  if (
    normalized.includes("somente par") ||
    normalized.includes("somente lado par") ||
    normalized.includes("somente pares")
  ) {
    result.filter = "even";
  }
  if (
    normalized.includes("somente ímpar") ||
    normalized.includes("somente lado ímpar") ||
    normalized.includes("somente ímpares")
  ) {
    result.filter = "odd";
  }
  if (
    normalized.includes("ímpar") &&
    normalized.includes("par") &&
    normalized.includes("/")
  ) {
    result.type = "split";
    const parts = normalized.split("/");
    const oddPart = parts.find((p) => p.includes("ímpar"));
    if (oddPart) {
      const oddMatch = oddPart.match(/(\d+)\s*até\s*(\d+)/);
      if (oddMatch) {
        result.odd = {
          min: parseInt(oddMatch[1]),
          max: parseInt(oddMatch[2]),
        };
      }
    }
    const evenPart = parts.find((p) => p.includes("par"));
    if (evenPart) {
      const evenMatch = evenPart.match(/(\d+)\s*até\s*(\d+)/);
      if (evenMatch) {
        result.even = {
          min: parseInt(evenMatch[1]),
          max: parseInt(evenMatch[2]),
        };
      }
    }
    return result;
  }
  if (normalized.includes("apenas")) {
    const numberMatch = normalized.match(/(\d+)/);
    if (numberMatch) {
      result.type = "list";
      result.numbers = [parseInt(numberMatch[1])];
      return result;
    }
  }
  if (normalized.match(/\d+\s+e\s+\d+/)) {
    const numbers = normalized.match(/\d+/g);
    if (numbers) {
      result.type = "list";
      result.numbers = numbers.map((n) => parseInt(n));
      return result;
    }
  }
  if (normalized.includes("exceto")) {
    const exceptPart = normalized.split("exceto")[1];
    if (exceptPart) {
      const exceptNumbers = exceptPart.match(/\d+/g);
      if (exceptNumbers) {
        result.exceptions = exceptNumbers.map((n) => parseInt(n));
      }
    }
  }
  if (normalized.includes("+")) {
    const parts = normalized.split("+");
    const additionalPart = parts[parts.length - 1];
    const additionalNumbers = additionalPart.match(/\d+/g);
    if (additionalNumbers) {
      result.additional = additionalNumbers.map((n) => parseInt(n));
    }
    const mainPart = parts[0];
    const mainRangeMatch = mainPart.match(/(\d+)\s*até\s*(\d+)/);
    if (mainRangeMatch) {
      result.type = "range";
      result.min = parseInt(mainRangeMatch[1]);
      result.max = parseInt(mainRangeMatch[2]);
      return result;
    }
  }
  const rangeMatch = normalized.match(/(\d+)\s*até\s*(\d+)/);
  if (rangeMatch) {
    result.type = "range";
    result.min = parseInt(rangeMatch[1]);
    result.max = parseInt(rangeMatch[2]);
    return result;
  }
  const numbers = normalized.match(/\d+[a-z]?/g);
  if (numbers && numbers.length >= 2 && normalized.includes(",")) {
    result.type = "list";
    result.numbers = numbers
      .map((n) => {
        const numOnly = n.match(/\d+/);
        return numOnly ? parseInt(numOnly[0]) : null;
      })
      .filter((n) => n !== null);
    return result;
  }
  if (numbers && numbers.length === 1) {
    result.type = "list";
    result.numbers = [parseInt(numbers[0])];
    return result;
  }
  if (normalized.includes("entre") || !numbers) {
    result.type = "any";
    return result;
  }
  result.type = "any";
  return result;
}
