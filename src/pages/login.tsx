import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import MainLayout from "../components/MainLayout";
import { useState } from "react";
import { login } from "../api/auth";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      if (authContext) {
        authContext.setToken(response);
      }
      //print token from context
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    console.log("token", authContext.token);
  }, [authContext.token]);

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
          height: "40vh",
          margin: "auto auto",
        }}
      >
        <h1> Login </h1>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          sx={{
            width: "100%",
            mb: 2,
            padding: "4 4 4 4",
          }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          type="password"
          label="Password"
          variant="outlined"
          sx={{
            width: "100%",
            mb: 2,
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            width: "100%",
            backgroundColor: "#F2911B",
            "&:hover": {
              backgroundColor: "#F2911B",
            },
          }}
          fullWidth
        >
          Login
        </Button>
        {authContext.token && <p>Token: {authContext.token}</p>}
      </Box>
    </MainLayout>
  );
}

export default Login;
