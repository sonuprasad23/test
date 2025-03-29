// frontend/src/components/Footer.tsx
import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-auto"> {/* Use mt-auto to push footer down */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left text-gray-500 text-sm mb-2 md:mb-0">
            © {currentYear} Deepfake Detector. All rights reserved.
          </p>
          {/* Optional: Add footer links */}
          <div className="flex space-x-4">
            <a href="/privacy-policy" className="text-gray-500 hover:text-gray-400 text-sm transition">Privacy Policy</a>
            <a href="/terms-of-service" className="text-gray-500 hover:text-gray-400 text-sm transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}