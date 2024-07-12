"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
class UserModel {
    async findAll() {
        return prisma_1.default.user.findMany({
            include: {
                accounts: true,
            },
        });
    }
    async create(data) {
        return prisma_1.default.user.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
            },
        });
    }
    async updateUser(id, data) {
        const user = await prisma_1.default.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return prisma_1.default.user.update({
            where: {
                id,
            },
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
            },
        });
    }
    async deleteUser(id) {
        return prisma_1.default.user.delete({
            where: {
                id,
            },
            include: {
                accounts: true,
            },
        });
    }
}
exports.default = UserModel;
