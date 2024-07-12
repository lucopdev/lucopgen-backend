"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const jwtUtils_1 = __importDefault(require("../utils/jwtUtils"));
const userModel_1 = __importDefault(require("../models/userModel"));
class UserController {
    constructor() {
        this.userModel = new userModel_1.default();
        this.getUsers = async (request, response) => {
            try {
                const users = await this.userModel.findAll();
                response.send(users.map((user) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    accounts: user.accounts,
                })));
            }
            catch (error) {
                response.status(500).send(error);
            }
        };
        this.createUser = async (request, response) => {
            const { name, email, phone, password } = request.body;
            try {
                const user = await this.userModel.create({ name, email, phone, password: jwtUtils_1.default.hashPassword(password) });
                response.send({ id: user.id, name: user.name, email: user.email });
            }
            catch (error) {
                response.status(500).send(error);
            }
        };
    }
}
const userController = new UserController();
exports.getUsers = userController.getUsers;
exports.createUser = userController.createUser;
