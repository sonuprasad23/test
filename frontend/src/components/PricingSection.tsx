// frontend/src/components/PricingSection.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation
import { Check, X, Zap, Building, Star, HelpCircle } from 'lucide-react'; // Added icons
import { toast } from 'sonner'; // Use Sonner for notifications
import { useAuth } from '../contexts/AuthContext'; // Check auth status

export function PricingSection() {
  const { isAuthenticated } = useAuth(); // Get authentication status

  // Handlers for button clicks (can be expanded)
  const handleGetStartedFree = () => {
     if (!isAuthenticated) {
         toast.info("Please log in or register to use the free plan.");
         // Consider navigating to login: navigate('/login');
     } else {
        // User is logged in, they can use the free tier features already
        toast.success("You're all set!", { description: "You can start using the Basic Model now."});
     }
  };

  const handleChoosePro = () => {
    toast.info('Pro Plan Coming Soon!', { description: 'Advanced features will be available shortly.' });
    // In future, might navigate to a checkout page or subscription management
  };

  const handleContactSales = () => {
    toast.info('Contacting Sales (Simulated)', { description: 'Our enterprise solutions team will be ready soon.' });
    // In future, might open a contact form modal or navigate to enterprise contact page
     const contactSection = document.getElementById('contact');
     if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Select the right deepfake detection capabilities for your needs, from casual use to professional applications.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"> {/* Use items-stretch */}

          {/* Free Plan */}
          <div className="flex flex-col bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden shadow-lg hover:border-gray-700 transition duration-300">
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2 text-white">Free</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-gray-400 text-sm"> / month</span>
              </div>
              <p className="text-gray-400 text-sm mb-6 min-h-[40px]"> {/* Added min-height */}
                Basic detection for individuals and casual use.
              </p>
              <button
                onClick={handleGetStartedFree}
                className="w-full py-2.5 px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition duration-200 text-sm font-medium"
              >
                {isAuthenticated ? 'Use Basic Model' : 'Get Started'}
              </button>
            </div>
            {/* Features List */}
            <div className="border-t border-gray-800 p-6 flex-grow"> {/* Added flex-grow */}
              <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Includes:</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center text-gray-300"><Check size={16} className="text-emerald-500 mr-2 flex-shrink-0" /> Basic Detection Model</li>
                <li className="flex items-center text-gray-300"><Check size={16} className="text-emerald-500 mr-2 flex-shrink-0" /> Limited scans per day (e.g., 10)</li>
                <li className="flex items-center text-gray-300"><Check size={16} className="text-emerald-500 mr-2 flex-shrink-0" /> Standard analysis results</li>
                <li className="flex items-center text-gray-500"><X size={16} className="text-gray-600 mr-2 flex-shrink-0" /> Advanced Detection Model</li>
                <li className="flex items-center text-gray-500"><X size={16} className="text-gray-600 mr-2 flex-shrink-0" /> Detailed analysis breakdown</li>
                <li className="flex items-center text-gray-500"><X size={16} className="text-gray-600 mr-2 flex-shrink-0" /> API Access</li>
                <li className="flex items-center text-gray-500"><X size={16} className="text-gray-600 mr-2 flex-shrink-0" /> Priority Support</li>
              </ul>
            </div>
          </div>

          {/* Pro Plan (Most Popular) */}
          <div className="flex flex-col bg-gradient-to-b from-emerald-900/30 to-blue-900/20 rounded-xl border-2 border-emerald-500 overflow-hidden shadow-2xl transform scale-105 z-10"> {/* Elevated scale */}
             <div className="absolute top-0 right-0 m-2 bg-emerald-500 text-xs font-bold uppercase py-1 px-3 text-emerald-900 rounded-full flex items-center">
                <Star size={12} className="mr-1" /> Popular
             </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2 text-white">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">$9.99*</span>
                <span className="text-gray-400 text-sm"> / month</span>
              </div>
              <p className="text-gray-300 text-sm mb-6 min-h-[40px]">
                Enhanced detection for professionals and frequent users.
              </p>
              <button
                onClick={handleChoosePro}
                className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white transition duration-200 flex items-center justify-center text-sm font-medium shadow-md"
              >
                <Zap size={16} className="mr-2" /> Choose Pro (Soon)
              </button>
            </div>
            {/* Features List */}
            <div className="border-t border-emerald-800/30 p-6 flex-grow">
               <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Everything in Free, plus:</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center text-white font-medium"><Check size={16} className="text-emerald-400 mr-2 flex-shrink-0" /> Advanced Detection Model</li>
                <li className="flex items-center text-white font-medium"><Check size={16} className="text-emerald-400 mr-2 flex-shrink-0" /> Higher scan limit (e.g., 100/day)</li>
                <li className="flex items-center text-white font-medium"><Check size={16} className="text-emerald-400 mr-2 flex-shrink-0" /> Detailed analysis breakdown</li>
                <li className="flex items-center text-gray-400"><Check size={16} className="text-emerald-400 mr-2 flex-shrink-0" /> Faster processing (potential)</li>
                <li className="flex items-center text-gray-500"><X size={16} className="text-gray-600 mr-2 flex-shrink-0" /> API Access</li>
                <li className="flex items-center text-gray-500"><X size={16} className="text-gray-600 mr-2 flex-shrink-0" /> Priority Support</li>
              </ul>
               <p className="text-xs text-gray-500 mt-4">* Indicative pricing. Final pricing TBD.</p>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden shadow-lg hover:border-gray-700 transition duration-300">
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2 text-white">Enterprise</h3>
              <div className="mb-4">
                 <span className="text-4xl font-bold text-white">Custom</span>
                 {/* <span className="text-gray-400 text-sm"> / month</span> */}
              </div>
              <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
                Tailored solutions for businesses and organizations.
              </p>
              <button
                onClick={handleContactSales}
                className="w-full py-2.5 px-4 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-900/20 hover:border-blue-400 hover:text-blue-300 transition duration-200 text-sm font-medium"
              >
                <Building size={16} className="inline mr-2" /> Contact Sales
              </button>
            </div>
             {/* Features List */}
            <div className="border-t border-gray-800 p-6 flex-grow">
              <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Everything in Pro, plus:</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center text-gray-300"><Check size={16} className="text-emerald-500 mr-2 flex-shrink-0" /> Premium Detection Model(s)</li>
                <li className="flex items-center text-gray-300"><Check size={16} className="text-emerald-500 mr-2 flex-shrink-0" /> Volume scanning / Unlimited scans</li>
                <li className="flex items-center text-gray-300"><Check size={16} className="text-emerald-500 mr-2 flex-shrink-0" /> Comprehensive reporting</li>
                <li className="flex items-center text-gray-300"><Check size={16} className="text-emerald-500 mr-2 flex-shrink-0" /> API Access & Integration support</li>
                <li className="flex items-center text-gray-300"><Check size={16} className="text-emerald-500 mr-2 flex-shrink-0" /> Dedicated Priority Support</li>
                <li className="flex items-center text-gray-300"><Check size={16} className="text-emerald-500 mr-2 flex-shrink-0" /> Custom SLAs available</li>
                <li className="flex items-center text-gray-300"><Check size={16} className="text-emerald-500 mr-2 flex-shrink-0" /> On-premise options (potential)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Custom Solution Callout */}
        <div className="mt-16 bg-gradient-to-r from-blue-900/10 via-gray-900/20 to-emerald-900/10 rounded-xl border border-gray-800 p-8 text-center md:text-left md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-white flex items-center justify-center md:justify-start">
                <HelpCircle size={24} className="mr-2 text-blue-400" /> Need a Custom Solution?
            </h3>
            <p className="text-gray-300 mb-4 md:mb-0">
              Contact our sales team to discuss plans tailored to your organization's specific requirements.
            </p>
          </div>
          <button
            onClick={handleContactSales}
            className="mt-4 md:mt-0 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 text-sm shadow-md"
          >
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}