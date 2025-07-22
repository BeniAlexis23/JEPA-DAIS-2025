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
        const [rows] = await pool.execute(`SELECT * FROM proyectos`) as any[];

        // Transformar los datos
        const transformedProjects = rows.map((project: projectApiExternal) => {
            // Convertir nombres_integrantes a array de strings sin espacios
            const nombresIntegrantes = project.nombres_integrantes
                ? project.nombres_integrantes.split(',').map((nombre: string) => nombre.trim())
                : [];

            // Procesar turno: dividir por guion y normalizar
            let turnoData = { turno: '', seccion: '' };
            if (project.turno) {
                const turnoSplit = project.turno.split('-').map((part: string) => part.trim());
                const turno = turnoSplit[0];
                const seccion = turnoSplit[1] || '';

                // Normalizar turno
                let turnoNormalizado = turno;
                if (turno.toLowerCase() === 'mañana') turnoNormalizado = 'MANANA';
                else if (turno.toLowerCase() === 'tarde') turnoNormalizado = 'TARDE';
                else if (turno.toLowerCase() === 'noche') turnoNormalizado = 'NOCHE';

                turnoData = { turno: turnoNormalizado, seccion };
            }

            // Combinar archivo1 y archivo2 en array archivos
            const archivos = [];
            if (project.archivo1) archivos.push(project.archivo1);
            if (project.archivo2) archivos.push(project.archivo2);

            return {
                ...project,
                nombres_integrantes: nombresIntegrantes,
                ...turnoData,
                archivos: archivos,
                // Remover archivo1 y archivo2 individuales
                archivo1: undefined,
                archivo2: undefined
            };
        });

        res.status(200).json(transformedProjects);
    } catch (error) {
        console.error("❌ Error al obtener proyectos registrados:", error);
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