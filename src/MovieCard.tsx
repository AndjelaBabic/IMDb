import { Star, StarBorder } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { Movie } from "./types";

const StyledCard = styled(Card)<{ $isSelected: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.$isSelected ? "white" : "black")} !important;
  background-color: ${(props) =>
    props.$isSelected ? "#1976d2" : "white"} !important;
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  transform: ${(props) => (props.$isSelected ? "scale(1.1)" : "scale(1)")};
  z-index: ${(props) => (props.$isSelected ? 1 : "initial")};
`;

const StyledTypography = styled(Typography)<{ $isSelected: boolean }>`
  color: ${(props) =>
    props.$isSelected
      ? "white"
      : props.variant === "h6"
      ? "black"
      : "textSecondary"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledIconButton = styled(IconButton)`
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const StyledStar = styled(Star)<{ $isSelected: boolean }>`
  color: ${(props) => (props.$isSelected ? "white" : "inherit")};
`;

const StyledStarBorder = styled(StarBorder)<{ $isSelected: boolean }>`
  color: ${(props) => (props.$isSelected ? "white" : "inherit")};
`;

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
  return (
    <StyledCard onClick={onClick} $isSelected={isSelected}>
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <StyledTypography variant="h6" $isSelected={isSelected}>
          {movie.title}
        </StyledTypography>
        <StyledTypography variant="body2" $isSelected={isSelected}>
          {movie.release_date || "Unknown Date"}
        </StyledTypography>
        <StyledIconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(movie.id);
          }}
        >
          {isFavorite ? (
            <StyledStar $isSelected={isSelected} />
          ) : (
            <StyledStarBorder $isSelected={isSelected} />
          )}
        </StyledIconButton>
      </CardContent>
    </StyledCard>
  );
};
