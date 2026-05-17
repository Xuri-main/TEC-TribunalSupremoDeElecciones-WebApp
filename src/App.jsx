import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AccessibilityBubble from './components/AccessibilityBubble'
import Home from './pages/Home'
import SobreTSE from './pages/SobreTSE'
import Servicios from './pages/Servicios'
import Consultas from './pages/Consultas'

function App() {
  return (
    <>
      <Header />

      <main id="contenido-principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-el-tse" element={<SobreTSE />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      <AccessibilityBubble />
    </>
  )
}

export default App