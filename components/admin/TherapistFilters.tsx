type TherapistFiltersProps = {
  search: string;
  department: string;
  city: string;
  modality: string;
  departments: string[];
  cities: string[];
  onSearch: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onModalityChange: (value: string) => void;
  onReset: () => void;
};

export default function TherapistFilters({
  search,
  department,
  city,
  modality,
  departments,
  cities,
  onSearch,
  onDepartmentChange,
  onCityChange,
  onModalityChange,
  onReset,
}: TherapistFiltersProps) {
  return (
    <div className="mb-8 grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[1.4fr_1fr]">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr]">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Buscar</span>
          <input
            type="search"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Nombre, ciudad, departamento o especialidad"
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Departamento</span>
          <select
            value={department}
            onChange={(event) => onDepartmentChange(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          >
            <option key="all-departments" value="">Todos</option>
            {departments.map((item, index) => (
              <option key={`department-${index}-${item}`} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Ciudad</span>
          <select
            value={city}
            onChange={(event) => onCityChange(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          >
            <option key="all-cities" value="">Todas</option>
            {cities.map((item, index) => (
              <option key={`city-${index}-${item}`} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Modalidad</span>
          <select
            value={modality}
            onChange={(event) => onModalityChange(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          >
            <option value="">Todas</option>
            <option value="virtual">Virtual</option>
            <option value="presencial">Presencial</option>
            <option value="ambas">Ambas</option>
          </select>
        </label>
      </div>
      <div className="flex items-end justify-end">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
