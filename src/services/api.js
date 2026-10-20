const BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(status, data) {
    super(data?.message || 'Erro inesperado ao comunicar com o servidor.');
    this.status = status;
    this.errors = data?.errors || [];
  }
}

function buildQuery(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === '' || v === null || v === undefined) return;
    if (Array.isArray(v)) {
      if (v.length > 0) qs.append(k, JSON.stringify(v));
    } else {
      qs.append(k, v);
    }
  });
  const s = qs.toString();
  return s ? `?${s}` : '';
}

export async function request(path, { method = 'GET', body, params } = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}${buildQuery(params)}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, { message: 'Não foi possível conectar ao servidor.' });
  }
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, data);
  return data;
}
