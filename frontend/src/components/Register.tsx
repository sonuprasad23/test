// frontend/src/components/Register.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { registerUser } from '../services/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AxiosError } from 'axios'; // Import AxiosError

// Define a type for API error responses if your backend sends structured errors
interface ApiError {
    message: string;
    errors?: { msg: string; param: string }[]; // Example structure for validation errors
}

export function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) { // Added prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
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
            const { token, user } = await registerUser({ email, password, name });
            login(token, user); // Update auth state
            toast.success(`Welcome, ${user.name || user.email}! Registration successful.`);
            // navigate('/'); // Optional: Redirect to home or dashboard after successful registration
        } catch (err) {
            let message = 'Registration failed. Please try again.';
            const fieldErrs: Record<string, string> = {};

            if (err instanceof AxiosError && err.response) {
                const apiError = err.response.data as ApiError;
                message = apiError.message || message; // Use backend message if available
                // Handle validation errors specifically if backend sends them
                if (apiError.errors) {
                    apiError.errors.forEach(e => {
                        fieldErrs[e.param] = e.msg;
                    });
                }
            } else if (err instanceof Error) {
                message = err.message;
            }

            setError(message); // Set general error
            setFieldErrors(fieldErrs); // Set field-specific errors
            toast.error(`Registration failed: ${message}`);
            console.error("Registration Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>
            <form onSubmit={handleSubmit} noValidate> {/* Add noValidate to prevent browser defaults */}
                {error && !Object.keys(fieldErrors).length && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

                 <div className="mb-4">
                    <label htmlFor="name-reg" className="block text-sm font-medium text-gray-300 mb-1">Name (Optional)</label>
                    <input
                        type="text" id="name-reg" value={name} onChange={(e) => setName(e.target.value)}
                        className={`w-full bg-gray-800 border rounded-lg p-3 text-white focus:ring-2 focus:border-transparent ${fieldErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-emerald-500'}`}
                        placeholder="Your name"
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby="name-error"
                    />
                    {fieldErrors.name && <p id="name-error" className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="email-reg" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                        type="email" id="email-reg" value={email} onChange={(e) => setEmail(e.target.value)} required
                        className={`w-full bg-gray-800 border rounded-lg p-3 text-white focus:ring-2 focus:border-transparent ${fieldErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-emerald-500'}`}
                        placeholder="your.email@example.com"
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby="email-error-reg"
                    />
                     {fieldErrors.email && <p id="email-error-reg" className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
                </div>

                <div className="mb-6">
                    <label htmlFor="password-reg" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input
                        type="password" id="password-reg" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                        className={`w-full bg-gray-800 border rounded-lg p-3 text-white focus:ring-2 focus:border-transparent ${fieldErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-emerald-500'}`}
                        placeholder="•••••••• (min. 6 characters)"
                        aria-invalid={!!fieldErrors.password}
                        aria-describedby="password-error-reg"
                    />
                    {fieldErrors.password && <p id="password-error-reg" className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>}
                </div>

                <button
                    type="submit" disabled={isLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
             <p className="text-center text-sm text-gray-400 mt-4">
                Already have an account?{' '}
                <button onClick={onSwitchToLogin} className="text-emerald-400 hover:underline font-medium ml-1">Login here</button>
            </p>
        </div>
    );
}