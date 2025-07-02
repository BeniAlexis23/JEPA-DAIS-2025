"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import UploadFiles from "../UploadFiles";

const docentes: string[] = [
    "Seleccione Docente",
    "ALMIDON ORTIZ CARLOS ALCIDES",
    "ANGOMA ASTUCURI MIRIAM",
    "ARANGÜENA YLLANES MAGALY ROXANA",
    "ASTO HUAMÁN LEONIDAS",
    "CARDENAS LINO CESAR ANDY",
    "COLQUEPISCO PAUCAR NILO TEODORICO",
    "DAGA CHACA MARISOL",
    "DURAN CARHUAMACA AMANDA",
    "FERREYROS YUCRA JAIR EMERSON",
    "HERNANDEZ PEVES JUAN GUSTAVO",
    "HUANCAHUIRE BRACO CLAUDIO ISAIAS",
    "HUARANCCA CONTRERAS PATRICIA PAULINA",
    "LARICO UCHAMACO GUIDO RAÚL",
    "OCHOA CARBAJAL HERNAN",
    "OSEDA GAGO DULIO",
    "PACHECO PUMALEQUE ALEX ABELARDO",
    "POMA BAUTISTA INGRID ROCIO",
    "RAMIREZ PACHECO LUIS ENRIQUE",
    "REYNOSO PALPA JENNY ROCIO",
    "ROQUE TITO EDWIN",
    "SALCEDO RODAS PERCY ISMAEL",
    "SANCHEZ CASTILLO EDDYE ARTURO",
    "VICENTE RAMOS WAGNER ENOC",
    "VILCA PIZARRO JOEL LINDER",
    "ZAMUDIO ESPINOSA ZULMA GISELLA",
];

const integrantes = [
    "Seleccione Número Integrantes",
    "1",
    "2",
    "3",
    "4",
];


const disciplinas: { [key: string]: string[] } = {
    "Matemáticas Aplicadas": ["Matemática Básica I", "Matemática Superior", "Estadística Inferencial"],
    "Estadística y Probabilidades": ["Investigación Operativa I", "Simulación de Sistemas"],
    "Ciencias de la Computación": ["Algoritmo y Fundamentos de Programación", "Programación Orientada a Objetos", "Administración de Base de Datos", "Business Intelligence", "Big Data", "Machine Learning", "Seguridad Informática", "Ingeniería de Software II", "Ética Deontologica", "Auditoría de Sistemas"],
    "Telecomunicaciones": ["Introducción al Networking", "Administración de Redes de Comunicación"],
    "Ingeniería de Sistemas y Comunicaciones": ["Análisis de Sistemas", "Desarrollo de Aplicaciones con DevOps", "Desarrollo de Aplicaciones Móviles", "Gestión de Servicios de las TI", "Ingeniería de Costos"],
    "Hardware y Arquitectura de Computadoras": ["Teoría General de Sistemas", "Arquitectura de Computadoras"],
    "Otras Ingenierías y Tecnologías": ["Metodología de Investigación Científica", "Plan de Negocios Start Up", "Desarrollo de Tesis", "Proyecto de Tesis", "Métodos de Estudios Universitarios", "Derechos Fundamentales", "Prácticas Preprofesionales I", "Prácticas Preprofesionales II", "Comunicación", "Filosofía y Ética"],
};

const ciclos = [
    "Seleccione Ciclo Académico",
    "I",
    "III",
    "V",
    "VII",
    "IX",
    "X",
];

const turnos = [
    "Seleccione Turno y Sección",
    "Mañana - A",
    "Mañana - A1",
    "Mañana - A2",
    "Tarde - B",
    "Tarde - B1",
    "Tarde - B2",
    "Noche - A",
    "Noche - A1",
    "Noche - A2",
    "Noche - B",
    "Noche - B1",
    "Noche - B2"
]

const initialFormData = {
    docente: "",
    nombre_proyecto: "",
    num_integrantes: "",
    nombres_integrantes: "",
    disciplina: "",
    curso: "",
    ciclo: "",
    turno: "",
};

const RegisterForm = () => {

    const [selectedDisciplina, setSelectedDisciplina] = useState("");

    const [formData, setFormData] = useState(initialFormData);
    const [files, setFiles] = useState<File[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        files.forEach((file) => data.append("files", file));

        try {
            const res = await axios.post("http://localhost:3001/api/register", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Proyecto registrado con éxito");
            setFormData(initialFormData);
            setFiles([]);
            setSelectedDisciplina("");

        } catch (err) {
            console.error(err);
            alert("Error al registrar el proyecto");
        }
    };

    return (
        <div className="shadow-lg rounded-lg p-8 w-full max-w-4xl">
            <h1 className="text-4xl font-semibold mb-6 md:pt-20 pt-5 text-center">Registro de Proyectos Académicos</h1>
            <div className="flex gap-4 mb-6 justify-center">
                <Link href="https://drive.google.com/file/d/1QR3EZHhhIVib2lFS0Nhpt8ZsK7upqN6v/view?usp=sharing" target="_blank" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                    Bases
                </Link>
                <Link href="https://drive.google.com/drive/folders/1jnUhM9u4hP6ezKEqM8fetqAppjC5ihik?usp=sharing" target="_blank" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                    Formatos
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex flex-col">
                    <label className="text-sm text-white mb-1">Docente Asesor</label>
                    <select required className="border rounded px-4 py-2 w-full"
                        value={formData.docente}
                        onChange={(e) => setFormData({ ...formData, docente: e.target.value })}
                    >
                        {docentes.map((docente, index) => (
                            <option key={index} value={docente}>{docente}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm text-white mb-1">Nombre del Proyecto</label>
                    <input required type="text" placeholder="Implementación de la herramienta..."
                        className="border rounded px-4 py-2 w-full"
                        value={formData.nombre_proyecto}
                        onChange={(e) => setFormData({ ...formData, nombre_proyecto: e.target.value })}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm text-white mb-1">Número de Integrantes</label>
                    <select required className="border rounded px-4 py-2 w-full"
                        value={formData.num_integrantes}
                        onChange={(e) => setFormData({ ...formData, num_integrantes: e.target.value })}
                    >
                        {integrantes.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm text-white mb-1">Nombres de los Integrantes</label>
                    <textarea required placeholder="1. Gianmarcos Arias. 2. Pamela Reyna..."
                        className="border rounded px-4 py-2 min-h-[100px] resize-y w-full"
                        value={formData.nombres_integrantes}
                        onChange={(e) => setFormData({ ...formData, nombres_integrantes: e.target.value })}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm text-white mb-1">Disciplina</label>
                    <select
                        required
                        className="border rounded px-4 py-2 w-full"
                        value={formData.disciplina}
                        onChange={(e) => {
                            setSelectedDisciplina(e.target.value);
                            setFormData({ ...formData, disciplina: e.target.value, curso: "" });
                        }}
                    >
                        <option value="">Seleccione Disciplina</option>
                        {Object.keys(disciplinas).map((disc, index) => (
                            <option key={index} value={disc}>{disc}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm text-white mb-1">Curso</label>
                    <select
                        required
                        className="border rounded px-4 py-2 w-full"
                        value={formData.curso}
                        disabled={!selectedDisciplina}
                        onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
                    >
                        <option value="">Seleccione Curso</option>
                        {selectedDisciplina && disciplinas[selectedDisciplina].map((curso, index) => (
                            <option key={index} value={curso}>{curso}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm text-white mb-1">Ciclo Académico</label>
                    <select required className="border rounded px-4 py-2 w-full"
                        value={formData.ciclo}
                        onChange={(e) => setFormData({ ...formData, ciclo: e.target.value })}
                    >
                        {ciclos.map((ciclo, index) => (
                            <option key={index} value={ciclo}>{ciclo}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm text-white mb-1">Turno y Sección</label>
                    <select required className="border rounded px-4 py-2 w-full"
                        value={formData.turno}
                        onChange={(e) => setFormData({ ...formData, turno: e.target.value })}
                    >
                        {turnos.map((turno, index) => (
                            <option key={index} value={turno}>{turno}</option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <UploadFiles files={files} setFiles={setFiles} />
                </div>
                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                        Registrar Proyecto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;