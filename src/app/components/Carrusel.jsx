'use client'

import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const Carrusel = memo(() => {
  const [carruselData, setCarruselData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/carrusel')
      .then(res => {
        if (!res.ok) throw new Error('Error cargando carrusel');
        return res.json();
      })
      .then(data => {
        setCarruselData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-8 sm:h-10 w-48 sm:w-64 bg-muted rounded-lg animate-pulse mx-auto mb-3 sm:mb-4"></div>
            <div className="h-5 sm:h-6 w-56 sm:w-96 bg-muted rounded-lg animate-pulse mx-auto"></div>
          </div>
          <div className="relative overflow-hidden py-4">
            <div className="flex justify-center gap-3 sm:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-muted rounded-xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!carruselData?.marcas?.length) return null;

  const { marcas = [], metadata = {} } = carruselData;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-background to-muted/30 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3">
            {metadata.titulo || "Nuestros Aliados"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            {metadata.descripcion || "Empresas que confían en nosotros"}
          </p>
        </motion.div>

        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={3000}
            breakpoints={{
              480: { slidesPerView: 3, spaceBetween: 12 },
              640: { slidesPerView: 4, spaceBetween: 16 },
              768: { slidesPerView: 5, spaceBetween: 20 },
              1024: { slidesPerView: 6, spaceBetween: 24 },
            }}
            className="w-full py-2 sm:py-4"
          >
            {marcas.map((marca, index) => (
              <SwiperSlide key={`marca-${marca.id || index}`}>
                <motion.div 
                  className="flex items-center justify-center p-2 sm:p-3 md:p-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={marca.logo || 'https://pub-6fa3794a145e46dc96c10036dd66ad12.r2.devhttps://pub-6fa3794a145e46dc96c10036dd66ad12.r2.dev/logo/teknisolution.webp'}
                    alt={marca.nombre || `Marca ${index + 1}`}
                    className="w-auto h-12 sm:h-14 md:h-16 lg:h-20 max-w-full object-contain transition-all duration-300 hover:opacity-80 cursor-pointer"
                    title={marca.nombre || marca.slug}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://pub-6fa3794a145e46dc96c10036dd66ad12.r2.devhttps://pub-6fa3794a145e46dc96c10036dd66ad12.r2.dev/logo/teknisolution.webp';
                    }}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Gradientes laterales con tus colores */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </motion.section>
  );
});

Carrusel.displayName = 'Carrusel';
export default Carrusel;