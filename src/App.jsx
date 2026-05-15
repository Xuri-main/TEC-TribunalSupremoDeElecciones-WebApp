import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Servicios from './pages/Servicios'; // Importación con el nuevo nombre

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
    
      <Header onOpenMenu={() => setMenuOpen(true)} />
      


      <main>
        <Routes>

          <Route path="/" element={<Servicios />} />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;