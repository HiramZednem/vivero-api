import { Request, Response } from 'express';
import { orderService, productService } from '../services';


export const productController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const products = await productService.getAll();
            return res.status(200).json(products);
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
    },
    getById: async (req: Request, res: Response) => {
        try {
            const product = await productService.getById(parseInt(req.params.id));
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            return res.status(201).json(product);
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const product = await productService.create(req.body);
            return res.status(200).json(product);
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const productExist = await productService.getById(parseInt(req.params.id));
            if (!productExist) {
                return res.status(404).json({ error: 'Product not found' });
            }
            const product = await productService.update(parseInt(req.params.id), req.body);
            return res.status(200).json(product);
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const productExist = await productService.getById(parseInt(req.params.id));
            if (!productExist) {
                return res.status(404).json({ error: 'Product not found' });
            }

            orderService.getAll().then((orders) => {
                const ordersWithProduct = orders.filter((order) => order.product_id === parseInt(req.params.id));
                if (ordersWithProduct.length > 0) {
                    return res.status(400).json({ error: 'Product is in use' });
                } else {
                    productService.delete(parseInt(req.params.id)).then((product) => {
                        return res.status(200).json(product);
                    });
                }
            });
            
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
    }

};
