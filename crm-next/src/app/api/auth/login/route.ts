import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch('http://127.0.0.1:8000/api/authentication/token/', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    return new Response('Credenciais inválidas', { status: 401 });
  }

  const { access, refresh } = await res.json();

  const cookieStore = cookies();
  const expiresInSeconds = 60 * 60; // 1h

  (await cookieStore).set('accessToken', access, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: expiresInSeconds,
  });

  (await cookieStore).set('refreshToken', refresh, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 dias
  });

  return Response.json({ success: true });
}
