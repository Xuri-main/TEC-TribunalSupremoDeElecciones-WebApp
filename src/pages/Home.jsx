import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Search,
  BadgeCheck,
  IdCard,
  Landmark,
  ClipboardCheck,
  Vote,
  Scale,
  BookOpen,
  GraduationCap,
  Newspaper,
  ShieldCheck,
  UsersRound,
  Calendar,
  ChevronDown,
  ExternalLink,
  MapPin,
  Phone,
  FileText
} from 'lucide-react';

// ==========================================
// --- DATOS TOMADOS DEL SITIO TSE ---
// ==========================================
const serviciosVisitados = [
  {
    titulo: 'Consultas civiles',
    descripcion: 'Acceso al sistema de consultas civiles del TSE.',
    href: 'https://servicioselectorales.tse.go.cr/chc',
    icono: Search
  },
  {
    titulo: 'Certificaciones digitales',
    descripcion: 'Verificación y emisión de certificaciones digitales.',
    href: 'https://www.consulta.tse.go.cr/appcdi#/verificador',
    icono: BadgeCheck
  },
  {
    titulo: 'Documento de identidad',
    descripcion: 'Información sobre cédula de identidad y trámites relacionados.',
    href: 'https://www.tse.go.cr/cedula.html',
    icono: IdCard
  }
];

const seccionesPrincipales = [
  {
    titulo: 'Sobre el TSE',
    descripcion: 'Información institucional, organización y función constitucional.',
    href: 'https://www.tse.go.cr/seccion_sobreeltse.html',
    icono: Landmark
  },
  {
    titulo: 'Servicios de registración civil',
    descripcion: 'Trámites civiles, certificaciones, identificación y consultas.',
    href: 'https://www.tse.go.cr/seccion_serviciosregistracioncivil.html',
    icono: ClipboardCheck
  },
  {
    titulo: 'Elecciones y partidos políticos',
    descripcion: 'Procesos electorales, partidos, resultados y participación ciudadana.',
    href: 'https://www.tse.go.cr/seccion_elecionesypartidospoliticos.html',
    icono: Vote
  },
  {
    titulo: 'Jurisprudencia y Normativa',
    descripcion: 'Normas, resoluciones, legislación electoral y criterios jurídicos.',
    href: 'https://www.tse.go.cr/seccion_jurisprudenciaynormativa.html',
    icono: Scale
  },
  {
    titulo: 'Formación en democracia',
    descripcion: 'Recursos educativos para fortalecer la cultura democrática.',
    href: 'https://www.tse.go.cr/seccion_formacionendemocracia.html',
    icono: GraduationCap
  },
  {
    titulo: 'Publicaciones',
    descripcion: 'Materiales, documentos, investigaciones y publicaciones oficiales.',
    href: 'https://www.tse.go.cr/seccion_publicaciones.html',
    icono: BookOpen
  }
];

const recursosInstitucionales = [
  {
    titulo: 'Transparencia y rendición de cuentas',
    descripcion: 'Información pública, gestión institucional y acceso a datos de interés ciudadano.',
    href: 'https://www.tse.go.cr/transparencia.html',
    icono: ShieldCheck
  },
  {
    titulo: 'Revista de Derecho Electoral',
    descripcion: 'Publicación especializada sobre derecho electoral, democracia y normativa.',
    href: 'https://www.tse.go.cr/revista/revista.htm',
    icono: Newspaper
  },
  {
    titulo: 'Participación política de las mujeres',
    descripcion: 'Espacio informativo sobre participación, igualdad y representación política.',
    href: 'https://www.tse.go.cr/participacionpoliticamujer.html',
    icono: UsersRound
  }
];

const noticias = [
  {
    fecha: '01/11/2025',
    titulo: 'Nuevo sitio - ¡Que no lo engañen!',
    descripcion: 'Herramientas para consultar información oficial y reconocer contenidos engañosos.',
    href: 'https://www.tse.go.cr/que-no-lo-enganen.html',
    imagen: 'https://www.tse.go.cr/imgs/info/aviso-informese-index.jpg'
  },
  {
    fecha: '13/02/2026',
    titulo: 'Próximo lunes comenzará escrutinio definitivo de la papeleta diputadil',
    descripcion: 'Comunicado oficial sobre el inicio del escrutinio definitivo.',
    href: 'https://www.tse.go.cr/comunicado1163.html',
    imagen: 'https://www.tse.go.cr/imgs/info/comunicado-1163-index.jpg'
  },
  {
    fecha: '16/02/2026',
    titulo: 'TSE ofrecerá servicios a domicilio en comunidades del cantón de Bagaces',
    descripcion: 'Información sobre servicios institucionales disponibles para comunidades específicas.',
    href: 'https://www.tse.go.cr/comunicado1164.html',
    imagen: 'https://www.tse.go.cr/imgs/info/comunicado-1164-index.jpg'
  }
];

const enlacesApoyo = [
  {
    titulo: 'Mapa del sitio',
    href: 'https://www.tse.go.cr/mapa.html',
    icono: FileText
  },
  {
    titulo: 'Horarios y contactos telefónicos',
    href: 'https://www.tse.go.cr/contactenos.html',
    icono: Phone
  },
  {
    titulo: 'Ubicación de sedes',
    href: 'https://www.google.com/maps/d/u/0/edit?mid=1hPleNSq-ciAmw6CowP-4sxI-G9k&usp=sharing',
    icono: MapPin
  },
  {
    titulo: 'Política de privacidad y seguridad',
    href: 'https://www.tse.go.cr/politica_privacidad_seguridad.html',
    icono: ShieldCheck
  }
];

// ==========================================
// --- COMPONENTE REUTILIZABLE PARA LINKS ---
// ==========================================
const LinkSeguro = ({ href, className = '', children, ariaLabel }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={ariaLabel}
    className={className}
  >
    {children}
  </a>
);

// ==========================================
// --- COMPONENTE DE LA ANTORCHA ---
// ==========================================
const IlluminatedTorchWidget = () => (
  <div className="relative flex items-center justify-center h-full w-full">
    {/* EFECTO DE FUEGO */}
    <div className="absolute top-[15%] right-[25%] w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] bg-[#CE1126]/30 blur-[90px] rounded-full transition-all duration-1000 animate-flicker pointer-events-none z-0"></div>
    <div className="absolute top-[10%] right-[30%] w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] bg-[#FF8C00]/40 blur-[70px] rounded-full animate-flicker-slow pointer-events-none z-0"></div>
    <div className="absolute top-[5%] right-[35%] w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] bg-[#FFD700]/50 blur-[40px] rounded-full animate-pulse pointer-events-none z-0"></div>

    <img
      src="/antorcha.svg"
      alt="Antorcha de la Democracia"
      className="w-auto h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] object-contain relative z-10 drop-shadow-[0_15px_35px_rgba(255,140,0,0.3)] animate-float"
      onError={(e) => {
        console.error('No se encontró antorcha.svg en la carpeta public');
        e.target.style.opacity = '0.5';
      }}
    />

    <style>{`
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
// --- SECCIÓN HERO ---
// ==========================================
const HeroSection = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center pt-20 bg-[#0A1128] overflow-hidden">
      {/* Malla dinámica de fondo */}
      <div className="absolute inset-0 opacity-10 pointer-events-none text-blue-400">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-[15%] lg:translate-x-[8%] 2xl:translate-x-[2%] pointer-events-none hidden md:block z-0">
        <IlluminatedTorchWidget />
      </div>

      <div className="max-w-[1650px] w-full mx-auto px-6 md:px-12 lg:px-16 relative z-10 py-16">
        <div className="lg:w-[65%] max-w-4xl relative z-20">
          <p className="font-body text-blue-200 text-sm md:text-base uppercase tracking-[0.35em] mb-5">
            Tribunal Supremo de Elecciones
          </p>

          <h1 className="font-title font-bold text-white tracking-tighter leading-[1.05] text-6xl md:text-7xl lg:text-8xl mb-8 text-balance drop-shadow-xl">
            Democracia e identidad de <span className="text-[#CE1126]">Costa Rica</span>
          </h1>

          <p className="font-body text-gray-200 text-xl md:text-2xl lg:text-3xl tracking-tight leading-snug mb-12 max-w-2xl text-balance drop-shadow-md">
            Órgano Constitucional superior responsable de la organización, dirección y vigilancia de los actos relativos al sufragio.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 font-body font-semibold text-lg">
            <LinkSeguro
              href="https://www.consulta.tse.go.cr/appcdi#/verificador"
              className="text-white bg-[#003DA5] hover:bg-[#002868] transition-colors duration-300 px-8 py-4 rounded-full text-center shadow-lg shadow-blue-950/50 border border-blue-400/20"
              ariaLabel="Ir a certificaciones digitales del TSE"
            >
              Certificaciones digitales
            </LinkSeguro>

            <LinkSeguro
              href="https://www.tse.go.cr/cedula.html"
              className="text-white bg-[#0A1128]/50 backdrop-blur-md border-2 border-white/20 hover:border-[#CE1126] hover:bg-white/10 transition-all duration-300 px-8 py-4 rounded-full text-center flex items-center justify-center gap-2"
              ariaLabel="Ir a información de documento de identidad"
            >
              Documento de identidad <ArrowRight className="w-5 h-5 text-[#CE1126]" />
            </LinkSeguro>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10 animate-bounce transition-opacity duration-500 ${
          hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-70'
        }`}
      >
        <span className="text-white font-body text-sm tracking-widest uppercase">Descubrir</span>
        <ChevronDown className="text-white w-6 h-6" />
      </div>
    </section>
  );
};

// ==========================================
// --- SERVICIOS MÁS VISITADOS ---
// ==========================================
const ServiciosVisitadosSection = () => (
  <section className="w-full bg-[#EDE7DC] py-20 lg:py-24">
    <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <div>
          <p className="font-body text-[#CE1126] font-bold tracking-[0.25em] uppercase text-sm mb-3">
            Accesos rápidos
          </p>
          <h2 className="font-title font-bold text-[#161A1D] text-4xl md:text-5xl tracking-tight">
            Servicios más visitados
          </h2>
        </div>
        <p className="font-body text-[#4B5563] text-lg max-w-2xl leading-relaxed">
          Los trámites y consultas principales quedan visibles desde el inicio para que el usuario no tenga que buscarlos dentro del menú.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {serviciosVisitados.map((servicio) => {
          const Icono = servicio.icono;

          return (
            <LinkSeguro
              key={servicio.titulo}
              href={servicio.href}
              ariaLabel={`Ingresar a ${servicio.titulo}`}
              className="group rounded-3xl bg-[#F7F2EA] border border-[#D8D0C4] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[190px]"
            >
              <div className="flex items-start justify-between gap-5 mb-7">
                <div className="w-14 h-14 rounded-2xl bg-[#15191F] text-[#F7F2EA] flex items-center justify-center group-hover:bg-[#003DA5] transition-colors">
                  <Icono className="w-7 h-7" />
                </div>
                <ExternalLink className="w-5 h-5 text-[#7A756E] group-hover:text-[#CE1126] transition-colors" />
              </div>

              <h3 className="font-title font-bold text-[#161A1D] text-2xl mb-3">
                {servicio.titulo}
              </h3>
              <p className="font-body text-[#5F6670] leading-relaxed">
                {servicio.descripcion}
              </p>
            </LinkSeguro>
          );
        })}
      </div>
    </div>
  </section>
);

// ==========================================
// --- CUADRÍCULA PRINCIPAL TIPO TSE ---
// ==========================================
const CuadriculaPrincipalSection = () => (
  <section className="w-full bg-[#F1EEE8] py-20 lg:py-28">
    <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16">
      <div className="text-center max-w-4xl mx-auto mb-14">
        <p className="font-body text-[#003DA5] font-bold tracking-[0.25em] uppercase text-sm mb-3">
          Menú principal
        </p>
        <h2 className="font-title font-bold text-[#161A1D] text-4xl md:text-6xl tracking-tight leading-tight">
          Encuentre la información del TSE por secciones
        </h2>
        <p className="font-body text-[#555B64] text-lg md:text-xl mt-5 leading-relaxed">
          Una cuadrícula de botones similar al sitio original, pero con más aire visual, mejor contraste y tarjetas más claras para navegar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {seccionesPrincipales.map((seccion) => {
          const Icono = seccion.icono;

          return (
            <LinkSeguro
              key={seccion.titulo}
              href={seccion.href}
              ariaLabel={`Abrir sección ${seccion.titulo}`}
              className="group relative overflow-hidden rounded-3xl bg-[#DFE4E8] hover:bg-[#D7DDE3] border border-[#CAD2D9] min-h-[150px] p-7 flex items-center gap-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-[#003DA5] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300"></div>

              <div className="shrink-0 w-16 h-16 rounded-2xl bg-[#111418] text-[#F1EEE8] flex items-center justify-center shadow-sm group-hover:bg-[#CE1126] transition-colors duration-300">
                <Icono className="w-8 h-8" strokeWidth={2.2} />
              </div>

              <div>
                <h3 className="font-title font-bold text-[#14171A] text-xl md:text-2xl leading-tight">
                  {seccion.titulo}
                </h3>
                <p className="font-body text-[#525A63] text-sm md:text-base leading-relaxed mt-2">
                  {seccion.descripcion}
                </p>
              </div>
            </LinkSeguro>
          );
        })}
      </div>
    </div>
  </section>
);

// ==========================================
// --- RECURSOS INSTITUCIONALES ---
// ==========================================
const RecursosInstitucionalesSection = () => (
  <section className="w-full bg-[#E8ECEF] py-20 lg:py-28">
    <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-12 lg:items-end">
        <div className="lg:w-1/2">
          <p className="font-body text-[#CE1126] font-bold tracking-[0.25em] uppercase text-sm mb-3">
            Información institucional
          </p>
          <h2 className="font-title font-bold text-[#161A1D] text-4xl md:text-5xl tracking-tight leading-tight">
            Recursos destacados para consulta ciudadana
          </h2>
        </div>
        <p className="lg:w-1/2 font-body text-[#555B64] text-lg leading-relaxed">
          Estos módulos reemplazan las tarjetas rígidas del diseño anterior por bloques más compactos, con contenido explicativo y una llamada de acción visible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {recursosInstitucionales.map((recurso) => {
          const Icono = recurso.icono;

          return (
            <article
              key={recurso.titulo}
              className="rounded-[2rem] bg-[#F6F1E8] border border-[#D6D1C8] p-8 min-h-[330px] flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="w-20 h-20 rounded-3xl bg-[#15191F] text-[#F6F1E8] flex items-center justify-center mb-8">
                  <Icono className="w-10 h-10" />
                </div>
                <h3 className="font-title font-bold text-[#15191F] text-2xl md:text-3xl leading-tight mb-4">
                  {recurso.titulo}
                </h3>
                <p className="font-body text-[#5F6670] text-base md:text-lg leading-relaxed">
                  {recurso.descripcion}
                </p>
              </div>

              <LinkSeguro
                href={recurso.href}
                ariaLabel={`Ingresar a ${recurso.titulo}`}
                className="inline-flex items-center justify-center gap-2 mt-8 w-full rounded-full bg-[#003DA5] hover:bg-[#002868] text-[#F6F1E8] font-body font-bold px-6 py-4 transition-colors"
              >
                Ingresar <ArrowRight className="w-5 h-5" />
              </LinkSeguro>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

// ==========================================
// --- NOTICIAS ---
// ==========================================
const NoticiasSection = () => (
  <section className="w-full py-20 lg:py-28 bg-[#111827] border-t border-[#2D3748]">
    <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <div>
          <p className="font-body text-[#F4B4BC] font-bold tracking-[0.25em] uppercase text-sm mb-3">
            Actualidad
          </p>
          <h2 className="font-title font-bold text-[#F7F2EA] text-4xl md:text-6xl tracking-tight">
            Noticias del TSE
          </h2>
        </div>

        <LinkSeguro
          href="https://www.tse.go.cr/comunicados.html"
          ariaLabel="Ver más comunicados del TSE"
          className="inline-flex items-center gap-2 text-[#F7F2EA] font-body font-bold border border-[#F7F2EA]/20 rounded-full px-6 py-3 hover:bg-[#F7F2EA]/10 transition-colors w-fit"
        >
          Ver más comunicados <ArrowRight className="w-5 h-5" />
        </LinkSeguro>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <LinkSeguro
          href={noticias[0].href}
          ariaLabel={`Leer noticia ${noticias[0].titulo}`}
          className="group lg:col-span-6 rounded-[2rem] overflow-hidden bg-[#1F2937] border border-[#374151] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
        >
          <div className="aspect-[16/9] overflow-hidden bg-[#2D3748]">
            <img
              src={noticias[0].imagen}
              alt={noticias[0].titulo}
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
            />
          </div>

          <article className="p-8">
            <p className="font-body text-[#CBD5E1] font-semibold flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-[#F4B4BC]" /> {noticias[0].fecha}
            </p>
            <h3 className="font-title font-bold text-[#F7F2EA] text-3xl md:text-4xl leading-tight mb-4 group-hover:text-[#F4B4BC] transition-colors">
              {noticias[0].titulo}
            </h3>
            <p className="font-body text-[#CBD5E1] text-lg leading-relaxed mb-7">
              {noticias[0].descripcion}
            </p>
            <span className="inline-flex items-center gap-2 font-body font-bold text-[#93C5FD] group-hover:text-[#F7F2EA]">
              Ver noticia <ArrowRight className="w-5 h-5" />
            </span>
          </article>
        </LinkSeguro>

        <div className="lg:col-span-6 grid grid-cols-1 gap-6">
          {noticias.slice(1).map((noticia) => (
            <LinkSeguro
              key={noticia.titulo}
              href={noticia.href}
              ariaLabel={`Leer noticia ${noticia.titulo}`}
              className="group rounded-[2rem] bg-[#1F2937] border border-[#374151] p-6 md:p-7 flex flex-col md:flex-row gap-6 hover:bg-[#253244] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="md:w-44 shrink-0 aspect-[16/10] md:aspect-square rounded-2xl overflow-hidden bg-[#2D3748]">
                <img
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <article className="flex flex-col justify-between">
                <div>
                  <p className="font-body text-[#CBD5E1] font-semibold flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-[#F4B4BC]" /> {noticia.fecha}
                  </p>
                  <h3 className="font-title font-bold text-[#F7F2EA] text-2xl leading-tight group-hover:text-[#F4B4BC] transition-colors">
                    {noticia.titulo}
                  </h3>
                  <p className="font-body text-[#CBD5E1] mt-3 leading-relaxed">
                    {noticia.descripcion}
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 font-body font-bold text-[#93C5FD] group-hover:text-[#F7F2EA] mt-5">
                  Ver noticia <ArrowRight className="w-5 h-5" />
                </span>
              </article>
            </LinkSeguro>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ==========================================
// --- CONTACTO Y APOYO ---
// ==========================================
const ContactoApoyoSection = () => (
  <section className="w-full bg-[#EDE7DC] py-20 lg:py-24">
    <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16">
      <div className="rounded-[2rem] bg-[#171A21] text-[#F7F2EA] p-8 md:p-12 lg:p-14 overflow-hidden relative">
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#003DA5]/30 blur-3xl rounded-full"></div>
        <div className="absolute -left-24 bottom-0 w-72 h-72 bg-[#CE1126]/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <p className="font-body text-[#F4B4BC] font-bold tracking-[0.25em] uppercase text-sm mb-3">
              Apoyo al usuario
            </p>
            <h2 className="font-title font-bold text-4xl md:text-5xl tracking-tight leading-tight mb-5">
              Enlaces útiles y canales de consulta
            </h2>
            <p className="font-body text-[#CBD5E1] text-lg leading-relaxed">
              Un cierre más ordenado para que la persona pueda encontrar sedes, contactos, mapa del sitio y políticas sin depender solamente del pie de página.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {enlacesApoyo.map((enlace) => {
              const Icono = enlace.icono;

              return (
                <LinkSeguro
                  key={enlace.titulo}
                  href={enlace.href}
                  ariaLabel={`Abrir ${enlace.titulo}`}
                  className="group rounded-2xl bg-[#F7F2EA]/10 hover:bg-[#F7F2EA]/15 border border-[#F7F2EA]/15 p-5 flex items-center gap-4 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F7F2EA] text-[#171A21] flex items-center justify-center shrink-0">
                    <Icono className="w-6 h-6" />
                  </div>
                  <div className="font-body font-bold text-lg leading-tight">
                    {enlace.titulo}
                  </div>
                  <ExternalLink className="w-5 h-5 ml-auto text-[#CBD5E1] group-hover:text-[#F7F2EA]" />
                </LinkSeguro>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ==========================================
// --- HOME ---
// ==========================================
const Home = () => {
  return (
    <main className="w-full bg-[#F1EEE8]">
      <HeroSection />
      <ServiciosVisitadosSection />
      <CuadriculaPrincipalSection />
      <RecursosInstitucionalesSection />
      <NoticiasSection />
      <ContactoApoyoSection />
    </main>
  );
};

export default Home;