import type { Audience } from "./HomePage";

const testimonials = {
  paciente: [
    {
      quote: "Sentí que por primera vez alguien me escuchó de verdad y mi ansiedad empezó a bajar.",
      name: "Camila, 31 años",
      role: "Paciente EMDR",
    },
    {
      quote: "Las sesiones me ayudaron a entender mis emociones sin sentirme abrumada.",
      name: "Andrés, 28 años",
      role: "Paciente en proceso",
    },
  ],
  terapeuta: [
    {
      quote: "La formación y supervisión me dieron confianza para aplicar EMDR en mi consulta.",
      name: "Dra. Marcela Gómez",
      role: "Psicóloga clínica",
    },
    {
      quote: "Ahora mis tratamientos tienen una estructura más sólida y resultados más claros.",
      name: "Andrés Pérez",
      role: "Terapeuta EMDR",
    },
  ],
};

export default function TestimonialsSection({ audience }: { audience: Audience }) {
  const items = testimonials[audience];

  return (
    <section id="testimonios" className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-6 text-center">
        <span className="inline-flex rounded-full bg-slate-900 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white shadow-sm">
          Testimonios
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {audience === "paciente"
            ? "Historias de avance y alivio"
            : "Experiencias de profesionales satisfechos"}
        </h2>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
          {audience === "paciente"
            ? "Personas reales que encontraron en EMDR un espacio confiable para sanar."
            : "Colegas que fortalecieron su práctica con formación y supervisión EMDR."}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.name} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <p className="text-xl leading-9 text-slate-700">"{item.quote}"</p>
            <div className="mt-8">
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="text-sm text-slate-500">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
