'use client'
import React, { useState, useEffect } from 'react';
import Productos from "../components/Productos";
import { 
  MdArrowForward, 
  MdCalendarToday, 
  MdPhone, 
  MdWhatsapp,
  MdBuild, // para mdi:wrench
  MdHandyman, // para mdi:tools
  MdAcUnit, // para mdi:air-conditioner
  MdAir, // para mdi:fan (alternativa)
  MdAssignment, // para mdi:clipboard-check
  // También puedes importar de react-icons/fa si prefieres
} from 'react-icons/md';

// Si prefieres usar Font Awesome para el icono de ventilador
import { FaFan } from 'react-icons/fa';

// Mapeo completo de iconos
const Icon = ({ name, className }) => {
  const iconMap = {
    // Iconos de navegación y acción
    'mdi:arrow-right': MdArrowForward,
    'mdi:calendar': MdCalendarToday,
    'mdi:whatsapp': MdWhatsapp,
    'mdi:phone': MdPhone,
    
    // Iconos de categorías
    'mdi:wrench': MdBuild,
    'mdi:tools': MdHandyman,
    'mdi:air-conditioner': MdAcUnit,
    'mdi:fan': FaFan, // Usando FaFan de react-icons/fa
    'mdi:clipboard-check': MdAssignment,
  };
  
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icono no encontrado: ${name}`);
    return null;
  }
  
  return <IconComponent className={className} />;
};

function Blog() {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) throw new Error('Error al cargar los datos del blog');
        const data = await response.json();
        setBlogData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando artículos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!blogData) return null;

  // Obtener artículos destacados - usar .flat() porque el array está anidado
  const articulos = blogData.articulos?.flat() || [];
  
  // Filtrar solo los destacados
  const articulosDestacados = articulos.filter((articulo) => articulo.destacado);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-blue-50 overflow-hidden">
        <div className="bg-black w-full h-20"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block">Expertos en</span>
              <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Climatización
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Artículos técnicos, guías de mantenimiento y las últimas tendencias
              en aire acondicionado y ventilación mecánica.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {blogData.metadata?.total_articulos || 0}+
                </div>
                <div className="text-gray-600">Artículos Técnicos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {blogData.categorias?.length || 0}
                </div>
                <div className="text-gray-600">Categorías</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-600">Soporte Disponible</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explora por Categoría
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra contenido especializado según tus intereses
            </p>
          </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          blogData.categorias.map((categoria) => (
            <a
              href="#Productos"
              class="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div
                class={`w-12 h-12 ${categoria.color} rounded-xl text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon name={categoria.icono} class="w-6 h-6 text-white" />
              </div>

              <h3 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {categoria.nombre}
              </h3>

              <p class="text-gray-600 text-sm mb-4">{categoria.descripcion}</p>

              <div class="flex items-center text-primary font-medium text-sm">
                <span>{categoria.total_articulos} artículos</span>
                <Icon
                  name="mdi:arrow-right"
                  class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </a>
          ))
        }
      </div>
        </div>
      </section>

      {/* Artículos Destacados */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Artículos Destacados
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Lo más relevante sobre climatización y ventilación
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articulosDestacados.map((articulo) => (
              <article key={articulo.slug} className="cursor-pointer group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <a href={`/Blog/${articulo.slug}`} className="block">
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    <img
                      src={articulo.img_principal}
                      alt={articulo.titulo}
                      width="400"
                      height="300"
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    {articulo.destacado && (
                      <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Destacado
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                      {articulo.titulo}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {articulo.descripcion_corta}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {articulo.tags &&
                        articulo.tags
                          .slice(0, 3)
                          .map((tag, idx) => (
                            <span key={idx} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                              {tag}
                            </span>
                          ))}
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-primary font-medium text-sm">
                        Leer más
                        <Icon
                          name="mdi:arrow-right"
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sección CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Necesitas Asesoramiento Técnico?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nuestros expertos están listos para ayudarte con mantenimiento
              preventivo, instalación y optimización de sistemas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/51912909920"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <Icon name="mdi:whatsapp" className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href="/#contacto"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                <Icon name="mdi:phone" className="w-5 h-5" />
                Solicitar Asesoría
              </a>
            </div>
          </div>
        </div>
      </section>

      <Productos />
    </>
  );
}

export default Blog;