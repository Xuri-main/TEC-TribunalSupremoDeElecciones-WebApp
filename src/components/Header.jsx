import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Menu,
  X,
  ChevronRight,
  Landmark,
  FileText,
  Vote,
  Scale,
  BookOpen,
  Newspaper,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { desktopLinks, menuSections } from '../data/tseMenuData'

const iconMap = {
  shield: ShieldCheck,
  landmark: Landmark,
  users: Users,
  file: FileText,
  vote: Vote,
  scale: Scale,
  book: BookOpen,
  newspaper: Newspaper,
}

const normalizeText = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSection, setActiveSection] = useState('Todas')

  const searchInputRef = useRef(null)
  const menuPanelRef = useRef(null)

  const filteredSections = useMemo(() => {
    const term = normalizeText(searchTerm.trim())

    return menuSections
      .filter((section) => {
        if (activeSection === 'Todas') return true
        return section.title === activeSection
      })
      .map((section) => {
        if (!term) return section

        return {
          ...section,
          items: section.items.filter((item) => {
            const itemMatch = normalizeText(item.label).includes(term)
            const sectionMatch = normalizeText(section.title).includes(term)

            return itemMatch || sectionMatch
          }),
        }
      })
      .filter((section) => section.items.length > 0)
  }, [searchTerm, activeSection])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = menuPanelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )

      if (!focusableElements || focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto'

    if (menuOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 250)
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  const openMenu = () => {
    setMenuOpen(true)
  }

  const openMenuFromSearch = () => {
    setMenuOpen(true)

    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 250)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setSearchTerm('')
    setActiveSection('Todas')
  }

  const headerTextColor = scrolled
    ? 'text-[#1A1A1A] hover:text-[#003DA5]'
    : 'text-white hover:text-[#CE1126]'

  const renderMenuItem = (item, sectionTitle) => {
    const itemContent = (
      <>
        <span className="truncate">{item.label}</span>
        <ChevronRight className="h-5 w-5 shrink-0 opacity-55 transition group-hover:translate-x-1 group-hover:opacity-100" />
      </>
    )

    const itemClassName =
      'group flex min-h-[54px] w-full items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.055] px-4 py-3 text-left font-body text-base font-semibold text-white transition duration-300 hover:border-white/30 hover:bg-white hover:text-[#002868] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35'

    if (item.to) {
      return (
        <Link
          key={`${sectionTitle}-${item.label}`}
          to={item.to}
          onClick={closeMenu}
          className={itemClassName}
        >
          {itemContent}
        </Link>
      )
    }

    return (
      <button
        key={`${sectionTitle}-${item.label}`}
        type="button"
        className={itemClassName}
        aria-label={item.label}
      >
        {itemContent}
      </button>
    )
  }

  return (
    <>
      <a
        href="#contenido-principal"
        className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-bold focus:text-[#003DA5] focus:shadow-xl"
      >
        Saltar al contenido principal
      </a>

      <header
        className={`fixed left-0 top-0 z-50 h-20 w-full transition-all duration-500 md:h-24 ${
          scrolled
            ? 'border-b border-gray-200 bg-[#F8F6F0]/95 shadow-md backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1650px] items-center justify-between px-6 md:px-12 lg:px-16">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex h-full items-center gap-3 transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#003DA5]/30"
            aria-label="Ir al inicio"
          >
            <img
              src="/LogoTSE.png"
              alt="Logo del Tribunal Supremo de Elecciones"
              className="h-14 w-auto object-contain md:h-16"
            />
          </Link>

          <nav
            className="hidden items-center gap-10 lg:flex"
            aria-label="Navegación principal"
          >
            {desktopLinks.map((link) =>
              link.to === '#' ? (
                <button
                  key={link.label}
                  type="button"
                  onClick={openMenu}
                  className={`link-tse py-1 text-xl tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 ${headerTextColor}`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`link-tse py-1 text-xl tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 ${headerTextColor}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <button
              type="button"
              onClick={openMenuFromSearch}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-body text-base font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#003DA5]/30 md:text-lg ${
                scrolled
                  ? 'text-gray-700 hover:bg-[#E8E1D4] hover:text-[#003DA5]'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Abrir búsqueda del sitio"
              aria-expanded={menuOpen}
              aria-controls="menu-principal-tse"
            >
              <Search
                className={`h-5 w-5 ${
                  scrolled ? 'text-[#003DA5]' : 'text-white'
                }`}
              />
              <span className="hidden sm:inline">Buscar</span>
            </button>

            <button
              type="button"
              onClick={openMenu}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-body text-base font-bold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#003DA5]/30 md:text-lg ${
                scrolled
                  ? 'bg-[#003DA5] text-white hover:bg-[#002868]'
                  : 'bg-white text-[#003DA5] hover:bg-[#CE1126] hover:text-white'
              }`}
              aria-label="Abrir menú principal"
              aria-expanded={menuOpen}
              aria-controls="menu-principal-tse"
            >
              <Menu className="h-5 w-5" />
              <span>Menú</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[80] transition duration-500 ${
          menuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMenu}
          aria-label="Cerrar menú principal"
          tabIndex={menuOpen ? 0 : -1}
        />

        <section
          id="menu-principal-tse"
          ref={menuPanelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="menu-principal-titulo"
          className={`absolute inset-0 flex h-full w-full flex-col overflow-hidden bg-[#061A3A] text-white shadow-2xl transition-transform duration-500 ease-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="border-b border-white/10 bg-[#071F47] px-6 py-5 md:px-10">
            <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.22em] text-white/60 md:text-sm">
                  Tribunal Supremo de Elecciones
                </p>

                <h2
                  id="menu-principal-titulo"
                  className="mt-1 font-title text-3xl font-bold md:text-5xl"
                >
                  Menú
                </h2>
              </div>

              <button
                type="button"
                onClick={closeMenu}
                className="rounded-full bg-white/10 p-3 text-white transition hover:bg-white hover:text-[#002868] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                aria-label="Cerrar menú principal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mx-auto mt-6 max-w-[1500px]">
              <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white px-5 py-4 text-[#1A1A1A] shadow-xl">
                <Search className="h-6 w-6 shrink-0 text-[#003DA5]" />

                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Buscar en el sitio..."
                  className="w-full bg-transparent font-body text-base outline-none placeholder:text-gray-500 md:text-lg"
                  aria-label="Buscar en el menú principal"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-[#003DA5] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#003DA5]/20"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-7 md:px-10">
            <div className="mx-auto grid max-w-[1500px] gap-7 lg:grid-cols-[280px_1fr]">
              <aside
                className="lg:sticky lg:top-0 lg:h-fit"
                aria-label="Secciones del menú"
              >
                <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-3">
                  <button
                    type="button"
                    onClick={() => setActiveSection('Todas')}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left font-body font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35 ${
                      activeSection === 'Todas'
                        ? 'bg-white text-[#002868]'
                        : 'text-white hover:bg-white/10'
                    }`}
                    aria-pressed={activeSection === 'Todas'}
                  >
                    Todas
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <div className="mt-2 grid gap-1">
                    {menuSections.map((section) => {
                      const Icon = iconMap[section.icon] ?? Landmark
                      const isActive = activeSection === section.title

                      return (
                        <button
                          key={section.title}
                          type="button"
                          onClick={() => setActiveSection(section.title)}
                          className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-body text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35 ${
                            isActive
                              ? 'bg-white text-[#002868]'
                              : 'text-white/82 hover:bg-white/10 hover:text-white'
                          }`}
                          aria-pressed={isActive}
                        >
                          <Icon className="h-5 w-5 shrink-0" />
                          <span>{section.title}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </aside>

              <main aria-label="Opciones del menú">
                {filteredSections.length > 0 ? (
                  <div className="grid gap-8">
                    {filteredSections.map((section) => {
                      const Icon = iconMap[section.icon] ?? Landmark

                      return (
                        <section key={section.title}>
                          <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#002868]">
                              <Icon className="h-5 w-5" />
                            </div>

                            <h3 className="font-title text-2xl font-bold text-white">
                              {section.title}
                            </h3>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {section.items.map((item) =>
                              renderMenuItem(item, section.title)
                            )}
                          </div>
                        </section>
                      )
                    })}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-10 text-center">
                    <p className="font-title text-2xl font-bold">
                      No se encontraron resultados
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('')
                        setActiveSection('Todas')
                      }}
                      className="mt-6 rounded-full bg-white px-6 py-3 font-body font-bold text-[#002868] transition hover:bg-[#F8F6F0] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                    >
                      Ver todas las opciones
                    </button>
                  </div>
                )}
              </main>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Header