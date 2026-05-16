import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SobreTSE from './pages/SobreTSE';
// 1. IMPORTA TU NUEVA PÁGINA AQUÍ:
import Consultas from './pages/Consultas';

function App() {
  return (
    <>
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-el-tse" element={<SobreTSE />} />
          
          {/* 2. AGREGA LA RUTA DE CONSULTAS AQUÍ: */}
          <Route path="/consultas" element={<Consultas />} />

          {/* Ruta de escape */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;