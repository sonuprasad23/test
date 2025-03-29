// frontend/src/types.ts

// User type matching backend response (excluding passwordHash)
export interface User {
    id: number;
    email: string;
    name?: string | null;
    createdAt: string;
    updatedAt: string;
  }
  
  // Analysis details structure (can be expanded based on actual API/model output)
  export interface AnalysisDetails {
      probabilityReal?: number;
      probabilityAI?: number;
      // Allow flexible details from Sightengine or future models
      [key: string]: any;
  }
  
  // Main analysis result structure stored in DB and returned to frontend
  export interface AnalysisResult {
      isAi: boolean;
      confidence: number;
      source: 'basic_model' | 'sightengine_api' | 'error';
      details?: AnalysisDetails | null; // Prisma Json fields can be null
      error?: boolean;    // Included if source is 'error'
      message?: string;   // Included if source is 'error'
  }
  
  // Image record structure matching backend response
  export interface ImageRecord {
      id: number;
      originalName: string;
      filePath: string; // Filename relative to backend /uploads/
      analysisResult: AnalysisResult | null;
      createdAt: string;
  }