import React from 'react';
import { Link } from 'react-router-dom';

export const RegistrationLink = () => {
  return (
    <p className="text-center">
      ¿No tienes una cuenta?{' '}
      <Link id="enlaceRegistro" to="/cliente/registro">Regístrate aquí</Link>
    </p>
  );
}