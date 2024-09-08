import { prisma } from '../db/db';
import { productService } from './product.service';


export const orderService = {
    getAll: async () => {
            return await prisma.orders.findMany()
    },
    getById: async (id: number) => {
        return await prisma.orders.findUnique({
            where: {
                id: id
            }
        })
    },
    create: async (data: any) => {
        return await prisma.orders.create({
            data: data
        })
    },
    update: async (id: number, data: any) => {
        return await prisma.orders.update({
            where: {
                id: id
            },
            data: data
        })
    },
    delete: async (id: number) => {
        return await prisma.orders.delete({
            where: {
                id: id
            }
        })
    },
    authorizeOrder: async (id: number) => {
        const order = await orderService.getById(id);
        if (!order) {
            throw new Error('Order not found');
        }
        const orderAuthorized = await productService.authorizeOrder(order.product_id, order.quantity);
        if (!orderAuthorized) {
            throw new Error('Problem authorizing order');
        }
        await orderService.update(id, { status: true });
        return { message: `Order with id: ${order.id}, authorized`};
    }
};