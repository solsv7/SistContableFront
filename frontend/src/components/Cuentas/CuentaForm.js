import React, { useState } from 'react';
import axios from 'axios';
import './CuentaForm.css';

const API_URL = 'http://localhost:3000/api/cuentas';

const CuentaForm = () => {
  const [Codigo_cuenta, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipo_saldo, setTipoSaldo] = useState('D'); // Solo esto se elige

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, {
        Codigo_cuenta,
        nombre,
        saldo: 0.00, // forzado por la consigna
        tipo_saldo
      });

      alert('Cuenta creada con éxito');
      setCodigo('');
      setNombre('');
      setTipoSaldo('D');
    } catch (error) {
      console.error('Error al crear la cuenta:', error);
      alert('Error al crear la cuenta');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="cuenta-form">
      <h2>Crear Cuenta</h2>

      <input
        type="text"
        placeholder="Código"
        value={Codigo_cuenta}
        onChange={(e) => setCodigo(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <select value={tipo_saldo} onChange={(e) => setTipoSaldo(e.target.value)} required>
        <option value="D">Deudor</option>
        <option value="H">Acreedor</option>
      </select>

      <button type="submit">Crear Cuenta</button>
    </form>
  );
};

export default CuentaForm;
