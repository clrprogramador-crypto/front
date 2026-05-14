import type { Therapist } from "../../types/therapist";

export default function TherapistCardPreview({ therapist }: { therapist: Therapist | null }) {
  if (!therapist) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        Selecciona un terapeuta para ver la vista previa.
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="h-40 w-40 overflow-hidden rounded-[1.75rem] bg-slate-100">
          <img src={therapist.photo_url || "/favicon.ico"} alt={therapist.name} className="h-full w-full object-cover" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
              {therapist.is_active ? "Activo" : "Inactivo"}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              {therapist.city}, {therapist.department}
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">{therapist.name}</h2>
          <p className="max-w-xl text-slate-600">{therapist.short_description}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <span className="font-semibold">Modalidades:</span> {therapist.modality_virtual && therapist.modality_presential ? "Virtual y presencial" : therapist.modality_virtual ? "Virtual" : "Presencial"}
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <span className="font-semibold">Experiencia:</span> {therapist.experience_years} años
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(therapist.specialties ?? ["EMDR"]).map((specialty) => (
              <span key={specialty} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
