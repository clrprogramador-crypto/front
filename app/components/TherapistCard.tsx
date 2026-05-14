import type { Therapist } from "../lib/getTherapists";

export default function TherapistCard({ therapist }: { therapist: Therapist }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      <div className="h-64 overflow-hidden bg-slate-100">
        <img
          src={therapist.photo}
          alt={therapist.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{therapist.name}</h3>
            <p className="mt-2 text-sm text-slate-500">{therapist.specialty}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
            {therapist.city}
          </span>
        </div>
        <p className="text-slate-600 leading-7">{therapist.description}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <span className="font-semibold">Depto:</span> {therapist.department}
          </div>
          <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <span className="font-semibold">Modalidad:</span> {therapist.modality.join(" • ")}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <button className="flex-1 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Ver perfil
          </button>
          <button className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
            Agendar cita
          </button>
        </div>
      </div>
    </article>
  );
}
