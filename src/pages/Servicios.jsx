import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Contrast } from 'lucide-react';
import { useAccessStore } from '../store/useAccessStore';

export default function Servicios() {
  const { fontSize, incrementFont, decrementFont, highContrast, toggleContrast } = useAccessStore();

  // Clases dinámicas de Tailwind según el estado de alto contraste
  const themeClasses = highContrast 
    ? "bg-black text-yellow-400" 
    : "bg-[#E8E8E8] text-[#1A1A1A]";

  const cardClasses = highContrast
    ? "bg-black border-2 border-yellow-400 text-yellow-400"
    : "bg-white border border-slate-200 shadow-2xl";

  const buttonClasses = highContrast
    ? "bg-yellow-400 text-black font-black"
    : "bg-[#003DA5] text-white hover:bg-[#002D7A] hover:text-[#FFD700]";

  return (
    <div 
      style={{ fontSize: `${fontSize}px` }} 
      className={`min-h-screen transition-colors duration-500 pt-12 pb-24 ${themeClasses}`}
    >
      
      <div className="fixed bottom-8 right-8 z-[150] flex flex-col gap-3 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-700 text-white">
        <p className="text-xs font-bold uppercase tracking-wider text-center text-slate-400 mb-1">Accesibilidad</p>
        <button 
          onClick={toggleContrast}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-sm font-bold transition-all"
        >
          <Contrast size={16} /> Contraste
        </button>
        <div className="flex gap-2 justify-center">
          <button onClick={decrementFont} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold text-sm">- A</button>
          <button onClick={incrementFont} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold text-sm">+ A</button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto text-center px-6 pt-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 font-jakarta"
        >
          ¿Qué servicio <br /> 
          <span className="text-[#003DA5] italic">necesita gestionar?</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto font-medium"
        >
          Ingrese su búsqueda o seleccione uno de los accesos directos más consultados por los ciudadanos costarricenses.
        </motion.p>

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className={`flex items-center p-2 rounded-2xl border-2 transition-all focus-within:border-[#003DA5] ${
            highContrast ? 'border-yellow-400 bg-black' : 'border-slate-300 bg-white shadow-xl'
          }`}>
            <Search className="ml-4 text-slate-400" size={24} />
            <input 
              type="text" 
              placeholder="Escriba aquí (ej: cédula, padrón, nacer...)"
              className="w-full p-4 text-lg outline-none bg-transparent"
            />
            <button className={`p-4 rounded-xl transition-all ${buttonClasses}`}>
              <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {['Consultas Civiles', 'Certificaciones Digitales', 'Documento de Identidad'].map((tag) => (
              <span 
                key={tag} 
                className="px-4 py-2 bg-slate-300/60 text-slate-800 rounded-full text-xs font-bold cursor-pointer hover:bg-[#003DA5] hover:text-white transition-all shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </main>

      <section className="mt-32 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6 font-jakarta tracking-tight">Identidad y Civismo</h2>
          <p className="text-slate-600 leading-relaxed mb-6 font-medium">
            El Tribunal Supremo de Elecciones garantiza la pureza del sufragio y resguarda los hechos vitales que constituyen el estado civil de las personas.
          </p>
          <button className="flex items-center gap-2 font-bold text-[#003DA5] hover:text-[#CE1126] transition-colors text-sm uppercase tracking-wider">
            Ver requisitos de trámites <ArrowRight size={16}/>
          </button>
        </div>
        
        <div className="aspect-[4/3] bg-slate-300/50 rounded-2xl border-2 border-dashed border-slate-400 flex items-center justify-center text-slate-500 font-bold animate-pulse">
          [ Espacio reservado para recurso visual de Juan Santamaría ]
        </div>
      </section>

    </div>
  );
}