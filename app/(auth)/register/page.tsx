'use client'
import { useState } from 'react';
import { RegisterRequestDto } from '@/types/auth';
import { post } from '@/lib/api';
import { useRouter } from 'next/navigation';
import RegisterForm from './form';
import { API_ENDPOINTS } from '@/lib/routes';

interface RegisterResponse { 
  success: boolean;
  message?: string; 
}

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (registrationData: RegisterRequestDto) => {
    try {
      const response = await post<RegisterResponse, RegisterRequestDto>(API_ENDPOINTS.USER_REGISTER, registrationData); 
      router.push('/login'); 
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;