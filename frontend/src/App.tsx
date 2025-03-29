// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MissionSection } from './components/MissionSection';
import { PricingSection } from './components/PricingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Background3D } from './components/Background3D';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/Login';
import { RegisterForm } from './components/Register';

// Component for the main landing page sections
function LandingPage() {
     // Auto-scroll to hash sections if present (for anchor links from Header)
     const location = useLocation();
     React.useEffect(() => {
         if (location.hash) {
             const element = document.getElementById(location.hash.substring(1));
             if (element) {
                 element.scrollIntoView({ behavior: 'smooth' });
             }
         } else {
             // Scroll to top if no hash
             window.scrollTo(0, 0);
         }
     }, [location]);

    return (
        <>
            <Hero />
            <AboutSection />
            <MissionSection />
            <PricingSection />
            <ContactSection />
        </>
    );
}

// Component to handle page layout and routing logic
function AppLayout() {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate(); // Hook for navigation

    // Simple state or functions to switch between login/register views if needed on the same page
    // Or rely on navigation provided by react-router-dom

    const handleSwitchToRegister = () => navigate('/register');
    const handleSwitchToLogin = () => navigate('/login');

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-950 text-white z-[100]">
                <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gray-950 text-white font-sans"> {/* Added font */}
            <Background3D />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <main className="container mx-auto px-4 py-8 flex-grow">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route
                            path="/login"
                            element={isAuthenticated ? <Navigate to="/" /> : <LoginForm onSwitchToRegister={handleSwitchToRegister}/>}
                         />
                        <Route
                            path="/register"
                            element={isAuthenticated ? <Navigate to="/" /> : <RegisterForm onSwitchToLogin={handleSwitchToLogin}/>}
                        />
                        {/* Add other routes here, e.g., Dashboard */}
                        {/* <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} /> */}
                        <Route path="*" element={<Navigate to="/" />} /> {/* Fallback route */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </div>
    );
}

// Main App component - sets up providers and router
export function App() {
  return (
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <AppLayout /> {/* Use the layout component */}
             <Toaster richColors position="top-right" theme="dark" /> {/* Configure Toaster */}
          </Router>
        </AuthProvider>
      </ThemeProvider>
  );
}