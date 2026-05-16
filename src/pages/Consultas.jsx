import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CreditCard, User, ChevronRight, AlertCircle, Loader2, X } from 'lucide-react';

// ─── Base de datos simulada ──────────────────────────────
// El TSE no tiene API pública que tenga habilitado para búsqueda por nombre (al menos de lo que buscamos).
// Para el proyecto Emilio y yo (Esteban) usamos un padrón simulado con nombres reales y datos que podrían ser reales.
const PADRON_MOCK = [
  { cedula: '108780000', nombre: 'CARLOS ALVARADO QUESADA', tipo: 'Física Nacional', provincia: 'San José', canton: 'Montes de Oca' },
  { cedula: '109900000', nombre: 'LAURA CHINCHILLA MIRANDA', tipo: 'Física Nacional', provincia: 'San José', canton: 'San José' },
  { cedula: '106120000', nombre: 'OSCAR ARIAS SANCHEZ', tipo: 'Física Nacional', provincia: 'Heredia', canton: 'Heredia' },
  { cedula: '113200000', nombre: 'ANDREA MORA SANCHEZ', tipo: 'Física Nacional', provincia: 'Cartago', canton: 'Cartago' },
  { cedula: '205430000', nombre: 'JOSE RODRIGUEZ MORA', tipo: 'Física Nacional', provincia: 'Alajuela', canton: 'Alajuela' },
  { cedula: '304120000', nombre: 'MARIA GONZALEZ JIMENEZ', tipo: 'Física Nacional', provincia: 'Cartago', canton: 'Turrialba' },
  { cedula: '401560000', nombre: 'JUAN VARGAS VARGAS', tipo: 'Física Nacional', provincia: 'Heredia', canton: 'San Isidro' },
  { cedula: '502340000', nombre: 'ANA LOPEZ LOPEZ', tipo: 'Física Nacional', provincia: 'Guanacaste', canton: 'Liberia' },
  { cedula: '601890000', nombre: 'PEDRO JIMENEZ ROJAS', tipo: 'Física Nacional', provincia: 'Puntarenas', canton: 'Puntarenas' },
  { cedula: '701230000', nombre: 'SOFIA HERRERA CASTRO', tipo: 'Física Nacional', provincia: 'Limón', canton: 'Limón' },
];

// ─── API: Búsqueda por cédula ─────────────────────────────────────────────────
async function buscarPorCedula(cedulaRaw) {
  // Esto es para eliminar los guiones si es que el usuario pone la cedula con guiones
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
  };
}

// ─── Búsqueda por nombre (usando el banco de nombres que está arriba) ──────────────────────────────
// Normaliza texto: elimina tildes y convierte a mayúsculas para comparar
function normalizar(texto) {
  return texto
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
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

// ─── Componente: Tab button ───────────────────────────────────────────────────
function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-widest transition-all rounded-t-xl
        ${active
          ? 'bg-[#003DA5] text-white shadow-lg'
          : 'bg-white/60 text-[#003DA5] hover:bg-white/90'}`}
    >
      <Icon size={16} strokeWidth={2.5} />
      {label}
      {active && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#CE1126]"
        />
      )}
    </button>
  );
}

// ─── Componente: Tarjeta de resultado único (cédula) ─────────────────────────
function ResultCard({ result, onClose }) {
  const fields = [
    { label: 'Número de cédula', value: result.cedula },
    { label: 'Nombre completo', value: result.nombre },
    { label: 'Tipo de identificación', value: result.tipo },
    { label: 'Estado tributario', value: result.situacion },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="mt-8 bg-white rounded-2xl shadow-2xl border border-[#D0D0D0] overflow-hidden"
    >
      <div className="bg-[#003DA5] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#CE1126] rounded-full p-2">
            <User size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white/70 text-xs uppercase tracking-widest font-semibold">Resultado de consulta</p>
            <p className="text-white font-extrabold text-lg leading-tight">{result.nombre}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>
      <div className="h-1 bg-[#CE1126]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E8E8]">
        {fields.map(({ label, value }, i) => (
          <div key={i} className="px-6 py-5">
            <p className="text-xs text-[#003DA5] font-bold uppercase tracking-widest mb-1">{label}</p>
            <p className="text-[#1A1A1A] font-semibold text-base">{value}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#E8E8E8] px-6 py-3 flex items-center gap-2">
        <AlertCircle size={14} className="text-[#003DA5]" />
        <p className="text-xs text-[#1A1A1A]/60">
          Datos obtenidos del registro público del TSE. Consulta realizada el{' '}
          {new Date().toLocaleDateString('es-CR', { day: '2-digit', month: 'long', year: 'numeric' })}.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Componente: Lista de resultados múltiples (nombre) ───────────────────────
function MultiResultList({ results, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      className="mt-8 space-y-4"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-[#003DA5] font-bold text-sm uppercase tracking-widest">
          {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
        </p>
        <button onClick={onClose} className="text-[#CE1126] hover:underline text-xs font-semibold flex items-center gap-1">
          <X size={14} /> Limpiar
        </button>
      </div>
      {results.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="bg-white rounded-xl border border-[#D0D0D0] shadow px-6 py-4 flex items-center justify-between group hover:border-[#003DA5] transition-all"
        >
          <div>
            <p className="font-extrabold text-[#1A1A1A]">{r.nombre}</p>
            <p className="text-xs text-[#003DA5] mt-0.5">
              Cédula: {r.cedula} · {r.provincia}, {r.canton}
            </p>
          </div>
          <ChevronRight size={18} className="text-[#D0D0D0] group-hover:text-[#003DA5] transition-colors" />
        </motion.div>
      ))}
      <div className="flex items-center gap-2 pt-2">
        <AlertCircle size={14} className="text-[#003DA5]" />
        <p className="text-xs text-[#1A1A1A]/50">
          Datos del padrón electoral del TSE. Consulta realizada el{' '}
          {new Date().toLocaleDateString('es-CR', { day: '2-digit', month: 'long', year: 'numeric' })}.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function Consultas() {
  const [tab, setTab] = useState('cedula');
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  function clearResults() {
    setResult(null);
    setResults(null);
    setError(null);
  }

  function handleTabChange(newTab) {
    setTab(newTab);
    clearResults();
    setCedula('');
    setNombre(''); setApellido1(''); setApellido2('');
  }

  async function handleSearchCedula(e) {
    e.preventDefault();
    if (!cedula.trim()) return;
    clearResults();
    setLoading(true);
    try {
      const data = await buscarPorCedula(cedula);
      setResult(data);
    } catch {
      setError('No se encontraron resultados para esa cédula. Verificá el número e intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  function handleSearchNombre(e) {
    e.preventDefault();
    if (!nombre.trim() || !apellido1.trim()) return;
    clearResults();
    setLoading(true);
    try {
      const data = buscarPorNombre(nombre, apellido1, apellido2);
      setResults(data);
    } catch {
      setError('No se encontraron resultados. Verificá los datos e intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] font-jakarta pb-20">

      {/* Hero azul */}
      <div className="bg-[#003DA5] pt-10 pb-16 px-6 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-8 -right-8 w-40 h-40 rounded-full bg-[#CE1126]/20 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[3px] w-8 bg-[#CE1126] rounded-full" />
            <span className="text-white/60 text-xs uppercase tracking-[0.25em] font-semibold">
              Tribunal Supremo de Elecciones
            </span>
          </div>
          <h1 className="text-white text-3xl sm:text-4xl font-extrabold leading-tight mb-2">
            Consultas Civiles
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl">
            Consultá información del padrón electoral y registro civil de Costa Rica de forma rápida y segura.
          </p>
        </motion.div>
      </div>

      {/* Tarjeta del formulario */}
      <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 24 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex gap-1 px-4 pt-4 bg-[#E8E8E8]/60 border-b border-[#D0D0D0]">
            <TabButton active={tab === 'cedula'} onClick={() => handleTabChange('cedula')} icon={CreditCard} label="Por cédula" />
            <TabButton active={tab === 'nombre'} onClick={() => handleTabChange('nombre')} icon={User} label="Por nombre" />
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">

              {/* Formulario cédula */}
              {tab === 'cedula' && (
                <motion.form
                  key="cedula-form"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSearchCedula}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#003DA5] mb-2">
                      Número de cédula
                    </label>
                    <div className="relative">
                      <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#003DA5]/50" />
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Ej: 1-0000-0000 o 10000000"
                        value={cedula}
                        onChange={e => { clearResults(); setCedula(e.target.value.replace(/[^\d-]/g, '')); }}
                        maxLength={12}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-[#D0D0D0] focus:border-[#003DA5] focus:outline-none text-[#1A1A1A] font-semibold text-base transition-all bg-white placeholder:text-[#1A1A1A]/30"
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-[#1A1A1A]/40">
                      Podés escribir con o sin guiones (1-2345-6789 o 123456789).
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#CE1126' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading || !cedula.trim()}
                    className="w-full flex items-center justify-center gap-3 bg-[#003DA5] text-white py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-widest shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? <><Loader2 size={18} className="animate-spin" /> Consultando...</> : <><Search size={18} /> Consultar</>}
                  </motion.button>
                </motion.form>
              )}

              {/* Formulario nombre */}
              {tab === 'nombre' && (
                <motion.form
                  key="nombre-form"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSearchNombre}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Nombre(s)', placeholder: 'Ej: María', value: nombre, setter: setNombre, required: true },
                      { label: 'Primer apellido', placeholder: 'Ej: González', value: apellido1, setter: setApellido1, required: true },
                      { label: 'Segundo apellido', placeholder: 'Ej: Mora', value: apellido2, setter: setApellido2, required: false },
                    ].map(({ label, placeholder, value, setter, required }) => (
                      <div key={label}>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#003DA5] mb-2">
                          {label}{required && <span className="text-[#CE1126] ml-0.5">*</span>}
                        </label>
                        <input
                          type="text"
                          placeholder={placeholder}
                          value={value}
                          onChange={e => { clearResults(); setter(e.target.value); }}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-[#D0D0D0] focus:border-[#003DA5] focus:outline-none text-[#1A1A1A] font-semibold text-base transition-all bg-white placeholder:text-[#1A1A1A]/30"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#1A1A1A]/40">
                    Los campos con <span className="text-[#CE1126] font-bold">*</span> son obligatorios. La búsqueda no distingue mayúsculas ni tildes.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#CE1126' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading || !nombre.trim() || !apellido1.trim()}
                    className="w-full flex items-center justify-center gap-3 bg-[#003DA5] text-white py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-widest shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? <><Loader2 size={18} className="animate-spin" /> Buscando...</> : <><Search size={18} /> Buscar</>}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 flex items-start gap-3 bg-[#CE1126]/10 border border-[#CE1126]/30 rounded-xl px-5 py-4"
                >
                  <AlertCircle size={18} className="text-[#CE1126] shrink-0 mt-0.5" />
                  <p className="text-[#CE1126] text-sm font-semibold">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Resultados */}
            <AnimatePresence>
              {result && <ResultCard result={result} onClose={clearResults} />}
              {results && <MultiResultList results={results} onClose={clearResults} />}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 flex items-center gap-2 px-2"
        >
          <div className="h-[2px] w-4 bg-[#CE1126] rounded-full" />
          <p className="text-xs text-[#1A1A1A]/50 font-medium">
            Servicio oficial del Tribunal Supremo de Elecciones de Costa Rica · Los datos son de carácter público.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
