"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const accountController_1 = require("../controllers/accountController");
const accountRoutes = async (fastify) => {
    fastify.get('/', accountController_1.getAccounts);
    fastify.post('/', accountController_1.createAccount);
    fastify.delete('/:userId/:id', accountController_1.deleteAccount);
};
exports.default = accountRoutes;
