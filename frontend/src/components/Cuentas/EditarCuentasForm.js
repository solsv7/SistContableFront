import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/cuentas';

const EditarCuentaForm = ({ cuenta, onCancel, onUpdate }) => {
  const [nombre, setNombre] = useState('');
  const [saldo, setSaldo] = useState('');
  const [tipo_saldo, setTipoSaldo] = useState('');

  useEffect(() => {
    if (cuenta) {
      setNombre(cuenta.Nombre || '');
      setSaldo(cuenta.Saldo || '');
      setTipoSaldo(cuenta.tipo_saldo || '');
    }
  }, [cuenta]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/actualizar`, {
        Codigo_cuenta: cuenta.Codigo_cuenta,
        nombre: nombre || null,
        saldo: saldo !== '' ? parseFloat(saldo) : null,
        tipo_saldo: tipo_saldo || null
      });
      alert('Cuenta actualizada con éxito');
      onUpdate(); // Refresca lista o cierra el form
    } catch (error) {
      console.error('Error al actualizar la cuenta:', error);
      alert('Error al actualizar la cuenta');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="cuenta-form">
      <h2>Editar Cuenta</h2>
      <input type="text" value={cuenta.Codigo_cuenta} disabled />
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        step="0.01"
        placeholder="Saldo"
        value={saldo}
        onChange={(e) => setSaldo(e.target.value)}
      />
      <select
        value={tipo_saldo}
        onChange={(e) => setTipoSaldo(e.target.value)}
      >
        <option value="">Tipo de saldo</option>
        <option value="D">Deudor</option>
        <option value="H">Acreedor</option>
      </select>
      <button type="submit">Guardar Cambios</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default EditarCuentaForm;

