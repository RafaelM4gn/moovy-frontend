import { Paper, InputBase } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-end",
        width: 400,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search your favorite movies"
        inputProps={{ "aria-label": "Search your favorite movies" }}
      />
      <SearchIcon />
    </Paper>
  );
}
