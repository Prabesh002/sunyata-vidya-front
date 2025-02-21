import axios, { AxiosInstance } from 'axios';
import { ApiResponse } from '@/types/api'; 

const API_BASE_URL = 'YOUR_API_BASE_URL';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: any) => response,
  (error: { response: { status: number; }; }) => {
    if (error.response && error.response.status === 403) {
      window.location.href = '/permission-denied';
    }

    if (error.response && error.response.status === 404) {
      window.location.href = '/not-found';
    }
    return Promise.reject(error);
  }
);

export const get = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await api.get<ApiResponse<T>>(url);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const post = async <T, U>(url: string, data: U): Promise<ApiResponse<T>> => {
  try {
    const response = await api.post<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const put = async <T, U>(url: string, data: U): Promise<ApiResponse<T>> => {
  try {
    const response = await api.put<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await api.delete<ApiResponse<T>>(url);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export default api;