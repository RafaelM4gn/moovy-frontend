import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

export default function MovieOmdbList({
  movies,
  handleDelete,
  starRate,
}: {
  movies: {
    imdbID: string;
    title: string;
    poster: string;
    imdbRating: number;
    userRating: number | null;
    userHasMovie: boolean;
  }[];
  handleDelete: (imdbID: string) => Promise<void>;
  starRate: boolean;
}) {
  return (
    <Grid
      mt={2}
      container
      rowSpacing={2}
      columnSpacing={1}
      sx={{
        overflowY: "hidden",
      }}
    >
      {movies.map((movie) => (
        <Grid item xs={4} key={movie.imdbID}>
          <MovieCard
            movie={movie}
            allowRating={starRate}
            handleDelete={handleDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
}
