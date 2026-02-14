import express from "express";
import dotenv from "dotenv";
import transcriptRoutes from "./routes/transcripts.routes";
import itemRoutes from "./routes/items.routes";
import healthRoutes from "./routes/health.routes";



dotenv.config();

const app = express();

app.use(express.json()); // 👈 THIS FIXES YOUR ERROR

app.use("/api/transcripts", transcriptRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/health", healthRoutes);

app.listen(4000, () => console.log("Server running on 4000"));
