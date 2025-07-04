import { Router } from "express";
import { registerJurado } from "../controllers/juradoController";

const router = Router();

router.post("/jurados", registerJurado);

export default router;