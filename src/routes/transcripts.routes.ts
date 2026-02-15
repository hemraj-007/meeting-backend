import { Router } from "express";
import {
  processTranscript,
  getTranscriptHistory,deleteTranscript
} from "../controllers/transcript.controller";

const router = Router();

router.post("/", processTranscript);
router.get("/", getTranscriptHistory); // 👈 history
router.delete("/:id", deleteTranscript);

export default router;
