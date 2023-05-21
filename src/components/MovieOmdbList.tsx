import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

export default function MovieOmdbList({
  movies,
}: {
  movies: {
    imdbID: string;
    title: string;
    poster: string;
    imdbRating: number;
    userHasMovie: boolean;
  }[];
}) {
  return (
    <Grid
      mt={2}
      container
      rowSpacing={2}
      columnSpacing={0}
      sx={{
        overflowY: "hidden",
      }}
    >
      {movies.map((movie) => (
        <Grid item xs={4}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}
