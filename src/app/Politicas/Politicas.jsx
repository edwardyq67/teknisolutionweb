'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const PoliticasPage = () => {
  const [politicasData, setPoliticasData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/politicas');
        const data = await response.json();
        setPoliticasData(data.politica_privacidad);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!politicasData) return null;

  const currentDate = new Date(politicasData.ultima_actualizacion);
  const formattedDate = currentDate.toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50">
        <div className="h-20 w-screen bg-black"/>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
          {/* Encabezado */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {politicasData.titulo}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <p className="text-gray-600 italic">
                Última actualización: {formattedDate}
              </p>
              <div className="mt-2 md:mt-0">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {politicasData.empresa}
                </span>
              </div>
            </div>
          </div>

          {/* Introducción */}
          <div className="mb-10 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-blue-700">{politicasData.empresa}</strong>, {politicasData.introduccion.contenido}
            </p>
          </div>

          {/* Secciones */}
          {politicasData.secciones.map((seccion) => (
            <div key={seccion.id} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                {seccion.id}. {seccion.titulo}
              </h2>
              
              <p className="text-gray-700 mb-4">{seccion.contenido}</p>
              
              {seccion.items && (
                seccion.items.map((item, index) => (
                  typeof item === 'string' ? (
                    <div key={index} className="flex items-start mb-2">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ) : (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.titulo}</h3>
                      <p className="text-gray-700 text-sm">{item.descripcion}</p>
                    </div>
                  )
                ))
              )}
              
              {seccion.advertencia && (
                <div className={`mt-4 p-4 rounded-lg ${
                  seccion.id === 3 ? 'bg-red-50 border border-red-100' : 
                  seccion.id === 4 ? 'bg-green-50 border border-green-100' : 
                  'bg-yellow-50 border border-yellow-100'
                }`}>
                  <p className="text-gray-700">
                    <strong className={seccion.id === 3 ? 'text-red-700' : 
                      seccion.id === 4 ? 'text-green-700' : 
                      'text-yellow-700'}>
                      {seccion.id === 3 ? 'Importante:' : 
                       seccion.id === 4 ? 'Nuestro compromiso:' : 
                       'Aviso:'}
                    </strong> {seccion.advertencia}
                  </p>
                </div>
              )}
              
              {seccion.contacto && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-3">✉️</span>
                      <div>
                        <p className="font-semibold text-gray-900">Correo electrónico</p>
                        <a href={`mailto:${seccion.contacto.email}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                          {seccion.contacto.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-3">📍</span>
                      <div>
                        <p className="font-semibold text-gray-900">Dirección</p>
                        <p className="text-gray-700">{seccion.contacto.direccion}</p>
                      </div>
                    </div>
                    {seccion.contacto.telefono && (
                      <div className="flex items-center">
                        <span className="text-blue-600 mr-3">📞</span>
                        <div>
                          <p className="font-semibold text-gray-900">Teléfono</p>
                          <a href={`tel:${seccion.contacto.telefono}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                            {seccion.contacto.telefono}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Aviso Legal */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-5">
              <div className="flex items-start">
                <span className="text-yellow-600 text-xl mr-3">ℹ️</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Aviso Legal</h4>
                  <p className="text-gray-700 text-sm">
                    {politicasData.aviso_legal.texto}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticasPage;