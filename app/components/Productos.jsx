'use client'

import { useState, useEffect, useMemo, memo } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaBuilding,
  FaIndustry,
  FaArrowRight,
  FaWhatsapp,
  FaTools
} from "react-icons/fa";

const categoriasInfo = {
  Domestico: {
    nombre: "Doméstico",
    icon: <FaHome />,
    color: "bg-primary",
    descripcion: "Soluciones para hogares y residencias"
  },
  Comercial: {
    nombre: "Comercial",
    icon: <FaBuilding />,
    color: "bg-primary/80",
    descripcion: "Para negocios, oficinas y establecimientos"
  },
  Industrial: {
    nombre: "Industrial",
    icon: <FaIndustry />,
    color: "bg-primary/60",
    descripcion: "Sistemas para fábricas y plantas industriales"
  }
};

// Componente memoizado para ProductoCard
const ProductoCard = memo(({ producto, categoriaActiva }) => {
  const generarMensajeWhatsApp = () => {
    let mensaje = `Hola, estoy interesado en obtener información sobre:\n\n`;
    mensaje += `📋 *Producto/Servicio:* ${producto.titulo}\n`;
    mensaje += `🏷️ *Categoría:* ${categoriaActiva}\n`;
    
    if (producto.categoria && producto.categoria.length > 0) {
      mensaje += `🔧 *Servicios disponibles:* ${producto.categoria.join(", ")}\n`;
    }
    
    mensaje += `\nPor favor, envíenme más información y una cotización.`;
    
    return encodeURIComponent(mensaje);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 ease-out flex flex-col h-full"
    >
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-muted/30 to-background flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {producto.img ? (
            <img
              src={producto.img}
              alt={producto.titulo}
              className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/20 to-muted/40">
              <FaTools className="text-4xl sm:text-5xl md:text-6xl text-primary/40" />
            </div>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        <div className="mb-2 sm:mb-3">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full inline-block">
            {categoriaActiva}
          </span>
        </div>

        <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {producto.titulo}
        </h3>

        {producto.categoria && producto.categoria.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {producto.categoria.slice(0, 4).map((cat, idx) => (
                <span
                  key={idx}
                  className="text-[10px] sm:text-xs bg-muted text-muted-foreground px-2 sm:px-3 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        <a
          href={`https://wa.me/51912909920?text=${generarMensajeWhatsApp()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:gap-3 mt-auto text-sm sm:text-base"
        >
          <FaWhatsapp className="text-base sm:text-lg" />
          <span className="hidden xs:inline">Consultar por WhatsApp</span>
          <span className="xs:hidden">WhatsApp</span>
          <FaArrowRight className="hidden sm:block group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </motion.div>
  );
});

ProductoCard.displayName = 'ProductoCard';

const Productos = memo(() => {
  const [categoriaActiva, setCategoriaActiva] = useState("Comercial");
  const [productosData, setProductosData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos desde API
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/productos');
        if (!response.ok) throw new Error('Error cargando productos');
        const data = await response.json();
        setProductosData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando productos:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Obtener productos filtrados por categoría usando los IDs de categorias
  const productosFiltrados = useMemo(() => {
    if (!productosData?.productos || !productosData?.categorias) return [];
    
    const idsFiltrados = productosData.categorias[categoriaActiva] || [];
    
    return productosData.productos.filter(producto => 
      idsFiltrados.includes(producto.id)
    );
  }, [productosData, categoriaActiva]);

  // Categorías disponibles
  const categoriasDisponibles = useMemo(() => {
    if (!productosData?.categorias) return ['Comercial'];
    return Object.keys(productosData.categorias);
  }, [productosData]);

  const renderCategorias = useMemo(() => {
    return categoriasDisponibles.map((categoriaKey) => {
      const info = categoriasInfo[categoriaKey];
      if (!info) return null;
      
      return (
        <button
          key={categoriaKey}
          onClick={() => setCategoriaActiva(categoriaKey)}
          className={`flex cursor-pointer items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all transform hover:scale-105 
            w-full sm:w-auto sm:flex-1 
            sm:max-w-xs mx-auto sm:mx-0 sm:min-w-[180px] md:min-w-[200px]
            ${categoriaActiva === categoriaKey
              ? `${info.color} text-white shadow-lg`
              : "bg-card border border-border text-muted-foreground hover:bg-muted/50"
            }`}
        >
          <div className={`p-1.5 sm:p-2 rounded-lg ${categoriaActiva === categoriaKey ? 'bg-white/20' : 'bg-muted'}`}>
            {info.icon}
          </div>
          <div className="text-left flex-1">
            <div className="font-bold text-sm sm:text-base">{info.nombre}</div>
            <div className="text-xs opacity-80 hidden sm:block">{info.descripcion}</div>
          </div>
        </button>
      );
    });
  }, [categoriasDisponibles, categoriaActiva]);

  const renderProductos = useMemo(() => {
    return productosFiltrados.map((producto, index) => (
      <ProductoCard
        key={producto.id || index}
        producto={producto}
        categoriaActiva={categoriaActiva}
      />
    ));
  }, [productosFiltrados, categoriaActiva]);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-8 sm:h-10 w-48 sm:w-64 bg-muted rounded-lg animate-pulse mx-auto mb-3 sm:mb-4"></div>
            <div className="h-5 sm:h-6 w-64 sm:w-96 bg-muted rounded-lg animate-pulse mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-2xl h-80 sm:h-96 animate-pulse border border-border"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!productosData?.productos?.length) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background" id="Productos">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            Nuestros Productos y Servicios
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Soluciones especializadas en climatización, refrigeración y ventilación
          </p>
        </motion.div>

        {categoriasDisponibles.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 flex-wrap">
              {renderCategorias}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {renderProductos}
        </div>
      </div>
    </section>
  );
});

Productos.displayName = 'Productos';

export default Productos;