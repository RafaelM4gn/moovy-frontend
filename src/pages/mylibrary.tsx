import { useContext, useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { AuthContext } from "../contexts/AuthContext";
import { getMovies, removeMovie } from "../api/api";
import MovieOmdbList from "../components/MovieOmdbList";

function MyLibrary() {
  //get token updated token from context
  const { token } = useContext(AuthContext);

  //get my library
  const [myLibrary, setMyLibrary] = useState<
    {
      imdbID: string;
      title: string;
      poster: string;
      imdbRating: number;
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
    <MainLayout>
      <>
        <h1> My Library </h1>
        {token && <p>Token: {token}</p>}
        <MovieOmdbList movies={myLibrary}  handleDelete={handleDelete} />
      </>
    </MainLayout>
  );
}

export default MyLibrary;
