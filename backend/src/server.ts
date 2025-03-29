// backend/src/server.ts
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '@prisma/client';

// Import routes
import authRoutes from './routes/auth';
import imageRoutes from './routes/images';

dotenv.config(); // Load .env variables FIRST

const app: Express = express();
const port = process.env.PORT || 5001;

// --- Global Prisma Client ---
// Best practice: Instantiate PrismaClient once
export const prisma = new PrismaClient();

// --- Middleware ---
app.use(cors({ // Configure CORS properly for production environments
    // origin: 'YOUR_FRONTEND_URL_OR_REGEX' // e.g., 'http://localhost:5173' or your deployed frontend domain
    origin: '*' // Allow all origins for development - BE CAREFUL IN PRODUCTION
}));
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// --- Static Folder for Uploads ---
// Serve files from the 'uploads' directory at the '/uploads' URL path
// Example: Request to /uploads/image-123.jpg will serve backend/uploads/image-123.jpg
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
console.log(`Serving static files from ${path.join(__dirname, '../uploads')} at /uploads`); // Debug

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

// --- Basic Welcome Route ---
app.get('/', (req: Request, res: Response) => {
  res.send('Deepfake Detector Backend API is running!');
});

// --- Global Error Handler (Basic Example) ---
// This catches errors from synchronous code or errors passed via next(err)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("SERVER ERROR:", err.stack); // Log the full error stack trace
    // Avoid sending stack trace in production for security
    res.status(500).json({
        message: 'An unexpected server error occurred.',
        // Only include error details in non-production environments
        error: process.env.NODE_ENV !== 'production' ? err.message : undefined
     });
});

// --- Start Server ---
const server = app.listen(port, () => {
  console.log(`[server]: Backend server running at http://localhost:${port}`);
});

// --- Graceful Shutdown Logic ---
const shutdown = async (signal: string) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(async () => {
        console.log('HTTP server closed.');
        try {
            await prisma.$disconnect();
            console.log('Prisma client disconnected.');
        } catch (e) {
            console.error('Error disconnecting Prisma:', e);
        } finally {
             process.exit(0); // Exit process after cleanup
        }
    });

     // Force shutdown if server doesn't close gracefully after a timeout
    setTimeout(() => {
        console.error('Could not close connections in time, forcing shutdown');
        process.exit(1);
    }, 10000); // 10 seconds timeout
};

// Listen for termination signals
process.on('SIGINT', () => shutdown('SIGINT')); // Ctrl+C
process.on('SIGTERM', () => shutdown('SIGTERM')); // Standard termination signal