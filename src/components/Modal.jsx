import React from "react";

const Modal = ({ mensaje, error, onClose }) => {
  if (!mensaje && !error) return null; // Si no hay mensaje ni respuesta, no renderiza nada

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {mensaje&&<h3>Mensaje</h3>}
        {error&&<h3>Error</h3>}
        {mensaje && <p>{mensaje}</p>}
        {error && <p>{error}</p>}
        <button onClick={onClose}>Aceptar</button>
      </div>
    </div>
  );
};

export default Modal;