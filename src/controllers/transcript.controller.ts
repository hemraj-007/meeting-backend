import type { Request, Response } from "express";
import prisma from "../prisma";
import { extractActions } from "../services/llm.service";

type ExtractedAction = { task: string; owner: string | null; dueDate: string | null };

export async function processTranscript(req: Request, res: Response) {
  const text = req.body?.text;

  if (!text) return res.status(400).json({ error: "Transcript required" });

  const items = await extractActions(text);

  const transcript = await prisma.transcript.create({
    data: {
      text,
      items: {
        create: items.map((i: ExtractedAction) => ({
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

export async function getTranscriptHistory(req: Request, res: Response) {
  const limit = Number(req.query.limit) || 5;

  const transcripts = await prisma.transcript.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { items: true }
  });

  res.json(transcripts);
}

export async function deleteTranscript(req: Request, res: Response) {
  const id = req.params.id;

  if (typeof id !== "string")
    return res.status(400).json({ error: "id required" });

  try {
    await prisma.transcript.delete({
      where: { id }
    });
  } catch (e: unknown) {
    const code = e && typeof e === "object" && "code" in e ? (e as { code: string }).code : null;
    if (code === "P2025") {
      return res.status(404).json({ error: "Transcript not found" });
    }
    throw e;
  }

  res.json({ success: true });
}
