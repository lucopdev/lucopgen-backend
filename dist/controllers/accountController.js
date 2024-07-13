"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.createAccount = exports.getAccounts = void 0;
const accountModel_1 = __importDefault(require("../models/accountModel"));
class AccountController {
    constructor() {
        this.accountModel = new accountModel_1.default();
        this.getAccounts = async (request, response) => {
            try {
                const accounts = await this.accountModel.findAll();
                return response.send(accounts);
            }
            catch (error) {
                return response.status(500).send(error);
            }
        };
        this.createAccount = async (request, response) => {
            const { login, password, name, ownerId } = request.body;
            try {
                const account = await this.accountModel.create({ login, password, name, ownerId: Number(ownerId) });
                return response.send(account);
            }
            catch (error) {
                return response.status(500).send(error);
            }
        };
        this.deleteAccount = async (request, response) => {
            const { userId, id } = request.params;
            try {
                const account = await this.accountModel.findById(Number(id));
                if (userId !== account?.ownerId.toString()) {
                    return response.status(401).send({ message: 'Unauthorized' });
                }
                await this.accountModel.delete(Number(id));
                return response.send({ message: 'Account deleted' });
            }
            catch (error) {
                return response.status(500).send(error);
            }
        };
    }
}
const accountController = new AccountController();
exports.getAccounts = accountController.getAccounts;
exports.createAccount = accountController.createAccount;
exports.deleteAccount = accountController.deleteAccount;
