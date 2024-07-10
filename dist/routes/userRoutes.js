"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const userRoutes = async (fastify) => {
    fastify.get('/', userController_1.getUsers);
    fastify.post('/', userController_1.createUser);
};
exports.default = userRoutes;
