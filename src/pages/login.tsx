import { Box, Button, TextField } from "@mui/material";
import { Alert } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: {
    stopPropagation: () => void;
    preventDefault: () => void;
  }) => {
    try {
      e.stopPropagation();
      e.preventDefault();
      const response = await login(username, password);
      if (authContext) {
        authContext.setToken(response);
      }
      navigate("/search");
      //print token from context
    } catch (error) {
      setAlertOpen(true);
      setAlertMessage("Invalid username or password");
      console.error("error", error);
    }
  };

  useEffect(() => {
    console.log("token", authContext.token);
  }, [authContext.token]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
        height: "100%",
        margin: "auto auto",
      }}
    >
      {alertOpen && (
        <Alert
          severity="warning"
          sx={{
            width: "50%",
          }}
          onClose={() => {
            setAlertOpen(false);
          }}
        >
          {alertMessage}
        </Alert>
      )}
      <form onSubmit={handleLogin}>
        <h1
          style={{
            textAlign: "center",
            color: "#F2911B",
            fontSize: "60px",
            fontWeight: 700,
            fontStyle: "normal",
            lineHeight: "24px",
          }}
        >
          Moovy
        </h1>
        <h1
          style={{
            textAlign: "center",
          }}
        >
          login
        </h1>
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
          type="submit"
          variant="contained"
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
      </form>
    </Box>
  );
}

export default Login;
