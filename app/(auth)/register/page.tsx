'use client'
import { useState } from 'react';
import { RegisterRequestDto } from '@/types/auth';
import { post } from '@/lib/api';
import { useRouter } from 'next/navigation';
import RegisterForm from './form';

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (registrationData: RegisterRequestDto) => {
    try {
      const response = await post<any, RegisterRequestDto>('/User/register', registrationData);

      if (response.success) {
        router.push('/login'); 
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;