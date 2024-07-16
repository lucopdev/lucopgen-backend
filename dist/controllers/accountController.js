"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.createAccount = exports.getAccounts = void 0;
const accountModel_1 = __importDefault(require("../models/accountModel"));
const crypto_1 = __importDefault(require("../utils/crypto"));
class AccountController {
    constructor() {
        this.accountModel = new accountModel_1.default();
        this.getAccounts = async (request, response) => {
            try {
                const accounts = await this.accountModel.findAll();
                const uncryptedPasswordAccounts = accounts.map((account) => {
                    return {
                        ...account,
                        password: `${crypto_1.default.decryptPassword(account.password.split(',')[0], account.password.split(',')[1])}`,
                    };
                });
                return response.send(uncryptedPasswordAccounts);
            }
            catch (error) {
                return response.status(500).send(error);
            }
        };
        this.createAccount = async (request, response) => {
            const { login, password, name, ownerId } = request.body;
            const { encryptedPassword, iv } = crypto_1.default.encryptPassword(password);
            try {
                const account = await this.accountModel.create({
                    login,
                    password: `${encryptedPassword},${iv}`,
                    name,
                    ownerId: Number(ownerId),
                });
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
                if (!account) {
                    return response.status(404).send({ message: 'Account not found.' });
                }
                if (userId !== account?.ownerId.toString()) {
                    return response.status(401).send({ message: 'Unauthorized' });
                }
                await this.accountModel.delete(Number(id));
                const deletedAccount = await this.accountModel.findById(Number(id));
                if (deletedAccount) {
                    return response.status(500).send({ message: 'Failed to delete account' });
                }
                return response.status(200).send({ message: 'Account deleted successfully' });
            }
            catch (error) {
                return response.status(500).send({ error, message: 'Lucopgen internal failiure' });
            }
        };
    }
}
const accountController = new AccountController();
exports.getAccounts = accountController.getAccounts;
exports.createAccount = accountController.createAccount;
exports.deleteAccount = accountController.deleteAccount;
