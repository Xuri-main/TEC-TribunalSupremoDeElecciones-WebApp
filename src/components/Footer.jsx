import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#121212] py-16 lg:py-24">
      <div className="max-w-[1650px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Top Footer */}
        <div className="mb-20">
          <p className="text-white text-2xl md:text-3xl tracking-tight leading-none mb-4">
            ¿Necesita asistencia directa?
          </p>
          <p className="text-gray-400 text-lg tracking-tight mb-8 max-w-md text-balance">
            Consulte nuestros horarios, sedes regionales y contactos telefónicos en todo el país.
          </p>
          <a href="#" className="text-[#121212] bg-white border border-transparent hover:bg-gray-200 transition duration-150 px-8 py-3 rounded-full text-lg tracking-tight inline-block">
            Contáctenos
          </a>
        </div>

        {/* Bottom Footer Links */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-t border-white/10 pt-10 gap-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <nav>
              <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-gray-300 text-lg tracking-tight">
                <li><a href="#" className="hover:text-white transition">Inicio</a></li>
                <li><a href="#" className="hover:text-white transition">Mapa del Sitio</a></li>
                <li><a href="#" className="hover:text-white transition">Privacidad y Seguridad</a></li>
                <li><a href="#" className="hover:text-white transition">Términos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition">Ubicación de Sedes</a></li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center justify-between gap-8">
            {/* Redes Sociales */}
            <div className="flex items-center gap-4 text-gray-400">
              <a href="#" className="hover:text-white transition p-2"><FaFacebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition p-2"><FaTwitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition p-2"><FaYoutube className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition p-2"><FaInstagram className="w-5 h-5" /></a>
            </div>
          </div>

        </div>
        
        {/* Copyright */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>&copy; Tribunal Supremo de Elecciones, República de Costa Rica. Sitio de actualización diaria.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;