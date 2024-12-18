import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./SideBar";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

const Layout = ({ children }) => {
  const { user, logout, loading } = useContext(AuthContext);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCloseRegister = () => setShowRegisterModal(false);
  const handleCloseLogin = () => setShowLoginModal(false);
  const handleLogout = () => logout();

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      {/* Barra de navegación */}
      <AppBar position="sticky">
        <Toolbar>
        {user && (
              <SideBar
                open={sidebarOpen}
                toggleSidebar={toggleSidebar}
                user={user}
              />
            )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              SimpleGestion
            </Link>
          </Typography>
          <Grid container spacing={1} justifyContent="flex-end">
            {user ? (
              <>
                <Grid item>
                  <Typography color="white" variant="body1">
                    Bienvenido, <strong>{user.username}</strong>
                  </Typography>
                </Grid>
                <Grid item>
                  <Button color="inherit" onClick={handleLogout}>
                    Cerrar Sesión
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <Button color="inherit" onClick={() => setShowLoginModal(true)}>
                    Iniciar Sesión
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" onClick={() => setShowRegisterModal(true)}>
                    Registrarse
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <main style={{ flexGrow: 1 }}>
          {children || <div>No hay contenido disponible.</div>}
        </main>
      </Box>

      {/* Modales */}
      <RegisterModal
        show={showRegisterModal}
        handleClose={handleCloseRegister}
      />
      <LoginModal show={showLoginModal} handleClose={handleCloseLogin} />
    </div>
  );
};

export default Layout;