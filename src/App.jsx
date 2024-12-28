import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage'; 
import LoginPage from './components/LoginPage';
import CrearPublicacionForm from './components/CrearPublicacionForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <HomePage />
          }
        />
        <Route
          path="/crear_publicacion"
          element={
            <ProtectedRoute>
              <CrearPublicacionForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
