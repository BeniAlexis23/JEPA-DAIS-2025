import express from "express";
import cors from "cors";
import multer from "multer";
import registerRoutes from "./routes/registerRoutes";
import initDB from "./utils/initDB";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

initDB();

app.use("/api", registerRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
