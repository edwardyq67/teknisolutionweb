'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaCheck,
    FaArrowRight,
    FaPalette,
    FaLightbulb,
    FaRulerCombined,
    FaIndustry,
    FaTruck,
    FaLaptopCode,
    FaBullseye,
    FaEye,
    FaGem,
    FaClock,
    FaStar
} from 'react-icons/fa';

const Nosotros = () => {
    const [datosNosotros, setDatosNosotros] = useState(null);
    const [servicios, setServicios] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Cargar datos de Nosotros
                const nosotrosResponse = await fetch('/api/nosotros');
                if (!nosotrosResponse.ok) throw new Error('Error cargando datos de nosotros');
                const nosotrosData = await nosotrosResponse.json();
                setDatosNosotros(nosotrosData);

                // Cargar datos de Servicios
                const serviciosResponse = await fetch('/api/servicios');
                if (!serviciosResponse.ok) throw new Error('Error cargando datos de servicios');
                const serviciosData = await serviciosResponse.json();
                setServicios(serviciosData.servicios);

                setLoading(false);
            } catch (error) {
                console.error('Error cargando datos:', error);
                setLoading(false);
            }
        };

        loadData();
    }, []);


    if (loading) {
        return (
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                    <p className="mt-4 text-muted-foreground">Cargando...</p>
                </div>
            </section>
        );
    }

    if (!datosNosotros) return null;

    return (
        <section id='Nosotros' className="relative py-24 overflow-hidden bg-gradient-to-b from-background to-muted/20">
            {/* Imagen de fondo lateral izquierda */}
            <div className="absolute left-0 top-0 bottom-0 w-1/3 hidden lg:block pointer-events-none">
                <img
                    src="https://pub-6fa3794a145e46dc96c10036dd66ad12.r2.dev/productos/puntos_fondos-removebg-preview.png"
                    alt="Fondo decorativo"
                    className="w-full h-full object-contain object-left opacity-20"
                />
            </div>

            {/* Versión móvil - imagen más pequeña */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 lg:hidden pointer-events-none">
                <img
                    src="https://pub-6fa3794a145e46dc96c10036dd66ad12.r2.dev/productos/puntos_fondos-removebg-preview.png"
                    alt="Fondo decorativo"
                    className="w-full h-full object-contain object-left opacity-10"
                />
            </div>

            {/* Figuras Geométricas de Fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Círculos */}
                <div className="absolute top-20 left-10 w-32 h-32 rounded-full border-2 border-primary/30 animate-pulse" />
                <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-primary/15 animate-pulse delay-1000" />
                <div className="absolute bottom-32 left-1/4 w-64 h-64 rounded-full border-2 border-primary/30 animate-pulse delay-500" />
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/30 animate-pulse" />
                <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full border-2 border-primary/30 animate-pulse delay-700" />

                {/* Cuadrados */}
                <div className="absolute top-1/3 left-5 w-20 h-20 border-2 border-primary/30 rotate-12 animate-float" style={{ animation: 'float 6s ease-in-out infinite' }} />
                <div className="absolute bottom-1/4 right-8 w-16 h-16 border-2 border-primary/30 -rotate-12 animate-float-delay" style={{ animation: 'float 8s ease-in-out infinite' }} />
                <div className="absolute top-2/3 right-1/3 w-24 h-24 border-2 border-primary/30 rotate-45 animate-float" style={{ animation: 'float 7s ease-in-out infinite' }} />

                {/* Rectángulos */}
                <div className="absolute top-10 right-1/4 w-32 h-16 border-2 border-primary/30 rounded-lg rotate-6 animate-float" style={{ animation: 'float 5s ease-in-out infinite' }} />
                <div className="absolute bottom-20 left-10 w-40 h-20 border-2 border-primary/30 rounded-lg -rotate-12 animate-float-delay" style={{ animation: 'float 9s ease-in-out infinite' }} />
                <div className="absolute top-1/2 left-1/2 w-48 h-24 border-2 border-primary/30 rounded-lg rotate-12 animate-float" style={{ animation: 'float 10s ease-in-out infinite' }} />

                {/* Hexágonos */}
                <div className="absolute top-60 right-40 w-28 h-28 border-2 border-primary/30 clip-hexagon animate-spin-slow" />
                <div className="absolute bottom-40 left-20 w-36 h-36 border-2 border-primary/30 clip-hexagon animate-spin-slow-reverse" />

                {/* Líneas decorativas */}
                <svg className="absolute top-0 left-0 w-full h-full" style={{ opacity: 0.6 }}>
                    <defs>
                        <pattern id="grid" patternUnits="userSpaceOnUse" width="40" height="40">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/40" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-sm uppercase tracking-wider text-primary font-semibold mb-4">
                        Sobre Nosotros
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        {datosNosotros.titulo}
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {datosNosotros.contenido}
                    </p>
                </motion.div>

                {/* Stats Grid */}
                {datosNosotros.stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {datosNosotros.stats?.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative text-center p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group hover:shadow-lg"
                            >
                                <div className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{stat.numero}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Content Grid - Responsive */}
                <div className="grid lg:grid-cols-2 gap-0 sm:gap-12 lg:gap-16 items-start mb-16 sm:mb-24">
                    {/* Left Column - Features / Logros */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className=""
                    >
                        <h3 className="text-xl font-semibold text-foreground mb-4 lg:text-2xl lg:mb-6">
                            Nuestros Logros y Capacidades
                        </h3>
                        <div className="space-y-3">
                            {datosNosotros.logros?.map((logro, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-300 group"
                                >
                                    <FaCheck className="text-primary text-xs mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-base text-muted-foreground leading-relaxed">{logro}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Valores adicionales */}
                        {datosNosotros.valores && (
                            <div className="mt-6 pt-6 border-t border-border">
                                <h4 className="text-base font-semibold text-foreground mb-3">Nuestros Valores</h4>
                                <div className="flex flex-wrap gap-2">
                                    {datosNosotros.valores.map((valor, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                            {valor}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                    {/* Right Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={datosNosotros.foto}
                                alt="Equipo"
                                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                    </motion.div>
                </div>

                {/* Misión y Visión */}
                {(datosNosotros.mision || datosNosotros.vision) && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid md:grid-cols-2 gap-8 mb-24"
                    >
                        {datosNosotros.mision && (
                            <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 animate-pulse" />
                                <div className="flex items-center gap-3 mb-4 relative z-10">
                                    <div className="p-3 bg-primary/10 rounded-full group-hover:border border-2 border-primary/30 transition-colors">
                                        <FaBullseye className="text-2xl text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">{datosNosotros.mision.titulo}</h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed relative z-10">
                                    {datosNosotros.mision.descripcion}
                                </p>
                            </div>
                        )}

                        {datosNosotros.vision && (
                            <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-primary/5 animate-pulse" />
                                <div className="flex items-center gap-3 mb-4 relative z-10">
                                    <div className="p-3 bg-primary/10 rounded-full group-hover:border border-2 border-primary/30 transition-colors">
                                        <FaEye className="text-2xl text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">{datosNosotros.vision.titulo}</h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed relative z-10">
                                    {datosNosotros.vision.descripcion}
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Servicios */}
                <div className="grid sm:grid-cols-2 gap-8">
                    {servicios.map((servicio, i) => (
                        <motion.a
                            key={i}
                            href={`/servicios/${servicio.slug || servicio.titulo.toLowerCase().replace(/\s+/g, '-')}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer"
                        >
                            {/* Imagen de fondo */}
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={servicio.img}
                                    alt={servicio.titulo}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                />

                                {/* Overlay oscuro base */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 transition-all duration-500" />

                                {/* Contenido - Siempre visible pero con hover se muestra más */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                                    {/* Título siempre visible */}
                                    <h3 className="text-2xl font-bold text-white mb-2 transform transition-all duration-500 group-hover:translate-y-0">
                                        {servicio.titulo}
                                    </h3>

                                    {/* Descripción - Se muestra con hover */}
                                    <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-40">
                                        <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {servicio.contenido}
                                        </p>

                                        {/* Botón ver más */}
                                        <div className="flex items-center text-sm font-medium text-white group-hover:gap-3 transition-all duration-300 gap-2">
                                            Ver más
                                            <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Estilos adicionales para animaciones */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-delay {
                    animation: float 8s ease-in-out infinite;
                    animation-delay: -2s;
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                .animate-spin-slow-reverse {
                    animation: spin-slow 25s linear infinite reverse;
                }
                .clip-hexagon {
                    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                }
            `}</style>
        </section>
    );
};

export default Nosotros;