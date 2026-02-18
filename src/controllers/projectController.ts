// src/controllers/projectController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all projects
export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany({
            include: {
                client: true
            }
        });
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Failed to fetch projects:" });
    }
};

// Get one project
export const getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    try {
        const project = await prisma.project.findUnique({
            where: { id: id },
            include: { client: true }
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
        const { name, description, status, start_date, clientId } = req.body;

        // Basic validation
        if (!name || !start_date || !clientId) {
            return res.status(400).json({ message: "Name, start_date, and clientId are required" });
        }

        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                status: status || "Planned",
                start_date: new Date(start_date),
                client: { connect: { id: clientId } }
            },
            include: {
                client: true
            }
        });
        res.status(201).json(newProject);
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Failed to create project" });
    }
};

// Update a project
export const updateProject = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { name, description, status, start_date, end_date } = req.body;
    try {
        const updated = await prisma.project.update({
            where: { id: id },
            data: {
                name,
                description,
                status,
                start_date: start_date ? new Date(start_date) : undefined,
                end_date: end_date ? new Date(end_date) : undefined
            },
            include: {
                client: true
            }
        });
        res.json(updated);
    } catch (error) {
        res.status(404).json({ error: "Project not found" });
    }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    try {
        await prisma.project.delete({
            where: { id: id }
        });
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(404).json({ error: "Project not found" });
    }
};