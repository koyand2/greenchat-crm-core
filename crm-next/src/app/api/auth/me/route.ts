import { cookies } from 'next/headers';

export async function GET() {
  const access = (await cookies()).get('accessToken')?.value;

  if (!access) {
    return new Response(JSON.stringify({ detail: 'Unauthorized' }), {
      status: 401,
    });
  }

  const res = await fetch('http://127.0.0.1:8000/api/authentication/me/', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ detail: 'Unauthorized' }), {
      status: 401,
    });
  }

  const data = await res.json();
  console.log(data)
  return Response.json(data);
}
