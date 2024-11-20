import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component }) => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!user) {
      setMessage('Debes iniciar sesión primero.');
      setTimeout(() => {
        setRedirect(true); 
      }, 1000);
    }
  }, [user]);

  if (redirect) {
    return <Navigate to="/" />;
  }

  console.log("Rendering component:", Component); 

  return user ? (
    <Component />
  ) : (
    <div style={{ textAlign: 'center', marginTop: '20px', color: 'red', fontSize:'50px' }}>
      <p>{message}</p>
    </div>
  );
};

export default PrivateRoute;
