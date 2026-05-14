"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import type { Audience } from "./HomePage";

const heroSlides = {
  paciente: [
    {
      title: "Una forma segura de procesar experiencias difíciles",
      subtitle: "EMDR para acompañarte con calma y claridad.",
      description:
        "Recupera estabilidad emocional con una terapia guiada que respeta tu ritmo. Atravesamos el trauma con apoyo y herramientas que ayudan a tu bienestar.",
      ctaPrimary: "Conocer la terapia",
      ctaSecondary: "Agendar una cita",
      badge: "50% más rápido en vivir emociones reguladas",
    },
    {
      title: "EMDR para ansiedad, trauma y estrés",
      subtitle: "Un camino humano hacia la tranquilidad.",
      description:
        "Identifica patrones emocionales y trabaja con una técnica avalada por la evidencia para restablecer tu equilibrio, reducir tensión y fortalecer tu autocuidado.",
      ctaPrimary: "Ver beneficios",
      ctaSecondary: "Hablar con un terapeuta",
      badge: "Talleres en vivo disponibles",
    },
    {
      title: "Acompañamiento terapéutico paso a paso",
      subtitle: "Tu proceso con un acompañamiento profesional.",
      description:
        "Cada sesión se diseña para que te sientas seguro, comprendido y apoyado. Avanza con una fórmula clara: seguridad, exploración y construcción de nuevas respuestas.",
      ctaPrimary: "Descubrir el proceso",
      ctaSecondary: "Revisar testimonios",
      badge: "Sesiones virtuales y presenciales",
    },
  ],
  terapeuta: [
    {
      title: "Formación EMDR para profesionales",
      subtitle: "Eleva tu práctica con herramientas clínicas avanzadas.",
      description:
        "Capacítate con supervisión especializada y contenidos diseñados para implementar EMDR desde un enfoque ético, seguro y centrado en resultados.",
      ctaPrimary: "Ver capacitaciones",
      ctaSecondary: "Solicitar alianza",
      badge: "Programa técnico con certificación",
    },
    {
      title: "Recursos clínicos y herramientas terapéuticas",
      subtitle: "Material práctico para tus sesiones.",
      description:
        "Accede a guías, plantillas y estrategias para integrar EMDR en tu consulta con mayor seguridad, precisión diagnóstica y confianza profesional.",
      ctaPrimary: "Descargar recursos",
      ctaSecondary: "Revisar casos",
      badge: "Biblioteca actualizada cada mes",
    },
    {
      title: "Supervisión y actualización profesional",
      subtitle: "Acompañamiento real para tu desarrollo clínico.",
      description:
        "Mantén tu práctica al día con supervisiones individuales, grupos clínicos y espacios de reflexión que facilitan decisiones terapéuticas más sólidas.",
      ctaPrimary: "Ver supervisiones",
      ctaSecondary: "Conocer mentorías",
      badge: "Cupo limitado para cohortes premium",
    },
  ],
};

const theme = {
  paciente: {
    accent: "from-emerald-300 via-emerald-200 to-white",
    badge: "bg-emerald-600 text-white",
    buttonPrimary: "bg-emerald-600 hover:bg-emerald-700",
    buttonSecondary: "bg-white/90 text-slate-900 border border-slate-200",
  },
  terapeuta: {
    accent: "from-sky-300 via-sky-200 to-white",
    badge: "bg-sky-700 text-white",
    buttonPrimary: "bg-sky-700 hover:bg-sky-800",
    buttonSecondary: "bg-white/95 text-slate-900 border border-slate-200",
  },
};

export default function HeroSlider({ audience }: { audience: Audience }) {
  const slides = heroSlides[audience];
  const palette = theme[audience];

  return (
    <section id="hero" className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-white to-transparent"></div>
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-emerald-200 opacity-50 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-sky-200 opacity-50 blur-3xl" />
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination, A11y]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, bulletClass: "hero-dot", bulletActiveClass: "hero-dot-active" }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop
            speed={900}
            autoplay={{ delay: 5200, disableOnInteraction: false }}
            className="relative overflow-hidden"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.title + index}>
                <div className="grid gap-10 px-6 py-12 lg:grid-cols-[1.3fr_0.9fr] lg:px-12 lg:py-16">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 }}
                    className="space-y-6"
                  >
                    <div className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm ${palette.badge}`}>
                      {slide.badge}
                    </div>
                    <div className="max-w-2xl space-y-4">
                      <p className="text-base font-semibold uppercase tracking-[0.24em] text-slate-500">
                        {audience === "paciente" ? "Bienestar emocional" : "Avance clínico"}
                      </p>
                      <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                        {slide.title}
                      </h1>
                      <p className="text-lg leading-8 text-slate-600">
                        {slide.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <a href="#terapeutas" className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-semibold text-white shadow-lg transition ${palette.buttonPrimary}`}>
                        {slide.ctaPrimary}
                      </a>
                      <a href="#contacto" className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-semibold transition ${palette.buttonSecondary}`}>
                        {slide.ctaSecondary}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="relative flex items-center justify-center"
                  >
                    <div className="relative w-full max-w-xl rounded-[2rem] bg-gradient-to-br from-slate-900/5 to-white p-8 shadow-2xl ring-1 ring-slate-900/5">
                      <div className="absolute -left-10 top-6 h-28 w-28 rounded-full bg-slate-900/5 blur-2xl" />
                      <div className="rounded-[1.75rem] border border-white/80 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl">
                        <div className="h-80 rounded-[1.5rem] bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.15),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.16),_transparent_35%)] p-6 text-slate-800">
                          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                            <span className="text-xl">💡</span>
                            Inspiración EMDR
                          </div>
                          <p className="text-lg leading-8">
                            {slide.subtitle}
                          </p>
                          <div className="mt-8 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                            <div className="rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200">
                              <p className="font-semibold text-slate-900">Tono</p>
                              <p className="mt-2 text-slate-600">Premium, cálido y confiable.</p>
                            </div>
                            <div className="rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200">
                              <p className="font-semibold text-slate-900">Enfoque</p>
                              <p className="mt-2 text-slate-600">Centrado en tu experiencia y resultados.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -bottom-8 left-6 hidden w-40 rounded-[1.5rem] border border-white/80 bg-slate-950/95 p-4 text-white shadow-2xl sm:block">
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Formato</p>
                        <p className="mt-3 text-lg font-semibold">Slider relajado y sofisticado</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
