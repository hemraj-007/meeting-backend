import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import transcriptRoutes from "./routes/transcripts.routes";
import itemRoutes from "./routes/items.routes";
import healthRoutes from "./routes/health.routes";

dotenv.config();

const app = express();
const allowedOrigins =
  process.env.CORS_ORIGIN?.split(",") ?? [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());

app.use("/api/transcripts", transcriptRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/health", healthRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

