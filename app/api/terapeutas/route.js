export async function GET() {
  try {
    const baseUrl = process.env.WORDPRESS_API_URL;

    if (!baseUrl) {
      return Response.json(
        {
          ok: false,
          error: "Falta configurar WORDPRESS_API_URL",
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${baseUrl}/wp-json/wp/v2/terapeutas?_embed`,
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

    const terapeutas = await response.json();

    return Response.json({
      ok: true,
      total: terapeutas.length,
      data: terapeutas.map((terapeuta) => ({
        id: terapeuta.id,
        nombre: terapeuta.title?.rendered,
        descripcion: terapeuta.content?.rendered,
        ciudad: terapeuta.acf?.ciudad,
        departamento: terapeuta.acf?.departamento,
        modalidad: terapeuta.acf?.modalidad,
        imagen:
          terapeuta._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      })),
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}