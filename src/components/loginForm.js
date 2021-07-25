import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";

export const LoginForm = ({ setIsLogged }) => {
  const [password, setPassword] = useState("");
  const [failedPass, setFailedPass] = useState(false);
  const pass = process.env.REACT_APP_ADMIN;

  const login = () => {
    if (password === pass) {
      setIsLogged(true);
    } else {
      setFailedPass(true);
    }
  };

  return (
    <Box className="loginContainer">
      <Typography variant="h5">
        Para entrar al modo administrador, necesitás ingresar la palabra
        secreta...
      </Typography>
      <TextField
        label="Secret Word"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />
      {failedPass && (
        <Typography variant="h6" color="error">
          Esa no es la palabra secreta.
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
