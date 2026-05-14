type AdminHeaderProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function AdminHeader({ title, description, actionLabel, onAction }: AdminHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Administrar terapeutas</p>
        <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
        {description ? <p className="max-w-2xl text-slate-600">{description}</p> : null}
      </div>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
