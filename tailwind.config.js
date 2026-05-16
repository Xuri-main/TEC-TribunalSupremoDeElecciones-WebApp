/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fondos Oscuros
        tse_bg: '#050B14',        // Azul noche casi negro (Fondo principal)
        tse_card: '#0D1B2A',      // Azul marino profundo (Para tarjetas y secciones)
        
        // Colores Institucionales
        tse_blue: '#003DA5',      // Azul TSE vibrante
        tse_red: '#CE1126',       // Rojo TSE para llamadas a la acción e íconos
        
        // Textos
        tse_text: '#FFFFFF',      // Blanco puro para máxima legibilidad
        tse_text_muted: '#A0AEC0',// Gris claro/azulado para párrafos largos
        
        // Interacciones
        tse_hover: '#FFD700',     // Dorado para hovers
      },
      fontFamily: {
        title: ['Barlow', 'sans-serif'],
        body: ['Public Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}