// frontend/src/components/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../services/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AxiosError } from 'axios'; // Import AxiosError

// Define a type for API error responses if your backend sends structured errors
interface ApiError {
    message: string;
    errors?: { msg: string; param: string }[]; // Example structure for validation errors
}

export function LoginForm({ onSwitchToRegister }: { onSwitchToRegister: () => void }) { // Added prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // General error message
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({}); // For specific field errors
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});
        setIsLoading(true);
        try {
            const { token, user } = await loginUser({ email, password });
            login(token, user); // Update auth state
            toast.success('Login successful!');
            // navigate('/'); // Optional: Redirect after login
        } catch (err) {
             let message = 'Login failed. Please check your credentials.';
             const fieldErrs: Record<string, string> = {};

             if (err instanceof AxiosError && err.response) {
                const apiError = err.response.data as ApiError;
                 // Use specific message from backend if available and it's not a validation error structure
                if (apiError.message && !apiError.errors) {
                    message = apiError.message;
                }
                 // Handle validation errors if backend sends them for login (less common)
                if (apiError.errors) {
                    apiError.errors.forEach(e => {
                        fieldErrs[e.param] = e.msg;
                    });
                     // If we have field errors, maybe clear the general message or make it more generic
                     message = 'Please correct the errors below.';
                }
            } else if (err instanceof Error) {
                message = err.message;
            }

            setError(message); // Set general error
            setFieldErrors(fieldErrs); // Set field-specific errors
            toast.error(`Login failed: ${message}`);
            console.error("Login Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

     return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
            <form onSubmit={handleSubmit} noValidate>
                {error && !Object.keys(fieldErrors).length && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="email-login" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                        type="email" id="email-login" value={email} onChange={(e) => setEmail(e.target.value)} required
                        className={`w-full bg-gray-800 border rounded-lg p-3 text-white focus:ring-2 focus:border-transparent ${fieldErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-emerald-500'}`}
                        placeholder="your.email@example.com"
                         aria-invalid={!!fieldErrors.email}
                         aria-describedby="email-error-login"
                    />
                    {fieldErrors.email && <p id="email-error-login" className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
                </div>
                <div className="mb-6">
                    <label htmlFor="password-login" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input
                        type="password" id="password-login" value={password} onChange={(e) => setPassword(e.target.value)} required
                         className={`w-full bg-gray-800 border rounded-lg p-3 text-white focus:ring-2 focus:border-transparent ${fieldErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-emerald-500'}`}
                        placeholder="••••••••"
                         aria-invalid={!!fieldErrors.password}
                         aria-describedby="password-error-login"
                    />
                    {fieldErrors.password && <p id="password-error-login" className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>}
                </div>
                <button
                    type="submit" disabled={isLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className="text-center text-sm text-gray-400 mt-4">
                Don't have an account?{' '}
                <button onClick={onSwitchToRegister} className="text-emerald-400 hover:underline font-medium ml-1">Register here</button>
            </p>
        </div>
    );
}