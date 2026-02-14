import { Router } from "express";
import {
  processTranscript,
  getTranscriptHistory
} from "../controllers/transcript.controller";

const router = Router();

router.post("/", processTranscript);
router.get("/", getTranscriptHistory); // 👈 history

export default router;
