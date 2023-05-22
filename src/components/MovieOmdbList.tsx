import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

export default function MovieOmdbList({
  movies,
  handleDelete,
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
        <Grid item xs={4} key={movie.imdbID}>
          <MovieCard movie={movie} handleDelete={handleDelete}/>
        </Grid>
      ))}
    </Grid>
  );
}
