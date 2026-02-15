// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';

// Hardcoded token for now (in real life, use environment variables or a secure vault)
const API_KEY = "my-secred-key-123";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    // Check for the API key in the Authorization header
    const apiKey = req.headers['x-api-key'];

    if (apiKey && apiKey === API_KEY) {
        // If the key is valid, proceed to the next step (the actual route handler)
        next();
    } else {
        // If the key is missing or invalid, return a 401 Unauthorized response
        res.status(401).json({ message: "Unauthorized: Invalid or missing API key" });
    }
};