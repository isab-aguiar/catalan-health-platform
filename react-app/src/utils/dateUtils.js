export function normalizarDataParaMidnight(input) {
  let date;

  if (input?.toDate) {
    date = input.toDate();
  } else if (typeof input === "string") {
    const [ano, mes, dia] = input.split("-").map(Number);

    if (!ano || !mes || !dia || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
      console.warn("[dateUtils] String de data inválida:", input);
      return null;
    }

    date = new Date(ano, mes - 1, dia);
  } else if (input instanceof Date) {
    date = new Date(input);
  } else {
    console.warn("[dateUtils] Input de data não reconhecido:", input);
    return null;
  }

  if (isNaN(date.getTime())) {
    console.warn("[dateUtils] Date inválido gerado de:", input);
    return null;
  }

  date.setHours(0, 0, 0, 0);
  return date;
}

export function formatarDataParaISO(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.warn("[dateUtils] Date inválido para formatação:", date);
    return "";
  }

  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

export function isMesmoDia(data1, data2) {
  if (!(data1 instanceof Date) || !(data2 instanceof Date)) {
    return false;
  }

  if (isNaN(data1.getTime()) || isNaN(data2.getTime())) {
    return false;
  }

  return (
    data1.getDate() === data2.getDate() &&
    data1.getMonth() === data2.getMonth() &&
    data1.getFullYear() === data2.getFullYear()
  );
}
