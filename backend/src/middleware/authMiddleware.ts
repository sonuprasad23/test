// backend/src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthRequest extends Request {
    user?: { id: number };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (!JWT_SECRET) {
        console.error("FATAL ERROR: JWT_SECRET is not defined.");
        return res.status(500).json({ message: "Server configuration error." });
    }

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET) as { user: { id: number }, iat: number, exp: number };
            req.user = decoded.user; // Attach user ID (from token payload) to request
            next();
        } catch (error) {
            console.error('Token verification failed:', error instanceof Error ? error.message : error);
            // Don't reveal specific error in response for security
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else { // Check if token exists even before trying Bearer format
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};