export function isNumberInRange(number, rangeData) {
  if (!number || !rangeData) return true;
  if (rangeData.type === "any") return true;
  const isEven = number % 2 === 0;
  const isOdd = number % 2 !== 0;
  switch (rangeData.type) {
    case "range": {
      if (number < rangeData.min || number > rangeData.max) {
        if (rangeData.additional && rangeData.additional.includes(number)) {
          return true;
        }
        return false;
      }
      if (rangeData.exceptions && rangeData.exceptions.includes(number)) {
        return false;
      }
      if (rangeData.filter === "even" && isOdd) return false;
      if (rangeData.filter === "odd" && isEven) return false;
      return true;
    }
    case "list": {
      return rangeData.numbers && rangeData.numbers.includes(number);
    }
    case "split": {
      if (isEven && rangeData.even) {
        return number >= rangeData.even.min && number <= rangeData.even.max;
      }
      if (isOdd && rangeData.odd) {
        return number >= rangeData.odd.min && number <= rangeData.odd.max;
      }
      return false;
    }
    default:
      return true;
  }
}
export function extractNumber(input) {
  if (!input) return null;
  const match = input.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}
