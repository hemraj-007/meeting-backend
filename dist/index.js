"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const transcripts_routes_1 = __importDefault(require("./routes/transcripts.routes"));
const items_routes_1 = __importDefault(require("./routes/items.routes"));
const health_routes_1 = __importDefault(require("./routes/health.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") ?? [];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/transcripts", transcripts_routes_1.default);
app.use("/api/items", items_routes_1.default);
app.use("/api/health", health_routes_1.default);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
//# sourceMappingURL=index.js.map