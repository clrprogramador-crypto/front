import type { Audience } from "./HomePage";

const steps = {
  paciente: [
    {
      title: "Bienvenida segura",
      description: "Comenzamos por crear un ambiente de confianza donde puedas expresar tu historia con calma.",
    },
    {
      title: "Identificación del recuerdo",
      description: "Localizamos juntos la experiencia clave que activa la angustia y trabajamos desde allí.",
    },
    {
      title: "Procesamiento con EMDR",
      description: "Aplicamos estimulación bilateral para que el cerebro procese el recuerdo y genere una respuesta nueva.",
    },
    {
      title: "Refuerzo y cierre",
      description: "Cerramos cada sesión con recursos prácticos que te ayudan a mantener el equilibrio después del acompañamiento.",
    },
  ],
  terapeuta: [
    {
      title: "Evaluación clínica inicial",
      description: "Analiza la historia del paciente y determina si EMDR es la intervención recomendada.",
    },
    {
      title: "Preparación del paciente",
      description: "Ensaya la estabilidad emocional y establece una base segura antes del procesamiento.",
    },
    {
      title: "Aplicación del protocolo",
      description: "Utiliza la secuencia EMDR estructurada: evaluación, desensibilización, instalación y cierre.",
    },
    {
      title: "Seguimiento y supervisión",
      description: "Registra resultados, ajusta la intervención y comparte el caso en supervisión clínica cuando sea necesario.",
    },
  ],
};

export default function HowItWorksSection({ audience }: { audience: Audience }) {
  return (
    <section id="proceso" className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-slate-900 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white shadow-sm">
            Cómo funciona
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {audience === "paciente"
              ? "Un proceso claro y acompañado"
              : "Protocolo clínico EMDR paso a paso"}
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            {audience === "paciente"
              ? "Cada sesión está pensada para que avances con seguridad, comprensión y una sensación de alivio progresivo."
              : "Integra un enfoque estructurado que te ayuda a avanzar con mayor precisión clínica y un acompañamiento profesional sólido."
            }
          </p>
        </div>

        <div className="grid gap-5">
          {steps[audience].map((step, index) => (
            <div key={step.title} className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-lg font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-slate-600 leading-7">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
