import { prisma } from '../db/db';


export const productService = {
    getAll: async () => {
            return await prisma.products.findMany()
    },
    getById: async (id: number) => {
        return await prisma.products.findUnique({
            where: {
                id: id
            }
        })
    },
    create: async (data: any) => {
        return await prisma.products.create({
            data: data
        })
    },
    update: async (id: number, data: any) => {
        return await prisma.products.update({
            where: {
                id: id
            },
            data: data
        })
    },
    delete: async (id: number) => {
        return await prisma.products.delete({
            where: {
                id: id
            }
        })
    }
};