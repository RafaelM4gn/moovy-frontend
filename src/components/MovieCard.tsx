import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

export default function MovieCard({ movie }: { movie: { title: string, poster: string, imdbRating: number, userHasMovie: boolean} }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={movie.poster}
        alt="Paella dish"
      />
      <CardContent sx={ {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Typography variant="body2" color="text.secondary">
            {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

        }}>
            <StarIcon sx={{ color: "#F2911B" }} />
            {movie.imdbRating}

        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {
            movie.userHasMovie ? (
                <Button variant="contained" color="error" fullWidth> 
                    Remove
                </Button>
            ) : (
                <Button variant="contained" color="success" fullWidth> Add to my library </Button>
            )
        }
       </CardActions>
    </Card>
  );
}
