import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
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
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Contenido principal */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s ease",
        }}
      >
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
            {user ? (
              <>
                <Typography color="white" variant="body1" sx={{ marginRight: 3 }}>
                  Bienvenido, <strong>{user.username}</strong>
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => setShowLoginModal(true)}>
                  Iniciar Sesión
                </Button>
                <Button
                  color="inherit"
                  onClick={() => setShowRegisterModal(true)}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>

        {/* Área de contenido */}
        <main style={{ padding: "20px", flexGrow: 1 }}>
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
