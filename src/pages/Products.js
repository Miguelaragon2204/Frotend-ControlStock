// src/pages/Products.js
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ProductManager from "../components/ProductManager";
import { Button, Container } from 'react-bootstrap';

const Products = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Container>
      <ProductManager />
    </Container>
  );
};

export default Products;