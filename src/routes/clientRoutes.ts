import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    try {
        const client = await prisma.client.create({ data: req.body });
        res.json(client);
    } catch (e) { res.status(500).json({ error: "Error creating client" }); }
});

router.get('/', async (req, res) => {
    const clients = await prisma.client.findMany();
    res.json(clients);
});

export default router;