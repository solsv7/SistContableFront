import React, { useState } from 'react';
import CuentaForm from './components/Cuentas/CuentaForm';
import ListaCuentas from './components/Cuentas/ListaCuentas.js';
import './App.css';


const App = () => {
  const [vista, setVista] = useState('listar');

  return (
      <div className="app-container">
    <header className="app-header">
      <h1 className="app-title">Sistema Contable</h1>
    </header>

    <main className="app-main">
      <div className="App">
        <button onClick={() => setVista('formulario')}>Crear Cuenta</button>
        <button onClick={() => setVista('lista')}>Cuentas</button>
        {vista === 'formulario' ? <CuentaForm /> : <ListaCuentas />}
      </div>
    </main>
</div>
  );
};

export default App;
