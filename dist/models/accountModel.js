"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
class AccountModel {
    async findAll() {
        return prisma_1.default.account.findMany();
    }
    async findById(id) {
        return prisma_1.default.account.findUnique({
            where: {
                id,
            },
        });
    }
    async create(data) {
        return prisma_1.default.account.create({
            data: {
                name: data.name,
                login: data.login,
                password: data.password,
                owner: {
                    connect: {
                        id: data.ownerId,
                    },
                },
            },
        });
    }
    async delete(id) {
        return prisma_1.default.account.delete({
            where: {
                id,
            },
        });
    }
}
exports.default = AccountModel;
