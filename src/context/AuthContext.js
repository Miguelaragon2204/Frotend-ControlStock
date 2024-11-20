import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      const response = await api.post('/users/login', { username, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); 
      setUser (user);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (error.response && error.response.status === 403) {
        throw new Error("Tu cuenta está bloqueada. Contacta con el administrador.");
      }
      setUser(null); 
      throw error; 
    }
  };
  
  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    setUser (null);
  };

  // useEffect para obtener datos del usuario al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await api.get('/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser (response.data); 
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
          setUser (null); 
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setLoading(false); 
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};