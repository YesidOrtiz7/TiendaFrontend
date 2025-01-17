import React, { useState } from 'react';
import Modal from '../Modal';
import query from '../useFetch';

const SingupPage = () => {
    const [formData, setFormData] = useState({
        documento: "",
        correo: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        contrasena: "",
        confirmarContrasena: "",
    });

    const clearForm = () => {
        setFormData({});
    }
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {

        //desempaquetando los datos del formulario y separando los campos de contrasena
        const { contrasena, confirmarContrasena, ...dataToSend } = formData;

        //validando si los campos esta llenos
        if (Object.values(dataToSend).some((value) => value === "")) {
            setError("Por favor, complete todos los campos.");
            return;
        }

        //validando si las contraseñas coinciden
        if (contrasena !== confirmarContrasena) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setError("");

        // Enviar el objeto JSON
        const jsonToSend = { ...dataToSend, contrasena };
        console.log("data to send: ",dataToSend);
        console.log("form data: ",formData);
        query(e, "POST", jsonToSend, clearForm, null, setMessage, setError, null, "usuarios/nuevousuario", null)
        console.log("Datos enviados:", jsonToSend);
    };
    return (
        <div className="formulario">
            <Modal mensaje={message} error={error} onClose={()=>{setMessage(''); setError('');}}/>
            <h2>Registrarse</h2>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <div className="input-formulario-agrupado">
                    <label>Documento</label>
                    <input
                        type="text"
                        name="documento"
                        value={formData.documento}
                        onChange={handleChange}
                        placeholder='Ingresa tu documento'
                        className='input-formulario'
                        required
                    />
                </div>
                <div className="input-formulario-agrupado">
                    <label>Correo:</label>
                    <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        placeholder='Ingresa tu correo electronico'
                        className='input-formulario'
                        required
                    />
                </div>
                <div className="input-formulario-agrupado">
                    <label>Nombres:</label>
                    <input
                        type="text"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleChange}
                        placeholder='Ingresa tus nombres'
                        className='input-formulario'
                        required
                    />
                </div>
                <div className="input-formulario-agrupado">
                    <label>Apellidos:</label>
                    <input
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        placeholder='Ingresa tus apellidos'
                        className='input-formulario'
                        required
                    />
                </div>
                <div className="input-formulario-agrupado">
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder='Ingresa tu telefono'
                        className='input-formulario'
                        required
                    />
                </div>
                <div className="input-formulario-agrupado">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleChange}
                        className='input-formulario'
                        required
                    />
                </div>
                <div className="input-formulario-agrupado">
                    <label>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        name="confirmarContrasena"
                        value={formData.confirmarContrasena}
                        onChange={handleChange}
                        className='input-formulario'
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='boton boton-amplio'
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
}
export default SingupPage;