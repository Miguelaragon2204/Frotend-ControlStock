import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext"; 
import Home from "./pages/Home";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Layout from "./components/Layout"; 
import PrivateRoute from "./components/PrivateRoute";
import LoginModal from "./components/LoginModal"; 
import Contacto from "./pages/Contacto";


const App = () => {
  const { user } = useContext(AuthContext); 
  const [showLoginModal, setShowLoginModal] = useState(false); 

  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);

  return (
    <AuthProvider>
      <Router>
        <Layout handleShowLogin={handleShowLogin}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
 <Route path="/products" element={<PrivateRoute component={Products} />} />
            <Route path="/users" element={<PrivateRoute component={Users} />} />
          </Routes>
          {!user && (
            <LoginModal show={showLoginModal} handleClose={handleCloseLogin} />
          )}
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;