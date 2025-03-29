// backend/src/routes/auth.ts
import express, { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../server'; // Import shared Prisma client
import { body, validationResult } from 'express-validator';

const router: Router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// --- Registration ---
router.post(
    '/register',
    body('email').isEmail().normalizeEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').optional().isString().trim().escape(),
    async (req: Request, res: Response) => {
        if (!JWT_SECRET) {
            console.error("JWT_SECRET not set during registration.");
            return res.status(500).json({ message: "Server configuration error." });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, name } = req.body;
        try {
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists with this email' });
            }
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            const user = await prisma.user.create({
                data: { email, passwordHash, name: name || null }, // Ensure name can be null
            });
            const payload = { user: { id: user.id } };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
            const { passwordHash: _, ...userWithoutPassword } = user; // Exclude hash from response
            res.status(201).json({ token, user: userWithoutPassword }); // Return token and user info
        } catch (err: any) {
            console.error("Registration Error:", err.message);
            res.status(500).send('Server error during registration');
        }
    }
);

// --- Login ---
router.post(
    '/login',
    body('email').isEmail().normalizeEmail().withMessage('Enter a valid email'),
    body('password').exists().withMessage('Password is required'),
    async (req: Request, res: Response) => {
        if (!JWT_SECRET) {
             console.error("JWT_SECRET not set during login.");
            return res.status(500).json({ message: "Server configuration error." });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                // Keep error message generic for security
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                 // Keep error message generic for security
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            const payload = { user: { id: user.id } };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
            const { passwordHash: _, ...userWithoutPassword } = user; // Exclude hash from response
            res.json({ token, user: userWithoutPassword }); // Return token and user info
        } catch (err: any) {
            console.error("Login Error:", err.message);
            res.status(500).send('Server error during login');
        }
    }
);

export default router;