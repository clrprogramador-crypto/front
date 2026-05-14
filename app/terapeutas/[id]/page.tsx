"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type TherapistDetail = {
  id: number;
  nombre: string;
  descripcion: string;
  ciudad: string;
  departamento: string;
  modalidad: string;
  especialidades?: string[];
  experiencia?: number;
  email?: string;
  phone?: string;
  address?: string;
  imagen?: string | null;
};

export default function TherapistDetailPage() {
  const params = useParams();
  const id = params?.id && typeof params.id === "string" ? params.id : null;
  const [therapist, setTherapist] = useState<TherapistDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/api/terapeutas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setTherapist(data.data);
        } else {
          setError(data.error || "Error al cargar el terapeuta");
        }
      })
      .catch((err) => {
        setError((err as Error).message || "Error al cargar el terapeuta");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (!id) {
    return (
      <section className="container mx-auto px-4 py-20 text-center">
        <p className="text-lg font-semibold text-slate-900">ID de terapeuta inválido</p>
        <Link href="/" className="mt-4 inline-flex rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800">
          Volver al inicio
        </Link>
      </section>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-900 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-20 text-center">
        <p className="text-lg font-semibold text-rose-600">{error}</p>
        <Link href="/" className="mt-4 inline-flex rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800">
          Volver al inicio
        </Link>
      </section>
    );
  }

  if (!therapist) {
    return (
      <section className="container mx-auto px-4 py-20 text-center">
        <p className="text-lg font-semibold text-slate-900">No se encontró el terapeuta.</p>
        <Link href="/" className="mt-4 inline-flex rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800">
          Volver al inicio
        </Link>
      </section>
    );
  }

  return (
    <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Perfil del terapeuta</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">{therapist.nombre}</h1>
          <p className="mt-2 text-slate-600">{therapist.ciudad}, {therapist.departamento}</p>
        </div>
        <Link href="/" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
          Volver al inicio
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.9fr_0.65fr]">
        <section className="space-y-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
            <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Descripción</p>
                  <p className="text-lg leading-8 text-slate-700">{therapist.descripcion}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Modalidad</p>
                    <p className="mt-3 text-lg font-semibold text-slate-900">{therapist.modalidad}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Experiencia</p>
                    <p className="mt-3 text-lg font-semibold text-slate-900">{therapist.experiencia ?? "No informado"} años</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Contacto</p>
                  <div className="mt-4 space-y-3 text-slate-700">
                    {therapist.email && <p>Email: <a href={`mailto:${therapist.email}`} className="text-slate-900 hover:underline">{therapist.email}</a></p>}
                    {therapist.phone && <p>Teléfono: <a href={`tel:${therapist.phone}`} className="text-slate-900 hover:underline">{therapist.phone}</a></p>}
                    {therapist.address && <p>Dirección: {therapist.address}</p>}
                  </div>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Especialidades</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {therapist.especialidades?.length ? (
                      therapist.especialidades.map((specialty) => (
                        <span key={specialty} className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{specialty}</span>
                      ))
                    ) : (
                      <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">EMDR</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
            {therapist.imagen ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-slate-100">
                <Image src={therapist.imagen} alt={therapist.nombre} fill className="object-cover" />
              </div>
            ) : (
              <div className="rounded-[1.75rem] bg-slate-100 p-12 text-center text-slate-500">Imagen no disponible</div>
            )}
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Resumen</p>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li><strong>Ciudad:</strong> {therapist.ciudad}</li>
              <li><strong>Departamento:</strong> {therapist.departamento}</li>
              <li><strong>Modalidad:</strong> {therapist.modalidad}</li>
              <li><strong>Experiencia:</strong> {therapist.experiencia ?? "No informado"} años</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
