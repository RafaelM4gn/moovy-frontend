import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { removeMovie } from "../api/api";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function MovieCard({
  movie,
  handleDelete,
}: {
  movie: {
    imdbID: string;
    title: string;
    poster: string;
    imdbRating: number;
    userHasMovie: boolean;
  };
  handleDelete: (imdbID: string) => Promise<void>;
}) {
  const { token } = useContext(AuthContext);

  const onClickDelete = () => {
    handleDelete(movie.imdbID);
  };


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
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
          {movie.imdbRating}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {movie.userHasMovie ? (
          <Button
            onClick={onClickDelete}
            variant="contained"
            color="error"
            fullWidth
          >
            Remove
          </Button>
        ) : (
          <Button variant="contained" color="success" fullWidth>
            {" "}
            Add to my library{" "}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
