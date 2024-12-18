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
  Grid,
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from "@mui/material";
import { Edit, Delete, Add, Cancel } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("user"))?.role;
    setUserRole(role);

    if (role !== "admin" && role !== "employee") {
      alert("No tienes acceso para ver esta página");
      window.location.href = "/login";
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (filterCategory) {
      setFilteredProducts(
        products.filter((product) => product.category === filterCategory)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [filterCategory, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user?.username?.trim() || "Anónimo";
    const payload = {
      name,
      stock,
      description,
      category,
      lastModifiedBy: userName,
    };

    try {
      if (editingProductId) {
        await api.put(`/products/${editingProductId}`, payload);
      } else {
        await api.post("/products", payload);
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  const handleEdit = (product) => {
    if (userRole !== "admin") {
      alert("Solo los administradores pueden editar productos.");
      return;
    }
    setEditingProductId(product._id);
    setName(product.name);
    setStock(product.stock);
    setDescription(product.description);
    setCategory(product.category);
  };

  const handleDelete = async (id) => {
    if (userRole !== "admin") {
      alert("Solo los administradores pueden eliminar productos.");
      return;
    }

    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error(
          "Error al eliminar producto:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const resetForm = () => {
    setName("");
    setStock("");
    setDescription("");
    setCategory("");
    setEditingProductId(null);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString("es-ES", options);
  };

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <Box p={1} bgcolor="#f9f9f9" minHeight="100vh">
      <Typography variant="h4" gutterBottom align="center">
        Gestión de Productos
      </Typography>

      <Grid container spacing={4}>
        {/* Formulario de agregar/editar producto */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {editingProductId ? "Editar Producto" : "Agregar Producto"}
            </Typography>

            {userRole === "admin" || userRole === "employee" ? (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Stock"
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Descripción"
                      multiline
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      freeSolo
                      options={uniqueCategories}
                      value={category}
                      onInputChange={(e, newValue) => setCategory(newValue)}
                      renderInput={(params) => (
                        <TextField {...params} label="Categoría" required />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Add />}
                      type="submit"
                    >
                      {editingProductId ? "Actualizar" : "Agregar"}
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
            ) : (
              <Typography color="error">
                No tienes acceso para agregar productos.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Filtro y Tabla de productos */}
        <Grid item xs={12} md={8}>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <MenuItem value="">Todas</MenuItem>
                {uniqueCategories.map((cat, idx) => (
                  <MenuItem key={idx} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TableContainer
            component={Paper}
            elevation={3}
            sx={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Última Modificación</TableCell>
                  <TableCell>Modificado Por</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{formatDate(product.lastStockCheck)}</TableCell>
                    <TableCell>{product.lastModifiedBy || "N/A"}</TableCell>
                    <TableCell>
                      {userRole === "admin" && (
                        <>
                          <IconButton
                            color="warning"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(product._id)}
                          >
                            <Delete />
                          </IconButton>
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

export default ProductManager;
