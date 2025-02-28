import { Movie } from "../types";
import moviesData from "./../assets/movies.json";

export const useFilterAndSortMovies = () => {
  const uniqueMovies = Array.from(
    new Map(moviesData.map((movie) => [movie.title, movie])).values()
  );

  const movies: Movie[] = uniqueMovies.sort((a, b) => {
    const ratingA = a.ratings.find((r) => r.id === "imdb")?.rating || 0;
    const ratingB = b.ratings.find((r) => r.id === "imdb")?.rating || 0;
    return ratingB - ratingA;
  });

  return movies;
};
