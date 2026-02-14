"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTranscript = processTranscript;
exports.getTranscriptHistory = getTranscriptHistory;
const prisma_1 = __importDefault(require("../prisma"));
const llm_service_1 = require("../services/llm.service");
async function processTranscript(req, res) {
    const text = req.body?.text;
    if (!text)
        return res.status(400).json({ error: "Transcript required" });
    const items = await (0, llm_service_1.extractActions)(text);
    const transcript = await prisma_1.default.transcript.create({
        data: {
            text,
            items: {
                create: items.map((i) => ({
                    task: i.task,
                    owner: i.owner,
                    dueDate: i.dueDate
                }))
            }
        },
        include: { items: true }
    });
    res.json(transcript.items);
}
async function getTranscriptHistory(req, res) {
    const limit = Number(req.query.limit) || 5;
    const transcripts = await prisma_1.default.transcript.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { items: true }
    });
    res.json(transcripts);
}
//# sourceMappingURL=transcript.controller.js.map