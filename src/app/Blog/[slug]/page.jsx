'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MdArrowBack, 
  MdCalendarToday, 
  MdPerson, 
  MdShare,
  MdWhatsapp,
  MdEmail
} from 'react-icons/md';
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin 
} from 'react-icons/fa';

function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;
  
  const [articulo, setArticulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticulo = async () => {
      if (!slug) return;
      
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) throw new Error('Error al cargar el artículo');
        const data = await response.json();
        
        // Obtener artículos - usar .flat() porque el array está anidado
        const articulos = data.articulos?.flat() || [];
        
        // Encontrar el artículo específico
        const found = articulos.find((art) => art.slug === slug);
        
        if (!found) {
          router.push('/404');
          return;
        }
        
        setArticulo(found);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticulo();
  }, [slug, router]);

  // Función para renderizar el contenido formateado
  const renderContenido = (contenido) => {
    if (!contenido) return null;
    
    const lineas = contenido.split('\n');
    const elementos = [];
    
    for (let i = 0; i < lineas.length; i++) {
      const linea = lineas[i].trim();
      
      if (!linea) {
        elementos.push(<br key={`br-${i}`} />);
        continue;
      }
      
      // Encabezados H2
      if (linea.startsWith('## ')) {
        elementos.push(
          <motion.h2 
            key={`h2-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200"
          >
            {linea.replace('## ', '')}
          </motion.h2>
        );
        continue;
      }
      
      // Encabezados H3
      if (linea.startsWith('### ')) {
        elementos.push(
          <motion.h3 
            key={`h3-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-bold text-gray-800 mt-8 mb-3"
          >
            {linea.replace('### ', '')}
          </motion.h3>
        );
        continue;
      }
      
      // Listas con viñetas
      if (linea.startsWith('- ')) {
        elementos.push(
          <li key={`li-${i}`} className="ml-4 mb-2 flex items-start">
            <span className="text-primary mr-2 mt-1.5">•</span>
            <span>{linea.replace('- ', '')}</span>
          </li>
        );
        continue;
      }
      
      // Listas con check/error
      if (linea.startsWith('❌ ') || linea.startsWith('✔ ')) {
        const isError = linea.startsWith('❌ ');
        elementos.push(
          <motion.p 
            key={`check-${i}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex items-start gap-2 mb-2 ${isError ? 'text-red-600' : 'text-green-600'}`}
          >
            <span className="mt-0.5">{isError ? '❌' : '✔'}</span>
            <span>{linea.slice(2)}</span>
          </motion.p>
        );
        continue;
      }
      
      // Texto destacado
      if (linea.startsWith('👉 ') || linea.startsWith('📞 ')) {
        elementos.push(
          <motion.div 
            key={`destacado-${i}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="font-semibold text-lg my-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg"
          >
            {linea}
          </motion.div>
        );
        continue;
      }
      
      // Párrafos normales
      elementos.push(
        <motion.p 
          key={`p-${i}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.02 }}
          className="mb-4 text-gray-700 leading-relaxed text-base md:text-lg text-justify"
        >
          {linea}
        </motion.p>
      );
    }
    
    return elementos;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!articulo) return null;

  // URL para compartir
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/Blog/${articulo.slug}`
    : '';

  return (
    <>
      <div className="bg-black w-full h-20"></div>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Botón Volver */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              href="/Blog" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group"
            >
              <MdArrowBack className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Volver al Blog</span>
            </Link>
          </motion.div>

          {/* Artículo */}
          <motion.article 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Imagen Principal */}
            <div className="relative h-64 md:h-96 overflow-hidden">
              <motion.img
                src={articulo.img_principal || "/default-blog.jpg"}
                alt={articulo.titulo}
                width="800"
                height="400"
                loading="eager"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7 }}
              />
            </div>

            {/* Contenido */}
            <div className="p-6 md:p-8 lg:p-10">
              {/* Encabezado */}
              <header className="mb-8">
                {/* Tags */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {articulo.tags && articulo.tags.map((tag, idx) => (
                    <motion.span 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full hover:bg-primary/20 transition-colors cursor-pointer"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Título */}
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
                >
                  {articulo.titulo}
                </motion.h1>

                {/* Metadatos */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-6"
                >
                  <div className="flex items-center gap-2">
                    <MdCalendarToday className="w-4 h-4" />
                    <span>
                      {new Date(articulo.fecha_publicacion).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </span>
                  </div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <MdPerson className="w-4 h-4" />
                    <span>{articulo.autor || 'Equipo Teknisolutions'}</span>
                  </div>
                </motion.div>

                {/* Descripción Corta */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-primary p-4 md:p-6 mb-8 rounded-r-lg"
                >
                  <p className="text-lg text-gray-700 italic leading-relaxed">
                    {articulo.descripcion_corta}
                  </p>
                </motion.div>
              </header>

              {/* Contenido Completo */}
              <div className="prose prose-lg max-w-none mb-10">
                {renderContenido(articulo.contenido_completo)}
              </div>

              {/* CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-12 p-6 md:p-8 bg-gradient-to-r from-primary to-blue-600 rounded-2xl text-white shadow-xl"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-3">¿Necesitas Asesoramiento Técnico?</h3>
                    <p className="mb-0 text-blue-100">
                      Nuestros expertos están listos para ayudarte con mantenimiento preventivo, 
                      cumplimiento normativo y optimización de sistemas.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <motion.a
                      href="https://wa.me/51912909920"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 min-w-[140px]"
                    >
                      <MdWhatsapp className="w-5 h-5" />
                      WhatsApp
                    </motion.a>
                    <motion.a
                      href="/#contacto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center gap-2 bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-all duration-300 min-w-[140px]"
                    >
                      <MdEmail className="w-5 h-5" />
                      Contactar
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.article>

          {/* Compartir en redes sociales */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 pt-8 border-t border-gray-200"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <span className="text-gray-700 font-medium flex items-center gap-2">
                <MdShare className="w-5 h-5" />
                Compartir artículo:
              </span>
              <div className="flex gap-3">
                <motion.a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="Compartir en Facebook"
                >
                  <FaFacebook className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(articulo.titulo)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors"
                  aria-label="Compartir en Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(articulo.titulo)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors"
                  aria-label="Compartir en LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default BlogPost;