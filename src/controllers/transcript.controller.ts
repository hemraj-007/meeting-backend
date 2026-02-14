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
