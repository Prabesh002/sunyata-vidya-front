'use client'
import { useState } from 'react';
import { RegisterRequestDto, UserType } from '@/types/auth';

interface RegisterFormProps {
  onSubmit: (registrationData: RegisterRequestDto) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [userType, setUserType] = useState<UserType>(UserType.Student);  //TODO : CHANGE LATER 
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const registrationData: RegisterRequestDto = {
      username,
      email,
      password,
      contactNumber,
      userType,
      address,
    };
    onSubmit(registrationData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="contactNumber">Contact Number:</label>
        <input
          type="text"
          id="contactNumber"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="userType">User Type:</label>
        <select id="userType" value={userType} onChange={(e) => setUserType(parseInt(e.target.value) as UserType)}>
          <option value={UserType.Student}>Student</option>
          <option value={UserType.Employee}>Employee</option>
          <option value={UserType.Parent}>Parent</option>
        </select>
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;