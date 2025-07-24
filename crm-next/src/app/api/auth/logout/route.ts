import { error } from 'console';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();

  try {
    const refreshToken = (await cookieStore).get('refreshToken')?.value
    const accessToken = (await cookieStore).get('accessToken')?.value

    if (refreshToken) {
      await fetch('http://127.0.0.1:8000/api/authentication/logout/', {
        method: 'POST',
        body: JSON.stringify({ refresh: refreshToken }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      }).catch(() => {
        console.log('Erro ao invalidar token no backend', error);
      });
    }

    // Limpa os cookies do frontend
    (await cookieStore).delete('accessToken');
    (await cookieStore).delete('refreshToken');

    return Response.json({ success: true, message: 'Logout realizado com sucesso' });
  } catch (error) {
    (await cookieStore).delete('accessToken');
    (await cookieStore).delete('refreshToken');

    return Response.json({ success: true, message: 'Logout realizado' });
  }
}