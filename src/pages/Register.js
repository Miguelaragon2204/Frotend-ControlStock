// src/pages/Register.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../api/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/users/register', { username, email, password });
    // Aquí podrías agregar lógica para redirigir o mostrar un mensaje
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      <Form.Group controlId="formUsername">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Nombre" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>
      <Button variant="primary" type="submit">Registrarse</Button>
    </Form>
  );
};

export default Register;