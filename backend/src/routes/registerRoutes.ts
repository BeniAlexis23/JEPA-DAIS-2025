import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import { registerProject, getRegisteredProjects } from "../controllers/registerController";

const router = Router();

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path.join(__dirname, "../../uploads"));
    },
    filename: (_req, file, cb) => {
        const safeName = path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, "_");
        const uniqueName = `${Date.now()}-${safeName}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
        files: 2,
    },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            cb(new Error("Solo se permiten archivos PDF"));
            return;
        }

        cb(null, true);
    },
});

const uploadProjectFiles = (req: Request, res: Response, next: NextFunction) => {
    upload.array("files", 2)(req, res, (error) => {
        if (!error) {
            next();
            return;
        }

        if (error instanceof multer.MulterError) {
            const message = error.code === "LIMIT_FILE_SIZE"
                ? "Cada archivo debe pesar como máximo 10 MB."
                : "Solo se pueden subir hasta 2 archivos PDF.";
            res.status(400).json({ message });
            return;
        }

        res.status(400).json({ message: error.message || "Archivo inválido." });
    });
};

router.post("/register", uploadProjectFiles, registerProject);
router.get("/projects", getRegisteredProjects);

export default router;
