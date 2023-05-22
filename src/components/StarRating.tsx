import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { reviewMovie } from "../api/api";
import { AuthContext } from "../contexts/AuthContext";

export default function StarRating({
  imdbID,
  userRating,
}: {
  imdbID: string;
  userRating: number | null;
}) {
  const [value, setValue] = useState<number | null>(userRating);

  //get token updated token from context
  const { token } = useContext(AuthContext);

  const handleReview = async (newValue: number | null) => {
    console.log("newValue", newValue);
    console.log("imdbID", imdbID);
    console.log("token", token);
    console.log("userRating", userRating);
    if (newValue !== null) {
      setValue(newValue);
      newValue
        ? await reviewMovie(token, imdbID, newValue as number)
        : await reviewMovie(token, imdbID, 0);
    }
  };

  useEffect(() => {
    if (userRating !== null) {
      setValue(userRating);
    }
  }, [userRating]);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(_event, newValue) => {
          handleReview(newValue);
        }}
      />
    </Box>
  );
}
