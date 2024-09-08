import { Request, Response } from 'express';
import { orderService, productService } from '../services';


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
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            return res.status(201).json(order);
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            // confirm that the idProduct exists
            const product = await productService.getById(req.body.product_id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const order = await orderService.create(req.body);
            return res.status(200).json(order);
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const orderExist = await orderService.getById(parseInt(req.params.id));
            if (!orderExist) {
                return res.status(404).json({ error: 'Order not found' });
            }
            const order = await orderService.update(parseInt(req.params.id), req.body);
            
            return res.status(200).json(order);
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const orderExist = await orderService.getById(parseInt(req.params.id));
            if (!orderExist) {
                return res.status(404).json({ error: 'Order not found' });
            }
            const order = await orderService.delete(parseInt(req.params.id));
            return res.status(200).json(order);
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
    }

};
