import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { allPagesData } from "../data/allPagesData";
import { useDebounce } from "./useDebounce";
export function usePageSearch(query) {
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState([]);
  const fuse = useMemo(() => {
    return new Fuse(allPagesData, {
      keys: ["title", "keywords", "description"],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, []);
  useEffect(() => {
    if (debouncedQuery.length > 2) {
      const searchResults = fuse.search(debouncedQuery);
      setResults(searchResults.slice(0, 8));
    } else {
      setResults([]);
    }
  }, [debouncedQuery, fuse]);
  return results;
}
