import { useEffect, useRef, useState } from "react";
import { Movie } from "../types";
import { useFilterAndSortMovies } from "./useFilterAndSortMovies";

export const useInfiniteScroll = () => {
  const allMovies = useFilterAndSortMovies();

  const [movies, setMovies] = useState<Movie[]>(allMovies.slice(0, 18));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const lastEntry = entries[0];
      if (lastEntry.isIntersecting && !loading) {
        setLoading(true);
        setTimeout(() => {
          const nextMovies = allMovies.slice(page * 18, (page + 1) * 18);
          if (nextMovies.length > 0) {
            setMovies((prev) => [...prev, ...nextMovies]);
            setPage((prev) => prev + 1);
          }
          setLoading(false);
        }, 600);
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [allMovies, loading, page, setMovies, setPage, setLoading]);

  return { observerRef, movies, loading };
};
