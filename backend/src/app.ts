import express from "express";
import cors from "cors";
import registerRoutes from "./routes/registerRoutes";
import juradoRoutes from "./routes/juradoRoutes";
import initDB from "./utils/initDB";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error("Origen no permitido por CORS"));
    },
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

initDB();

app.use("/api", registerRoutes);
app.use("/api", juradoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
