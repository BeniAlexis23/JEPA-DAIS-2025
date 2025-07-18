import { Request, Response } from "express";
import pool from "../utils/db";
import path from "path";

export const registerProject = async (req: Request, res: Response) => {
    try {
        const {
            docente,
            nombre_proyecto,
            num_integrantes,
            nombres_integrantes,
            disciplina,
            curso,
            ciclo,
            turno,
        } = req.body;

        const files = req.files as Express.Multer.File[];
        const filePaths = files.map((file) => path.basename(file.path));

        await pool.execute(
            `INSERT INTO proyectos (
        docente, nombre_proyecto, num_integrantes, nombres_integrantes,
        disciplina, curso, ciclo, turno, archivo1, archivo2
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                docente,
                nombre_proyecto,
                num_integrantes,
                nombres_integrantes,
                disciplina,
                curso,
                ciclo,
                turno,
                filePaths[0] || null,
                filePaths[1] || null,
            ]
        );

        res.status(201).json({ message: "Proyecto registrado correctamente." });
    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(500).json({ message: "Error al registrar el proyecto." });
    }
};

//end point to get all registered projects
export const getRegisteredProjects = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute(`SELECT * FROM proyectos`);
        res.status(200).json(rows);
    } catch (error) {
        console.error("❌ Error al obtener proyectos registrados:", error);
        res.status(500).json({ message: "Error al obtener proyectos registrados." });
    }
};
