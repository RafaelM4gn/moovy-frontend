import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { addMovie } from "../api/api";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import StarRating from "./StarRating";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmAlert from "./ConfirmAlert";

export default function MovieCard({
  movie,
  handleDelete,
  allowRating,
}: {
  movie: {
    imdbID: string;
    title: string;
    poster: string;
    imdbRating: number;
    userHasMovie: boolean;
    userRating: number | null;
  };
  handleDelete: (imdbID: string) => Promise<void>;
  allowRating: boolean;
}) {
  //state of userHasMovie
  const [isMovieInUserLibrary, setIsMovieInUserLibrary] = useState(movie.userHasMovie);
  const { token } = useContext(AuthContext);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  const onClickOpenConfirmAlert = () => {
    setShowConfirmAlert(true);
  };

  //save movie without userHasMovie
  const movieWithoutUserHasMovie = {
    imdbID: movie.imdbID,
    title: movie.title,
    poster: movie.poster,
    imdbRating: movie.imdbRating,
  };

  const handleAdd = async () => {
    try {
      await addMovie(token, movieWithoutUserHasMovie);
      setIsMovieInUserLibrary(true);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleConfirmDelete = () => {
    handleDelete(movie.imdbID);
    setIsMovieInUserLibrary(false);
    setShowConfirmAlert(false);
  };

  const handleClose = () => {
    setShowConfirmAlert(false);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="100%"
        image={movie.poster}
        alt="Paella dish"
      />
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <StarIcon sx={{ color: "#F2911B" }} />
          {movie.imdbRating} IMDB
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          //if space
          display: "flex",

          justifyContent: "space-between",
        }}
        disableSpacing
      >
        {isMovieInUserLibrary && allowRating && (
          <StarRating userRating={movie.userRating} imdbID={movie.imdbID} />
        )}
        {isMovieInUserLibrary ? (
          <Button
            fullWidth={!allowRating}
            onClick={onClickOpenConfirmAlert}
            endIcon={<DeleteIcon />}
            variant="contained"
            color="error"
          >
            REMOVE
          </Button>
        ) : (
          <Button
            onClick={handleAdd}
            variant="contained"
            color="success"
            fullWidth
          >
            {" "}
            Add to my library{" "}
          </Button>
        )}
      </CardActions>
      <ConfirmAlert
        openProps={showConfirmAlert}
        onCloseProps={handleClose}
        onAgreeProps={handleConfirmDelete}
      />
    </Card>
  );
}
