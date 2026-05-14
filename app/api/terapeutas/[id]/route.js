export async function GET(request, { params }) {
  try {
    const baseUrl = process.env.WORDPRESS_API_URL;
    const { id } = params ?? {};

    if (!baseUrl) {
      return Response.json(
        {
          ok: false,
          error: "Falta configurar WORDPRESS_API_URL",
        },
        { status: 500 }
      );
    }

    if (!id) {
      return Response.json(
        {
          ok: false,
          error: "Se requiere un ID de terapeuta",
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${baseUrl}/wp-json/wp/v2/terapeutas/${encodeURIComponent(id)}?_embed`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return Response.json(
        {
          ok: false,
          status: response.status,
          error: "WordPress no respondió correctamente",
        },
        { status: response.status }
      );
    }

    const terapeuta = await response.json();

    return Response.json({
      ok: true,
      data: {
        id: terapeuta.id,
        nombre: terapeuta.title?.rendered || terapeuta.acf?.nombre_completo,
        descripcion: terapeuta.content?.rendered,
        ciudad: terapeuta.meta?.city || terapeuta.acf?.ciudad,
        departamento: terapeuta.meta?.department || terapeuta.acf?.departamento,
        experiencia: terapeuta.acf?.experiencia,
        email: terapeuta.meta?.email || terapeuta.acf?.correo_electronico,
        telefono: terapeuta.meta?.phone || terapeuta.acf?.telefono,
        foto:
          terapeuta._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
        raw: terapeuta,
      },
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error?.message || "Error interno al obtener el terapeuta",
      },
      { status: 500 }
    );
  }
}
