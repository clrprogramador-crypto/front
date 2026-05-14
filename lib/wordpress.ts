import { Buffer } from "buffer";

const apiUrl = process.env.WORDPRESS_API_URL?.replace(/\/?$/, "") ?? "";
const adminUser = process.env.WORDPRESS_ADMIN_USER ?? "";
const adminPassword = process.env.WORDPRESS_APP_PASSWORD ?? "";

function getAdminAuthHeader() {
  if (!adminUser || !adminPassword) {
    throw new Error("Faltan credenciales de WordPress para operaciones administrativas");
  }

  return `Basic ${Buffer.from(`${adminUser}:${adminPassword}`).toString("base64")}`;
}

async function parseWordpressResponse(response: Response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { message: text };
  }
}

export async function wordpressFetch(path: string, options: RequestInit = {}) {
  const url = `${apiUrl}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const payload = await parseWordpressResponse(response);
  if (!response.ok) {
    throw new Error(payload?.message || `WordPress error ${response.status}`);
  }

  return payload;
}

export async function wordpressAdminFetch(path: string, options: RequestInit = {}) {
  const url = `${apiUrl}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: getAdminAuthHeader(),
      ...(options.headers ?? {}),
    },
  });

  const payload = await parseWordpressResponse(response);
  if (!response.ok) {
    throw new Error(payload?.message || `WordPress admin error ${response.status}`);
  }

  return payload;
}
