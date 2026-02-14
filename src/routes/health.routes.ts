import { Router } from "express";
import prisma from "../prisma";
import { checkLlmHealth } from "../services/llm.service";

const router = Router();

router.get("/", async (_, res) => {
  let db: "ok" | "error" = "error";
  let llm: "ok" | "error" = "error";

  try {
    await prisma.$queryRaw`SELECT 1`;
    db = "ok";
  } catch {
    db = "error";
  }

  try {
    await checkLlmHealth();
    llm = "ok";
  } catch {
    llm = "error";
  }

  res.status(200).json({
    api: "ok",
    db,
    llm
  });
});

export default router;
