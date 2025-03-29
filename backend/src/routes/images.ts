// backend/src/routes/images.ts (Modified Section Only)

import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // Keep fs for potential file cleanup
// Remove spawn and axios imports if ONLY mocking
// import { spawn } from 'child_process';
// import axios from 'axios';
import { prisma } from '../server';
import { protect, AuthRequest } from '../middleware/authMiddleware';

// Keep router, multer config, etc. the same...

// --- Detection Result Interface (Keep this) ---
interface DetectionResult {
    isAi: boolean;
    confidence: number;
    details?: any;
    source: 'basic_model' | 'sightengine_api' | 'error';
    error?: boolean;
    message?: string;
}

// --- Helper: Run Python Script (MOCK VERSION) ---
function runPythonDetection(imagePath: string): Promise<DetectionResult> {
    console.log(`[MOCK] Simulating basic detection for: ${imagePath}`);
    // Optional: Clean up the uploaded file even in mock scenario
     try {
         if(fs.existsSync(imagePath)) {
             fs.unlinkSync(imagePath);
             console.log(`[MOCK] Cleaned up mock file: ${imagePath}`);
         }
     } catch(e){ console.error("Mock file cleanup failed", e)}

    // Simulate a short delay
    return new Promise(resolve => setTimeout(() => {
        resolve({ // Return mock data
            isAi: Math.random() > 0.5, // Randomize for testing
            confidence: parseFloat((70 + Math.random() * 29).toFixed(2)), // Between 70-99
            source: 'basic_model',
            details: {
                mock: true,
                simulated: true,
                probabilityAI: parseFloat((Math.random() * 100).toFixed(2)),
                probabilityReal: parseFloat((Math.random() * 100).toFixed(2)),
             }
        });
    }, 500)); // 500ms delay
}

// --- Helper: Call Sightengine API (MOCK VERSION) ---
async function callSightengineApi(imagePath: string): Promise<DetectionResult> {
     console.log(`[MOCK] Simulating advanced detection for: ${imagePath}`);
     // Optional: Clean up the uploaded file even in mock scenario
     try {
         if(fs.existsSync(imagePath)) {
             fs.unlinkSync(imagePath);
             console.log(`[MOCK] Cleaned up mock file: ${imagePath}`);
         }
     } catch(e){ console.error("Mock file cleanup failed", e)}

    // Simulate a slightly longer delay
    return new Promise(resolve => setTimeout(() => {
        resolve({ // Return mock data
            isAi: Math.random() > 0.6, // Slightly higher chance for "advanced" mock
            confidence: parseFloat((80 + Math.random() * 19).toFixed(2)), // Between 80-99
            source: 'sightengine_api',
            details: {
                mock: true,
                simulated: true,
                api_called_mock: true,
                deepfake_score_mock: Math.random()
            }
        });
    }, 800)); // 800ms delay
}

// --- Upload Image Route (Keep the existing logic) ---
// It will now call the MOCK helper functions above based on detectionMethod
router.post('/upload', protect, upload.single('image'), async (req: AuthRequest, res: Response) => {
    // ... (Keep the existing logic from try block onwards) ...
    // ... It will call the mocked runPythonDetection or callSightengineApi ...
    // ... then save the MOCK analysisResult to the database ...
    console.log("Node: Received request to /api/images/upload (using MOCK analysis)"); // Debug
    if (!req.file) {
        console.log("Node: Upload request rejected - No file or invalid type."); // Debug
        return res.status(400).json({ message: 'No image file uploaded or file type not allowed.' });
    }
    if (!req.user) {
        console.log("Node: Upload request rejected - Not authorized (no user)."); // Debug
        return res.status(401).json({ message: 'Not authorized' });
    }

    const detectionMethod = req.body.detectionMethod || 'basic';
    const imagePath = req.file.path;
    console.log(`Node: Processing upload (MOCK). Method: ${detectionMethod}, User: ${req.user.id}, File: ${imagePath}`); // Debug

    let analysisResult: DetectionResult | null = null;

    try {
        if (detectionMethod === 'basic') {
            console.log("Node: Calling MOCK Basic Model detection..."); // Debug
            analysisResult = await runPythonDetection(imagePath); // Calls MOCK function
        } else if (detectionMethod === 'advanced') {
            console.log("Node: Calling MOCK Advanced API detection..."); // Debug
            analysisResult = await callSightengineApi(imagePath); // Calls MOCK function
        } else {
            console.log(`Node: Invalid detection method requested: ${detectionMethod}`); // Debug
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath); // Cleanup invalid request file
            return res.status(400).json({ message: `Invalid detection method '${detectionMethod}'. Use 'basic' or 'advanced'.` });
        }

        console.log("Node: MOCK Analysis result received:", JSON.stringify(analysisResult)); // Debug

        if (!analysisResult || analysisResult.error) {
             const errorMessage = analysisResult?.message || 'Unknown analysis error';
             console.error(`Node: MOCK Analysis failed (${analysisResult?.source || detectionMethod}): ${errorMessage}`);
             // File should already be deleted by mock functions, but double check if needed
             // if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
             return res.status(500).json({ message: `Image analysis failed: ${errorMessage}` });
         }

        // Save mock analysis to DB
        console.log("Node: Saving MOCK image record to database..."); // Debug
        const savedImage = await prisma.image.create({
            data: {
                userId: req.user.id,
                originalName: req.file.originalname,
                filePath: req.file.filename,
                mimeType: req.file.mimetype,
                sizeBytes: req.file.size,
                analysisResult: { // Store structured MOCK result
                    isAi: analysisResult.isAi,
                    confidence: analysisResult.confidence,
                    source: analysisResult.source,
                    details: analysisResult.details
                },
            }
        });
        console.log("Node: MOCK Image record saved successfully. ID:", savedImage.id); // Debug
        res.status(201).json({ message: 'Image uploaded and analyzed successfully (Mock)', image: savedImage });

    } catch (error: any) {
        console.error("Node: Error in /upload route handler (MOCK):", error); // Debug
        // File should already be deleted by mock functions if they were reached
        if (fs.existsSync(imagePath)) { // Cleanup if error happened before mock calls
             try { fs.unlinkSync(imagePath); console.log(`Node: Cleaned up file on route error: ${imagePath}`); }
             catch (e) { console.error("Node: Failed to cleanup file on route error:", e); }
        }
        res.status(500).json({ message: `Server error during image processing: ${error.message}` });
    }
});

// --- Get User Images Route (Keep as before) ---
router.get('/', protect, async (req: AuthRequest, res: Response) => {
    // ... (Keep existing logic) ...
    console.log(`Node: Received request to GET /api/images for user ${req.user?.id}`); // Debug
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });
    try {
        const userImages = await prisma.image.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' },
            select: { id: true, originalName: true, filePath: true, analysisResult: true, createdAt: true }
        });
         console.log(`Node: Found ${userImages.length} images for user ${req.user.id}`); // Debug
        res.json(userImages);
    } catch (error: any) {
        console.error(`Node: Error fetching images for user ${req.user.id}:`, error); // Debug
        res.status(500).json({ message: 'Server error fetching images' });
    }
});


export default router; // Keep export