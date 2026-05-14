"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Terapeuta = {
  id: number;
  nombre: string;
  descripcion: string;
  ciudad: string;
  departamento: string;
  modalidad: string;
  especialidad: string;
  imagen: string | null;
  telefono?: string;
  correo_electronico?: string;
};

const therapistContent = {
  title: "Formación EMDR para profesionales",
  description:
    "Conviértete en terapeuta certificado en EMDR. Accede a formación avanzada, recursos clínicos y supervisión especializada. Potencia tu práctica profesional con nuestro respaldo.",
  ctaPrimary: { text: "Ver programas formativos", href: "/formacion" },
  ctaSecondary: { text: "Recursos gratuitos", href: "/recursos" },
  imageSrc: "/images/emdr-therapist-hero.jpg",
  floatingCard: { text: "🎓 +500 profesionales ya se han formado con nosotros", icon: "📈" },
};

export default function AudienceHero() {
  const [audience, setAudience] = useState<"paciente" | "terapeuta">("paciente");
  const [terapeuta, setTerapeuta] = useState<Terapeuta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (audience === "paciente") {
      fetch("/api/terapeutas")
        .then((res) => res.json())
        .then((data) => {
          console.log("Datos recibidos:", data);
          if (data.ok && data.data && data.data.length > 0) {
            setTerapeuta(data.data[0]);
          } else {
            setTerapeuta(null);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [audience]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Selector de perfil (sin cambios) */}
      <div className="relative z-20 flex justify-center pt-8 md:pt-12">
        <div className="inline-flex rounded-full bg-white/60 backdrop-blur-sm p-1 shadow-md border border-gray-100">
          <button
            onClick={() => setAudience("paciente")}
            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              audience === "paciente"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-gray-600 hover:text-emerald-700"
            }`}
          >
            Soy paciente
          </button>
          <button
            onClick={() => setAudience("terapeuta")}
            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              audience === "terapeuta"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:text-blue-700"
            }`}
          >
            Soy terapeuta
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-20">
        {audience === "paciente" ? (
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            {/* Columna izquierda */}
            <div className="flex-1 text-left space-y-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full bg-white/70 backdrop-blur-sm text-emerald-700 border border-emerald-100">
                Terapeuta EMDR certificado
              </span>
              {terapeuta ? (
                <>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-800">
                    {terapeuta.nombre}
                  </h1>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    <span>📍 {terapeuta.ciudad}, {terapeuta.departamento}</span>
                    <span>•</span>
                    <span>💻 Modalidad: {terapeuta.modalidad}</span>
                    <span>•</span>
                    <span>🎯 Especialidad: {terapeuta.especialidad || "EMDR"}</span>
                  </div>
                  <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                    {terapeuta.descripcion || "Terapeuta especializado en EMDR, con enfoque humano y basado en la evidencia."}
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link href={`/terapeutas/${terapeuta.id}`}
                          className="px-6 py-3 text-base font-medium rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                      Ver perfil completo
                    </Link>
                    <Link href="/cita"
                          className="px-6 py-3 text-base font-medium rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:shadow-md transition-all duration-300">
                      Solicitar cita
                    </Link>
                  </div>
                </>
              ) : (
                <p>No hay terapeutas disponibles</p>
              )}
            </div>

            {/* Columna derecha */}
            <div className="flex-1 relative">
              {terapeuta && (
                <div className="relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    {terapeuta.imagen ? (
                      <Image src={terapeuta.imagen} alt={terapeuta.nombre} width={600} height={500}
                             className="object-cover w-full h-auto max-h-[500px]" priority />
                    ) : (
                      <div className="w-full h-[400px] bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center">
                        <span className="text-gray-400">Foto no disponible</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-6 left-4 md:-bottom-8 md:left-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 max-w-[220px] border border-white/20">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">✨</span>
                      <p className="text-sm font-medium text-gray-700 leading-tight">
                        Atención personalizada y con enfoque humano
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            {/* Contenido estático para terapeuta (similar a antes pero sin motion) */}
            <div className="flex-1 text-left space-y-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full bg-white/70 backdrop-blur-sm text-blue-700 border border-blue-100">
                Desarrollo profesional
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-800">
                {therapistContent.title}
              </h1>
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                {therapistContent.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href={therapistContent.ctaPrimary.href}
                    className="px-6 py-3 text-base font-medium rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 bg-blue-600 hover:bg-blue-700 text-white">
                  {therapistContent.ctaPrimary.text}
                </Link>
                <Link href={therapistContent.ctaSecondary.href}
                    className="px-6 py-3 text-base font-medium rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:shadow-md transition-all duration-300">
                  {therapistContent.ctaSecondary.text}
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image src={therapistContent.imageSrc} alt="Terapeutas en formación" width={600} height={500}
                       className="object-cover w-full h-auto max-h-[500px]" priority />
              </div>
              <div className="absolute -bottom-6 left-4 md:-bottom-8 md:left-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 max-w-[220px] border border-white/20">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{therapistContent.floatingCard.icon}</span>
                  <p className="text-sm font-medium text-gray-700 leading-tight">
                    {therapistContent.floatingCard.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fondos decorativos (sin animaciones) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -left-20 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>
    </section>
  );
}