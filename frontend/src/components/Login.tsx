import React, { useState } from "react";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      navigate("/"); // Redireciona para a página principal após login
    } catch (err) {
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 300, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Usuário"
        value={username}
        onChange={e => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Entrar
      </Button>
    </Box>
  );
}
