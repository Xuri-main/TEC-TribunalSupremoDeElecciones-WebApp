import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  CreditCard,
  User,
  X,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  MapPin,
} from 'lucide-react';

const PADRON_MOCK = [
  { cedula: '1-0878-0000', nombre: 'CARLOS ALVARADO QUESADA', tipo: 'Física Nacional', provincia: 'San José', canton: 'Montes de Oca', situacion: 'Al día' },
  { cedula: '1-0990-0000', nombre: 'LAURA CHINCHILLA MIRANDA', tipo: 'Física Nacional', provincia: 'San José', canton: 'San José', situacion: 'Al día' },
  { cedula: '1-0612-0000', nombre: 'OSCAR ARIAS SANCHEZ', tipo: 'Física Nacional', provincia: 'Heredia', canton: 'Heredia', situacion: 'Al día' },
  { cedula: '1-1320-0000', nombre: 'ANDREA MORA SANCHEZ', tipo: 'Física Nacional', provincia: 'Cartago', canton: 'Cartago', situacion: 'Al día' },
  { cedula: '2-0543-0000', nombre: 'JOSE RODRIGUEZ MORA', tipo: 'Física Nacional', provincia: 'Alajuela', canton: 'Alajuela', situacion: 'Al día' },
  { cedula: '3-0412-0000', nombre: 'MARIA GONZALEZ JIMENEZ', tipo: 'Física Nacional', provincia: 'Cartago', canton: 'Turrialba', situacion: 'Al día' },
  { cedula: '4-0156-0000', nombre: 'JUAN VARGAS VARGAS', tipo: 'Física Nacional', provincia: 'Heredia', canton: 'San Isidro', situacion: 'Al día' },
  { cedula: '5-0234-0000', nombre: 'ANA LOPEZ LOPEZ', tipo: 'Física Nacional', provincia: 'Guanacaste', canton: 'Liberia', situacion: 'Al día' },
  { cedula: '6-0189-0000', nombre: 'PEDRO JIMENEZ ROJAS', tipo: 'Física Nacional', provincia: 'Puntarenas', canton: 'Puntarenas', situacion: 'Al día' },
  { cedula: '7-0123-0000', nombre: 'SOFIA HERRERA CASTRO', tipo: 'Física Nacional', provincia: 'Limón', canton: 'Limón', situacion: 'Al día' },
];

const normalizar = (texto = '') =>
  texto
    .toString()
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const limpiarCedula = (cedula = '') => cedula.replace(/-/g, '').replace(/\s/g, '').trim();

const adaptarPersona = (persona = {}) => ({
  cedula: persona.cedula ?? persona.identificacion ?? 'No disponible',
  nombre: persona.nombre ?? 'No disponible',
  tipo: persona.tipo ?? persona.tipoIdentificacion ?? 'Física Nacional',
  situacion: persona.situacion ?? 'Al día',
  provincia: persona.provincia ?? 'No disponible',
  canton: persona.canton ?? '',
});

async function buscarPorCedula(cedulaRaw) {
  const cedula = limpiarCedula(cedulaRaw);
  const res = await fetch(`https://api.hacienda.go.cr/fe/ae?identificacion=${cedula}`);

  if (!res.ok) throw new Error('No encontrado');

  const data = await res.json();

  if (!data || !data.nombre) throw new Error('No encontrado');

  return adaptarPersona({
    cedula: data.identificacion ?? cedula,
    nombre: data.nombre ?? 'No disponible',
    tipo: data.tipoIdentificacion ?? 'Física Nacional',
    situacion: data.situacion?.moroso ? 'Moroso' : 'Al día',
    provincia: 'No disponible en API',
  });
}

function buscarPorNombre(nombre, apellido1, apellido2) {
  const n = normalizar(nombre);
  const a1 = normalizar(apellido1);
  const a2 = normalizar(apellido2);

  const resultados = PADRON_MOCK.filter((persona) => {
    const nombreCompleto = normalizar(persona.nombre);
    const contieneNombre = nombreCompleto.includes(n);
    const contieneA1 = nombreCompleto.includes(a1);
    const contieneA2 = a2 === '' || nombreCompleto.includes(a2);

    return contieneNombre && contieneA1 && contieneA2;
  });

  if (resultados.length === 0) throw new Error('No encontrado');

  return resultados.map(adaptarPersona);
}

const ResultadoDato = ({ icono: Icono, etiqueta, valor, estado }) => {
  const esEstado = etiqueta === 'Estado';
  const estadoPositivo = valor === 'Al día';

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div
        className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
          esEstado
            ? estadoPositivo
              ? 'bg-green-100'
              : 'bg-orange-100'
            : 'bg-[#003DA5]/10'
        }`}
      >
        <Icono
          className={`h-6 w-6 ${
            esEstado
              ? estadoPositivo
                ? 'text-green-600'
                : 'text-orange-600'
              : 'text-[#003DA5]'
          }`}
        />
      </div>

      <div className="min-w-0">
        <p className="mb-1 font-title text-xs font-bold uppercase tracking-widest text-gray-400">
          {etiqueta}
        </p>
        <p
          className={`break-words font-body text-lg font-bold md:text-xl ${
            esEstado
              ? estadoPositivo
                ? 'text-green-600'
                : 'text-orange-600'
              : 'text-[#1A1A1A]'
          }`}
        >
          {valor || 'No disponible'}
        </p>
      </div>
    </div>
  );
};

const ResultadoPersona = ({ persona, onClear }) => {
  const provinciaCompleta = persona.canton
    ? `${persona.provincia}, ${persona.canton}`
    : persona.provincia;

  const datos = [
    {
      etiqueta: 'Número de cédula',
      valor: persona.cedula,
      icono: CreditCard,
    },
    {
      etiqueta: 'Tipo',
      valor: persona.tipo,
      icono: User,
    },
    {
      etiqueta: 'Estado',
      valor: persona.situacion,
      icono: persona.situacion === 'Al día' ? CheckCircle : AlertCircle,
    },
    {
      etiqueta: 'Provincia',
      valor: provinciaCompleta,
      icono: MapPin,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-12 border-t border-gray-100 pt-12"
    >
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-200/50">
        <div className="relative flex items-center gap-6 overflow-hidden bg-[#003DA5] px-6 py-8 md:px-10">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
            <User className="h-8 w-8 text-white" />
          </div>

          <div className="relative z-10">
            <p className="mb-1 font-title text-xs font-bold uppercase tracking-widest text-[#FFD700]">
              Resultado de consulta
            </p>
            <h3 className="font-title text-2xl font-bold text-white md:text-3xl">
              {persona.nombre}
            </h3>
          </div>
        </div>

        <div className="grid gap-6 bg-[#F8FAFC] p-6 md:grid-cols-2 md:p-10">
          {datos.map((dato) => (
            <ResultadoDato
              key={dato.etiqueta}
              icono={dato.icono}
              etiqueta={dato.etiqueta}
              valor={dato.valor}
            />
          ))}
        </div>

        <div className="bg-[#F8FAFC] px-6 pb-8 pt-2 md:px-10">
          <button
            type="button"
            onClick={onClear}
            className="w-full rounded-2xl border-2 border-[#003DA5] py-4 font-title font-bold text-[#003DA5] transition-colors hover:bg-[#003DA5] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#003DA5]/20"
          >
            LIMPIAR RESULTADO Y REALIZAR NUEVA CONSULTA
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Consultas() {
  const [activeTab, setActiveTab] = useState('cedula');
  const [cedulaInput, setCedulaInput] = useState('');
  const [nombreInput, setNombreInput] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const handleSearchCedula = async (event) => {
    event.preventDefault();

    if (!cedulaInput.trim()) return;

    clearResults();
    setLoading(true);

    try {
      const data = await buscarPorCedula(cedulaInput);
      setResult(data);
    } catch {
      const cedulaBuscada = limpiarCedula(cedulaInput);
      const mockResult = PADRON_MOCK.find(
        (persona) => limpiarCedula(persona.cedula) === cedulaBuscada
      );

      if (mockResult) {
        setResult(adaptarPersona(mockResult));
      } else {
        setError('No se encontraron resultados para esa cédula. Verifique el número e intente de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchNombre = (event) => {
    event.preventDefault();

    if (!nombreInput.trim() || !apellido1.trim()) return;

    clearResults();
    setLoading(true);

    setTimeout(() => {
      try {
        const data = buscarPorNombre(nombreInput, apellido1, apellido2);
        setResults(data);
      } catch {
        setError('No se encontraron resultados. Verifique los datos e intente de nuevo.');
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  const handleSelectPerson = (person) => {
    setResult(adaptarPersona(person));
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F6F9] pb-24">
      <section className="relative overflow-hidden bg-[#0A1128] pb-32 pt-24 md:pb-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[#003DA5]/20 blur-[100px]" />
          <div className="absolute bottom-0 left-1/3 h-[600px] w-[600px] rounded-full bg-[#CE1126]/10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-8 pt-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-center gap-3 md:justify-start"
          >
            <div className="h-1 w-12 bg-[#CE1126]" />
            <span className="font-body text-sm font-semibold uppercase tracking-wide text-white/90">
              Tribunal Supremo de Elecciones
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-title text-5xl font-extrabold tracking-tight text-white md:text-7xl"
          >
            Consultas Civiles
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl font-body text-lg leading-relaxed text-white/80 md:mx-0 md:text-xl"
          >
            Consulte información del padrón electoral y registro civil de Costa Rica de forma rápida, segura y transparente.
          </motion.p>
        </div>
      </section>

      <div className="relative -mt-24 px-6 md:-mt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          className="mx-auto max-w-5xl"
        >
          <div className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-2xl shadow-[#0A1128]/10">
            <div className="flex border-b border-gray-100 bg-gray-50/50">
              <button
                type="button"
                onClick={() => handleTabChange('cedula')}
                className={`relative flex-1 px-4 py-6 font-title text-base font-bold transition-all md:px-8 md:text-lg ${
                  activeTab === 'cedula'
                    ? 'text-[#003DA5]'
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <CreditCard size={20} /> POR CÉDULA
                </span>
                {activeTab === 'cedula' && (
                  <motion.div layoutId="border" className="absolute bottom-0 left-0 h-1 w-full bg-[#CE1126]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('nombre')}
                className={`relative flex-1 px-4 py-6 font-title text-base font-bold transition-all md:px-8 md:text-lg ${
                  activeTab === 'nombre'
                    ? 'text-[#003DA5]'
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <User size={20} /> POR NOMBRE
                </span>
                {activeTab === 'nombre' && (
                  <motion.div layoutId="border" className="absolute bottom-0 left-0 h-1 w-full bg-[#CE1126]" />
                )}
              </button>
            </div>

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                {activeTab === 'cedula' && (
                  <motion.form
                    key="form-cedula"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSearchCedula}
                    className="space-y-6"
                  >
                    <div>
                      <label className="mb-3 block font-title text-sm font-bold uppercase tracking-widest text-[#003DA5]">
                        Número de Cédula
                      </label>
                      <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2">
                          <CreditCard className="h-6 w-6 text-[#003DA5]/40" />
                        </div>
                        <input
                          type="text"
                          value={cedulaInput}
                          onChange={(event) => setCedulaInput(event.target.value.replace(/[^\d-]/g, ''))}
                          placeholder="Ej: 1-0878-0000 o 108780000"
                          maxLength={12}
                          className="w-full rounded-2xl border-2 border-gray-200 py-5 pl-16 pr-6 font-body text-lg font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-gray-300 focus:border-[#003DA5] focus:ring-4 focus:ring-[#003DA5]/10"
                        />
                      </div>
                      <p className="mt-3 font-body text-sm text-gray-500">
                        Puede ingresar el formato numérico con o sin guiones.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !cedulaInput.trim()}
                      className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#003DA5] py-5 font-title text-lg font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-[#002868] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <Search className="h-6 w-6 transition-transform group-hover:scale-110" />
                      )}
                      CONSULTAR PADRÓN
                    </button>
                  </motion.form>
                )}

                {activeTab === 'nombre' && (
                  <motion.form
                    key="form-nombre"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSearchNombre}
                    className="space-y-6"
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-3 block font-title text-sm font-bold uppercase tracking-widest text-[#003DA5]">
                          Primer Apellido <span className="text-[#CE1126]">*</span>
                        </label>
                        <input
                          type="text"
                          value={apellido1}
                          onChange={(event) => setApellido1(event.target.value)}
                          placeholder="Ej: González"
                          className="w-full rounded-2xl border-2 border-gray-200 px-6 py-5 font-body text-lg font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-gray-300 focus:border-[#003DA5] focus:ring-4 focus:ring-[#003DA5]/10"
                        />
                      </div>
                      <div>
                        <label className="mb-3 block font-title text-sm font-bold uppercase tracking-widest text-[#003DA5]">
                          Segundo Apellido
                        </label>
                        <input
                          type="text"
                          value={apellido2}
                          onChange={(event) => setApellido2(event.target.value)}
                          placeholder="Ej: Mora (Opcional)"
                          className="w-full rounded-2xl border-2 border-gray-200 px-6 py-5 font-body text-lg font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-gray-300 focus:border-[#003DA5] focus:ring-4 focus:ring-[#003DA5]/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-3 block font-title text-sm font-bold uppercase tracking-widest text-[#003DA5]">
                        Nombre(s) <span className="text-[#CE1126]">*</span>
                      </label>
                      <input
                        type="text"
                        value={nombreInput}
                        onChange={(event) => setNombreInput(event.target.value)}
                        placeholder="Ej: María José"
                        className="w-full rounded-2xl border-2 border-gray-200 px-6 py-5 font-body text-lg font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-gray-300 focus:border-[#003DA5] focus:ring-4 focus:ring-[#003DA5]/10"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !nombreInput.trim() || !apellido1.trim()}
                      className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#003DA5] py-5 font-title text-lg font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-[#002868] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <Search className="h-6 w-6 transition-transform group-hover:scale-110" />
                      )}
                      BUSCAR CIUDADANO
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-start gap-4 rounded-2xl border border-[#CE1126]/20 bg-[#CE1126]/10 p-5">
                      <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-[#CE1126]" />
                      <p className="font-body font-semibold text-[#CE1126]">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {result && <ResultadoPersona persona={result} onClear={clearResults} />}
              </AnimatePresence>

              <AnimatePresence>
                {results && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-12 border-t border-gray-100 pt-12"
                  >
                    <div className="mb-8 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#003DA5]/10 font-title text-lg font-bold text-[#003DA5]">
                          {results.length}
                        </div>
                        <p className="font-title text-xl font-bold text-[#1A1A1A]">
                          Resultados encontrados
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={clearResults}
                        className="flex items-center gap-2 rounded-xl bg-[#CE1126]/10 px-5 py-3 font-title text-sm font-bold text-[#CE1126] transition-colors hover:bg-[#CE1126]/20"
                      >
                        <X className="h-5 w-5" /> LIMPIAR
                      </button>
                    </div>

                    <div className="space-y-4">
                      {results.map((person, index) => (
                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          key={`${person.cedula}-${index}`}
                          type="button"
                          onClick={() => handleSelectPerson(person)}
                          className="group w-full rounded-2xl border-2 border-gray-100 bg-white p-6 text-left transition-all hover:border-[#003DA5] hover:shadow-lg"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="mb-3 font-title text-xl font-bold text-[#1A1A1A] transition-colors group-hover:text-[#003DA5] md:text-2xl">
                                {person.nombre}
                              </h4>
                              <div className="flex flex-wrap gap-4 font-body text-sm text-gray-600 md:text-base">
                                <span className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1">
                                  <CreditCard size={16} className="text-gray-400" />
                                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Cédula:
                                  </span>
                                  <span className="font-bold text-[#1A1A1A]">{person.cedula}</span>
                                </span>

                                <span className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1">
                                  <MapPin size={16} className="text-gray-400" />
                                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Provincia:
                                  </span>
                                  <span className="font-bold text-[#1A1A1A]">
                                    {person.canton ? `${person.provincia}, ${person.canton}` : person.provincia}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="ml-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-50 transition-colors group-hover:bg-[#003DA5]">
                              <ChevronRight className="h-6 w-6 text-gray-400 transition-colors group-hover:text-white" />
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

          <div className="mt-8 flex items-center justify-center gap-2 text-center">
            <ShieldIcon />
            <p className="font-body text-sm font-medium text-gray-500">
              Servicio interconectado oficial del TSE y Ministerio de Hacienda. Datos de carácter público.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const ShieldIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-400"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
