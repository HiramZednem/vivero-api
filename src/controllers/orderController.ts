import { Request, Response } from 'express';
import { orderService } from '../services';


export const orderController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const orders = await orderService.getAll();
            return res.status(200).json(orders);
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
    },
    getById: async (req: Request, res: Response) => {
        try {
            const order = await orderService.getById(parseInt(req.params.id));
            return res.status(201).json(order);
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const order = await orderService.create(req.body);
            return res.status(200).json(order);
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const order = await orderService.update(parseInt(req.params.id), req.body);
            return res.status(200).json(order);
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const order = await orderService.delete(parseInt(req.params.id));
            return res.status(200).json(order);
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
    }

};
