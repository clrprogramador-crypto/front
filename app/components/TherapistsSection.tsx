"use client";

import { useEffect, useMemo, useState } from "react";
import { getTherapists, type Therapist } from "../lib/getTherapists";
import TherapistCard from "./TherapistCard";
import type { Audience } from "./HomePage";

const emptyState = {
  status: "idle",
  message: "",
};

export default function TherapistsSection({ audience }: { audience: Audience }) {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [filtered, setFiltered] = useState<Therapist[]>([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [modality, setModality] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(emptyState);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(emptyState);
      try {
        const data = await getTherapists({
          search: search || undefined,
          city: city || undefined,
          department: department || undefined,
          per_page: 12,
          page: 1,
        });
        setTherapists(data);
        setFiltered(
          modality
            ? data.filter((therapist) =>
                therapist.modality.some((item) => item.toLowerCase() === modality.toLowerCase())
              )
            : data
        );
      } catch (err) {
        setError({ status: "error", message: (err as Error).message || "No se pudieron cargar los terapeutas" });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search, department, city]);

  useEffect(() => {
    setFiltered(
      modality
        ? therapists.filter((therapist) =>
            therapist.modality.some((item) => item.toLowerCase() === modality.toLowerCase())
          )
        : therapists
    );
  }, [modality, therapists]);

  const departments = useMemo(
    () => Array.from(new Set(therapists.map((therapist) => therapist.department))).sort(),
    [therapists]
  );

  const cities = useMemo(
    () => Array.from(new Set(therapists.map((therapist) => therapist.city))).sort(),
    [therapists]
  );

  const modalities = useMemo(
    () => Array.from(new Set(therapists.flatMap((therapist) => therapist.modality))).sort(),
    [therapists]
  );

  return (
    <section id="terapeutas" className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-gradient-to-r from-white via-slate-100 to-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-slate-900 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white shadow-sm">
              Terapeutas asociados
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {audience === "paciente"
                ? "Encuentra un terapeuta EMDR que te acompañe con cercanía"
                : "Conecta con una red profesional de terapeutas certificados"}
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {audience === "paciente"
                ? "Busca por especialidad, ciudad o modalidad y elige el profesional que mejor se adapta a tu proceso."
                : "Accede a una comunidad de colegas con formación EMDR y diversas modalidades de atención."}
            </p>
          </div>
          <div className="grid gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600" htmlFor="searchTherapists">
                Buscar por nombre, ciudad o especialidad
              </label>
              <input
                id="searchTherapists"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Escribe tu búsqueda"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <select
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              >
                <option key="all-departments" value="">Todos los departamentos</option>
                {departments.map((option, index) => (
                  <option key={`department-${index}-${option}`} value={option}>{option}</option>
                ))}
              </select>
              <select
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              >
                <option key="all-cities" value="">Todas las ciudades</option>
                {cities.map((option, index) => (
                  <option key={`city-${index}-${option}`} value={option}>{option}</option>
                ))}
              </select>
              <select
                value={modality}
                onChange={(event) => setModality(event.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              >
                <option key="all-modalities" value="">Todas las modalidades</option>
                {modalities.map((option, index) => (
                  <option key={`modality-${index}-${option}`} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="animate-pulse rounded-[2rem] border border-slate-200 bg-slate-100 p-6">
                  <div className="mb-6 h-48 rounded-3xl bg-slate-200" />
                  <div className="h-4 w-3/4 rounded-full bg-slate-200 mb-4" />
                  <div className="h-4 w-1/2 rounded-full bg-slate-200 mb-4" />
                  <div className="h-3 w-full rounded-full bg-slate-200" />
                </div>
              ))}
            </div>
          ) : error.status === "error" ? (
            <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-8 text-rose-700 shadow-sm">
              <p className="text-lg font-semibold">No se pudieron cargar los terapeutas</p>
              <p className="mt-2 text-slate-700">{error.message}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 inline-flex rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                Reintentar
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-700 shadow-sm">
              <p className="text-xl font-semibold">No encontramos terapeutas que coincidan.</p>
              <p className="mt-3 text-slate-600">Prueba con otro filtro o amplía tu búsqueda.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((therapist) => (
                <TherapistCard key={therapist.id} therapist={therapist} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
