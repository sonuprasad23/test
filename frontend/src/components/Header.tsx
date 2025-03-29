// frontend/src/components/Header.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use if using router
import { Menu, XIcon, LogOut, UserCircle, LogIn, UserPlus } from 'lucide-react'; // Added icons
// Removed Theme toggle imports as they weren't used in the logic below
// import { Moon, Sun } from 'lucide-react';
// import { useTheme } from './ThemeProvider';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';


export function Header() {
  // const { theme, toggleTheme } = useTheme(); // Theme toggle logic removed for brevity
  const { isAuthenticated, user, logout, isLoading } = useAuth(); // Added isLoading
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    toast.info("You have been logged out.");
    navigate('/'); // Navigate to home after logout
  };

  const handleNavigate = (path: string) => {
      navigate(path);
      setIsMenuOpen(false); // Close menu on navigation
  }

  const renderAuthSectionDesktop = () => {
    if (isLoading) return null; // Don't show auth buttons while loading initial state

    if (isAuthenticated) {
      return (
        <div className="flex items-center space-x-4">
           <span className="text-gray-300 text-sm hidden lg:inline" title={user?.email}>
            Welcome, {user?.name || user?.email?.split('@')[0]} {/* Show name or part of email */}
          </span>
          {/* Optional Dashboard Link */}
          {/* <button onClick={() => handleNavigate('/dashboard')} className="text-gray-300 hover:text-white transition px-3 py-2 rounded-md text-sm font-medium">Dashboard</button> */}
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-300 hover:text-red-400 transition px-3 py-2 rounded-md text-sm font-medium bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-red-600"
            title="Logout"
          >
            <LogOut size={18} className="mr-1" /> Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-2">
           <button onClick={() => handleNavigate('/login')} className="flex items-center text-gray-300 hover:text-white transition px-3 py-2 rounded-md text-sm font-medium border border-transparent hover:border-gray-600">
                <LogIn size={16} className="mr-1" /> Login
           </button>
           <button onClick={() => handleNavigate('/register')} className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-md text-sm font-medium transition">
                <UserPlus size={16} className="mr-1" /> Register
           </button>
        </div>
      );
    }
  };

  const renderAuthSectionMobile = () => {
     if (isLoading) return <div className="py-2 px-1 text-gray-500 text-sm">Loading...</div>;

     if (isAuthenticated) {
         return (
             <>
                 <div className="flex items-center space-x-2 mb-3 px-1">
                    <UserCircle size={20} className="text-gray-400 flex-shrink-0"/>
                    <span className="text-gray-300 text-sm truncate" title={user?.email}>{user?.name || user?.email}</span>
                 </div>
                  {/* Optional Dashboard Link */}
                 {/* <button onClick={() => handleNavigate('/dashboard')} className="w-full text-left text-gray-300 hover:bg-gray-700 transition py-2 px-1 rounded">Dashboard</button> */}
                 <button onClick={handleLogout} className="w-full text-left text-red-400 hover:bg-red-900/30 transition py-2 px-1 rounded flex items-center">
                     <LogOut size={16} className="mr-2" /> Logout
                 </button>
             </>
         );
     } else {
         return (
             <div className="flex flex-col space-y-3">
                 <button onClick={() => handleNavigate('/login')} className="text-gray-300 hover:bg-gray-700 transition py-2 px-1 rounded text-left flex items-center">
                    <LogIn size={16} className="mr-2"/> Login
                 </button>
                 <button onClick={() => handleNavigate('/register')} className="text-white bg-emerald-600 hover:bg-emerald-700 transition py-2 px-1 rounded text-center flex items-center justify-center">
                    <UserPlus size={16} className="mr-2"/> Register
                 </button>
             </div>
         );
     }
  };


  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-gray-950/80 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0 mr-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">DF</span>
            </div>
            <h1 className="text-xl font-bold text-white hidden sm:block">Deepfake Detector</h1>
        </Link>

        {/* Desktop Navigation & Auth */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Standard navigation links can be anchor links for single-page app or <Link> for multi-page */}
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <a href="/#home" className="text-gray-300 hover:text-white transition text-sm font-medium">Home</a>
            <a href="/#about" className="text-gray-300 hover:text-white transition text-sm font-medium">About</a>
            <a href="/#mission" className="text-gray-300 hover:text-white transition text-sm font-medium">Mission</a>
            <a href="/#pricing" className="text-gray-300 hover:text-white transition text-sm font-medium">Pricing</a>
            <a href="/#contact" className="text-gray-300 hover:text-white transition text-sm font-medium">Contact</a>
          </nav>
          <div className="border-l border-gray-700 pl-6">
            {renderAuthSectionDesktop()}
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-gray-800 transition text-gray-300 hover:text-white">
            <span className="sr-only">Toggle Menu</span>
            {isMenuOpen ? <XIcon size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md absolute top-full left-0 right-0 z-40 border-b border-gray-800 shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {/* Standard navigation links */}
            <a href="/#home" className="text-gray-300 hover:text-white transition py-2" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="/#about" className="text-gray-300 hover:text-white transition py-2" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="/#mission" className="text-gray-300 hover:text-white transition py-2" onClick={() => setIsMenuOpen(false)}>Mission</a>
            <a href="/#pricing" className="text-gray-300 hover:text-white transition py-2" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <a href="/#contact" className="text-gray-300 hover:text-white transition py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-700 pt-4 mt-2">
                 {renderAuthSectionMobile()}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}