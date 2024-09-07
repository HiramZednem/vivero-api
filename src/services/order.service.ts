import { prisma } from '../db/db';


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
    }
};