import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { auth } from "./firebase";

export const LoginForm = ({ setIsLogged }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [failedPass, setFailedPass] = useState(false);

  const login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLogged(true);
      })
      .catch((error) => {
        setFailedPass(true);
      });
  };

  return (
    <Box className="loginContainer">
      <Typography variant="h5">Iniciá sesión para continuar...</Typography>
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />
      {failedPass && (
        <Typography variant="h6" color="error">
          MAL
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          login();
        }}
      >
        Ingresar
      </Button>
    </Box>
  );
};
