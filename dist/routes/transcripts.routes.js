"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transcript_controller_1 = require("../controllers/transcript.controller");
const router = (0, express_1.Router)();
router.post("/", transcript_controller_1.processTranscript);
router.get("/", transcript_controller_1.getTranscriptHistory); // 👈 history
exports.default = router;
//# sourceMappingURL=transcripts.routes.js.map