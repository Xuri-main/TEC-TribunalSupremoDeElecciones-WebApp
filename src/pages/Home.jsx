import React from 'react';
import { ArrowRight, FolderOpen, Vote, Scale, Calendar, ChevronDown } from 'lucide-react';

// ==========================================
// --- COMPONENTE DE LA ANTORCHA ---
// ==========================================
const IlluminatedTorchWidget = () => (
  <div className="relative flex items-center justify-center h-full w-full">
    
    {/* EFECTO DE FUEGO (Escalado proporcionalmente a la nueva medida) */}
    <div className="absolute top-[15%] right-[25%] w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] bg-[#CE1126]/30 blur-[90px] rounded-full transition-all duration-1000 animate-flicker pointer-events-none z-0"></div>
    <div className="absolute top-[10%] right-[30%] w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] bg-[#FF8C00]/40 blur-[70px] rounded-full animate-flicker-slow pointer-events-none z-0"></div>
    <div className="absolute top-[5%] right-[35%] w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] bg-[#FFD700]/50 blur-[40px] rounded-full animate-pulse pointer-events-none z-0"></div>


    <img 
      src="/antorcha.svg" 
      alt="Antorcha de la Democracia" 
      className="w-auto h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] object-contain relative z-10 drop-shadow-[0_15px_35px_rgba(255,140,0,0.3)] animate-float"
      onError={(e) => {
        console.error("No se encontró antorcha.svg en la carpeta public");
        e.target.style.opacity = '0.5';
      }}
    />

    <style jsx>{`
      @keyframes flicker {
        0%, 100% { opacity: 1; transform: scale(1) translate(0, 0); }
        33% { opacity: 0.7; transform: scale(1.05) translate(3px, -3px); }
        66% { opacity: 0.85; transform: scale(0.95) translate(-3px, 3px); }
      }
      @keyframes flicker-slow {
        0%, 100% { opacity: 0.8; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(1.15); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-12px); } 
      }
      .animate-flicker {
        animation: flicker 0.15s ease-in-out infinite alternate;
      }
      .animate-flicker-slow {
        animation: flicker-slow 2.5s ease-in-out infinite;
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
    `}</style>
  </div>
);

// ==========================================
// --- SECCIÓN HERO---
// ==========================================
const HeroSection = () => (
  <section className="relative w-full min-h-screen flex items-center pt-20 bg-[#0A1128] overflow-hidden">
    
    {/* Malla Dinámica de Fondo */}
    <div className="absolute inset-0 opacity-10 pointer-events-none text-blue-400">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-[15%] lg:translate-x-[8%] 2xl:translate-x-[2%] pointer-events-none hidden md:block z-0">
      <IlluminatedTorchWidget />
    </div>

    {/* Contenedor principal de Textos */}
    <div className="max-w-[1650px] w-full mx-auto px-6 md:px-12 lg:px-16 relative z-10 py-16">
      
      <div className="lg:w-[65%] max-w-4xl relative z-20">
        <h1 className="font-title font-bold text-white tracking-tighter leading-[1.05] text-6xl md:text-7xl lg:text-8xl mb-8 text-balance drop-shadow-xl">
          Democracia e identidad de <span className="text-[#CE1126]">Costa Rica</span>
        </h1>
        <p className="font-body text-gray-200 text-xl md:text-2xl lg:text-3xl tracking-tight leading-snug mb-12 max-w-2xl text-balance drop-shadow-md">
          El Órgano Constitucional superior responsable de la dirección del sufragio y la pureza de la identidad ciudadana.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 font-body font-semibold text-lg">
          <a href="#" className="text-white bg-[#003DA5] hover:bg-[#002868] transition-colors duration-300 px-8 py-4 rounded-full text-center shadow-lg shadow-blue-950/50 border border-blue-400/20">
            Certificaciones Digitales
          </a>
          <a href="#" className="text-white bg-[#0A1128]/50 backdrop-blur-md border-2 border-white/20 hover:border-[#CE1126] hover:bg-white/10 transition-all duration-300 px-8 py-4 rounded-full text-center flex items-center justify-center gap-2">
            Documento de Identidad <ArrowRight className="w-5 h-5 text-[#CE1126]" />
          </a>
        </div>
      </div>

    </div>

    {/* Indicador de Scroll */}
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-70 z-10">
      <span className="text-white font-body text-sm tracking-widest uppercase">Descubrir</span>
      <ChevronDown className="text-white w-6 h-6" />
    </div>
  </section>
);


// --- RESTO DE SECCIONES ---

const FeaturesSection = () => (
  <section className="w-full bg-white py-24 lg:py-32 transition-colors duration-500">
    <div className="max-w-[1650px] mx-auto px-6 md:px-12 lg:px-16">
      <div className="flex flex-col md:flex-row gap-5 lg:gap-12 items-baseline mb-16">
        <div className="lg:w-1/3">
          <h2 className="font-title font-bold text-[#CE1126] text-xl md:text-2xl uppercase tracking-widest flex items-center gap-2">
            <span className="w-8 h-1 bg-[#003DA5] block"></span> Pilares de Acción
          </h2>
        </div>
        <div className="lg:w-2/3">
          <h3 className="font-title font-bold text-[#1A1A1A] text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-balance">
            Transparencia absoluta en procesos electorales y protección total civil.
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 mt-12">
        {/* Tarjetas... */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 p-8 lg:p-12 bg-[#F8FAFC] rounded-3xl shadow-lg border-l-8 border-[#003DA5] transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="w-full lg:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden shadow-inner bg-gray-200">
            <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80" alt="Documentos Civiles" className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition duration-500" />
          </div>
          <div className="w-full lg:w-2/3">
            <div className="bg-[#003DA5] text-white w-16 h-16 flex items-center justify-center rounded-2xl mb-6 shadow-md">
              <FolderOpen size={32} />
            </div>
            <h4 className="font-title font-bold text-[#003DA5] text-3xl lg:text-4xl mb-4">
              Servicios de Registración Civil
            </h4>
            <p className="font-body text-[#475569] font-medium text-lg lg:text-xl tracking-tight leading-relaxed">
              Inscripción fehaciente de nacimientos, matrimonios, defunciones y la gestión oportuna de la cédula de identidad, blindando los datos más sensibles bajo estrictas normativas nacionales.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const NewsSection = () => (
  <section className="w-full py-24 lg:py-32 bg-[#0A1128] border-t border-white/10 transition-colors duration-500">
    <div className="max-w-[1650px] mx-auto px-6 md:px-12 lg:px-16">
      <h2 className="font-title font-bold text-[#CE1126] text-xl lg:text-2xl tracking-widest uppercase mb-12">
        Noticias e Informes Recientes
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Noticia 1 */}
        <a href="#" className="group block h-full">
          <article className="h-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-white/10 border border-white/10">
            <p className="text-gray-300 font-body font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#CE1126]" /> 01/11/2025
            </p>
            <h3 className="font-title font-bold text-white text-2xl md:text-3xl lg:text-4xl leading-snug mb-8 group-hover:text-[#CE1126] transition-colors">
              "Nuevo sitio - ¡Que no lo engañen! Herramientas para verificar información oficial."
            </h3>
            <div className="flex items-center gap-2 font-body font-bold text-blue-400 group-hover:text-white transition-colors">
              Leer noticia completa <ArrowRight className="w-6 h-6" />
            </div>
          </article>
        </a>

        {/* Noticia 2 */}
        <a href="#" className="group block h-full">
          <article className="h-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-white/10 border border-white/10">
            <p className="text-gray-300 font-body font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" /> 13/02/2026
            </p>
            <h3 className="font-title font-bold text-white text-2xl md:text-3xl lg:text-4xl leading-snug mb-8 group-hover:text-[#CE1126] transition-colors">
              "Próximo lunes comenzará escrutinio definitivo de las elecciones legislativas."
            </h3>
            <div className="flex items-center gap-2 font-body font-bold text-[#CE1126] group-hover:text-white transition-colors">
              Leer noticia completa <ArrowRight className="w-6 h-6" />
            </div>
          </article>
        </a>
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <main className="w-full">
      <HeroSection />
      <FeaturesSection />
      <NewsSection />
    </main>
  );
};

export default Home;