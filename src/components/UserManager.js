import React, { useEffect, useState } from "react";
import api from "../api/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Edit, Delete, Add, Cancel } from "@mui/icons-material";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee");
  const [password, setPassword] = useState("");
  const [isSuspended, setIsSuspended] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      const sortedUsers = response.data.sort((a, b) => {
        if (a.role === "admin" && b.role !== "admin") return -1;
        if (a.role !== "admin" && b.role === "admin") return 1;
        return 0;
      });
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("user"))?.role;
    setUserRole(role);

    if (role !== "admin" && role !== "employee") {
      alert("No tienes acceso para ver esta página");
      window.location.href = "/login"; 
    }
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await api.put(`/users/${editingUserId}`, {
          username,
          email,
          role,
          isSuspended,
        });
      } else {
        await api.post("/users/register", {
          username,
          email,
          role,
          password,
        });
      }
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleEdit = (user) => {
    if (userRole !== "admin") {
      alert("Solo los administradores pueden editar usuarios.");
      return;
    }
    setEditingUserId(user._id);
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
    setIsSuspended(user.isSuspended);
  };

  const handleDelete = async (id) => {
    if (userRole !== "admin") {
      alert("Solo los administradores pueden eliminar usuarios.");
      return;
    }

    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await api.delete(`/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error(
          "Error al eliminar usuario:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const handleSuspendToggle = async (user) => {
    try {
      await api.put(`/users/${user._id}/suspend`, {
        isSuspended: !user.isSuspended,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error al suspender usuario:", error);
    }
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setRole("employee");
    setIsSuspended(false);
    setEditingUserId(null);
    setPassword("");
  };

  return (
    <Box p={1} bgcolor="#f9f9f9" minHeight="100vh">

      <Typography variant="h4" gutterBottom align="center">
        Gestión de Usuarios
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {editingUserId ? "Editar Usuario" : "Agregar Usuario"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nombre de Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Correo Electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Rol</InputLabel>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      label="Rol"
                    >
                      <MenuItem value="employee">Empleado</MenuItem>
                      <MenuItem value="admin">Administrador</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    type="submit"
                  >
                    {editingUserId ? "Actualizar" : "Agregar"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<Cancel />}
                    onClick={resetForm}
                    sx={{ ml: 2 }}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={10}>
          <TableContainer
            component={Paper}
            elevation={3}
            sx={{
              maxHeight: "400px",
              overflowY: "auto",
              overflowX: "auto",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre de Usuario</TableCell>
                  <TableCell>Correo Electrónico</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.isSuspended ? "Suspendido" : "Activo"}</TableCell>
                    <TableCell>
                      {user.role === "admin" ? (
                        <Typography color="textSecondary">
                          No editable
                        </Typography>
                      ) : (
                        <>
                          <IconButton
                            color="warning"
                            onClick={() => handleEdit(user)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(user._id)}
                          >
                            <Delete />
                          </IconButton>
                          <Button
                            variant={user.isSuspended ? "contained" : "outlined"}
                            color={user.isSuspended ? "success" : "warning"}
                            onClick={() => handleSuspendToggle(user)}
                          >
                            {user.isSuspended ? "Activar" : "Suspender"}
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserManager;