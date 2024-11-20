import React, { useState, useContext, useEffect } from "react";
import {
  Modal,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const LoginModal = ({ show, handleClose }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!show) {
      setUsername("");
      setPassword("");
      setError("");
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      handleClose();
      setUsername("");
      setPassword("");
      setError("");
    } catch (err) {
      console.error("Login error:", err);
      if (
        err.message ===
        "Tu cuenta está bloqueada. Contacta con el administrador."
      ) {
        setError("Tu cuenta está bloqueada. Contacta con el administrador.");
      } else {
        setError("Error al iniciar sesión. Verifica tus credenciales.");
      }
    }
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: "bold" }}>
          Iniciar Sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Nombre de Usuario"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mb: 1, py: 1.2, fontWeight: "bold" }}
          >
            Iniciar Sesión
          </Button>
          <Button
            variant="text"
            color="secondary"
            fullWidth
            sx={{ py: 1.2, fontWeight: "bold" }}
            onClick={handleClose}
          >
            Cancelar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;
