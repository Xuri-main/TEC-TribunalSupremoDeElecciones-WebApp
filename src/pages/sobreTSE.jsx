import React from 'react';
import { Shield, Target, Award, Scale, Eye, Users, Download, ArrowRight } from 'lucide-react';

const SobreTSE = () => {
  const magistrados = [
    { name: "Eugenia M. Zamora Chavarría", title: "Magistrada Presidenta" },
    { name: "Max Alberto Esquivel Faerron", title: "Magistrado Vicepresidente" },
    { name: "Zetty Maria Bou Valverde", title: "Magistrada Propietaria" },
    { name: "Luis Diego Brenes Villalobos", title: "Magistrado Propietario" }
  ];

  return (
    <div className="w-full min-h-screen bg-[#0A1128]">

      <section className="relative overflow-hidden bg-[#0A1128] text-white pt-44 pb-32 px-6 border-b border-white/5">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#003DA5]/40 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#CE1126]/30 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1650px] mx-auto md:px-12 lg:px-16 relative z-10">
          <h1 className="font-title font-extrabold text-6xl md:text-7xl lg:text-8xl mb-6 leading-[1.05] tracking-tighter">
            Nuestra Institución
          </h1>
          <p className="font-body text-xl md:text-2xl text-gray-300 max-w-4xl leading-relaxed text-balance">
            Garante de la voluntad popular y la custodia de la identidad civil de todos los costarricenses desde 1949.
          </p>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-24 px-6 border-b border-gray-200">
        <div className="max-w-[1650px] mx-auto md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Misión */}
            <div className="bg-white rounded-[28px] p-10 lg:p-14 border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#003DA5] to-[#002868] flex items-center justify-center mb-8 shadow-lg shadow-blue-900/20">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-title font-bold text-4xl text-[#003DA5] mb-6">Misión</h2>
              <p className="font-body text-gray-600 text-lg lg:text-xl leading-relaxed">
                Organizar, dirigir y vigilar de forma exclusiva e independiente los actos relativos al sufragio, así como garantizar la identificación fehaciente de las personas de manera oportuna, transparente y eficiente.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white rounded-[28px] p-10 lg:p-14 border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#CE1126] to-[#990C1A] flex items-center justify-center mb-8 shadow-lg shadow-red-900/20">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-title font-bold text-4xl text-[#CE1126] mb-6">Visión</h2>
              <p className="font-body text-gray-600 text-lg lg:text-xl leading-relaxed">
                Ser una institución de excelencia pública, referente internacional en materia electoral y civil, plenamente confiable, accesible e innovadora para el fortalecimiento continuo de los valores democráticos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid - White Theme */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[1650px] mx-auto md:px-12 lg:px-16 text-center">
          <h2 className="font-title font-bold text-[#1A1A1A] text-4xl lg:text-5xl mb-16">
            Nuestros Valores Institucionales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            <div className="bg-[#F8FAFC] p-10 rounded-[28px] border-t-4 border-[#003DA5] shadow-sm hover:shadow-md transition-all duration-300">
              <Award className="w-12 h-12 text-[#003DA5] mb-6" />
              <h3 className="font-title font-bold text-[#1A1A1A] text-2xl mb-4">Independencia</h3>
              <p className="font-body text-gray-600 text-lg leading-relaxed">
                Autonomía funcional absoluta de los demás poderes del Estado, garantizando resoluciones imparciales.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-10 rounded-[28px] border-t-4 border-[#CE1126] shadow-sm hover:shadow-md transition-all duration-300">
              <Target className="w-12 h-12 text-[#CE1126] mb-6" />
              <h3 className="font-title font-bold text-[#1A1A1A] text-2xl mb-4">Transparencia</h3>
              <p className="font-body text-gray-600 text-lg leading-relaxed">
                Acceso total a la información institucional y rendición de cuentas clara ante los ciudadanos.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-10 rounded-[28px] border-t-4 border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
              <Scale className="w-12 h-12 text-slate-700 mb-6" />
              <h3 className="font-title font-bold text-[#1A1A1A] text-2xl mb-4">Imparcialidad</h3>
              <p className="font-body text-gray-600 text-lg leading-relaxed">
                Equidad estricta y trato igualitario a todas las agrupaciones políticas sin distinción alguna.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Magistrates Section - Glassmorphism Dark Theme (Diseño original de Figma) */}
      <section className="relative bg-[#0A1128] py-24 px-6 overflow-hidden border-t border-b border-white/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-luminosity"></div>
        <div className="max-w-[1650px] mx-auto md:px-12 lg:px-16 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-title font-bold text-[#CE1126] tracking-widest uppercase text-lg mb-4 flex items-center justify-center gap-4">
              <span className="w-12 h-[2px] bg-[#003DA5]"></span>
              Liderazgo
              <span className="w-12 h-[2px] bg-[#003DA5]"></span>
            </h2>
            <h3 className="font-title font-bold text-white text-4xl lg:text-5xl">Magistratura Electoral</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {magistrados.map((magistrate, index) => (
              <div 
                key={index} 
                className="backdrop-blur-md bg-white/5 rounded-[28px] p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#003DA5] to-[#002868] flex items-center justify-center mb-6 shadow-xl shadow-blue-900/30 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="font-title font-bold text-xl text-white mb-2 leading-tight">
                    {magistrate.name}
                  </h3>
                  <p className="font-body text-sm text-[#CE1126] font-semibold tracking-wide uppercase">
                    {magistrate.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Section (Estilo Figma) */}
      <section className="bg-[#003DA5] py-20 px-6 relative overflow-hidden">
        {/* Glow dinámico para el CTA */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="max-w-[1650px] mx-auto md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[32px] p-10 md:p-16">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="font-title font-bold text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Conozca nuestra historia completa
              </h2>
              <p className="font-body text-blue-100 text-lg md:text-xl">
                Explore los hitos cronológicos fundamentales en la consolidación del civismo nacional desde 1949 hasta la actualidad.
              </p>
            </div>
            
            <button className="bg-white text-[#003DA5] font-body font-bold px-10 py-5 rounded-full text-lg hover:bg-[#CE1126] hover:text-white transition-all duration-300 flex items-center gap-3 shadow-xl shadow-blue-950/50 group whitespace-nowrap">
              Descargar Reseña 
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SobreTSE;