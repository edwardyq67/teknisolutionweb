'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaHeadset,
  FaClock,
  FaShieldAlt,
  FaCheck,
  FaExclamationCircle,
  FaStore,
  FaUser,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaBuilding,
  FaMoneyBillWave,
  FaClipboardList,
  FaFileAlt,
  FaRegCheckCircle,
  FaSpinner,
  FaPaperPlane,
  FaInfoCircle,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaUserTie,
  FaCalendarAlt,
  FaFileSignature,
  FaRegClock,
  FaRegBuilding,
  FaRegFileAlt,
  FaGavel,
  FaBalanceScale,
  FaHandshake
} from 'react-icons/fa';

const Reclamaciones = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      tipo_documento: 'dni',
      numero_documento: '',
      nombres: '',
      apellidos: '',
      telefono: '',
      email: '',
      direccion: '',
      departamento: '',
      provincia: '',
      distrito: '',
      bien_servicio: '',
      monto_reclamado: '',
      descripcion_bien: '',
      tipo_reclamo: '',
      fecha_hecho: '',
      descripcion: '',
      pedido: '',
      declaracion: false
    }
  });

  const tipoDocumento = watch('tipo_documento');
  const descripcion = watch('descripcion', '');

  const tiposDocumento = [
    { value: 'dni', label: 'DNI' },
    { value: 'ruc', label: 'RUC' },
    { value: 'ce', label: 'Carnet de Extranjería' },
    { value: 'pasaporte', label: 'Pasaporte' }
  ];

  const departamentos = [
    { value: '', label: 'Selecciona departamento' },
    { value: 'lima', label: 'Lima' },
    { value: 'arequipa', label: 'Arequipa' },
    { value: 'cuzco', label: 'Cuzco' },
    { value: 'piura', label: 'Piura' },
    { value: 'lambayeque', label: 'Lambayeque' },
    { value: 'la libertad', label: 'La Libertad' },
    { value: 'junin', label: 'Junín' },
    { value: 'ancash', label: 'Áncash' },
    { value: 'ica', label: 'Ica' },
    { value: 'tacna', label: 'Tacna' },
    { value: 'otros', label: 'Otros' }
  ];

  const tiposReclamo = [
    { value: 'reclamo', label: 'Reclamo' },
    { value: 'queja', label: 'Queja' }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulación de envío
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Datos enviados:', data);
      setSubmitStatus('success');
      
      setTimeout(() => {
        reset();
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset({
      tipo_documento: 'dni',
      numero_documento: '',
      nombres: '',
      apellidos: '',
      telefono: '',
      email: '',
      direccion: '',
      departamento: '',
      provincia: '',
      distrito: '',
      bien_servicio: '',
      monto_reclamado: '',
      descripcion_bien: '',
      tipo_reclamo: '',
      fecha_hecho: '',
      descripcion: '',
      pedido: '',
      declaracion: false
    });
    setSubmitStatus(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con espacio para el navbar fijo */}
      <div className="h-20 bg-gradient-to-r from-primary-600 to-primary-800"></div>
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Tarjetas de información superior */}
        <div className="mb-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-primary-100 rounded-lg">
                <FaHeadset className="text-primary-600 text-2xl" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Contacto</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Atención personalizada para tus reclamos
            </p>
            <p className="font-semibold text-gray-900">servicios@teknisolutions.pe</p>
            <p className="text-gray-600 text-sm">+51 912 909 920</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaClock className="text-green-600 text-2xl" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Tiempo de respuesta</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Atenderemos tu reclamo en un plazo máximo de 15 días hábiles
            </p>
            <p className="font-semibold text-gray-900">Rápido y eficiente</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-yellow-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FaShieldAlt className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Tus datos protegidos</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Cumplimos con la Ley de Protección de Datos Personales
            </p>
            <p className="font-semibold text-gray-900">Seguridad garantizada</p>
          </div>
        </div>

        {/* Grid principal: Formulario + Sidebar */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda: Formulario (2/3) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              {/* Encabezado del formulario */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <FaFileSignature className="text-3xl" />
                  Libro de Reclamaciones Virtual
                </h2>
                <p className="text-primary-100 mt-2">
                  Conforme al Código de Protección y Defensa del Consumidor
                </p>
              </div>

              {/* Datos de la empresa */}
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaStore className="text-primary-600" />
                  Datos de la empresa
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Razón social:</p>
                    <p className="text-gray-900">Teknisolutions S.A.C</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">R.U.C.:</p>
                    <p className="text-gray-900">20611923679</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-semibold text-gray-700">Dirección:</p>
                    <p className="text-gray-900">CAL. MARIA JOSE DE ARCE NRO. 261 URB. MARANGA ET. UNO - SAN MIGUEL</p>
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Información del Consumidor */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b-2 border-primary-600 pb-3 flex items-center gap-3">
                      <FaUser className="text-primary-600 text-2xl" />
                      Información del Consumidor
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                          <FaIdCard className="text-gray-500" />
                          Tipo de Documento *
                        </label>
                        <select
                          {...register('tipo_documento', { required: true })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition bg-white"
                        >
                          {tiposDocumento.map((tipo) => (
                            <option key={tipo.value} value={tipo.value}>
                              {tipo.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                          <FaIdCard className="text-gray-500" />
                          Número de Documento *
                        </label>
                        <input
                          type="text"
                          {...register('numero_documento', { required: true })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                          placeholder={tipoDocumento === 'ruc' ? 'Ingrese su RUC' : 'Ingrese su documento'}
                          maxLength={tipoDocumento === 'ruc' ? 11 : 12}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                          <FaUser className="text-gray-500" />
                          Nombres *
                        </label>
                        <input
                          type="text"
                          {...register('nombres', { required: true })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                          placeholder="Ingresa tus nombres completos"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                          <FaUser className="text-gray-500" />
                          Apellidos *
                        </label>
                        <input
                          type="text"
                          {...register('apellidos', { required: true })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                          placeholder="Ingresa tus apellidos completos"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                          <FaPhone className="text-gray-500" />
                          Teléfono / Celular *
                        </label>
                        <input
                          type="tel"
                          {...register('telefono', { required: true })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                          placeholder="Ingresa tu número de contacto"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                          <FaEnvelope className="text-gray-500" />
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          {...register('email', { required: true })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                          placeholder="ejemplo@correo.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                          <FaHome className="text-gray-500" />
                          Dirección Completa *
                        </label>
                        <input
                          type="text"
                          {...register('direccion', { required: true })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                          placeholder="Calle, número, urbanización, referencia"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                            <FaBuilding className="text-gray-500" />
                            Departamento *
                          </label>
                          <select
                            {...register('departamento', { required: true })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition bg-white"
                          >
                            {departamentos.map((depto) => (
                              <option key={depto.value} value={depto.value}>
                                {depto.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                            <FaBuilding className="text-gray-500" />
                            Provincia *
                          </label>
                          <input
                            type="text"
                            {...register('provincia', { required: true })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                            placeholder="Ingresa provincia"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                            <FaBuilding className="text-gray-500" />
                            Distrito *
                          </label>
                          <input
                            type="text"
                            {...register('distrito', { required: true })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                            placeholder="Ingresa distrito"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Identificación del Bien Contratado */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b-2 border-primary-600 pb-3 flex items-center gap-3">
                      <FaMoneyBillWave className="text-primary-600 text-2xl" />
                      Identificación del Bien Contratado
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Bien o Servicio *
                        </label>
                        <input
                          type="text"
                          {...register('bien_servicio', { required: true })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                          placeholder="Ej: Aire acondicionado, Servicio técnico, etc."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Monto reclamado (S/) *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-500 font-bold">S/</span>
                          <input
                            type="number"
                            {...register('monto_reclamado', { required: true, min: 0 })}
                            step="0.01"
                            min="0"
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Descripción del bien o servicio *
                        </label>
                        <textarea
                          {...register('descripcion_bien', { required: true })}
                          rows="3"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition resize-none"
                          placeholder="Describa el bien o servicio adquirido..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Detalle del reclamo */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b-2 border-primary-600 pb-3 flex items-center gap-3">
                      <FaClipboardList className="text-primary-600 text-2xl" />
                      Detalle de su reclamo
                    </h3>

                    <div className="bg-primary-50 p-4 rounded-lg mb-4">
                      <p className="text-sm text-primary-800 mb-2 font-semibold flex items-center gap-2">
                        <FaInfoCircle />
                        Definiciones según el Código del Consumidor:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-white p-3 rounded border border-primary-200">
                          <p className="font-semibold text-red-600">Reclamo:</p>
                          <p className="text-gray-700">Disconformidad con bienes adquiridos o servicios prestados.</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-primary-200">
                          <p className="font-semibold text-red-600">Queja:</p>
                          <p className="text-gray-700">Malestar por atención, trato u otros aspectos no relacionados al giro.</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Tipo *
                        </label>
                        <select
                          {...register('tipo_reclamo', { required: true })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition bg-white"
                        >
                          <option value="">Seleccione tipo</option>
                          {tiposReclamo.map((tipo) => (
                            <option key={tipo.value} value={tipo.value}>
                              {tipo.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Fecha del hecho reclamado *
                        </label>
                        <input
                          type="date"
                          {...register('fecha_hecho', { required: true })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Descripción detallada *
                        </label>
                        <textarea
                          {...register('descripcion', { required: true, maxLength: 1000 })}
                          rows="6"
                          maxLength="1000"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition resize-none"
                          placeholder="Describa detalladamente los hechos..."
                        />
                        <div className="flex justify-between mt-2">
                          <p className="text-xs text-gray-500">
                            Incluya todos los detalles relevantes.
                          </p>
                          <p className={`text-sm ${descripcion?.length > 900 ? 'text-red-600' : 'text-gray-500'}`}>
                            {descripcion?.length || 0}/1000 caracteres
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Pedido o solución esperada *
                        </label>
                        <textarea
                          {...register('pedido', { required: true })}
                          rows="3"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition resize-none"
                          placeholder="Especifique claramente qué solución espera recibir..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Declaración y Consentimiento */}
                  <div className="flex items-start gap-3 p-6 bg-primary-50 rounded-xl border-2 border-primary-200">
               
                    <div>
                      <label htmlFor="declaracion" className="text-gray-900 font-semibold flex items-center gap-2 mb-2">
                        <FaShieldAlt className="text-primary-600" />
                        DECLARACIÓN Y CONSENTIMIENTO *
                      </label>
                      <p className="text-sm text-gray-700">
                        <strong>Declaro que los datos consignados son correctos y fiel expresión de la verdad.</strong>{' '}
                        Los datos personales serán tratados conforme a la Ley de Protección de Datos Personales (Ley N° 29733).
                      </p>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || submitStatus === 'success'}
                      className={`flex-1 py-4 px-6 font-bold rounded-xl transition duration-300 flex items-center justify-center gap-3 text-lg 
                      ${isSubmitting ? 'bg-primary-400 cursor-not-allowed' :
                          submitStatus === 'success' ? 'bg-green-600 text-white cursor-not-allowed' :
                            submitStatus === 'error' ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl' :
                              'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'}`}
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Registrando...
                        </>
                      ) : submitStatus === 'success' ? (
                        <>
                          <FaCheck />
                          ¡Enviado!
                        </>
                      ) : submitStatus === 'error' ? (
                        <>
                          <FaExclamationCircle />
                          Reintentar
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          Enviar Reclamo
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 py-4 px-6 font-bold bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition shadow hover:shadow-lg"
                    >
                      Limpiar Formulario
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar Derecho (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Tus derechos como consumidor */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaBalanceScale className="text-primary-600" />
                  Tus derechos
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-700 mb-1 flex items-center gap-2">
                      <FaCheck className="text-green-600" />
                      Derecho a la información
                    </p>
                    <p className="text-sm text-gray-600">
                      Recibir información veraz sobre productos y servicios.
                    </p>
                  </div>
                  <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
                    <p className="font-semibold text-primary-700 mb-1 flex items-center gap-2">
                      <FaGavel className="text-primary-600" />
                      Derecho a reclamar
                    </p>
                    <p className="text-sm text-gray-600">
                      Presentar reclamos por productos o servicios defectuosos.
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="font-semibold text-yellow-700 mb-1 flex items-center gap-2">
                      <FaShieldAlt className="text-yellow-600" />
                      Derecho a la protección
                    </p>
                    <p className="text-sm text-gray-600">
                      Ser protegido contra prácticas comerciales abusivas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Proceso de atención */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaClock className="text-primary-600" />
                  Proceso de atención
                </h3>
                <div className="space-y-4">
                  {[
                    { num: 1, title: 'Registro', desc: 'Completa el formulario' },
                    { num: 2, title: 'Recepción', desc: 'Recibirás un código de seguimiento' },
                    { num: 3, title: 'Evaluación', desc: 'Analizaremos tu caso en 5 días hábiles' },
                    { num: 4, title: 'Respuesta', desc: 'Te enviaremos una respuesta en 15 días' }
                  ].map((step) => (
                    <div key={step.num} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold
                        ${step.num === 1 ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {step.num}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{step.title}</p>
                        <p className="text-sm text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contacto directo */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaHandshake />
                  ¿Necesitas ayuda?
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <FaHeadset />
                      Atención al cliente
                    </p>
                    <p className="text-sm text-primary-100">servicios@teknisolutions.pe</p>
                    <p className="text-sm text-primary-100">+51 912 909 920</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <FaClock />
                      Horario de atención
                    </p>
                    <p className="text-sm text-primary-100">Lun - Vie: 9:00 AM - 6:00 PM</p>
                    <p className="text-sm text-primary-100">Sábados: 9:00 AM - 12:00 PM</p>
                  </div>
                  <a
                    href="https://wa.me/51912909920"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 mt-4"
                  >
                    <FaWhatsapp className="text-xl" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reclamaciones;