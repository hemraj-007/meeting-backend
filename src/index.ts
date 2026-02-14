import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import transcriptRoutes from "./routes/transcripts.routes";
import itemRoutes from "./routes/items.routes";
import healthRoutes from "./routes/health.routes";

dotenv.config();

const app = express();
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/transcripts", transcriptRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/health", healthRoutes);

app.listen(4000, () => console.log("Server running on 4000"));
