import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detector de scroll avanzado con umbral mínimo para máxima responsividad
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`w-full h-20 md:h-24 fixed top-0 left-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-white shadow-md border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1650px] mx-auto px-6 md:px-12 lg:px-16 h-full flex items-center justify-between">
        
        {/* LOGO (Maximizado en escala sin alterar el alto del header) */}
        <a href="#" className="flex items-center h-full z-50" aria-label="TSE Inicio">
          <Link to="/" className="flex items-center gap-3 transition-transform duration-300 hover:scale-105">
            <img 
            src="/LogoTSE.png" 
            alt="Logo TSE" 
            className="h-14 w-auto md:h-16 object-contain transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              // Fallback por si el logo no resuelve la ruta relativa en alguna vista
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          </Link>
          
          {/* Escudo geométrico alternativo oculto en carga correcta */}
          <svg className="w-10 h-10 text-[#003DA5] hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </a>

        {/* NAVEGACIÓN DESKTOP*/}
        <nav className="hidden lg:flex items-center gap-10">
          <Link 
            to="/sobre-el-tse" 
            className={`link-tse py-1 text-xl tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-[#1A1A1A] hover:text-[#003DA5]' : 'text-white hover:text-[#CE1126]'
            }`}
          >
            Sobre el TSE
          </Link>
          <a 
            href="#" 
            className={`link-tse py-1 text-xl tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-[#1A1A1A] hover:text-[#003DA5]' : 'text-white hover:text-[#CE1126]'
            }`}
          >
            Registro Civil
          </a>
          <a 
            href="#" 
            className={`link-tse py-1 text-xl tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-[#1A1A1A] hover:text-[#003DA5]' : 'text-white hover:text-[#CE1126]'
            }`}
          >
            Elecciones
          </a>
          <a 
            href="#" 
            className={`link-tse py-1 text-xl tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-[#1A1A1A] hover:text-[#003DA5]' : 'text-white hover:text-[#CE1126]'
            }`}
          >
            Normativa
          </a>
        </nav>

        {/* INTERACCIONES Y ACCESIBILIDAD (Buscador adaptativo y CTA de Consultas) */}
        <div className="hidden lg:flex items-center gap-8">
          <a 
            href="#" 
            className={`font-body font-semibold text-xl tracking-tight flex items-center gap-2 transition-colors duration-300 ${
              scrolled ? 'text-gray-700 hover:text-[#003DA5]' : 'text-gray-200 hover:text-white'
            }`}
          >
            <Search className={`w-5 h-5 transition-colors duration-300 ${scrolled ? 'text-[#003DA5]' : 'text-white'}`} /> 
            Buscar
          </a>
          <Link 
            to="/consultas" 
            className={`px-7 py-3 rounded-full font-body font-bold text-lg tracking-wide transition-all duration-300 shadow-sm ${
              scrolled 
                ? 'bg-[#003DA5] text-white hover:bg-[#002868] hover:shadow-md' 
                : 'bg-white text-[#003DA5] hover:bg-[#CE1126] hover:text-white shadow-blue-950/20'
            }`}
          >
            Consultas Civiles
          </Link>
        </div>

        {/* BOTÓN MENÚ MÓVIL CON ADAPTACIÓN DE COLOR */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className={`lg:hidden z-50 p-2 transition-colors duration-300 ${
            scrolled || mobileMenuOpen ? 'text-[#1A1A1A]' : 'text-white'
          }`}
          aria-label="Abrir menú de navegación"
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL EN PANTALLA COMPLETA */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col justify-center items-center gap-8 text-3xl font-title font-bold text-[#1A1A1A] animate-in fade-in duration-300">
          <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#003DA5] transition-colors">Sobre el TSE</a>
          <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#003DA5] transition-colors">Registro Civil</a>
          <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#003DA5] transition-colors">Elecciones</a>
          <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#003DA5] transition-colors">Normativa</a>
          <div className="w-16 h-1 bg-[#CE1126] my-2"></div>
          <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-xl bg-[#003DA5] text-white px-8 py-4 rounded-full font-body shadow-lg">
            Consultas Civiles
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;