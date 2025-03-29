// frontend/src/components/AboutSection.tsx
import React from 'react';
import { ShieldCheck, Eye, Zap, Lock } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            About Deepfake Detector
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our cutting-edge AI technology helps identify manipulated media with
            industry-leading accuracy.
          </p>
        </div>
        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Card 1: Advanced Detection */}
          <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-emerald-500/50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-emerald-900/30 p-3 rounded-full w-fit mb-4">
              <ShieldCheck className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Advanced Detection</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Utilizing sophisticated AI models to identify subtle manipulation patterns with high precision.
            </p>
          </div>
          {/* Card 2: Visual Analysis */}
          <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-blue-900/30 p-3 rounded-full w-fit mb-4">
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Insightful Results</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Provides clear detection scores and details, helping you understand the analysis outcome.
            </p>
          </div>
           {/* Card 3: Fast Processing */}
          <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-purple-900/30 p-3 rounded-full w-fit mb-4">
              <Zap className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Fast Processing</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Get results quickly with our optimized processing pipeline and efficient detection algorithms.
            </p>
          </div>
           {/* Card 4: Privacy First */}
          <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-red-500/50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-red-900/30 p-3 rounded-full w-fit mb-4">
              <Lock className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Privacy Focused</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your uploaded images are processed securely and deleted after analysis (unless explicitly saved).
            </p>
          </div>
        </div>

        {/* AI Media Challenge Section */}
        <div className="bg-gradient-to-r from-emerald-900/10 via-gray-900/20 to-blue-900/10 rounded-2xl p-8 md:p-12 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-white">
                The AI Media Challenge
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                As AI-generated content becomes increasingly sophisticated, distinguishing between real and fake media is more challenging than ever. Deepfakes pose significant risks to trust and security.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our deepfake detector uses state-of-the-art machine learning models trained on diverse datasets to identify subtle artifacts and inconsistencies indicative of manipulation.
              </p>
            </div>
            {/* Example Image Comparison */}
            <div className="relative">
              {/* You can replace this with a more sophisticated comparison component */}
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
                <div className="absolute inset-0 flex items-center justify-center">
                   <p className="text-gray-500 italic text-center p-4">Example: Real vs. AI Image</p>
                   {/* Placeholder for actual image comparison visualization */}
                </div>
                 {/* Example Placeholder Images (consider replacing with relevant visuals) */}
                {/* <div className="grid grid-cols-2 gap-2 p-4 w-full h-full">
                  <div className="aspect-square bg-gray-700 rounded-lg relative overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=128&h=128" alt="Real face example" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 bg-green-900/70 text-green-100 text-xs py-1 px-2 font-medium">Real</div>
                  </div>
                  <div className="aspect-square bg-gray-700 rounded-lg relative overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1570158268183-d296b2892211?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=128&h=128" alt="AI face example" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 bg-red-900/70 text-red-100 text-xs py-1 px-2 font-medium">AI Generated</div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}