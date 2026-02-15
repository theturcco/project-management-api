// src/routes/projectRoutes.ts
import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { 
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject 
} from '../controllers/projectController';

const router = Router();

// Public Routes (no authentication required)
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected Routes (require authentication)
router.post('/', authenticate, createProject);
router.put('/:id', authenticate, updateProject);
router.delete('/:id', authenticate, deleteProject);

export default router;