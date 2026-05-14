export type Therapist = {
  id: number;
  name: string;
  specialty: string;
  description: string;
  city: string;
  department: string;
  modality: string[];
  photo: string;
};

const externalApiUrl = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/therapists`
  : "/api/terapeutas";

export async function getTherapists(query?: {
  search?: string;
  city?: string;
  department?: string;
  per_page?: number;
  page?: number;
}): Promise<Therapist[]> {
  const url = new URL(externalApiUrl, typeof window !== "undefined" ? window.location.origin : "http://localhost");

  if (query?.search) {
    url.searchParams.set("search", query.search);
  }
  if (query?.city) {
    url.searchParams.set("city", query.city);
  }
  if (query?.department) {
    url.searchParams.set("department", query.department);
  }
  if (query?.per_page !== undefined) {
    url.searchParams.set("per_page", String(query.per_page));
  }
  if (query?.page !== undefined) {
    url.searchParams.set("page", String(query.page));
  }
  if (!url.searchParams.has("_embed")) {
    url.searchParams.set("_embed", "");
  }

  const response = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al cargar terapeutas");
  }

  const payload = await response.json();

  if (process.env.NEXT_PUBLIC_API_URL) {
    if (!Array.isArray(payload)) {
      throw new Error("Respuesta inválida de terapeutas");
    }

    return payload.map((therapist: any) => ({
      id: therapist.id,
      name: therapist.name || therapist.nombre || "Terapeuta EMDR",
      specialty: therapist.specialty || therapist.especialidad || "EMDR",
      description:
        therapist.description || therapist.descripcion ||
        "Profesional en salud mental con formación EMDR.",
      city: therapist.city || therapist.ciudad || "Ciudad no definida",
      department: therapist.department || therapist.departamento || "Departamento no definido",
      modality: Array.isArray(therapist.modality)
        ? therapist.modality
        : [therapist.modality || "Virtual"],
      photo:
        therapist.photo || therapist.imagen ||
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    }));
  }

  if (!payload.ok || !Array.isArray(payload.data)) {
    throw new Error(payload.error || "Error inesperado al cargar terapeutas");
  }

  return payload.data.map((therapist: any) => ({
    id: therapist.id,
    name: therapist.name || therapist.nombre || "Terapeuta EMDR",
    specialty: therapist.specialty || therapist.especialidad || "EMDR",
    description:
      therapist.description || therapist.descripcion ||
      "Profesional en salud mental con formación EMDR.",
    city: therapist.city || therapist.ciudad || "Ciudad no definida",
    department: therapist.department || therapist.departamento || "Departamento no definido",
    modality: Array.isArray(therapist.modality)
      ? therapist.modality
      : [therapist.modality || "Virtual"],
    photo:
      therapist.photo || therapist.imagen ||
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  }));
}
