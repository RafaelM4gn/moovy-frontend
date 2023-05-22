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
  starRate,
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
  starRate: boolean;
}) {
  //state of userHasMovie
  const [userHasMovie, setUserHasMovie] = useState(movie.userHasMovie);
  const { token } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const onClickDelete = () => {
    setOpen(true);
    // handleDelete(movie.imdbID);
    // setUserHasMovie(false);
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
      setUserHasMovie(true);
    } catch (error) {
      console.error("error", error);
    }
  };

  //make a function thar make onAgreeProps to handleDelete
  const handleAgree = () => {
    handleDelete(movie.imdbID);
    setUserHasMovie(false);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
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
        {userHasMovie && starRate && (
          <StarRating userRating={movie.userRating} imdbID={movie.imdbID} />
        )}
        {userHasMovie ? (
          <Button
            fullWidth={!starRate}
            onClick={onClickDelete}
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
        openProps={open}
        onCloseProps={handleClose}
        onAgreeProps={handleAgree}
      />
    </Card>
  );
}
