// frontend/src/components/DetectionResults.tsx
import React from 'react';
import { CheckCircle, AlertTriangle, Info, BrainCircuit, Cloud } from 'lucide-react';
import { AnalysisResult, AnalysisDetails } from '../types'; // Import shared types

type DetectionResultsProps = {
  results: AnalysisResult; // Use the defined type
};

// Helper to format detail keys (optional but nice)
const formatDetailKey = (key: string): string => {
    if (key === 'probabilityAI') return 'AI Probability';
    if (key === 'probabilityReal') return 'Real Probability';
    // Add more specific formatting if needed
    return key
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
};

// Helper to render details in a readable format
const renderDetailsValue = (value: any): string => {
    if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value, null, 2); // Pretty print nested objects
    }
    if (typeof value === 'number') {
        // Format numbers nicely, e.g., probabilities as percentages if applicable
        // This basic version just converts to string
        return value.toString();
    }
     if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }
    // Handle strings, null, undefined
    return String(value);
};

// Component to render the details section
const DetailsSection: React.FC<{ details: AnalysisDetails | null | undefined }> = ({ details }) => {
    if (!details || Object.keys(details).length === 0) {
        return <p className="text-sm text-gray-500 italic">No detailed analysis data available for this result.</p>;
    }

    // Custom rendering for basic model results if desired
    if (details.probabilityAI !== undefined && details.probabilityReal !== undefined) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <div className="flex justify-between text-sm mb-1 text-gray-300">
                        <span>AI Probability</span>
                        <span className="font-medium">{details.probabilityAI}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full" style={{ width: `${details.probabilityAI}%` }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1 text-gray-300">
                        <span>Real Probability</span>
                        <span className="font-medium">{details.probabilityReal}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${details.probabilityReal}%` }}></div>
                    </div>
                </div>
            </div>
        );
    }

    // Generic rendering for other details (like Sightengine)
    return (
        <div className="space-y-2 text-sm">
            {Object.entries(details).map(([key, value]) => (
                <div key={key} className="flex justify-between items-start">
                    <span className="font-medium text-gray-400 mr-2">{formatDetailKey(key)}:</span>
                    {/* Use pre-wrap for potentially long JSON strings */}
                    <pre className="text-gray-300 text-right whitespace-pre-wrap break-words">
                        <code>{renderDetailsValue(value)}</code>
                    </pre>
                </div>
            ))}
        </div>
    );
};


export function DetectionResults({ results }: DetectionResultsProps) {
  const { isAi, confidence, source, details } = results;

  return (
    <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 border border-gray-800 shadow-xl mt-8 animate-fade-in"> {/* Added fade-in animation */}
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-white">Detection Results</h2>
         <div className="flex items-center space-x-3 sm:space-x-4">
             {/* Source Chip */}
            <div className={`flex items-center text-xs sm:text-sm font-medium px-3 py-1 rounded-full border ${
                source === 'basic_model'
                ? 'bg-blue-900/30 text-blue-300 border-blue-700/50'
                : 'bg-purple-900/30 text-purple-300 border-purple-700/50'
            }`}>
                 {source === 'basic_model' ? <BrainCircuit size={14} className="mr-1.5" /> : <Cloud size={14} className="mr-1.5" />}
                 {source === 'basic_model' ? 'Basic Model' : 'Advanced API'}
             </div>
             {/* Confidence Score */}
             <div className={`text-lg sm:text-xl font-bold px-3 sm:px-4 py-1.5 rounded-lg border ${
                 isAi
                 ? 'bg-red-900/30 text-red-300 border-red-700/50'
                 : 'bg-green-900/30 text-green-300 border-green-700/50'
             }`}>
               {confidence}%
               <span className="text-xs ml-1 opacity-80">{isAi ? 'AI Likelihood' : 'Real Likelihood'}</span>
             </div>
         </div>
      </div>

      {/* Main Verdict Section */}
      <div className={`mb-8 p-4 rounded-lg border-l-4 ${isAi ? 'border-red-600 bg-red-900/20' : 'border-green-600 bg-green-900/20'}`}>
        <div className="flex items-center space-x-3 mb-2">
          {isAi ? <AlertTriangle className="h-7 w-7 text-red-500 flex-shrink-0" /> : <CheckCircle className="h-7 w-7 text-green-500 flex-shrink-0" />}
          <h3 className={`text-xl font-semibold ${isAi ? 'text-red-400' : 'text-green-400'}`}>
            {isAi ? 'Likely AI-Generated / Deepfake' : 'Likely Authentic'}
          </h3>
        </div>
        <p className={`text-sm pl-10 ${isAi ? 'text-red-200/90' : 'text-green-200/90'}`}>
          {isAi
            ? `The analysis indicates a ${confidence}% likelihood that this image contains AI-generated or manipulated content.`
            : `The analysis indicates a ${confidence}% likelihood that this image is authentic.`
          }
          <span className="text-xs opacity-70 block mt-1"> (Based on {source === 'basic_model' ? 'Basic Model' : 'Advanced API'} analysis)</span>
        </p>
      </div>

      {/* Details Section */}
       <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-200">
            Detailed Analysis
             <Info size={16} className="ml-2 text-gray-500 cursor-help" title="Raw analysis data provided by the detection source."/>
        </h3>
         <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700/50">
             <DetailsSection details={details} />
         </div>
      </div>
    </div>
  );
}

// Add fade-in animation to index.css if you like
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
*/