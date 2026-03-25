'use client'

import React, { useState, useEffect } from 'react';
import {
  FaHome,
  FaInfoCircle,
  FaCog,
  FaBox,
  FaPhone,
  FaWhatsapp,
  FaBlog,
  FaPhoneAlt,
  FaSnowflake,
  FaIndustry,
  FaClipboardCheck,
  FaBars,
  FaTimes
} from "react-icons/fa";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollState, setScrollState] = useState('top');
  const [currentPath, setCurrentPath] = useState("/");
  const [currentHash, setCurrentHash] = useState("");
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapeo de iconos para servicios
  const getIconForService = (title) => {
    const iconMap = {
      "Aire acondicionado y climatización": FaSnowflake,
      "Refrigeración comercial e industrial": FaIndustry,
      "Consultoría de desarrollo y ejecución de proyecto": FaClipboardCheck,
      "Servicio especial de cámara frigorífica": FaClipboardCheck
    };
    return iconMap[title] || FaCog;
  };

  // Cargar servicios desde API
  useEffect(() => {
    const loadServicios = async () => {
      try {
        const response = await fetch('/api/servicios');
        if (!response.ok) throw new Error('Error cargando servicios');
        const data = await response.json();
        setServicios(data.servicios || []);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando servicios:', error);
        setLoading(false);
      }
    };

    loadServicios();
  }, []);

  // Array de navegación principal
  const menuItems = [
    { name: 'INICIO', href: '#Inicio', icon: FaHome, section: 'Inicio' },
    { name: 'NOSOTROS', href: '#Nosotros', icon: FaInfoCircle, section: 'Nosotros' },
    { name: 'BLOG', href: '/Blog', icon: FaBlog, section: 'Blog' },
    { name: 'CONTACTO', href: '#contacto', icon: FaPhone, section: 'contacto' },
  ];

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setScrollState('scrolled');
      } else {
        setScrollState('top');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detectar ruta y hash
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);

      const handleHashChange = () => {
        setCurrentHash(window.location.hash);
      };

      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  const isHomePage = currentPath === "/";

  // Determinar clases del header según scroll
  const getHeaderClasses = () => {
    const baseClasses = "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300";
    return scrollState === 'top'
      ? `${baseClasses} bg-transparent py-4 md:py-6`
      : `${baseClasses} bg-black shadow-lg py-3 md:py-4 border-b border-white/10`;
  };

  // Determinar color del texto según scroll
  const getTextColor = () => {
    return scrollState === 'top' ? 'text-white' : 'text-white';
  };

  // Verificar si un enlace está activo
  const isLinkActive = (section) => {
    if (section === "Blog") {
      return currentPath === "/Blog";
    }
    const targetHash = `#${section}`;
    if (isHomePage) {
      return currentHash === targetHash;
    } else {
      return currentPath === `/#${section}` || currentHash === targetHash;
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Renderizar items de navegación desktop
  const renderDesktopNavItems = () => {
    return menuItems.map((item) => {
      const IconComponent = item.icon;
      const isActive = isLinkActive(item.section);
      const href = isHomePage && item.href.startsWith('#')
        ? item.href
        : item.href.startsWith('#')
          ? `/${item.href}`
          : item.href;

      return (
        <a
          key={item.name}
          href={href}
          className={`text-sm font-semibold transition-colors flex items-center gap-2 px-3 py-2 rounded-lg ${isActive
            ? "text-primary bg-primary/20"
            : `${getTextColor()} hover:text-primary hover:bg-white/10`
            }`}
        >
          <IconComponent className="w-4 h-4" />
          {item.name}
        </a>
      );
    });
  };

  return (
    <>
      <header className={getHeaderClasses()}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center shrink-0">
              <img
                src="https://pub-6fa3794a145e46dc96c10036dd66ad12.r2.dev/logo/teknisolution.webp"
                alt="Teknisolutions - Soluciones Integrales"
                className={`w-auto h-8 transition-all duration-300 brightness-0 invert`}
                loading="eager"
                decoding="async"
              />
            </a>

            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {renderDesktopNavItems().slice(0, 2)}

              {/* Dropdown SERVICIOS */}
              {!loading && servicios.length > 0 && (
                <div className="relative group">
                  <button className={`flex items-center gap-2 text-sm font-semibold transition-colors ${getTextColor()} hover:text-primary px-3 py-2 rounded-lg hover:bg-white/10`}>
                    <FaCog className="w-4 h-4" />
                    SERVICIOS
                    <svg
                      className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 lg:w-96 rounded-xl bg-black border border-white/10 shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top z-50">
                    {servicios.map((servicio, index) => {
                      const IconComponent = getIconForService(servicio.titulo);
                      return (
                        <a
                          key={index}
                          href={`/servicios/${servicio.slug || "#"}`}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-white/10 transition-colors text-white"
                        >
                          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover/item:bg-primary/30 transition-colors">
                            <IconComponent className="w-4 h-4 lg:w-5 lg:h-5 text-primary group-hover/item:text-primary transition-colors" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs lg:text-sm font-semibold block text-white">{servicio.titulo}</span>
                            <span className="text-xs text-gray-400 group-hover/item:text-primary transition-colors">
                              Ver más →
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {renderDesktopNavItems().slice(2)}
            </nav>

            {/* Botón menú móvil */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors hover:bg-white/10"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? (
                <FaTimes className={`h-5 w-5 sm:h-6 sm:w-6 ${getTextColor()}`} />
              ) : (
                <FaBars className={`h-5 w-5 sm:h-6 sm:w-6 ${getTextColor()}`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-md transition-all duration-300 lg:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={closeMobileMenu}
      >
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-black shadow-xl transform transition-transform duration-300 flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del menú móvil */}
          <div className="flex-shrink-0 p-4 sm:p-6 border-b border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-lg sm:text-xl font-bold text-white">Menú</span>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-white/10 text-white"
                aria-label="Cerrar menú"
              >
                <FaTimes className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>

          {/* Contenido del menú móvil */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                {/* Items del menú principal */}
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = isLinkActive(item.section);
                  const href = isHomePage && item.href.startsWith('#')
                    ? item.href
                    : item.href.startsWith('#')
                      ? `/${item.href}`
                      : item.href;

                  return (
                    <a
                      key={item.name}
                      href={href}
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors ${isActive
                        ? "bg-primary/20 text-primary"
                        : "text-white hover:bg-white/10"
                        }`}
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base font-medium">{item.name}</span>
                    </a>
                  );
                })}

                {/* Sección SERVICIOS en móvil */}
                {!loading && servicios.length > 0 && (
                  <div className="pt-4 sm:pt-6">
                    <h3 className="font-bold text-white mb-3 sm:mb-4 px-3 sm:px-4 flex items-center gap-2 text-sm sm:text-base">
                      <FaCog className="w-4 h-4 sm:w-5 sm:h-5" />
                      SERVICIOS
                    </h3>
                    <div className="space-y-1 sm:space-y-2">
                      {servicios.map((servicio, index) => {
                        const IconComponent = getIconForService(servicio.titulo);
                        return (
                          <a
                            key={index}
                            href={`/servicios/${servicio.slug || "#"}`}
                            onClick={closeMobileMenu}
                            className="flex items-center gap-4 px-4 lg:px-5 py-3 lg:py-4 hover:bg-white/10 transition-all duration-300 group/item text-white"
                          >
                            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            <span className="text-xs sm:text-sm font-medium">{servicio.titulo}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Botones de acción móvil */}
                <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
                  <a
                    href="https://wa.me/51912909920"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2.5 sm:py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base"
                  >
                    <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
                    WhatsApp
                  </a>
                  <a
                    href={isHomePage ? "#contacto" : "/#contacto"}
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-white py-2.5 sm:py-3 rounded-lg font-medium hover:bg-primary/80 transition-colors text-sm sm:text-base"
                  >
                    <FaPhoneAlt className="w-4 h-4 sm:w-5 sm:h-5" />
                    CONTÁCTANOS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;