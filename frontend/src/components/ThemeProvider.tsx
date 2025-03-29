// frontend/src/components/ThemeProvider.tsx
import React, { useEffect, useState, createContext, useContext, ReactNode, useMemo } from 'react';

type Theme = 'dark' | 'light'; // Define possible themes

// Define the shape of the context value
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void; // Allow direct setting
  toggleTheme: () => void;
};

// Create the context with an initial undefined value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme; // Optional default theme
  storageKey?: string; // Optional key for localStorage
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark', // Default to dark theme
  storageKey = 'vite-ui-theme', // Default storage key
}: ThemeProviderProps) {
  // Initialize theme state, trying to load from localStorage first
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const storedTheme = localStorage.getItem(storageKey) as Theme | null;
      return storedTheme || defaultTheme;
    } catch (e) {
      console.error("Failed to access localStorage for theme:", e);
      return defaultTheme;
    }
  });

  // Effect to update CSS class and localStorage when theme changes
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark'); // Remove previous theme class
    root.classList.add(theme); // Add current theme class

    try {
      localStorage.setItem(storageKey, theme); // Save theme preference
    } catch (e) {
      console.error("Failed to save theme to localStorage:", e);
    }

    // Optional: Adjust body background/color directly if needed,
    // though Tailwind's 'dark:' variants usually handle this.
    // root.style.setProperty('color-scheme', theme); // Helps with browser UI elements

  }, [theme, storageKey]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

   // Function to set a specific theme
   const setTheme = (newTheme: Theme) => {
      setThemeState(newTheme);
   };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    theme,
    setTheme, // Expose direct set function
    toggleTheme,
  }), [theme]); // Only update when theme changes

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to easily consume the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};