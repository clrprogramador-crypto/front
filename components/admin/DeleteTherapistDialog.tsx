type DeleteTherapistDialogProps = {
  open: boolean;
  therapistName?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteTherapistDialog({ open, therapistName, onCancel, onConfirm }: DeleteTherapistDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6">
      <div className="w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
        <h2 className="text-2xl font-semibold text-slate-900">Confirmar eliminación</h2>
        <p className="mt-4 text-slate-600">
          ¿Deseas eliminar a <span className="font-semibold text-slate-900">{therapistName}</span>? Esta acción no se puede deshacer.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Eliminar terapeuta
          </button>
        </div>
      </div>
    </div>
  );
}
