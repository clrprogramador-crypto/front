import { z } from "zod";

export const therapistSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  short_description: z.string().min(1, "La descripción corta es obligatoria").max(180, "Máximo 180 caracteres"),
  description: z.string().min(1, "La descripción completa es obligatoria"),
  email: z.string().email("El correo no es válido").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  city: z.string().min(1, "La ciudad es obligatoria"),
  department: z.string().min(1, "El departamento es obligatorio"),
  experience_years: z.string().min(0, "Los años de experiencia deben ser 0 o más").or(z.number()),
  is_active: z.boolean(),
  photo: z.any().optional(),
}).strict();

export type TherapistFormValues = z.infer<typeof therapistSchema>;
