'use client'
import React, { useState, useEffect } from 'react';
import {
  FaWhatsapp,
  FaUser,
  FaUserTie,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaCog,
  FaClock,
  FaShieldAlt,
  FaSnowflake,
  FaIndustry,
  FaClipboardCheck
} from 'react-icons/fa';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

const Footer = () => {
  const [contactoData, setContactoData] = useState(null);
  const [serviciosData, setServiciosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWhatsAppOptions, setShowWhatsAppOptions] = useState(false);

  // Cargar datos desde las APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Cargar datos de contacto
        const contactoResponse = await fetch('/api/contacto');
        const contactoResult = await contactoResponse.json();
        setContactoData(contactoResult.contacto);
        
        // Cargar datos de servicios
        const serviciosResponse = await fetch('/api/servicios');
        const serviciosResult = await serviciosResponse.json();
        setServiciosData(serviciosResult.servicios || []);
        
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Mapeo de iconos de servicios
  const getIconForService = (title) => {
    const iconMap = {
      "Aire acondicionado y climatización": FaSnowflake,
      "Refrigeración comercial e industrial": FaIndustry,
      "Consultoría de desarrollo y ejecución de proyecto": FaClipboardCheck,
      "Servicio especial de cámara frigorífica": FaClipboardCheck
    };
    return iconMap[title] || FaCog;
  };

  // Configuración de iconos para redes sociales
  const socialIcons = {
    facebook: FaFacebookF,
    instagram: FaInstagram,
    twitter: FaTwitter,
    tiktok: FaTiktok
  };

  // Mostrar loading mientras se cargan los datos
  if (loading) {
    return (
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </footer>
    );
  }

  // Asegurar que los datos existan
  const informacionContacto = contactoData?.informacion_contacto || {};
  const telefonos = informacionContacto.telefonos || [];
  const correos = informacionContacto.correos || [];
  const direcciones = informacionContacto.direcciones || [];
  const redesSociales = contactoData?.redes_sociales || {};
  const whatsappBotones = contactoData?.whatsapp_botones || [];
  const servicios = serviciosData || [];

  const handleContactClick = (tipo, valor) => {
    console.log('Contact click:', tipo, valor);
  };

  const handleSocialClick = (red) => {
    console.log('Social click:', red);
  };

  const handleWhatsAppClick = (asesor, telefono) => {
    console.log('WhatsApp click:', asesor, telefono);
    setShowWhatsAppOptions(false);
  };

  const handleWhatsAppOptionsToggle = (isOpen) => {
    console.log('WhatsApp options:', isOpen);
  };

  return (
    <>
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8 relative">
        {/* Línea decorativa superior */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sección principal del footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">

            {/* Columna 1: Logo y descripción */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-xl">
                  <img
                    src="https://pub-6fa3794a145e46dc96c10036dd66ad12.r2.dev/logo/teknisolution.webp"
                    alt="Teknisolutions"
                    className="h-12 w-auto brightness-0 invert"
                  />
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Especialistas en sistemas de climatización y ventilación industrial.
                Soluciones HVAC de alta calidad desde 2010 en Lima, Perú.
              </p>

              {/* Redes Sociales */}
              <div className="flex gap-3">
                {Object.entries(redesSociales).map(([key, red]) => {
                  const IconComponent = socialIcons[key];
                  if (!IconComponent) return null;
                  return (
                    <a
                      key={key}
                      href={red.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialClick(key)}
                      className="w-10 h-10 rounded-lg bg-white/5 hover:bg-primary-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10"
                      aria-label={red.nombre}
                    >
                      <IconComponent className="w-5 h-5 text-gray-300 hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
            
            {/* Columna 2: Servicios Destacados y Horarios */}
            <div className="lg:col-span-5">
              {/* Servicios Destacados */}
              <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary-500 rounded-full"></span>
                Servicios Destacados
              </h3>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                {servicios.slice(0, 4).map((servicio, index) => {
                  const IconComponent = getIconForService(servicio.titulo);
                  return (
                    <li key={index}>
                      <a
                        href={`/${servicio.slug || "#"}`}
                        className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-2 group"
                      >
                        <IconComponent className="w-3 h-3 group-hover:scale-110 transition-transform text-primary-400" />
                        {servicio.titulo}
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Horarios */}
              <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary-500 rounded-full"></span>
                Horarios
              </h3>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10 max-w-[350px]">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Lunes - Viernes</span>
                  <span className="text-white font-medium">8:30 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-gray-400">Sábados</span>
                  <span className="text-white font-medium">9:00 AM - 12:00 PM</span>
                </div>
              </div>
            </div>

            {/* Columna 4: Contacto */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary-500 rounded-full"></span>
                Contacto
              </h3>
              <div className="space-y-4">
                {/* Dirección */}
                {direcciones.map((direccion, index) => (
                  <a
                    key={index}
                    href={direccion.mapa || "https://www.google.com/maps/search/Jr.+María+José+de+Arce+261,+Lima+15087"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleContactClick('direccion', direccion.direccion)}
                    className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group"
                  >
                    <div className="bg-primary-500/10 p-2 rounded-lg group-hover:bg-primary-500/20 transition-colors">
                      <MapPin className="w-4 h-4 text-primary-400" />
                    </div>
                    <p className="text-sm leading-relaxed">{direccion.direccion}</p>
                  </a>
                ))}

                {/* Teléfonos */}
                {telefonos.map((telefono, index) => (
                  <a
                    key={index}
                    href={`tel:${telefono.numero}`}
                    onClick={() => handleContactClick('telefono', telefono.numero)}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                  >
                    <div className="bg-primary-500/10 p-2 rounded-lg group-hover:bg-primary-500/20 transition-colors">
                      <Phone className="w-4 h-4 text-primary-400" />
                    </div>
                    <span className="text-sm">{telefono.numero}</span>
                  </a>
                ))}

                {/* Email */}
                {correos.map((correo, index) => (
                  <a
                    key={index}
                    href={`mailto:${correo.email}`}
                    onClick={() => handleContactClick('email', correo.email)}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                  >
                    <div className="bg-primary-500/10 p-2 rounded-lg group-hover:bg-primary-500/20 transition-colors">
                      <Mail className="w-4 h-4 text-primary-400" />
                    </div>
                    <span className="text-sm break-all">{correo.email}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer inferior */}
          <div className="border-t border-gray-800 pt-8 mt-8 relative">
            <div className="absolute -top-px left-0 w-24 h-px bg-gradient-to-r from-primary-500 to-transparent"></div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Teknisolutions. Todos los derechos reservados.
                </p>
                <p className="text-gray-500 text-xs mt-1 flex items-center gap-2 justify-center md:justify-start">
                  <FaShieldAlt className="w-3 h-3" />
                  Especialistas en soluciones HVAC
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={contactoData?.enlaces_legales?.politica_privacidad || "/Politicas"}
                  className="text-gray-400 hover:text-white text-sm transition-colors rounded px-3 py-1.5 border border-gray-800 hover:border-gray-700"
                >
                  Política de Privacidad
                </a>
                <a
                  href={contactoData?.enlaces_legales?.reclamaciones || "/Reclamaciones"}
                  className="text-gray-400 hover:text-white text-sm transition-colors rounded px-3 py-1.5 border border-gray-800 hover:border-gray-700"
                >
                  Libro de Reclamaciones
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stickers flotantes - WhatsApp con opciones y Facebook */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">

          {/* Botón de Facebook */}
          <a
            href={redesSociales.facebook?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('Facebook')}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center relative group"
            aria-label="Facebook"
          >
            <FaFacebookF className="w-7 h-7" />

            {/* Tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              Síguenos en Facebook
              <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></span>
            </span>
          </a>

          {/* Botón principal de WhatsApp con opciones */}
          {whatsappBotones.length > 0 && (
            <div className="relative">
              <button
                onClick={() => {
                  setShowWhatsAppOptions(!showWhatsAppOptions);
                  handleWhatsAppOptionsToggle(!showWhatsAppOptions);
                }}
                className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center relative group"
                aria-label="Contactar por WhatsApp"
              >
                <FaWhatsapp className="w-7 h-7" />

                {/* Indicador de opciones */}
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>

                {/* Tooltip */}
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  Contáctanos por WhatsApp
                  <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></span>
                </span>
              </button>

              {/* Opciones de WhatsApp */}
              {showWhatsAppOptions && (
                <>
                  {/* Overlay para cerrar */}
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowWhatsAppOptions(false)}
                  ></div>

                  <div className="absolute bottom-0 right-0 mb-2 space-y-3 animate-fade-in-up z-40">
                    {whatsappBotones.map((boton, index) => (
                      <a
                        key={index}
                        href={`https://wa.me/${boton.numero.replace(/\D/g, '')}?text=${encodeURIComponent(boton.mensaje || 'Hola, necesito información')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleWhatsAppClick(boton.tipo || 'Asesor', boton.numero)}
                        className="bg-white text-gray-800 p-4 rounded-xl shadow-2xl flex items-center gap-3 hover:bg-gray-50 transition-all duration-300 hover:scale-105 min-w-[260px] border-l-4 border-green-500 group"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="relative">
                            <FaUser className="w-5 h-5 text-primary-600" />
                            <FaWhatsapp className="w-3 h-3 text-green-500 absolute -bottom-1 -right-1" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                            {boton.tipo || 'Asesor Comercial'}
                          </p>
                          <p className="text-xs text-gray-500">Contacto</p>
                          <p className="text-xs text-gray-400 mt-1 truncate">{boton.numero}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </footer>

      {/* Estilos adicionales */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Footer;