import { Star, StarBorder } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Movie } from "./types";

type MovieCardProps = {
  movie: Movie;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
};

export const MovieCard = ({
  movie,
  isFavorite,
  toggleFavorite,
}: MovieCardProps) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography
          variant="h6"
        >
          {movie.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {movie.release_date || "Unknown Date"}
        </Typography>
        <IconButton onClick={() => toggleFavorite(movie.id)}>
          {isFavorite ? <Star color="primary" /> : <StarBorder />}
        </IconButton>
      </CardContent>
    </Card>
  );
};
