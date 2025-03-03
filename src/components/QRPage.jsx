import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const QRPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const qrData = location.state?.qrData;

    if (!qrData) {
        // Redirigir al formulario si no hay datos para mostrar
        navigate("/signup");
        return null;
    }

    return (
        <div className='tarjeta'>
            <h2>Tu código QR</h2>
            <p>Escanea este código QR con tu aplicación autenticadora:</p>
            <QRCodeSVG value={qrData.qrCodeUrl} size={256} />
            <br />
            <button className='boton' onClick={() => navigate("/login")}>Volver al inicio</button>
        </div>
    );
};

export default QRPage;