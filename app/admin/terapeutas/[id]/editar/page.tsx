"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminHeader from "../../../../../components/admin/AdminHeader";
import TherapistForm from "../../../../../components/admin/TherapistForm";
import type { Therapist } from "../../../../../types/therapist";
import type { TherapistFormValues } from "../../../../../lib/validations/therapistSchema";

export default function EditTherapistPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const loadTherapist = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/admin/therapists/${id}`, { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "No se pudo cargar el terapeuta");
        setTherapist(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadTherapist();
  }, [id]);

  const handleSubmit = async (values: TherapistFormValues) => {
    if (!id) return;
    setIsSubmitting(true);
    setError(null);
    try {
      let body: any;
      let headers: Record<string, string> = {};

      if (values.photo) {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('short_description', values.short_description);
        formData.append('email', values.email || '');
        formData.append('phone', values.phone || '');
        formData.append('city', values.city);
        formData.append('department', values.department);
        formData.append('experience_years', String(values.experience_years));
        formData.append('is_active', String(values.is_active));
        formData.append('photo', values.photo);
        
        body = formData;
      } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(values);
      }

      const response = await fetch(`/api/admin/therapists/${id}`, {
        method: "PUT",
        headers,
        body,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo actualizar el terapeuta");
      router.push("/admin/terapeutas");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <AdminHeader
        title="Editar terapeuta"
        description="Ajusta los datos del terapeuta y mantiene actualizada la información pública."
        actionLabel="Volver a terapeutas"
        onAction={() => router.push("/admin/terapeutas")}
      />
      {error ? (
        <div className="mb-6 rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
          {error}
        </div>
      ) : null}
      {loading || !therapist ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          Cargando información del terapeuta...
        </div>
      ) : (
        <TherapistForm
          initialValues={{
            name: therapist.name,
            description: therapist.description,
            short_description: therapist.short_description,
            email: therapist.email,
            phone: therapist.phone,
            city: therapist.city,
            department: therapist.department,
            experience_years: String(therapist.experience_years),
            is_active: therapist.is_active,
            photo: undefined,
          }}
          onSubmit={handleSubmit}
          submitLabel="Guardar cambios"
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
