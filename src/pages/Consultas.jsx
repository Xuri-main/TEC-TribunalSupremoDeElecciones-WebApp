import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CreditCard, User, X, ChevronRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// ─── BASE DE DATOS SIMULADA (De Esteban) ──────────────────────────────
const PADRON_MOCK = [
  { cedula: '1-0878-0000', nombre: 'CARLOS ALVARADO QUESADA', tipo: 'Física Nacional', provincia: 'San José', canton: 'Montes de Oca' },
  { cedula: '1-0990-0000', nombre: 'LAURA CHINCHILLA MIRANDA', tipo: 'Física Nacional', provincia: 'San José', canton: 'San José' },
  { cedula: '1-0612-0000', nombre: 'OSCAR ARIAS SANCHEZ', tipo: 'Física Nacional', provincia: 'Heredia', canton: 'Heredia' },
  { cedula: '1-1320-0000', nombre: 'ANDREA MORA SANCHEZ', tipo: 'Física Nacional', provincia: 'Cartago', canton: 'Cartago' },
  { cedula: '2-0543-0000', nombre: 'JOSE RODRIGUEZ MORA', tipo: 'Física Nacional', provincia: 'Alajuela', canton: 'Alajuela' },
  { cedula: '3-0412-0000', nombre: 'MARIA GONZALEZ JIMENEZ', tipo: 'Física Nacional', provincia: 'Cartago', canton: 'Turrialba' },
  { cedula: '4-0156-0000', nombre: 'JUAN VARGAS VARGAS', tipo: 'Física Nacional', provincia: 'Heredia', canton: 'San Isidro' },
  { cedula: '5-0234-0000', nombre: 'ANA LOPEZ LOPEZ', tipo: 'Física Nacional', provincia: 'Guanacaste', canton: 'Liberia' },
  { cedula: '6-0189-0000', nombre: 'PEDRO JIMENEZ ROJAS', tipo: 'Física Nacional', provincia: 'Puntarenas', canton: 'Puntarenas' },
  { cedula: '7-0123-0000', nombre: 'SOFIA HERRERA CASTRO', tipo: 'Física Nacional', provincia: 'Limón', canton: 'Limón' },
];

// ─── LÓGICA DE BÚSQUEDA (De Esteban) ──────────────────────────────────
async function buscarPorCedula(cedulaRaw) {
  const cedula = cedulaRaw.replace(/-/g, '').replace(/\s/g, '').trim();
  const res = await fetch(`https://api.hacienda.go.cr/fe/ae?identificacion=${cedula}`);
  if (!res.ok) throw new Error('No encontrado');
  const data = await res.json();
  if (!data || !data.nombre) throw new Error('No encontrado');

  return {
    cedula: data.identificacion ?? cedula,
    nombre: data.nombre ?? '—',
    tipo: data.tipoIdentificacion ?? 'Física Nacional',
    situacion: data.situacion?.moroso ? 'Moroso' : 'Al día',
    provincia: 'No disponible en API', 
  };
}

function normalizar(texto) {
  return texto.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function buscarPorNombre(nombre, apellido1, apellido2) {
  const n = normalizar(nombre);
  const a1 = normalizar(apellido1);
  const a2 = normalizar(apellido2);

  const resultados = PADRON_MOCK.filter(persona => {
    const nombreCompleto = normalizar(persona.nombre);
    const contieneNombre = nombreCompleto.includes(n);
    const contieneA1 = nombreCompleto.includes(a1);
    const contieneA2 = a2 === '' || nombreCompleto.includes(a2);
    return contieneNombre && contieneA1 && contieneA2;
  });

  if (resultados.length === 0) throw new Error('No encontrado');
  return resultados;
}

// ─── COMPONENTE PRINCIPAL ──────────────────────────────────────────────
export default function Consultas() {
  const [activeTab, setActiveTab] = useState('cedula');
  const [cedulaInput, setCedulaInput] = useState('');
  
  const [nombreInput, setNombreInput] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Guardamos el resultado en lugar del resultType estático de Figma
  const [result, setResult] = useState(null);
  const [results, setResults] = useState(null);

  const clearResults = () => {
    setResult(null);
    setResults(null);
    setError(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    clearResults();
    setCedulaInput('');
    setNombreInput('');
    setApellido1('');
    setApellido2('');
  };

  const handleSearchCedula = async (e) => {
    e.preventDefault();
    if (!cedulaInput.trim()) return;
    clearResults();
    setLoading(true);
    try {
      const data = await buscarPorCedula(cedulaInput);
      setResult(data);
    } catch {
      // Fallback temporal buscando en el MOCK si la API de Hacienda falla o no es de hacienda
      const mockResult = PADRON_MOCK.find(p => p.cedula.replace(/-/g, '') === cedulaInput.replace(/-/g, ''));
      if(mockResult) {
        setResult({ ...mockResult, situacion: 'Al día' });
      } else {
        setError('No se encontraron resultados para esa cédula. Verifique el número e intente de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchNombre = (e) => {
    e.preventDefault();
    if (!nombreInput.trim() || !apellido1.trim()) return;
    clearResults();
    setLoading(true);
    try {
      // Pequeño timeout simulado para efecto de búsqueda UX
      setTimeout(() => {
        const data = buscarPorNombre(nombreInput, apellido1, apellido2);
        setResults(data);
        setLoading(false);
      }, 600);
    } catch {
      setError('No se encontraron resultados. Verifique los datos e intente de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F6F9] pb-24">
      
      {/* ================= HERO SECTION (Estilo Figma) ================= */}
      <section className="relative bg-[#0A1128] pb-32 md:pb-40 overflow-hidden pt-24">
        {/* Luces volumétricas */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#003DA5]/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-[#CE1126]/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-8 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center md:justify-start gap-3 mb-6"
          >
            <div className="h-1 w-12 bg-[#CE1126]"></div>
            <span className="font-body font-semibold text-white/90 text-sm tracking-wide uppercase">
              Tribunal Supremo de Elecciones
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-title font-extrabold text-5xl md:text-7xl text-white mb-6 tracking-tight"
          >
            Consultas Civiles
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-body text-lg md:text-xl text-white/80 max-w-3xl mx-auto md:mx-0 leading-relaxed"
          >
            Consulte información del padrón electoral y registro civil de Costa Rica de forma rápida, segura y transparente.
          </motion.p>
        </div>
      </section>

      {/* ================= TARJETA FLOTANTE (Overlapping) ================= */}
      <div className="relative -mt-24 md:-mt-32 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-[32px] shadow-2xl shadow-[#0A1128]/10 overflow-hidden border border-gray-100">
            
            {/* TABS HEADER */}
            <div className="flex border-b border-gray-100 bg-gray-50/50">
              <button
                onClick={() => handleTabChange('cedula')}
                className={`flex-1 py-6 px-4 md:px-8 font-title font-bold text-base md:text-lg transition-all relative ${
                  activeTab === 'cedula' ? 'text-[#003DA5]' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center justify-center gap-2"><CreditCard size={20} /> POR CÉDULA</span>
                {activeTab === 'cedula' && <motion.div layoutId="border" className="absolute bottom-0 left-0 w-full h-1 bg-[#CE1126]" />}
              </button>
              
              <button
                onClick={() => handleTabChange('nombre')}
                className={`flex-1 py-6 px-4 md:px-8 font-title font-bold text-base md:text-lg transition-all relative ${
                  activeTab === 'nombre' ? 'text-[#003DA5]' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center justify-center gap-2"><User size={20} /> POR NOMBRE</span>
                {activeTab === 'nombre' && <motion.div layoutId="border" className="absolute bottom-0 left-0 w-full h-1 bg-[#CE1126]" />}
              </button>
            </div>

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                
                {/* ─── FORMULARIO CÉDULA ─── */}
                {activeTab === 'cedula' && (
                  <motion.form
                    key="form-cedula"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}
                    onSubmit={handleSearchCedula}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block font-title font-bold text-sm uppercase text-[#003DA5] mb-3 tracking-widest">
                        Número de Cédula
                      </label>
                      <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2">
                          <CreditCard className="w-6 h-6 text-[#003DA5]/40" />
                        </div>
                        <input
                          type="text"
                          value={cedulaInput}
                          onChange={(e) => setCedulaInput(e.target.value.replace(/[^\d-]/g, ''))}
                          placeholder="Ej: 1-0878-0000 o 108780000"
                          maxLength={12}
                          className="w-full pl-16 pr-6 py-5 border-2 border-gray-200 rounded-2xl font-body text-lg text-[#1A1A1A] focus:border-[#003DA5] focus:ring-4 focus:ring-[#003DA5]/10 outline-none transition-all placeholder:text-gray-300 font-semibold"
                        />
                      </div>
                      <p className="mt-3 text-sm font-body text-gray-500">
                        Puede ingresar el formato numérico con o sin guiones.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !cedulaInput.trim()}
                      className="w-full bg-[#003DA5] text-white font-title font-bold text-lg py-5 rounded-2xl hover:bg-[#002868] transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />}
                      CONSULTAR PADRÓN
                    </button>
                  </motion.form>
                )}

                {/* ─── FORMULARIO NOMBRE ─── */}
                {activeTab === 'nombre' && (
                  <motion.form
                    key="form-nombre"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}
                    onSubmit={handleSearchNombre}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-title font-bold text-sm uppercase text-[#003DA5] mb-3 tracking-widest">
                          Primer Apellido <span className="text-[#CE1126]">*</span>
                        </label>
                        <input
                          type="text"
                          value={apellido1}
                          onChange={(e) => setApellido1(e.target.value)}
                          placeholder="Ej: González"
                          className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl font-body text-lg text-[#1A1A1A] font-semibold focus:border-[#003DA5] focus:ring-4 focus:ring-[#003DA5]/10 outline-none transition-all placeholder:text-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block font-title font-bold text-sm uppercase text-[#003DA5] mb-3 tracking-widest">
                          Segundo Apellido
                        </label>
                        <input
                          type="text"
                          value={apellido2}
                          onChange={(e) => setApellido2(e.target.value)}
                          placeholder="Ej: Mora (Opcional)"
                          className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl font-body text-lg text-[#1A1A1A] font-semibold focus:border-[#003DA5] focus:ring-4 focus:ring-[#003DA5]/10 outline-none transition-all placeholder:text-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-title font-bold text-sm uppercase text-[#003DA5] mb-3 tracking-widest">
                        Nombre(s) <span className="text-[#CE1126]">*</span>
                      </label>
                      <input
                        type="text"
                        value={nombreInput}
                        onChange={(e) => setNombreInput(e.target.value)}
                        placeholder="Ej: María José"
                        className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl font-body text-lg text-[#1A1A1A] font-semibold focus:border-[#003DA5] focus:ring-4 focus:ring-[#003DA5]/10 outline-none transition-all placeholder:text-gray-300"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !nombreInput.trim() || !apellido1.trim()}
                      className="w-full bg-[#003DA5] text-white font-title font-bold text-lg py-5 rounded-2xl hover:bg-[#002868] transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />}
                      BUSCAR CIUDADANO
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* ─── MENSAJE DE ERROR ─── */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 32 }} exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#CE1126]/10 border border-[#CE1126]/20 rounded-2xl p-5 flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-[#CE1126] flex-shrink-0 mt-0.5" />
                      <p className="font-body font-semibold text-[#CE1126]">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ─── RESULTADO ÚNICO (Diseño Figma Premium) ─── */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    className="mt-12 pt-12 border-t border-gray-100"
                  >
                    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50">
                      
                      {/* Cabecera del Resultado */}
                      <div className="bg-[#003DA5] px-6 md:px-10 py-8 flex items-center gap-6 relative overflow-hidden">
                        {/* Glow decorativo interno */}
                        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 blur-3xl rounded-full"></div>
                        
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div className="relative z-10">
                          <p className="font-title font-bold text-[#FFD700] text-xs uppercase tracking-widest mb-1">
                            Ciudadano Encontrado
                          </p>
                          <h3 className="font-title font-bold text-2xl md:text-3xl text-white">
                            {result.nombre}
                          </h3>
                        </div>
                      </div>

                      {/* Grid de Datos */}
                      <div className="p-6 md:p-10 grid md:grid-cols-2 gap-8 bg-[#F8FAFC]">
                        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                          <div className="w-12 h-12 rounded-xl bg-[#003DA5]/10 flex items-center justify-center flex-shrink-0">
                            <CreditCard className="w-6 h-6 text-[#003DA5]" />
                          </div>
                          <div>
                            <p className="font-title font-bold text-xs uppercase text-gray-400 tracking-widest mb-1">Número de cédula</p>
                            <p className="font-body font-bold text-xl text-[#1A1A1A]">{result.cedula}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                          <div className="w-12 h-12 rounded-xl bg-[#003DA5]/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-6 h-6 text-[#003DA5]" />
                          </div>
                          <div>
                            <p className="font-title font-bold text-xs uppercase text-gray-400 tracking-widest mb-1">Tipo Identificación</p>
                            <p className="font-body font-bold text-xl text-[#1A1A1A]">{result.tipo}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${result.situacion === 'Al día' ? 'bg-green-100' : 'bg-orange-100'}`}>
                            {result.situacion === 'Al día' ? <CheckCircle className="w-6 h-6 text-green-600" /> : <AlertCircle className="w-6 h-6 text-orange-600" />}
                          </div>
                          <div>
                            <p className="font-title font-bold text-xs uppercase text-gray-400 tracking-widest mb-1">Estado Tributario</p>
                            <p className={`font-body font-bold text-xl ${result.situacion === 'Al día' ? 'text-green-600' : 'text-orange-600'}`}>{result.situacion}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                          <div className="w-12 h-12 rounded-xl bg-[#003DA5]/10 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-6 h-6 text-[#003DA5]" />
                          </div>
                          <div>
                            <p className="font-title font-bold text-xs uppercase text-gray-400 tracking-widest mb-1">Inscripción Electoral</p>
                            <p className="font-body font-bold text-xl text-[#1A1A1A]">{result.provincia}</p>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 md:px-10 pb-8 pt-4 bg-[#F8FAFC]">
                        <button onClick={clearResults} className="w-full py-4 border-2 border-[#003DA5] rounded-2xl font-title font-bold text-[#003DA5] hover:bg-[#003DA5] hover:text-white transition-colors">
                          LIMPIAR RESULTADO Y REALIZAR NUEVA CONSULTA
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ─── MÚLTIPLES RESULTADOS (Lista) ─── */}
              <AnimatePresence>
                {results && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    className="mt-12 pt-12 border-t border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#003DA5]/10 rounded-xl flex items-center justify-center text-[#003DA5] font-title font-bold text-lg">
                          {results.length}
                        </div>
                        <p className="font-title font-bold text-xl text-[#1A1A1A]">Resultados encontrados</p>
                      </div>
                      
                      <button onClick={clearResults} className="flex items-center gap-2 px-5 py-3 rounded-xl font-title font-bold text-sm text-[#CE1126] bg-[#CE1126]/10 hover:bg-[#CE1126]/20 transition-colors">
                        <X className="w-5 h-5" /> LIMPIAR
                      </button>
                    </div>

                    <div className="space-y-4">
                      {results.map((person, index) => (
                        <motion.button
                          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
                          key={index}
                          // Aquí podrías añadir un onClick que simule buscar esa cédula específica
                          onClick={() => { setCedulaInput(person.cedula); handleTabChange('cedula'); }} 
                          className="w-full p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-[#003DA5] hover:shadow-lg transition-all group text-left"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-title font-bold text-xl md:text-2xl text-[#1A1A1A] mb-3 group-hover:text-[#003DA5] transition-colors">
                                {person.nombre}
                              </h4>
                              <div className="flex flex-wrap gap-6 font-body text-sm md:text-base text-gray-600">
                                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg">
                                  <CreditCard size={16} className="text-gray-400" />
                                  <span className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Cédula:</span>
                                  <span className="font-bold text-[#1A1A1A]">{person.cedula}</span>
                                </span>
                                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg">
                                  <User size={16} className="text-gray-400" />
                                  <span className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Lugar:</span>
                                  <span className="font-bold text-[#1A1A1A]">{person.provincia}, {person.canton}</span>
                                </span>
                              </div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-[#003DA5] flex items-center justify-center transition-colors flex-shrink-0 ml-4">
                              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
          
          {/* Info Footer Legal */}
          <div className="mt-8 text-center flex items-center justify-center gap-2">
            <ShieldIcon />
            <p className="font-body text-sm text-gray-500 font-medium">
              Servicio interconectado oficial del TSE y Ministerio de Hacienda. Datos de carácter público.
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

// Icono decorativo para el footer legal
const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);