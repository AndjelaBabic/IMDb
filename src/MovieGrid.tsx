import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { MovieCard } from "./MovieCard";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";

export const MovieGrid = () => {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [selectedMovieId, setSelectedMovieId] = useState<number | undefined>();
  const { observerRef, loading, movies } = useInfiniteScroll();

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          toggleFavorite={toggleFavorite}
          isFavorite={favorites[movie.id]}
          isSelected={selectedMovieId === movie.id}
          onClick={() => setSelectedMovieId(movie.id)}
        />
      ))}
      <div ref={observerRef} style={{ height: "50px" }} />
      {loading && <CircularProgress />}
    </Box>
  );
};
