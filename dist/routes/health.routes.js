"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const llm_service_1 = require("../services/llm.service");
const router = (0, express_1.Router)();
router.get("/", async (_, res) => {
    let db = "error";
    let llm = "error";
    try {
        await prisma_1.default.$queryRaw `SELECT 1`;
        db = "ok";
    }
    catch {
        db = "error";
    }
    try {
        await (0, llm_service_1.checkLlmHealth)();
        llm = "ok";
    }
    catch {
        llm = "error";
    }
    res.status(200).json({
        api: "ok",
        db,
        llm
    });
});
exports.default = router;
//# sourceMappingURL=health.routes.js.map