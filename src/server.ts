// src/server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes';
import clientRoutes from './routes/clientRoutes';

// 1. Create the "App"
const app = express();
const PORT = 3000;

// Enable CORS
// This allows "Anyone" to talk to the API (for now).
// In production, we can restrict this to just your frontend URL
app.use(cors()); // Enable CORS for all routes

// 2. Middleware
// This allows the app to understand JSON data sent in requests
app.use(express.json());

// 3. Define a Route
// GET http://localhost:3000/health
app.get('/health', (req: Request, res: Response) => {
    console.log("Health check triggered!");
    res.status(200).json({ status: "OK", message: "Server is running smoothly" });
});

// GET http://localhost:3000/about
app.get('/about', (req: Request, res: Response) => {
    console.log("About page accessed");
    res.status(200).json({ developer: "Leonardo Turco", role: "Full Stack Developer", project: "Project Management API" });
});

// Mount the project Router
// This means any URL starting with /projects will go to that file
app.use('/projects', projectRoutes); // Mounting the project routes at /projects
// This means any URL starting with /clients will go to that file
app.use('/clients', clientRoutes); // Mounting the client routes at /clients

// 4. Start the Server (Run the App)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});