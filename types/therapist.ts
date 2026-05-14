export type Therapist = {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  email: string;
  phone: string;
  city: string;
  department: string;
  experience_years: string | number;
  is_active: boolean;
  // Optional fields for backward compatibility
  photo_url?: string;
  address?: string;
  modality_virtual?: boolean;
  modality_presential?: boolean;
  specialties?: string[];
};
