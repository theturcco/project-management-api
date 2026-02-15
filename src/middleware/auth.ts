// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    // 1. Get the API key from environment variables
    // If it's not set, default to empty string to fail safely
    const serverKey = process.env.API_SECRET || "";

    // 2. Get the API key from the request headers
    const apiKey = req.headers['x-api-key'];

    if (apiKey && apiKey === serverKey) {
        // If the key is valid, proceed to the next step (the actual route handler)
        next();
    } else {
        // If the key is missing or invalid, return a 401 Unauthorized response
        res.status(401).json({ message: "Unauthorized: Invalid or missing API key" });
    }
};