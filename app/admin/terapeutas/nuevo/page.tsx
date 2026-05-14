"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "../../../../components/admin/AdminHeader";
import TherapistForm from "../../../../components/admin/TherapistForm";
import type { TherapistFormValues } from "../../../../lib/validations/therapistSchema";

const initialValues: TherapistFormValues = {
  name: "",
  description: "",
  short_description: "",
  email: "",
  phone: "",
  city: "",
  department: "",
  experience_years: "0",
  is_active: true,
  photo: undefined,
};

export default function NewTherapistPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: TherapistFormValues) => {
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

      const response = await fetch("/api/admin/therapists", {
        method: "POST",
        headers,
        body,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo crear el terapeuta");
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
        title="Agregar nuevo terapeuta"
        description="Completa los datos clínicos para incorporar un nuevo profesional a la plataforma EMDR."
        actionLabel="Volver a terapeutas"
        onAction={() => router.push("/admin/terapeutas")}
      />
      {error ? (
        <div className="mb-6 rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
          {error}
        </div>
      ) : null}
      <TherapistForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Crear terapeuta" isSubmitting={isSubmitting} />
    </div>
  );
}
