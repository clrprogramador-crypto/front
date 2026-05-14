import type { Audience } from "./HomePage";

const benefits = {
  paciente: [
    {
      title: "Reducción de ansiedad",
      description: "Logra respuestas más serenas frente a recuerdos que antes eran abrumadores.",
      accent: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Mayor claridad emocional",
      description: "Entiende mejor tus emociones y recupera sensación de control.",
      accent: "bg-sky-50 text-sky-700",
    },
    {
      title: "Proceso seguro",
      description: "Avanza acompañado por un terapeuta experimentado y con ritmo adaptado a ti.",
      accent: "bg-amber-50 text-amber-700",
    },
  ],
  terapeuta: [
    {
      title: "Crecimiento clínico",
      description: "Añade un protocolo estructurado que complementa tus técnicas existentes.",
      accent: "bg-sky-50 text-sky-700",
    },
    {
      title: "Soporte profesional",
      description: "Accede a supervisión, casos clínicos y recursos para aplicar EMDR con seguridad.",
      accent: "bg-indigo-50 text-indigo-700",
    },
    {
      title: "Mejora de resultados",
      description: "Optimiza el tratamiento de trauma y ansiedad con un enfoque respaldado por evidencia.",
      accent: "bg-emerald-50 text-emerald-700",
    },
  ],
};

export default function BenefitsSection({ audience }: { audience: Audience }) {
  const items = benefits[audience];

  return (
    <section id="beneficios" className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-6 text-center">
        <span className="inline-flex rounded-full bg-slate-900 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white shadow-sm">
          Beneficios clave
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {audience === "paciente" ? "Beneficios que sentirás" : "Beneficios para tu práctica"}
        </h2>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
          {audience === "paciente"
            ? "Una experiencia terapéutica pensada para tu recuperación emocional, con resultados respetuosos y duraderos."
            : "Recursos y herramientas diseñadas para consolidar tu práctica EMDR como una oferta clínica confiable."
          }
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <div className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${item.accent}`}>
              {audience === "paciente" ? "Emdr" : "Pro"}
            </div>
            <h3 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-4 text-slate-600 leading-7">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
