"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { therapistSchema, type TherapistFormValues } from "../../lib/validations/therapistSchema";

type TherapistFormProps = {
  initialValues: TherapistFormValues;
  onSubmit: (values: TherapistFormValues) => Promise<void>;
  submitLabel: string;
  isSubmitting?: boolean;
};

const defaultValues: TherapistFormValues = {
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

export default function TherapistForm({ initialValues, onSubmit, submitLabel, isSubmitting = false }: TherapistFormProps) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const form = useForm<TherapistFormValues>({
    resolver: zodResolver(therapistSchema),
    defaultValues: initialValues ?? defaultValues,
  });

  const { register, handleSubmit, reset, formState: { errors } } = form;

  useEffect(() => {
    reset(initialValues ?? defaultValues);
  }, [initialValues, reset]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (values: TherapistFormValues) => {
    setFeedback(null);
    try {
      await onSubmit(values);
    } catch (error) {
      setFeedback((error as Error).message || "Error al enviar el formulario");
    }
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Información básica</p>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">Datos principales</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Nombre completo</span>
              <input {...register("name")} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
              {errors.name && <p className="mt-2 text-sm text-rose-600">{errors.name.message}</p>}
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Foto</span>
              <input type="file" accept="image/*" {...register("photo")} onChange={handlePhotoChange} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
              {photoPreview && <img src={photoPreview} alt="Vista previa" className="mt-2 h-32 w-32 rounded-xl object-cover" />}
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Descripción corta</span>
            <textarea {...register("short_description")} rows={3} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
            {errors.short_description && <p className="mt-2 text-sm text-rose-600">{errors.short_description.message}</p>}
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Descripción completa</span>
            <textarea {...register("description")} rows={5} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
            {errors.description && <p className="mt-2 text-sm text-rose-600">{errors.description.message}</p>}
          </label>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Contacto</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input {...register("email")} type="email" className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
              {errors.email && <p className="mt-2 text-sm text-rose-600">{errors.email.message}</p>}
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Teléfono</span>
              <input {...register("phone")} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
              {errors.phone && <p className="mt-2 text-sm text-rose-600">{errors.phone.message}</p>}
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Ubicación</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Departamento</span>
              <input {...register("department")} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
              {errors.department && <p className="mt-2 text-sm text-rose-600">{errors.department.message}</p>}
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Ciudad</span>
              <input {...register("city")} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
              {errors.city && <p className="mt-2 text-sm text-rose-600">{errors.city.message}</p>}
            </label>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Años de experiencia</span>
            <input {...register("experience_years")} min="0" className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
            {errors.experience_years && <p className="mt-2 text-sm text-rose-600">{errors.experience_years.message}</p>}
          </label>
          <label className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
            <input type="checkbox" {...register("is_active")} className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
            <span className="text-sm font-medium text-slate-700">Activo</span>
          </label>
        </div>

        {feedback ? <p className="text-sm text-rose-600">{feedback}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Guardando..." : submitLabel}
        </button>
      </form>
    </div>
  );
}
