import { Router } from "express";
import multer from "multer";
import path from "path";
import { registerProject } from "../controllers/registerController";

const router = Router();

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path.join(__dirname, "../../uploads"));
    },
    filename: (_req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

router.post("/register", upload.array("files", 2), registerProject);

export default router;
