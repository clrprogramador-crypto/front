import { NextResponse } from "next/server";
import { wordpressFetch, wordpressAdminFetch } from "../../../../lib/wordpress";

export async function GET(request: Request) {
  try {
    const url = new URL("/wp-json/wp/v2/terapeutas", process.env.WORDPRESS_API_URL);
    const requestUrl = new URL(request.url);
    requestUrl.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
    if (!url.searchParams.has("_embed")) {
      url.searchParams.set("_embed", "");
    }

    const data = await wordpressFetch(url.pathname + url.search);
    // Map WordPress data to our Therapist type
    const therapists = data.map((item: any) => ({
      id: item.id,
      name: item.title?.rendered || '',
      slug: item.slug || '',
      description: item.content?.rendered || '',
      short_description: item.excerpt?.rendered || '',
      email: item.meta?.email || item.acf?.correo_electronico || '',
      phone: item.meta?.phone || item.acf?.telefono || '',
      city: item.meta?.city || item.acf?.ciudad || '',
      department: item.meta?.department || item.acf?.departamento || '',
      experience_years: item.acf?.experiencia || '0',
      is_active: item.meta?.is_active ?? item.acf?.is_active ?? true,
    }));
    return NextResponse.json(therapists, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let payload: any;
    let photoFile: File | null = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      photoFile = formData.get('photo') as File | null;
      payload = {
        name: formData.get('name'),
        description: formData.get('description'),
        short_description: formData.get('short_description'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        city: formData.get('city'),
        department: formData.get('department'),
        experience_years: formData.get('experience_years'),
        is_active: formData.get('is_active') === 'true',
      };
    } else {
      payload = await request.json();
    }

    // Map our TherapistFormValues to WordPress format with meta and acf
    const wordpressPayload: Record<string, any> = {
      title: payload.name,
      content: payload.description,
      status: 'publish',
      meta: {
        email: payload.email,
        phone: payload.phone,
        city: payload.city,
        department: payload.department,
        is_active: payload.is_active,
      },
      acf: {
        nombre_completo: payload.name,
        correo_electronico: payload.email,
        telefono: payload.phone,
        ciudad: payload.city,
        departamento: payload.department,
        experiencia: String(payload.experience_years),
      },
    };

    // If photo exists, handle it separately
    if (photoFile && photoFile.size > 0) {
      const formDataWithImage = new FormData();
      formDataWithImage.append('file', photoFile);
      
      const imageResponse = await wordpressAdminFetch("/wp-json/wp/v2/media", {
        method: "POST",
        body: formDataWithImage,
      });

      if (imageResponse.id) {
        wordpressPayload.featured_media = imageResponse.id;
      }
    }

    const data = await wordpressAdminFetch("/wp-json/wp/v2/terapeutas", {
      method: "POST",
      body: JSON.stringify(wordpressPayload),
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
