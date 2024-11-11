"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_PASSWORD = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT;
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
