import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { MovieCard } from "./MovieCard";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { NUMBER_OF_ITEMS_PER_ROW } from "./types";

export const MovieGrid = () => {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const { observerRef, loading, movies } = useInfiniteScroll();

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const { selectedIndex, setSelectedIndex } = useKeyboardNavigation(
    movies.length,
    (id) => toggleFavorite(movies[id]?.id)
  );

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${NUMBER_OF_ITEMS_PER_ROW}, 1fr)`}
      gap={2}
    >
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          toggleFavorite={toggleFavorite}
          isFavorite={favorites[movie.id]}
          isSelected={selectedIndex === index}
          onClick={() => setSelectedIndex(index)}
        />
      ))}
      <div ref={observerRef} style={{ height: "50px" }} />
      {loading && <CircularProgress />}
    </Box>
  );
};
