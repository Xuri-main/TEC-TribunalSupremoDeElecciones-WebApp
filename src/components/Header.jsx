import React from 'react';
import { Menu, MapPin, Newspaper, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ onOpenMenu }) {
  return (
    <header className="sticky top-0 z-[100] w-full px-6 py-4 font-jakarta">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-7xl mx-auto bg-[#003DA5]/90 backdrop-blur-md rounded-2xl border-b-4 border-[#CE1126] shadow-xl flex justify-between items-center px-6 py-3"
      >
        
        {/* IZQUIERDA: Logo del TSE */}
        <div className="flex items-center">
          <img 
            src="/LogoTSE.png" 
            alt="Logo TSE" 
            className="h-auto w-[160px] object-contain transition-all" 
          />
        </div>

        {/* DERECHA: Navegación */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 text-white/90 font-semibold text-[13px] uppercase tracking-wider">
            <a href="/" className="hover:text-[#FFD700] flex items-center gap-2 transition-all hover:translate-y-[-1px]">
              <Home size={16} strokeWidth={2.5} /> Servicios
            </a>
            <a href="/noticias" className="hover:text-[#FFD700] flex items-center gap-2 transition-all hover:translate-y-[-1px]">
              <Newspaper size={16} strokeWidth={2.5} /> Noticias
            </a>
            <a href="/contacto" className="hover:text-[#FFD700] flex items-center gap-2 transition-all hover:translate-y-[-1px]">
              <MapPin size={16} strokeWidth={2.5} /> Sedes y Contacto
            </a>
          </nav>

          <div className="h-6 w-[1px] bg-white/20"></div>

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: '#FFD700', color: '#003DA5' }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenMenu}
            className="flex items-center gap-3 bg-white text-[#003DA5] px-6 py-2.5 rounded-xl font-extrabold transition-all shadow-lg group"
          >
            <span className="text-[11px] uppercase tracking-[0.2em]">Menú</span>
            <Menu size={22} />
          </motion.button>
        </div>

        {/* Móvil */}
        <div className="md:hidden">
          <button onClick={onOpenMenu} className="text-white">
            <Menu size={32} />
          </button>
        </div>
      </motion.div>
    </header>
  );
}