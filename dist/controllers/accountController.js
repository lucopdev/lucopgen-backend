"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = exports.getAccounts = void 0;
const accountModel_1 = __importDefault(require("../models/accountModel"));
class AccountController {
    constructor() {
        this.accountModel = new accountModel_1.default();
        this.getAccounts = async (request, response) => {
            try {
                const accounts = await this.accountModel.findAll();
                response.send(accounts);
            }
            catch (error) {
                response.status(500).send(error);
            }
        };
        this.createAccount = async (request, response) => {
            const { email, password, name, ownerId } = request.body;
            try {
                const account = await this.accountModel.create({ email, password, name, ownerId: Number(ownerId) });
                response.send(account);
            }
            catch (error) {
                response.status(500).send(error);
            }
        };
    }
}
const accountController = new AccountController();
exports.getAccounts = accountController.getAccounts;
exports.createAccount = accountController.createAccount;
