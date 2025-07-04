import { Request, Response } from "express";
import pool from "../utils/db";

export const registerJurado = async (req: Request, res: Response) => {
    try {
        const {
            nombres,
            apellidos,
            celular,
            correo,
            horario
        } = req.body;

        await pool.execute(
            `INSERT INTO jurados (
        nombres, apellidos, celular, correo,
        horario) VALUES (?, ?, ?, ?, ?)`,
            [
                nombres,
                apellidos,
                celular,
                correo,
                horario
            ]
        );

        res.status(201).json({ message: "Jurado registrado correctamente." });
    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(500).json({ message: "Error al registrar Jurado." });
    }
};
