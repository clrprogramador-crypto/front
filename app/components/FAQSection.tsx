import type { Audience } from "./HomePage";

const faqs = {
  paciente: [
    {
      question: "¿Duele una sesión de EMDR?",
      answer: "No. La experiencia es guiada, gradual y cómoda. El terapeuta se asegura de que te sientas seguro en cada paso.",
    },
    {
      question: "¿Cuántas sesiones necesito?",
      answer: "Cada proceso es único, pero muchas personas sienten alivio significativo entre 6 y 12 sesiones.",
    },
    {
      question: "¿Puedo hacer EMDR de forma virtual?",
      answer: "Sí. Ofrecemos modalidades virtuales con soporte técnico y espacio terapéutico seguro.",
    },
  ],
  terapeuta: [
    {
      question: "¿Qué formación requiere un terapeuta EMDR?",
      answer: "Es necesario formación teórica y práctica, además de supervisión clínica para aplicar el protocolo con seguridad.",
    },
    {
      question: "¿Qué beneficios trae la supervisión?",
      answer: "La supervisión fortalece decisiones clínicas, reduce riesgos y mejora la adherencia al protocolo EMDR.",
    },
    {
      question: "¿Puedo integrar EMDR en mi consulta actual?",
      answer: "Sí. EMDR complementa otros enfoques y permite abordar trauma y ansiedad con un marco estructurado.",
    },
  ],
};

export default function FAQSection({ audience }: { audience: Audience }) {
  const items = faqs[audience];

  return (
    <section id="faq" className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-6 text-center">
        <span className="inline-flex rounded-full bg-slate-900 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white shadow-sm">
          Preguntas frecuentes
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {audience === "paciente" ? "Respuestas claras a tus dudas" : "Preguntas frecuentes para profesionales"}
        </h2>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.question} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
            <p className="mt-3 text-slate-600 leading-7">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
