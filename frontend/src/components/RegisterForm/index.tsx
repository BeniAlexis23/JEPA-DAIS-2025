"use client";

import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import Link from "next/link";
import UploadFiles from "../UploadFiles";
import { API_ENDPOINTS } from "@/config/api";

const docentes: string[] = [
  "Seleccione Docente",
  "ALMIDON ORTIZ CARLOS ALCIDES",
  "ANGOMA ASTUCURI MIRIAM",
  "ARANGÜENA YLLANES MAGALY ROXANA",
  "ASTO HUAMÁN LEONIDAS",
  "BARRERA CAJACHAGUA MARIA LAURA",
  "CANDIA QUISPE WILSON WILMAR",
  "CARDENAS LINO CESAR ANDY",
  "CENTENO CACERES DAVID",
  "DAGA CHACA MARISOL",
  "DURAN CARHUAMACA AMANDA",
  "ECHACCAYA ANYOSA JHONATHAN EDILFONSO",
  "FERREYROS YUCRA JAIR EMERSON",
  "HERNANDEZ PEVES JUAN GUSTAVO",
  "HUANCAHUIRE BRACO CLAUDIO ISAIAS",
  "HUARANCCA CONTRERAS PATRICIA PAULINA",
  "LARICO UCHAMACO GUIDO RAÚL",
  "OSEDA GAGO DULIO",
  "PACHECO PUMALEQUE ALEX ABELARDO",
  "QUISPE AGUILAR MAX",
  "RAMIREZ PACHECO LUIS ENRIQUE",
  "REYNOSO PALPA JENNY ROCIO",
  "ROQUE TITO EDWIN",
  "SALCEDO RODAS PERCY ISMAEL",
  "SIERRA MANUEL ANTHONY ALEXIS",
  "SOTELO VICENTE JOSÉ FERNANDO",
  "TORRES JIMENEZ ELEAZAR OBED",
  "VICENTE RAMOS WAGNER ENOC",
  "VILCA PIZARRO JOEL LINDER",
  "ZAMUDIO ESPINOZA ZULMA GISELA",
  "DOCENTE EG",
];

const integrantes = ["Seleccione Número Integrantes", "1", "2", "3"];

const disciplinas: { [key: string]: string[] } = {
  "Ciencias Básicas, Matemáticas y Modelamiento": [
    "Matemática Básica I",
    "Matemática Básica II",
    "Física General",
    "Matemática Superior",
    "Investigación Operativa I",
    "Estadística Inferencial",
    "Ingeniería de Costos",
  ],
  "Programación y Desarrollo de Software": [
    "Algoritmo y Fundamentos de Programación",
    "Estructura de Datos",
    "Programación Orientada a Objetos",
    "Desarrollo de Aplicaciones Móviles",
    "Desarrollo de Aplicaciones con DevOps",
    "Programación Funcional y Reactiva",
  ],
  "Redes, Arquitectura y Ciberseguridad": [
    "Introducción al Networking",
    "Arquitectura de Computadoras",
    "Administración de Redes de Comunicaciones",
    "Ciberseguridad",
  ],
  "Gestión de Datos, Inteligencia Artificial y Analítica": [
    "Administración de Bases de Datos",
    "Big Data",
    "Machine Learning",
    "Inteligencia de Negocios",
    "Sistemas de Información Geográfica",
  ],
  "Ingeniería de Sistemas, Innovación y Herramientas": [
    "Teoría de General de Sistemas",
    "Herramientas Digitales",
    "Dibujo CAD",
    "Emprendimiento e Innovación",
    "Simulación de Sistemas",
  ],
};

const ciclos = ["Seleccione Ciclo Académico", "I", "II", "III", "V", "VII", "IX"];

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
  "Noche - B2",
];

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

const REGISTRO_ABIERTO = process.env.NEXT_PUBLIC_REGISTRO_ABIERTO === "false";

const fieldClass =
  "h-12 w-full rounded-xl border border-slate-600/70 bg-deepSlate/95 px-4 text-16 text-slate-50 outline-none transition placeholder:text-slate-400 focus:border-secondary focus:bg-slate-900 focus:ring-2 focus:ring-secondary/25 disabled:cursor-not-allowed disabled:opacity-60 [color-scheme:dark]";
const labelClass = "mb-2 text-sm font-semibold text-slate-200";

const RegisterForm = () => {
  const [selectedDisciplina, setSelectedDisciplina] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [files, setFiles] = useState<File[]>([]);
  const [nombresIntegrantes, setNombresIntegrantes] = useState<string[]>([]);
  const [inputIntegrante, setInputIntegrante] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.docente.trim()) {
      Swal.fire("Campos incompletos", "Debe seleccionar un docente asesor.", "warning");
      return;
    }

    if (!formData.nombre_proyecto.trim()) {
      Swal.fire("Campos incompletos", "Debe ingresar el nombre del proyecto.", "warning");
      return;
    }

    if (!formData.num_integrantes.trim()) {
      Swal.fire("Campos incompletos", "Debe seleccionar el número de integrantes.", "warning");
      return;
    }

    if (nombresIntegrantes.length === 0) {
      Swal.fire("Campos incompletos", "Debe ingresar al menos un código universitario de integrante.", "warning");
      return;
    }

    if (!formData.disciplina.trim()) {
      Swal.fire("Campos incompletos", "Debe seleccionar una disciplina.", "warning");
      return;
    }

    if (!formData.curso.trim()) {
      Swal.fire("Campos incompletos", "Debe seleccionar un curso.", "warning");
      return;
    }

    if (!formData.ciclo.trim()) {
      Swal.fire("Campos incompletos", "Debe seleccionar un ciclo académico.", "warning");
      return;
    }

    if (!formData.turno.trim()) {
      Swal.fire("Campos incompletos", "Debe seleccionar un turno y sección.", "warning");
      return;
    }

    if (!files || files.length === 0) {
      Swal.fire("Archivo requerido", "Debe subir al menos un archivo PDF", "warning");
      return;
    }

    const data = new FormData();
    Object.entries({
      ...formData,
      nombres_integrantes: nombresIntegrantes.join(", "),
    }).forEach(([key, value]) => {
      data.append(key, value);
    });
    files.forEach((file) => data.append("files", file));

    try {
      await axios.post(API_ENDPOINTS.register, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Proyecto registrado con éxito",
        confirmButtonColor: "#0ea5e9",
      });
      setFormData(initialFormData);
      setFiles([]);
      setSelectedDisciplina("");
      setNombresIntegrantes([]);
      setInputIntegrante("");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error al registrar el proyecto",
        text: "Ocurrió un problema al enviar los datos.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <section className="relative w-full overflow-hidden px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-14 font-semibold uppercase tracking-[0.22em] text-secondary">Convocatoria 2026 - I</p>
          <h1 className="text-32 font-semibold text-white sm:text-44">Registro de Proyectos Académicos</h1>
          <p className="mx-auto mt-4 max-w-3xl text-16 leading-7 text-slate-300 sm:text-18">
            Completa los datos del equipo, selecciona la línea académica y adjunta los documentos solicitados para participar en la VII Jornada.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-soft-blue backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="mb-8 grid gap-4 border-b border-white/10 pb-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-24 font-semibold text-white">Datos del proyecto</h2>
              <p className="mt-2 text-15 leading-6 text-slate-400">
                Los campos son obligatorios. Puedes agregar códigos universitarios presionando Enter.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="https://drive.google.com/file/d/1pVKRptVX5PeC5yl8zykOeKQNYb_Qc8n3/view?usp=sharing"
                target="_blank"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center text-16 font-semibold text-slate-100 transition hover:border-secondary hover:text-secondary"
              >
                Bases
              </Link>
              <Link
                href="https://drive.google.com/drive/folders/1joWrgTmtFmMVCgcMhaWkd8B-YVFfuzAf?usp=sharing"
                target="_blank"
                className="rounded-xl border border-primary bg-primary px-5 py-3 text-center text-16 font-semibold text-white transition hover:bg-secondary hover:text-darkmode"
              >
                Formatos
              </Link>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-secondary/20 bg-secondary/10 px-5 py-4 text-center text-15 leading-6 text-slate-200">
            Consultas: Ing. Gianmarcos Arias - 954030965 | Ing. Beni Luyo - 910922963
          </div>

          {!REGISTRO_ABIERTO && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-darkmode/85 p-4 backdrop-blur-md animate-fadeIn">
              <div className="max-w-md rounded-2xl border border-warning/40 bg-deepSlate p-8 text-center shadow-2xl animate-scaleIn">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-warning/15 text-warning">
                  <svg className="h-11 w-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="mb-3 text-32 font-semibold text-white">Registro pausado</h2>
                <p className="text-17 leading-7 text-slate-300">El periodo de registro será habilitado próximamente.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className={`grid grid-cols-1 gap-5 lg:grid-cols-2 ${!REGISTRO_ABIERTO ? "opacity-40 pointer-events-none" : ""}`}>
            <div className="flex flex-col">
              <label className={labelClass}>Docente asesor</label>
              <select required className={fieldClass} value={formData.docente} onChange={(e) => setFormData({ ...formData, docente: e.target.value })}>
                {docentes.map((docente, index) => (
                  <option key={index} value={docente}>{docente}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Nombre del proyecto</label>
              <input required type="text" placeholder="Implementación de una solución tecnológica..." className={fieldClass} value={formData.nombre_proyecto} onChange={(e) => setFormData({ ...formData, nombre_proyecto: e.target.value })} />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Número de integrantes</label>
              <select required className={fieldClass} value={formData.num_integrantes} onChange={(e) => setFormData({ ...formData, num_integrantes: e.target.value })}>
                {integrantes.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col lg:row-span-2">
              <label className={labelClass}>Códigos universitarios</label>
              <div className="min-h-[124px] rounded-xl border border-slate-600/70 bg-deepSlate/95 px-4 py-3 transition focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/25">
                <div className="mb-3 flex flex-wrap gap-2">
                  {nombresIntegrantes.map((nombre, idx) => (
                    <span key={idx} className="flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1.5 text-sm font-medium text-secondary">
                      {nombre}
                      <button type="button" onClick={() => setNombresIntegrantes(nombresIntegrantes.filter((_, i) => i !== idx))} className="text-xs text-slate-200 transition hover:text-white" aria-label={`Quitar integrante ${nombre}`}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Ingrese código y presione Enter"
                  className="w-full bg-transparent text-16 text-slate-50 outline-none placeholder:text-slate-400"
                  value={inputIntegrante}
                  onChange={(e) => setInputIntegrante(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && inputIntegrante.trim()) {
                      e.preventDefault();
                      setNombresIntegrantes([...nombresIntegrantes, inputIntegrante.trim()]);
                      setInputIntegrante("");
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Disciplina</label>
              <select
                required
                className={fieldClass}
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
              <label className={labelClass}>Curso</label>
              <select required className={fieldClass} value={formData.curso} disabled={!selectedDisciplina} onChange={(e) => setFormData({ ...formData, curso: e.target.value })}>
                <option value="">Seleccione Curso</option>
                {selectedDisciplina && disciplinas[selectedDisciplina].map((curso, index) => (
                  <option key={index} value={curso}>{curso}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Ciclo académico</label>
              <select required className={fieldClass} value={formData.ciclo} onChange={(e) => setFormData({ ...formData, ciclo: e.target.value })}>
                {ciclos.map((ciclo, index) => (
                  <option key={index} value={ciclo}>{ciclo}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Turno y sección</label>
              <select required className={fieldClass} value={formData.turno} onChange={(e) => setFormData({ ...formData, turno: e.target.value })}>
                {turnos.map((turno, index) => (
                  <option key={index} value={turno}>{turno}</option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <UploadFiles files={files} setFiles={setFiles} />
            </div>

            <div className="lg:col-span-2">
              <button type="submit" className="w-full rounded-xl border border-primary bg-primary px-7 py-4 text-18 font-semibold text-white shadow-soft-blue transition hover:bg-secondary hover:text-darkmode focus:outline-none focus:ring-2 focus:ring-secondary/40">
                Registrar proyecto
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;

