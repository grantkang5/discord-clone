"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    host: process.env.REDIS_HOS,
    port: parseInt(process.env.REDIS_PORT),
    retry_strategy: () => 100
};
