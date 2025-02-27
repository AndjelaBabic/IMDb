import { Box } from "@mui/material";
import { useState } from "react";
import moviesData from "./assets/movies.json";
import { MovieCard } from "./MovieCard";
import { Movie } from "./types";

export const MovieGrid = () => {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const movies: Movie[] = moviesData.slice(0, 12);

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
        />
      ))}
    </Box>
  );
};
