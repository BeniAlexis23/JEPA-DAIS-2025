import { Request, Response } from "express";
import pool from "../utils/db";
import path from "path";

const requiredFields = [
    "docente",
    "nombre_proyecto",
    "num_integrantes",
    "nombres_integrantes",
    "disciplina",
    "curso",
    "ciclo",
    "turno",
] as const;

const isPlaceholder = (value: string) => value.trim().toLowerCase().startsWith("seleccione");

export const registerProject = async (req: Request, res: Response) => {
    try {
        const missingField = requiredFields.find((field) => !String(req.body[field] || "").trim());

        if (missingField) {
            res.status(400).json({ message: `El campo ${missingField} es obligatorio.` });
            return;
        }

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

        const invalidSelection = [docente, num_integrantes, disciplina, curso, ciclo, turno].some(isPlaceholder);

        if (invalidSelection) {
            res.status(400).json({ message: "Debe completar todas las selecciones del formulario." });
            return;
        }

        const files = (req.files || []) as Express.Multer.File[];

        if (files.length === 0) {
            res.status(400).json({ message: "Debe subir al menos un archivo PDF." });
            return;
        }

        const filePaths = files.map((file) => path.basename(file.path));

        await pool.execute(
            `INSERT INTO proyectos (
        docente, nombre_proyecto, num_integrantes, nombres_integrantes,
        disciplina, curso, ciclo, turno, archivo1, archivo2
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                docente.trim(),
                nombre_proyecto.trim(),
                num_integrantes.trim(),
                nombres_integrantes.trim(),
                disciplina.trim(),
                curso.trim(),
                ciclo.trim(),
                turno.trim(),
                filePaths[0] || null,
                filePaths[1] || null,
            ]
        );

        res.status(201).json({ message: "Proyecto registrado correctamente." });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ message: "Error al registrar el proyecto." });
    }
};

export const getRegisteredProjects = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute(`SELECT * FROM proyectos`) as any[];

        const transformedProjects = rows.map((project: projectApiExternal) => {
            const nombresIntegrantes = project.nombres_integrantes
                ? project.nombres_integrantes.split(",").map((nombre: string) => nombre.trim())
                : [];

            let turnoData = { turno: "", seccion: "" };
            if (project.turno) {
                const turnoSplit = project.turno.split("-").map((part: string) => part.trim());
                const turno = turnoSplit[0];
                const seccion = turnoSplit[1] || "";

                let turnoNormalizado = turno;
                if (turno.toLowerCase() === "mañana") turnoNormalizado = "MANANA";
                else if (turno.toLowerCase() === "tarde") turnoNormalizado = "TARDE";
                else if (turno.toLowerCase() === "noche") turnoNormalizado = "NOCHE";

                turnoData = { turno: turnoNormalizado, seccion };
            }

            const archivos = [];
            if (project.archivo1) archivos.push(project.archivo1);
            if (project.archivo2) archivos.push(project.archivo2);

            return {
                ...project,
                nombres_integrantes: nombresIntegrantes,
                ...turnoData,
                archivos,
                archivo1: undefined,
                archivo2: undefined
            };
        });

        res.status(200).json(transformedProjects);
    } catch (error) {
        console.error("Error al obtener proyectos registrados:", error);
        res.status(500).json({ message: "Error al obtener proyectos registrados." });
    }
};

export interface projectApiExternal {
    id: number;
    docente: string;
    nombre_proyecto: string;
    num_integrantes: string;
    nombres_integrantes: string;
    disciplina: string;
    curso: string;
    ciclo: string;
    turno: string;
    archivo1: string;
    archivo2: null | string;
    fecha: Date;
}
