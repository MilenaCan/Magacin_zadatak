import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const authContext = useContext(UserContext);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    if (authContext && authContext.isLoggedIn) {
      navigate("/magacin");
    }
  }, [authContext, authContext?.isLoggedIn, navigate]);

  if (!authContext) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authContext.login(username, email, password);
    if (!authContext.isLoggedIn) {
      setError("Neispravno uneseni podaci!");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: isSmallScreen ? 2 : 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Prijava
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Korisnicko ime"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Lozinka"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ boxShadow: 1, mt: 3, mb: 2 }}
          >
            Prijava
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
