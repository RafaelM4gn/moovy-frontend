import { Box, Typography, Toolbar, Container } from "@mui/material";
import NavLink from "./NavLink";
export default function MainLayout({ children }: { children: JSX.Element }) {
  return (
    <Box
      id="sidebar"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          sx={{
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "30px",
            lineHeight: "24px",
            alignItems: "center",
            textAlign: "center",
            color: "#F2911B",
            mr: 15,
          }}
        >

        Moovy
        </Typography>

        <NavLink to={`/search`}> Search </NavLink>
        <NavLink to={`/my-library`}> My Library </NavLink>
        <NavLink to={`/login`}> Login </NavLink>
      </Toolbar>
      <Container maxWidth="xl" sx={
        {
          display: "flex",
          flexDirection: "column",
        }
      }>
      {children}
      </Container>
    </Box>
  );
}
