import type { Audience } from "./HomePage";

const infoContent = {
  paciente: {
    title: "¿Qué es EMDR?",
    description:
      "EMDR es una terapia respaldada por la ciencia que ayuda a procesar recuerdos difíciles y recuperar calma. Usa movimientos suaves o estímulos visuales para que tu cerebro integre las experiencias de una forma nueva.",
    items: [
      "Se enfoca en recuerdos que generan estrés y angustia.",
      "Permite encontrar una nueva sensación de seguridad interna.",
      "Es eficaz en problemas como ansiedad, trauma y duelo.",
    ],
  },
  terapeuta: {
    title: "¿Qué es EMDR para profesionales?",
    description:
      "EMDR es una intervención basada en evidencia para el tratamiento de estrés postraumático, ansiedad y desregulación emocional. Su enfoque estructurado aporta claridad diagnóstica y un protocolo replicable en cada fase clínica.",
    items: [
      "Responde a estándares internacionales de la práctica EMDR.",
      "Permite integrar experiencias traumáticas sin revictimización.",
      "Es una herramienta útil en planes terapéuticos complejos.",
    ],
  },
};

export default function InfoSection({ audience }: { audience: Audience }) {
  const content = infoContent[audience];

  return (
    <section id="que-es" className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-slate-900 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white shadow-sm">
            Qué es EMDR
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {content.title}
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            {content.description}
          </p>
        </div>
        <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.08)]">
          {content.items.map((item) => (
            <div key={item} className="rounded-3xl bg-slate-50 p-5">
              <p className="font-semibold text-slate-900">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
