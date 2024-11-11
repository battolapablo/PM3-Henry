"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const usersController_2 = require("../controllers/usersController");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get("/confirm/:token", usersController_2.confirmUser);
exports.usersRouter.get("/users", usersController_1.getAllUsers);
exports.usersRouter.get("/users/:id", usersController_1.getUserById);
exports.usersRouter.post("/users/register", usersController_1.createUser);
exports.usersRouter.post("/users/login", usersController_1.loginUser);
exports.default = exports.usersRouter;