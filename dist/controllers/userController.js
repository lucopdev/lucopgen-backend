"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const crypto_1 = __importDefault(require("../utils/crypto"));
class UserController {
    constructor() {
        this.userModel = new userModel_1.default();
        this.getUsers = async (request, response) => {
            try {
                const users = await this.userModel.findAll();
                if (!users)
                    return;
                response.send(users.map((user) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    accounts: user.accounts.map((account) => {
                        return {
                            ...account,
                            password: crypto_1.default.decryptPassword(account.password.split(',')[0], account.password.split(',')[1]),
                        };
                    }),
                })));
            }
            catch (error) {
                return response.status(500).send(error);
            }
        };
        this.createUser = async (request, response) => {
            const { name, email, phone, password } = request.body;
            const { encryptedPassword, iv } = crypto_1.default.encryptPassword(password);
            try {
                const user = await this.userModel.create({
                    name,
                    email,
                    phone,
                    password: `${encryptedPassword},${iv}`,
                });
                return response.send({ id: user.id, name: user.name, email: user.email });
            }
            catch (error) {
                return response.status(500).send(error);
            }
        };
    }
}
const userController = new UserController();
exports.getUsers = userController.getUsers;
exports.createUser = userController.createUser;
