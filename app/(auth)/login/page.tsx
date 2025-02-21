'use client'
import { useState } from 'react';
import { LoginRequestDto } from '@/types/auth';
import { post, setAuthToken } from '@/lib/api';
import { useRouter } from 'next/navigation';
import LoginForm from './form';
import { API_ENDPOINTS } from '@/lib/routes';

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (credentials: LoginRequestDto) => {
    try {
      const token = await post<string, LoginRequestDto>(API_ENDPOINTS.USER_LOGIN, credentials);
      console.log(token);
      localStorage.setItem('authToken', token);
      setAuthToken(token);
      router.push('/');
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;