import type { Audience } from "./HomePage";

const problems = {
  paciente: [
    "Ansiedad recurrente",
    "Dificultad para dormir",
    "Recuerdos intrusivos",
    "Estrés prolongado",
    "Reacciones emocionales intensas",
    "Sensación de inseguridad interior",
  ],
  terapeuta: [
    "Trauma complejo",
    "Trastorno de estrés postraumático",
    "Fobia y ansiedad social",
    "Reprocesamiento de eventos críticos",
    "Gestión de crisis y adherencia terapéutica",
    "Integración de protocolos en consulta privada",
  ],
};

export default function SituationsSection({ audience }: { audience: Audience }) {
  const items = problems[audience];

  return (
    <section id="situaciones" className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-[0_25px_60px_rgba(15,23,42,0.18)]">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-200">
            ¿Para qué sirve?
          </span>
          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            {audience === "paciente"
              ? "¿Qué situaciones puede tratar EMDR?"
              : "Aplicaciones clínicas principales"}
          </h2>
          <p className="mt-5 max-w-xl text-slate-300 leading-7">
            {audience === "paciente"
              ? "EMDR ayuda a quienes han vivido experiencias difíciles y buscan aliviar su carga emocional de forma segura."
              : "Este enfoque es valioso en contextos clínicos que requieren una intervención estructurada para síntomas complejos."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item} className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
              <p className="font-semibold text-slate-900">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
