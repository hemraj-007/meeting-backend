"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = getItems;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
const prisma_1 = __importDefault(require("../prisma"));
async function getItems(req, res) {
    const { completed, tag } = req.query;
    const where = {};
    if (completed !== undefined) {
        where.completed = completed === "true";
    }
    if (tag) {
        where.tags = { has: tag };
    }
    const items = await prisma_1.default.actionItem.findMany({
        where,
        orderBy: { id: "desc" }
    });
    res.json(items);
}
async function createItem(req, res) {
    const { task, owner, dueDate, transcriptId, tags = [] } = req.body;
    if (!task || !transcriptId)
        return res.status(400).json({ error: "task and transcriptId required" });
    const transcript = await prisma_1.default.transcript.findUnique({ where: { id: transcriptId } });
    if (!transcript)
        return res.status(404).json({ error: "Transcript not found" });
    const item = await prisma_1.default.actionItem.create({
        data: { task, owner, dueDate, transcriptId, tags }
    });
    res.json(item);
}
async function updateItem(req, res) {
    const id = req.params.id;
    if (typeof id !== "string")
        return res.status(400).json({ error: "id required" });
    const { tags, completed, task, owner, dueDate } = req.body;
    const item = await prisma_1.default.actionItem.update({
        where: { id },
        data: {
            ...(completed !== undefined && { completed }),
            ...(task !== undefined && { task }),
            ...(owner !== undefined && { owner }),
            ...(dueDate !== undefined && { dueDate }),
            ...(tags !== undefined && {
                tags: { set: tags } // ✅ THIS FIXES SINGLE TAG DELETE
            })
        }
    });
    res.json(item);
}
async function deleteItem(req, res) {
    const id = req.params.id;
    if (typeof id !== "string")
        return res.status(400).json({ error: "id required" });
    await prisma_1.default.actionItem.delete({ where: { id } });
    res.json({ success: true });
}
//# sourceMappingURL=item.controller.js.map