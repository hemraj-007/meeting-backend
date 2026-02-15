import type { Request, Response } from "express";
import prisma from "../prisma";

export async function getItems(req: Request, res: Response) {
  const { completed, tag } = req.query;

  const where: any = {};

  if (completed !== undefined) {
    where.completed = completed === "true";
  }

  if (tag) {
    where.tags = { has: tag };
  }

  const items = await prisma.actionItem.findMany({
    where,
    orderBy: { id: "desc" }
  });

  res.json(items);
}

export async function createItem(req: Request, res: Response) {
  const { task, owner, dueDate, transcriptId, tags = [] } = req.body;

  if (!task || !transcriptId)
    return res.status(400).json({ error: "task and transcriptId required" });

  const transcript = await prisma.transcript.findUnique({ where: { id: transcriptId } });
  if (!transcript)
    return res.status(404).json({ error: "Transcript not found" });

  const item = await prisma.actionItem.create({
    data: { task, owner, dueDate, transcriptId, tags }
  });

  res.json(item);
}

export async function updateItem(req: Request, res: Response) {
  const id = req.params.id;
  if (typeof id !== "string")
    return res.status(400).json({ error: "id required" });

  const { tags, completed, task, owner, dueDate } = req.body;

  const item = await prisma.actionItem.update({
    where: { id },
    data: {
      ...(completed !== undefined && { completed }),
      ...(task !== undefined && { task }),
      ...(owner !== undefined && { owner }),
      ...(dueDate !== undefined && { dueDate }),
      ...(tags !== undefined && {
        tags: { set: tags }   // ✅ THIS FIXES SINGLE TAG DELETE
      })
    }
  });

  res.json(item);
}

export async function deleteItem(req: Request, res: Response) {
  const id = req.params.id;
  if (typeof id !== "string") return res.status(400).json({ error: "id required" });

  await prisma.actionItem.delete({ where: { id } });

  res.json({ success: true });
}
