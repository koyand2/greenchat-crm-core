'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type User = {
  uuid: string;
  email: string;
  nome: string;
  nivel: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  fetchUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  fetchUser: () => { }
});

// Responsável por exibir os dados do usuário(colaborador no Front-end)
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Rodando apenas em client-side (sem SSR.)
  useEffect(() => {
    setIsClient(true);
  }, []);

  async function fetchUser() {
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  // Ignorando a rota de login
  useEffect(() => {
    if (pathname !== '/login' && !user) {
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);