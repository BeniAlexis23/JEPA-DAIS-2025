import { Request, Response } from "express";
import pool from "../utils/db";

const requiredFields = ["nombres", "apellidos", "celular", "correo", "horario"] as const;

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isPlaceholder = (value: string) => value.trim().toLowerCase().startsWith("seleccione");

export const registerJurado = async (req: Request, res: Response) => {
    try {
        const missingField = requiredFields.find((field) => !String(req.body[field] || "").trim());

        if (missingField) {
            res.status(400).json({ message: `El campo ${missingField} es obligatorio.` });
            return;
        }

        const { nombres, apellidos, celular, correo, horario } = req.body;

        if (isPlaceholder(horario)) {
            res.status(400).json({ message: "Debe seleccionar un horario válido." });
            return;
        }

        if (!isValidEmail(correo)) {
            res.status(400).json({ message: "El correo no tiene un formato válido." });
            return;
        }

        await pool.execute(
            `INSERT INTO jurados (
        nombres, apellidos, celular, correo,
        horario) VALUES (?, ?, ?, ?, ?)`,
            [
                nombres.trim(),
                apellidos.trim(),
                celular.trim(),
                correo.trim(),
                horario.trim()
            ]
        );

        res.status(201).json({ message: "Jurado registrado correctamente." });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ message: "Error al registrar Jurado." });
    }
};
