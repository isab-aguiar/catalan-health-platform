export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
export function throttle(func, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
export function lazyLoadImage(imageElement) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute("data-src");
        if (src) {
          img.src = src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  });
  observer.observe(imageElement);
}
const dateFormatters = new Map();
export function formatDate(date, locale = "pt-BR", options = {}) {
  const key = `${locale}-${JSON.stringify(options)}`;
  if (!dateFormatters.has(key)) {
    dateFormatters.set(key, new Intl.DateTimeFormat(locale, options));
  }
  return dateFormatters.get(key).format(date);
}
export function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
export async function prefetch(fetchFunction, key) {
  if (typeof window !== "undefined") {
    const cacheKey = `prefetch_${key}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error("Erro ao parsear cache:", e);
      }
    }
    const data = await fetchFunction();
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  }
}
export function clearPrefetchCache() {
  if (typeof window !== "undefined") {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("prefetch_")) {
        sessionStorage.removeItem(key);
      }
    });
  }
}
