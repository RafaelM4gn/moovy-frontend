import MovieOmdbList from "../components/MovieOmdbList";
import { Paper, InputBase } from "@mui/material";
import MainLayout from "../components/MainLayout";
import { useState, useEffect, useRef, useContext } from "react";
import { removeMovie, searchMovie } from "../api/api";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from "rxjs/operators";
import { of } from "rxjs";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from "../contexts/AuthContext";
import PrivatePage from "../components/PrivatePage";

type Movie = {
  imdbID: string;
  title: string;
  poster: string;
  imdbRating: number;
  userRating: number | null;
  userHasMovie: boolean;
};

function Search() {
  const moviesPlaceHolder: Movie[] = [];

  const [movies, setMovies] = useState<Movie[]>(moviesPlaceHolder);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  //get token updated token from context
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const search = of(searchTerm).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      startWith(""),
      switchMap(() => {
        if (searchTerm.length < 3) {
          return of(moviesPlaceHolder);
        } else {
          return searchMovie(token, searchTerm);
        }
      })
    );

    const subscription = search.subscribe(setMovies);

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleDelete = async (imdbID: string) => {
    try {
      await removeMovie(token, imdbID);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <PrivatePage>
      <MainLayout>
        <>
          <h1> Search </h1>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-end",
              width: 400,
              borderRadius: "10px",
            }}
          >
            <InputBase
              ref={searchInputRef}
              onChange={(event) => setSearchTerm(event.target.value)}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search your favorite movies"
              inputProps={{ "aria-label": "Search your favorite movies" }}
            />
            <SearchIcon />
          </Paper>
          <MovieOmdbList
            handleDelete={handleDelete}
            starRate={false}
            movies={movies}
          />
        </>
      </MainLayout>
    </PrivatePage>
  );
}

export default Search;
