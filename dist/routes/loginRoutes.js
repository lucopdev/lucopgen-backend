"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginController_1 = require("../controllers/loginController");
const loginRoutes = async (fastify) => {
    fastify.post('/', loginController_1.onLogin);
};
exports.default = loginRoutes;
