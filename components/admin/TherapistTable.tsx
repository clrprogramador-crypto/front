import type { Therapist } from "../../types/therapist";

type TherapistTableProps = {
  therapists: Therapist[];
  loading: boolean;
  onView: (therapist: Therapist) => void;
  onEdit: (therapist: Therapist) => void;
  onToggleActive: (therapist: Therapist) => void;
  onDelete: (therapist: Therapist) => void;
};

export default function TherapistTable({ therapists, loading, onView, onEdit, onToggleActive, onDelete }: TherapistTableProps) {
  if (loading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="animate-pulse rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-14 w-14 rounded-3xl bg-slate-200" />
              <div className="h-4 w-48 rounded-full bg-slate-200" />
            </div>
            <div className="grid gap-3 md:grid-cols-4">
              <div className="h-3 rounded-full bg-slate-200" />
              <div className="h-3 rounded-full bg-slate-200" />
              <div className="h-3 rounded-full bg-slate-200" />
              <div className="h-3 rounded-full bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (therapists.length === 0) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        No hay terapeutas que coincidan con los filtros.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-slate-50 text-left text-sm uppercase tracking-[0.18em] text-slate-500">
          <tr>
            <th className="px-6 py-5">Terapeuta</th>
            <th className="px-6 py-5">Ciudad</th>
            <th className="px-6 py-5">Departamento</th>
            <th className="px-6 py-5">Modalidad</th>
            <th className="px-6 py-5">Estado</th>
            <th className="px-6 py-5">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-sm text-slate-700">
          {therapists.map((therapist) => (
            <tr key={therapist.id} className="border-t border-slate-200 hover:bg-slate-50/60">
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-3xl bg-slate-100">
                    <img src={therapist.photo_url || "/favicon.ico"} alt={therapist.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{therapist.name}</p>
                    <p className="text-xs text-slate-500">{(therapist.specialties ?? []).join(", ")}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 text-slate-600">{therapist.city}</td>
              <td className="px-6 py-5 text-slate-600">{therapist.department}</td>
              <td className="px-6 py-5">
                <div className="flex flex-wrap gap-2">
                  {therapist.modality_virtual ? <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Virtual</span> : null}
                  {therapist.modality_presential ? <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Presencial</span> : null}
                </div>
              </td>
              <td className="px-6 py-5">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${therapist.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                  {therapist.is_active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-6 py-5">
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => onView(therapist)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                    Ver
                  </button>
                  <button onClick={() => onEdit(therapist)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                    Editar
                  </button>
                  <button onClick={() => onToggleActive(therapist)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                    {therapist.is_active ? "Desactivar" : "Activar"}
                  </button>
                  <button onClick={() => onDelete(therapist)} className="rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
