export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  video: boolean;
  ratings: { id: string; rating: number }[];
}
