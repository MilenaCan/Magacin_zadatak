import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const authContext = useContext(UserContext);
  const navigate = useNavigate();

  if (!authContext) {
    return null;
  }

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Neispravna email adresa!");
      return;
    }
    if (!validatePassword(password)) {
      setError("Lozinka mora imati najmanje 8 karaktera!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Lozinke se ne poklapaju!");
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.some(
      (user: any) => user.username === username
    );

    if (userExists) {
      setError("Korisničko ime je već zauzeto!");
      return;
    }

    authContext.register(name, surname, username, email, password);
    alert("Registracija uspješna!");
    navigate("/login");
  };
  const handleClik = () => {
    navigate("/login");
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
        }}
      >
        <Typography component="h1" variant="h5">
          Registracija
        </Typography>
        <Box pt={1}>
          <Typography>Imate nalog?</Typography>
          <Button
            fullWidth
            sx={{ boxShadow: 1, mt: 3, mb: 2 }}
            onClick={handleClik}
          >
            Prijava
          </Button>
        </Box>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Ime"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="surname"
            label="Prezime"
            name="surname"
            autoComplete="surname"
            autoFocus
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Korisničko ime"
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
            label="Email"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Potvrda lozinke"
            type="password"
            id="confirmPassword"
            autoComplete="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registracija
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
