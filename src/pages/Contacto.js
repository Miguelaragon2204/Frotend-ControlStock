// src/components/Contact.js
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setTimeout(() => {
        setSuccessMessage("¡Tu mensaje ha sido enviado con éxito!");
        setFormData({ name: "", email: "", message: "" });
        setErrorMessage("");
      }, 1000);
    } catch (error) {
      setErrorMessage("Ocurrió un error al enviar tu mensaje. Inténtalo nuevamente.");
      setSuccessMessage("");
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="display-4 fw-bold">Contáctanos</h1>
          <p className="lead text-muted">
            ¿Tienes preguntas o comentarios? ¡Nos encantaría saber de ti!
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <Form onSubmit={handleSubmit} className="shadow p-4 rounded">
            <Form.Group controlId="contactName" className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="contactEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="contactMessage" className="mb-3">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Escribe tu mensaje aquí"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar Mensaje
            </Button>
          </Form>

          {/* Mostrar mensaje de éxito o error */}
          {successMessage && (
            <p className="text-success mt-3">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-danger mt-3">{errorMessage}</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
