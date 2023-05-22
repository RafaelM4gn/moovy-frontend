import { useContext, useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { AuthContext } from "../contexts/AuthContext";
import { getMovies, removeMovie } from "../api/api";
import MovieOmdbList from "../components/MovieOmdbList";
import PrivatePage from "../components/PrivatePage";

function MyLibrary() {
  const { token } = useContext(AuthContext);

  const [myLibrary, setMyLibrary] = useState<
    {
      imdbID: string;
      title: string;
      poster: string;
      imdbRating: number;
      userRating: number | null;
      userHasMovie: boolean;
    }[]
  >([]);

  const handleDelete = async (imdbID: string) => {
    try {
      await removeMovie(token, imdbID);
      setMyLibrary((prevMovies) =>
        prevMovies.filter((movie) => movie.imdbID !== imdbID)
      );
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    const fetchMyLibrary = async () => {
      try {
        const response = await getMovies(token);
        setMyLibrary(response);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchMyLibrary();
  }, [token]);

  console.log("myLibrary", myLibrary);

  return (
    <PrivatePage>
      <MainLayout>
        <>
          <h1> My Library </h1>
          <MovieOmdbList
            movies={myLibrary}
            starRate={true}
            handleDelete={handleDelete}
          />
        </>
      </MainLayout>
    </PrivatePage>
  );
}

export default MyLibrary;
