import React, { useEffect, useRef, useState } from 'react'
import {
  Accessibility,
  Bot,
  Contrast,
  Minus,
  Plus,
  Search,
  Type,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'

const fontSizes = [
  { label: 'Normal', value: 100 },
  { label: 'Grande', value: 112 },
  { label: 'Muy grande', value: 125 },
]

const botOptions = [
  {
    question: '¿Cómo buscar un servicio?',
    answer:
      'Puede utilizar la opción Buscar del menú principal y escribir palabras como cédula, certificaciones, elecciones, normativa o consultas civiles.',
  },
  {
    question: '¿Dónde están las consultas civiles?',
    answer:
      'Las Consultas Civiles se encuentran dentro del menú principal, en la sección de servicios más visitados.',
  },
  {
    question: '¿Cómo mejorar la lectura?',
    answer:
      'Puede activar el alto contraste o aumentar el tamaño de fuente desde esta burbuja de accesibilidad.',
  },
  {
    question: '¿Cómo navegar con teclado?',
    answer:
      'Use la tecla Tab para moverse entre botones y enlaces. Use Enter para seleccionar una opción y Escape para cerrar menús abiertos.',
  },
]

const AccessibilityBubble = () => {
  const [open, setOpen] = useState(false)
  const [contrastActive, setContrastActive] = useState(false)
  const [fontSizeIndex, setFontSizeIndex] = useState(0)
  const [voiceActive, setVoiceActive] = useState(false)
  const [botOpen, setBotOpen] = useState(false)
  const [botAnswer, setBotAnswer] = useState(
    'Seleccione una consulta para recibir orientación rápida.'
  )

  const panelRef = useRef(null)
  const mainButtonRef = useRef(null)

  useEffect(() => {
    const savedContrast = localStorage.getItem('tse-contrast-active')
    const savedFontSize = localStorage.getItem('tse-font-size-index')

    if (savedContrast === 'true') {
      setContrastActive(true)
      document.body.classList.add('tse-high-contrast')
    }

    if (savedFontSize !== null) {
      const parsedIndex = Number(savedFontSize)

      if (!Number.isNaN(parsedIndex) && fontSizes[parsedIndex]) {
        setFontSizeIndex(parsedIndex)
        document.documentElement.style.fontSize = `${fontSizes[parsedIndex].value}%`
      }
    }
  }, [])

  useEffect(() => {
    if (contrastActive) {
      document.body.classList.add('tse-high-contrast')
    } else {
      document.body.classList.remove('tse-high-contrast')
    }

    localStorage.setItem('tse-contrast-active', String(contrastActive))
  }, [contrastActive])

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSizes[fontSizeIndex].value}%`
    localStorage.setItem('tse-font-size-index', String(fontSizeIndex))
  }, [fontSizeIndex])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setBotOpen(false)
        mainButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleVoiceAssistant = () => {
    if (!('speechSynthesis' in window)) {
      setBotOpen(true)
      setBotAnswer(
        'El navegador actual no permite lectura por voz. Puede usar alto contraste, aumentar la fuente o navegar con teclado.'
      )
      return
    }

    if (voiceActive) {
      window.speechSynthesis.cancel()
      setVoiceActive(false)
      return
    }

    const mainContent =
      document.querySelector('#contenido-principal') ||
      document.querySelector('main') ||
      document.body

    const text = mainContent.innerText
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 2500)

    if (!text) {
      setBotOpen(true)
      setBotAnswer('No se encontró contenido principal para leer en voz alta.')
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'es-CR'
    utterance.rate = 0.95
    utterance.pitch = 1

    utterance.onend = () => {
      setVoiceActive(false)
    }

    utterance.onerror = () => {
      setVoiceActive(false)
      setBotOpen(true)
      setBotAnswer(
        'No fue posible completar la lectura por voz. Intente nuevamente o revise la configuración del navegador.'
      )
    }

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    setVoiceActive(true)
  }

  const decreaseFontSize = () => {
    setFontSizeIndex((current) => Math.max(0, current - 1))
  }

  const increaseFontSize = () => {
    setFontSizeIndex((current) => Math.min(fontSizes.length - 1, current + 1))
  }

  const resetFontSize = () => {
    setFontSizeIndex(0)
  }

  return (
    <div
      className="fixed bottom-6 left-6 z-[90] font-body"
      aria-label="Herramientas de accesibilidad"
    >
      {open && (
        <div
          ref={panelRef}
          id="accessibility-panel"
          className="mb-4 w-[min(92vw,360px)] overflow-hidden rounded-[1.8rem] border border-white/20 bg-[#061A3A] text-white shadow-2xl"
          role="dialog"
          aria-labelledby="accessibility-title"
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-[#071F47] px-5 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                Accesibilidad
              </p>

              <h2 id="accessibility-title" className="mt-1 text-xl font-bold">
                Herramientas de apoyo
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white hover:text-[#002868] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35"
              aria-label="Cerrar herramientas de accesibilidad"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-3 p-4">
            <button
              type="button"
              onClick={toggleVoiceAssistant}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-left transition hover:bg-white hover:text-[#002868] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35"
              aria-pressed={voiceActive}
            >
              <span className="flex items-center gap-3">
                {voiceActive ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}

                <span>
                  <span className="block font-bold">
                    {voiceActive ? 'Detener lectura' : 'Asistente de voz'}
                  </span>
                  <span className="block text-sm opacity-70">
                    Lee el contenido principal
                  </span>
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setContrastActive((current) => !current)}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-left transition hover:bg-white hover:text-[#002868] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35"
              aria-pressed={contrastActive}
            >
              <span className="flex items-center gap-3">
                <Contrast className="h-5 w-5" />

                <span>
                  <span className="block font-bold">Alto contraste</span>
                  <span className="block text-sm opacity-70">
                    {contrastActive ? 'Activado' : 'Desactivado'}
                  </span>
                </span>
              </span>

              <span
                className={`h-6 w-11 rounded-full p-1 transition ${
                  contrastActive ? 'bg-[#F6C400]' : 'bg-white/25'
                }`}
                aria-hidden="true"
              >
                <span
                  className={`block h-4 w-4 rounded-full bg-white transition ${
                    contrastActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </span>
            </button>

            <div className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3">
              <div className="mb-3 flex items-center gap-3">
                <Type className="h-5 w-5" />

                <div>
                  <p className="font-bold">Tamaño de fuente</p>
                  <p className="text-sm text-white/70">
                    {fontSizes[fontSizeIndex].label}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
                <button
                  type="button"
                  onClick={decreaseFontSize}
                  disabled={fontSizeIndex === 0}
                  className="rounded-full bg-white/10 p-2 transition hover:bg-white hover:text-[#002868] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35"
                  aria-label="Disminuir tamaño de fuente"
                >
                  <Minus className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={resetFontSize}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-white hover:text-[#002868] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35"
                >
                  Restablecer
                </button>

                <button
                  type="button"
                  onClick={increaseFontSize}
                  disabled={fontSizeIndex === fontSizes.length - 1}
                  className="rounded-full bg-white/10 p-2 transition hover:bg-white hover:text-[#002868] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35"
                  aria-label="Aumentar tamaño de fuente"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setBotOpen((current) => !current)}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-left transition hover:bg-white hover:text-[#002868] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35"
              aria-expanded={botOpen}
              aria-controls="accessibility-bot"
            >
              <span className="flex items-center gap-3">
                <Bot className="h-5 w-5" />

                <span>
                  <span className="block font-bold">Bot de asistencia</span>
                  <span className="block text-sm opacity-70">
                    Ayuda rápida de navegación
                  </span>
                </span>
              </span>
            </button>

            {botOpen && (
              <div
                id="accessibility-bot"
                className="rounded-2xl border border-white/10 bg-[#031125] p-4"
                aria-live="polite"
              >
                <p className="mb-3 text-sm leading-relaxed text-white/80">
                  {botAnswer}
                </p>

                <div className="grid gap-2">
                  {botOptions.map((option) => (
                    <button
                      key={option.question}
                      type="button"
                      onClick={() => setBotAnswer(option.answer)}
                      className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-left text-sm transition hover:bg-white hover:text-[#002868] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35"
                    >
                      <Search className="h-4 w-4 shrink-0" />
                      {option.question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        ref={mainButtonRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="group flex h-16 w-16 items-center justify-center rounded-full bg-[#003DA5] text-white shadow-2xl shadow-black/30 transition hover:scale-105 hover:bg-[#002868] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F6C400]/70"
        aria-label={
          open
            ? 'Cerrar herramientas de accesibilidad'
            : 'Abrir herramientas de accesibilidad'
        }
        aria-expanded={open}
        aria-controls="accessibility-panel"
      >
        {open ? (
          <X className="h-8 w-8" />
        ) : (
          <Accessibility className="h-8 w-8" />
        )}
      </button>
    </div>
  )
}

export default AccessibilityBubble