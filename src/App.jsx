import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage'; 
import LoginPage from './components/LoginPage';
import SingupPage from './components/nuevoUsuario/SingupPage'
import CrearPublicacionForm from './components/CrearPublicacionForm';
import Barra from './components/Barra';
import QRPage from './components/QRPage';
import PrivateRoute from './components/ControlForRoleComponents/PrivateRoute'

function App() {
  return (
    <Router>
      <Barra/>
      <div id="main-layout">
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/crear_cuenta" element={<SingupPage/>}/>
            <Route path="/qr" element={<QRPage />} />
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
                  <PrivateRoute roles={["USUARIO"]}>
                    <CrearPublicacionForm />
                  </PrivateRoute>
                </ProtectedRoute>
              }
            />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
