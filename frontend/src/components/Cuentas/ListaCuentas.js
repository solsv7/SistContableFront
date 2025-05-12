import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react'; // Ícono de tarro de basura
import EditarCuentaForm from './EditarCuentasForm.js';
import "./ListaCuentas.css";

const API_URL = 'http://localhost:3000/api/cuentas';

const ListaCuentas = () => {
  const [cuentas, setCuentas] = useState([]);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);

  const fetchCuentas = async () => {
    try {
      const response = await axios.get(API_URL);
      setCuentas(response.data);
    } catch (error) {
      console.error('Error al obtener cuentas:', error);
    }
  };

  const eliminarCuenta = async (codigo) => {
    if (!window.confirm('¿Seguro que querés eliminar esta cuenta?')) return;

    try {
      await axios.delete(`${API_URL}/${codigo}`);
      alert('Cuenta eliminada');
      fetchCuentas(); // Refrescar lista
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
      alert('No se pudo eliminar la cuenta');
    }
  };

  const handleEditar = (cuenta) => {
    setCuentaSeleccionada(cuenta);
  };

  const cancelarEdicion = () => {
    setCuentaSeleccionada(null);
  };

  const actualizarLista = () => {
    fetchCuentas();
    cancelarEdicion();
  };

  useEffect(() => {
    fetchCuentas();
  }, []);

  return (
    <div className="lista-cuentas">
      <h2>Listado de Cuentas</h2>

      {cuentaSeleccionada && (
        <EditarCuentaForm
          cuenta={cuentaSeleccionada}
          onCancel={cancelarEdicion}
          onUpdate={actualizarLista}
        />
      )}

      {cuentas.length === 0 ? (
        <p>No hay cuentas registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Saldo</th>
              <th>Tipo Saldo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cuentas.map((cuenta) => (
              <tr key={cuenta.Codigo_cuenta}>
                <td>{cuenta.Codigo_cuenta}</td>
                <td>{cuenta.Nombre}</td>
                <td>{cuenta.Saldo}</td>
                <td>{cuenta.tipo_saldo}</td>
                <td>
                  <button
                    className="boton-eliminar"
                    onClick={() => eliminarCuenta(cuenta.Codigo_cuenta)}
                    title="Eliminar cuenta"
                    disabled = {cuenta.Saldo > 0}
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    className="boton-editar"
                    onClick={() => handleEditar(cuenta)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaCuentas;
