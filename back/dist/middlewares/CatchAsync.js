"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (cb) => {
    return (req, res, next) => {
        cb(req, res).catch(next);
    };
};
