// src/controllers/projectController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all projects
export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch projects:" });
    }
};

// Get one project
export const getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const project = await prisma.project.findUnique({
            where: { id: Number(id) }
        });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch project" });
    }
};

// Create a new project
export const createProject = async (req: Request, res: Response) => {
    try {
        const { name, description, status, start_date } = req.body;

        // Basic validation
        if (!name || !start_date) {
            return res.status(400).json({ message: "Name and start_date are required" });
        }

        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                status: status || "Planned",
                start_date: new Date(start_date)
            }
        });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: "Failed to create project" });
    }
};

// Update a project
export const updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, status, start_date, end_date } = req.body;
    try {
        const updated = await prisma.project.update({
            where: { id: Number(id) },
            data: {
                name,
                description,
                status,
                start_date: start_date ? new Date(start_date) : undefined,
                end_date: end_date ? new Date(end_date) : undefined
            }
        });
        res.json(updated);
    } catch (error) {
        res.status(404).json({ error: "Project not found" });
    }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.project.delete({
            where: { id: Number(id) }
        });
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(404).json({ error: "Project not found" });
    }
};