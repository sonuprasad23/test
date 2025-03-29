// frontend/src/services/authApi.ts
import apiClient from './api';
import { User } from '../types';

export interface AuthResponse {
    token: string;
    user: User;
}

// Type for registration data (adjust if needed)
export interface RegisterData {
    email: string;
    password?: string; // Password required for registration
    name?: string;
}

// Type for login credentials
export interface LoginCredentials {
    email: string;
    password?: string; // Password required for login
}

export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);
    return response.data;
};

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
};