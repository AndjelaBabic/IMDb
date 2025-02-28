import { Star, StarBorder } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { Movie } from "./types";

const StyledCard = styled(Card)<{ isSelected: boolean }>(({ isSelected }) => ({
  cursor: "pointer",
  color: isSelected ? "white" : "black",
  backgroundColor: isSelected ? "#1976d2" : "white",
  transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
  transform: isSelected ? "scale(1.1)" : "scale(1)",
  zIndex: isSelected ? 1 : "initial",
}));

type MovieCardProps = {
  movie: Movie;
  isFavorite: boolean;
  isSelected: boolean;
  onClick: () => void;
  toggleFavorite: (id: number) => void;
};

export const MovieCard = ({
  movie,
  isFavorite,
  isSelected,
  onClick,
  toggleFavorite,
}: MovieCardProps) => {
  const formattedDate = movie.release_date
    ? new Intl.DateTimeFormat("sr-RS", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(movie.release_date))
    : "Unknown Date";

  return (
    <StyledCard onClick={onClick} isSelected={isSelected}>
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent sx={{ paddingBottom: "3px!important" }}>
        <Typography
          variant="h6"
          sx={{
            color: isSelected ? "white" : "black",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {movie.title}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="body2"
            sx={{
              opacity: 0.5,
              fontSize: "15px",
              color: isSelected ? "white" : "textSecondary",
            }}
          >
            {formattedDate}
          </Typography>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(movie.id);
            }}
            sx={{ "&:focus": { outline: "none", boxShadow: "none" } }}
          >
            {isFavorite ? (
              <Star
                sx={{ color: isSelected ? "white" : "inherit" }}
                fontSize="small"
              />
            ) : (
              <StarBorder
                sx={{ color: isSelected ? "white" : "inherit" }}
                fontSize="small"
              />
            )}
          </IconButton>
        </Box>
      </CardContent>
    </StyledCard>
  );
};
