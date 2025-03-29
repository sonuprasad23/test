// frontend/src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { User } from '../types'; // Import the User type

interface AuthContextType {
  authToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isLoading: boolean; // To show loading state during initial check
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start in loading state

  // Load token and user from storage on initial mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUserString = localStorage.getItem('user');

      if (storedToken && storedUserString) {
        // TODO: Add token validation logic here (e.g., check expiry)
        // For now, assume token is valid if present
        setAuthToken(storedToken);
        setUser(JSON.parse(storedUserString));
      }
    } catch (error) {
        console.error("Error reading auth state from localStorage:", error);
        // Clear potentially corrupted storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    } finally {
        setIsLoading(false); // Finished loading initial state
    }
  }, []);

  // Login function
  const login = useCallback((token: string, userData: User) => {
    try {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setAuthToken(token);
        setUser(userData);
    } catch (error) {
        console.error("Error saving auth state to localStorage:", error);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    try {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setAuthToken(null);
        setUser(null);
        // Optional: Redirect or trigger other actions on logout
        // Example: window.location.href = '/login';
    } catch (error) {
         console.error("Error clearing auth state from localStorage:", error);
    }
  }, []);

  // Determine authentication status based on token presence
  const isAuthenticated = !!authToken;

  // Provide the context value to children
  return (
    <AuthContext.Provider value={{ authToken, user, isAuthenticated, login, logout, isLoading }}>
      {!isLoading ? children : null} {/* Optionally render children only after loading */}
      {/* Or show a loading indicator */}
      {/* {isLoading && <GlobalLoadingIndicator />}
         {!isLoading && children} */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};