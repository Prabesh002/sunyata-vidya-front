'use client'
import { useState } from 'react';
import { LoginRequestDto } from '@/types/auth';
import { post, setAuthToken } from '@/lib/api';
import { useRouter } from 'next/navigation';
import LoginForm from './form';

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (credentials: LoginRequestDto) => {
    try {
      const response = await post<{ token: string }, LoginRequestDto>('/User/login', credentials);

      if (response.success) {
        localStorage.setItem('authToken', response.data.token); 
        setAuthToken(response.data.token);
        router.push('/(core)'); 
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;