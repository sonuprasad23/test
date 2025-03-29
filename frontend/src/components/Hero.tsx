// frontend/src/components/Hero.tsx
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Upload, Zap, X, Loader2 } from 'lucide-react';
import { DetectionResults } from './DetectionResults';
import { uploadImageForAnalysis } from '../services/imageApi';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { AnalysisResult } from '../types'; // Import shared type

export function Hero() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [detectionMethod, setDetectionMethod] = useState<'basic' | 'advanced'>('basic');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null); // For displaying errors related to upload/analysis
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth(); // Use auth context

  // Enhanced file handling with validation
  const handleFileChange = (file: File | null | undefined) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        toast.error('Invalid file type.', { description: 'Please upload an image (JPG, PNG, WEBP, etc.).' });
        clearUpload();
        return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File too large.', { description: 'Maximum upload size is 5MB.' });
        clearUpload();
        return;
    }

    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = event => setUploadedImage(event.target?.result as string);
    reader.onerror = () => { toast.error('Error reading file.'); clearUpload(); };
    reader.readAsDataURL(file);
    // Reset previous state on new upload
    setResults(null);
    setError(null);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e.target.files?.[0]);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); handleFileChange(e.dataTransfer.files[0]); };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };
  const triggerFileInput = () => fileInputRef.current?.click();

  const analyzeImage = async () => {
    // Guard clauses
    if (isAuthLoading) return; // Wait for auth check
    if (!isAuthenticated) { setError("Please log in to analyze images."); toast.error("Login Required"); return; }
    if (!uploadedFile) { setError("Please select an image file first."); toast.warning("No Image Selected"); return; }
    if (isAnalyzing) return; // Prevent multiple clicks

    setIsAnalyzing(true);
    setError(null);
    setResults(null);
    toast.loading("Analyzing image...", { id: 'analysis-toast' });

    try {
      const response = await uploadImageForAnalysis(uploadedFile, detectionMethod);
      setResults(response.image.analysisResult);
      toast.success("Analysis complete!", { id: 'analysis-toast' });
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Analysis failed';
      setError(message);
      toast.error(`Analysis Error: ${message}`, { id: 'analysis-toast' });
      console.error('Error uploading/analyzing image:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearUpload = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setUploadedImage(null);
    setUploadedFile(null);
    setResults(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Determine if the main action button should be disabled
  const analyzeDisabled = isAuthLoading || !isAuthenticated || isAnalyzing || !uploadedFile;

  return (
    <section id="home" className="py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading and Subtitle */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          Detect Deepfakes with AI Precision
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Upload an image to see if it's authentic or AI-generated using our detection models.
        </p>

        {/* Login/Register Prompt if not authenticated */}
        {!isAuthLoading && !isAuthenticated && (
            <div className="mb-6 p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 text-yellow-200 rounded-lg border border-yellow-700/50 shadow-md">
                <p className="font-medium">Authentication Required</p>
                <p className="text-sm mt-1">
                    Please{' '}
                    <Link to="/login" className="font-bold underline hover:text-yellow-100 transition">Login</Link>
                    {' '}or{' '}
                    <Link to="/register" className="font-bold underline hover:text-yellow-100 transition">Register</Link>
                    {' '}to use the deepfake detector.
                </p>
            </div>
        )}

        {/* Main Interaction Area */}
        <div className="mb-8">
          {/* Detection Method Selection */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              className={`px-5 py-2 rounded-full text-sm font-medium transition duration-200 ease-in-out ${detectionMethod === 'basic' ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'} ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => setDetectionMethod('basic')}
              disabled={isAnalyzing}
            >
              Basic Model (Free)
            </button>
            <button
              className={`px-5 py-2 rounded-full text-sm font-medium transition duration-200 ease-in-out ${detectionMethod === 'advanced' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'} ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => setDetectionMethod('advanced')}
              disabled={isAnalyzing}
            >
              Advanced Model (Premium)
            </button>
          </div>

          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed border-gray-700 rounded-lg p-8 mb-6 transition-colors duration-200 ${!uploadedImage && !isAnalyzing ? 'cursor-pointer hover:border-emerald-500 bg-gray-900/20 hover:bg-gray-900/40' : 'border-gray-600'} ${isAnalyzing ? 'opacity-70 pointer-events-none' : ''}`}
            onClick={!uploadedImage && !isAnalyzing ? triggerFileInput : undefined}
            onDrop={!isAnalyzing ? handleDrop : undefined}
            onDragOver={!isAnalyzing ? handleDragOver : undefined}
            role="button"
            tabIndex={!uploadedImage && !isAnalyzing ? 0 : -1}
            aria-label="Image upload area"
          >
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} disabled={isAnalyzing}/>
            {!uploadedImage ? (
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg text-gray-300 mb-2 font-medium">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">Supports JPG, PNG, WEBP, etc. (Max 5MB)</p>
              </div>
            ) : (
              <div className="relative group"> {/* Added group for hover effect on X */}
                <img src={uploadedImage} alt="Uploaded preview" className="max-h-96 mx-auto rounded-lg shadow-lg" />
                {/* Show X button only if not analyzing */}
                {!isAnalyzing && (
                     <button
                        className="absolute top-2 right-2 bg-gray-900/70 text-white p-1.5 rounded-full transition-all opacity-60 group-hover:opacity-100 hover:bg-red-600/80 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        onClick={clearUpload}
                        title="Remove image"
                        aria-label="Remove uploaded image"
                    >
                        <X size={18} />
                    </button>
                )}
              </div>
            )}
          </div>

          {/* Error Display Area */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-lg text-sm border border-red-700/50 animate-pulse" role="alert">
              {error}
            </div>
          )}

          {/* Analyze Button Area */}
          <div className="h-10 flex items-center justify-center"> {/* Reserve space for button/loader */}
            {!isAnalyzing && uploadedFile && (
              <button
                className={`bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center space-x-2 mx-auto transition duration-200 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-700`}
                onClick={analyzeImage}
                disabled={analyzeDisabled}
                title={!isAuthenticated ? "Please log in to analyze" : (!uploadedFile ? "Please upload an image" : "Start analysis")}
              >
                <Zap size={20} />
                <span>Detect Deepfake</span>
              </button>
            )}
            {isAnalyzing && (
                <div className="flex items-center text-gray-300">
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    <span>Analyzing... Please wait.</span>
                </div>
            )}
          </div>
        </div>

        {/* Results Display Area */}
        {results && <DetectionResults results={results} />}
      </div>
    </section>
  );
}