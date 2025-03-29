// frontend/src/components/MissionSection.tsx
import React from 'react';
import { Target, Shield, Users, Globe, Activity, CheckSquare, EyeOff } from 'lucide-react'; // Added more icons

export function MissionSection() {
  return (
    <section id="mission" className="py-20 bg-gradient-to-b from-transparent via-gray-950/30 to-transparent">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            To empower individuals and organizations with reliable tools to verify digital media authenticity, fostering trust and combating misinformation in the digital age.
          </p>
        </div>

        {/* Core Mission Statement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-bold mb-6 text-white">Championing Digital Trust</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The rise of sophisticated AI-generated content, particularly deepfakes, presents unprecedented challenges. Malicious use can erode public trust, spread disinformation, manipulate opinions, and facilitate fraud.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We are dedicated to developing and providing accessible, state-of-the-art technology that helps everyone discern truth from fiction in digital media. We believe in promoting transparency and critical evaluation in our increasingly digital world.
            </p>
          </div>
          {/* Pillars/Values Icons */}
          <div className="order-1 md:order-2 bg-gray-900/60 backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-lg">
            <div className="grid grid-cols-2 gap-8">
              {/* Pillar 1: Accuracy */}
              <div className="text-center transform transition-transform duration-300 hover:scale-105">
                <div className="bg-emerald-900/30 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-emerald-700/50">
                  <Target className="h-10 w-10 text-emerald-400" />
                </div>
                <h4 className="font-semibold mb-1 text-white">Accuracy</h4>
                <p className="text-gray-400 text-sm">Continuously improving detection algorithm precision.</p>
              </div>
              {/* Pillar 2: Protection */}
              <div className="text-center transform transition-transform duration-300 hover:scale-105">
                <div className="bg-blue-900/30 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-blue-700/50">
                  <Shield className="h-10 w-10 text-blue-400" />
                </div>
                <h4 className="font-semibold mb-1 text-white">Protection</h4>
                <p className="text-gray-400 text-sm">Safeguarding against the harms of manipulated media.</p>
              </div>
              {/* Pillar 3: Education */}
              <div className="text-center transform transition-transform duration-300 hover:scale-105">
                <div className="bg-purple-900/30 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-purple-700/50">
                  <Users className="h-10 w-10 text-purple-400" />
                </div>
                <h4 className="font-semibold mb-1 text-white">Awareness</h4>
                <p className="text-gray-400 text-sm">Educating users on identifying potential digital fakes.</p>
              </div>
              {/* Pillar 4: Accessibility */}
              <div className="text-center transform transition-transform duration-300 hover:scale-105">
                <div className="bg-red-900/30 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-red-700/50">
                  <Globe className="h-10 w-10 text-red-400" />
                </div>
                <h4 className="font-semibold mb-1 text-white">Accessibility</h4>
                <p className="text-gray-400 text-sm">Making reliable detection tools widely available.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Commitment Section */}
        <div className="bg-gradient-to-r from-blue-900/10 via-gray-900/20 to-emerald-900/10 rounded-2xl p-8 md:p-12 border border-gray-800">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">Our Commitment</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Commitment 1: Research */}
            <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800/80 flex items-start space-x-4">
               <Activity size={24} className="text-blue-400 mt-1 flex-shrink-0" />
               <div>
                  <h4 className="font-semibold mb-1 text-white">Ongoing Research</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Advancing detection capabilities through cutting-edge R&D to stay ahead of evolving manipulation techniques.</p>
               </div>
            </div>
             {/* Commitment 2: Transparency */}
            <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800/80 flex items-start space-x-4">
               <EyeOff size={24} className="text-purple-400 mt-1 flex-shrink-0" />
                <div>
                   <h4 className="font-semibold mb-1 text-white">Ethical Practices</h4>
                   <p className="text-gray-400 text-sm leading-relaxed">Operating transparently about our methods and limitations while rigorously protecting user privacy and data.</p>
                </div>
            </div>
             {/* Commitment 3: Collaboration */}
            <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800/80 flex items-start space-x-4">
                <CheckSquare size={24} className="text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                   <h4 className="font-semibold mb-1 text-white">Collaboration</h4>
                   <p className="text-gray-400 text-sm leading-relaxed">Working with researchers, platforms, and policymakers to foster a collaborative approach to media integrity challenges.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}