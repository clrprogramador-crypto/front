"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "../../../components/admin/AdminHeader";
import TherapistFilters from "../../../components/admin/TherapistFilters";
import TherapistTable from "../../../components/admin/TherapistTable";
import TherapistCardPreview from "../../../components/admin/TherapistCardPreview";
import DeleteTherapistDialog from "../../../components/admin/DeleteTherapistDialog";
import type { Therapist } from "../../../types/therapist";

const defaultSearch = "";
const defaultFilter = "";

export default function AdminTherapistsPage() {
  const router = useRouter();
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(defaultSearch);
  const [department, setDepartment] = useState(defaultFilter);
  const [city, setCity] = useState(defaultFilter);
  const [modality, setModality] = useState(defaultFilter);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Therapist | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const fetchTherapists = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/therapists", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "No se pudo cargar la lista de terapeutas");
      }
      setTherapists(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  const departments = useMemo(
    () => Array.from(new Set(therapists.map((item) => item.department))).sort(),
    [therapists]
  );
  const cities = useMemo(
    () => Array.from(new Set(therapists.map((item) => item.city))).sort(),
    [therapists]
  );

  const filteredTherapists = useMemo(() => {
    return therapists.filter((therapist) => {
      const specialtiesText = therapist.specialties?.join(" ") ?? "";
      const matchesQuery = [therapist.name, therapist.city, therapist.department, specialtiesText]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      const matchesDepartment = department ? therapist.department === department : true;
      const matchesCity = city ? therapist.city === city : true;
      const matchesModality = modality
        ? modality === "ambas"
          ? therapist.modality_virtual && therapist.modality_presential
          : modality === "virtual"
          ? therapist.modality_virtual
          : therapist.modality_presential
        : true;

      return matchesQuery && matchesDepartment && matchesCity && matchesModality;
    });
  }, [therapists, search, department, city, modality]);

  const metrics = useMemo(() => {
    const total = therapists.length;
    const active = therapists.filter((item) => item.is_active).length;
    const inactive = total - active;
    const virtual = therapists.filter((item) => item.modality_virtual).length;
    const presential = therapists.filter((item) => item.modality_presential).length;
    return { total, active, inactive, virtual, presential };
  }, [therapists]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  };

  const handleToggleActive = async (therapist: Therapist) => {
    const updated = { ...therapist, is_active: !therapist.is_active };
    try {
      const response = await fetch(`/api/admin/therapists/${therapist.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: updated.is_active }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo actualizar el estado");
      setTherapists((prev) => prev.map((item) => (item.id === therapist.id ? updated : item)));
      showToast(`Terapeuta ${updated.is_active ? "activado" : "desactivado"} correctamente`);
    } catch (err) {
      showToast((err as Error).message);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      const response = await fetch(`/api/admin/therapists/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo eliminar el terapeuta");
      setTherapists((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
      showToast("Terapeuta eliminado correctamente");
    } catch (err) {
      showToast((err as Error).message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <AdminHeader
        title="Terapeutas asociados"
        description="Gestiona el equipo EMDR desde un panel moderno y profesional."
        actionLabel="Agregar terapeuta"
        onAction={() => router.push("/admin/terapeutas/nuevo")}
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Total</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{metrics.total}</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Activos</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{metrics.active}</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Inactivos</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{metrics.inactive}</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Virtual</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{metrics.virtual}</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Presencial</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{metrics.presential}</p>
        </div>
      </div>

      <TherapistFilters
        search={search}
        department={department}
        city={city}
        modality={modality}
        departments={departments}
        cities={cities}
        onSearch={setSearch}
        onDepartmentChange={setDepartment}
        onCityChange={setCity}
        onModalityChange={setModality}
        onReset={() => {
          setSearch(defaultSearch);
          setDepartment(defaultFilter);
          setCity(defaultFilter);
          setModality(defaultFilter);
        }}
      />

      {error ? (
        <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
          <p>{error}</p>
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.95fr]">
        <div>
          <TherapistTable
            therapists={filteredTherapists}
            loading={loading}
            onView={setSelectedTherapist}
            onEdit={(therapist) => router.push(`/admin/terapeutas/${therapist.id}/editar`)}
            onToggleActive={handleToggleActive}
            onDelete={(therapist) => setDeleteTarget(therapist)}
          />
        </div>
        <TherapistCardPreview therapist={selectedTherapist} />
      </div>

      <DeleteTherapistDialog
        open={Boolean(deleteTarget)}
        therapistName={deleteTarget?.name}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50 rounded-3xl bg-slate-950 px-5 py-4 text-sm text-white shadow-xl">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
