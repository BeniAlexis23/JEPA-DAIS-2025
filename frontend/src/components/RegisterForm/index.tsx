"use client";

import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import Link from "next/link";
import UploadFiles from "../UploadFiles";
import { API_ENDPOINTS } from "@/config/api";

const docentes: string[] = [
  "Seleccione Docente",
  "ALEJOS CUADROS HENRY YURI ",
  "ALMIDON ORTIZ CARLOS ALCIDES",
  "ANGOMA ASTUCURI MIRIAM",
  "ARANGÜENA YLLANES MAGALY ROXANA",
  "ASTO HUAMÁN LEONIDAS",
  "CANDIA QUISPE WILSON WILMAR",
  "CARDENAS LINO CESAR ANDY",
  "COLQUEPISCO PAUCAR NILO TEODORICO",
  "DAGA CHACA MARISOL",
  "DURAN CARHUAMACA AMANDA",
  "FERREYROS YUCRA JAIR EMERSON",
  "HERNANDEZ PEVES JUAN GUSTAVO",
  "HUANCAHUIRE BRACO CLAUDIO ISAIAS",
  "HUARANCCA CONTRERAS PATRICIA PAULINA",
  "LARICO UCHAMACO GUIDO RAÚL",
  "LOPEZ CONDEÑA WILLIAM GIANCARLO",
  "MEDINA URIBE JURY CARLA",
  "OSEDA GAGO DULIO",
  "PACHECO PUMALEQUE ALEX ABELARDO",
  "RAMIREZ PACHECO LUIS ENRIQUE",
  "REYNOSO PALPA JENNY ROCIO",
  "RIVERA CRISOSTOMO RENEE",
  "ROQUE TITO EDWIN",
  "SALCEDO RODAS PERCY ISMAEL",
  "SANCHEZ CASTILLO EDDYE ARTURO",
  "SOTELO VICENTE JOSÉ FERNANDO",
  "VICENTE RAMOS WAGNER ENOC",
  "VILCA PIZARRO JOEL LINDER",
  "DOCENTE EG",
];

const integrantes = ["Seleccione Número Integrantes", "1", "2", "3", "4", "5"];

const disciplinas: { [key: string]: string[] } = {
  "Matemáticas Aplicadas": ["Matemática Básica I", "Matemática Básica II"],
  "Estadística y Probabilidades": [
    "Estadística y Probabilidades",
    "Investigación Operativa II",
  ],
  "Ciencias de la Computación": [
    "Algoritmo y Fundamentos de Programación",
    "Herramientas Digitales",
    "Estructura de Datos",
    "Fundamentos de Base de Datos",
    "Desarrollo Web Full Stack",
    "Data Warehouse",
    "Arquitectura de Software",
    "Testing y Aseguramiento de la Calidad del Software",
  ],
  "Automatización y Sistemas de Control": [
    "Inteligencia Artificial y Sistemas Expertos",
    "Deep Learning",
  ],
  Telecomunicaciones: [
    "Diseño de Redes de Comunicaciones",
    "Configuración de Servidores",
    "Dibujo CAD",
  ],
  "Ingeniería de Sistemas y Comunicaciones": [
    "Diseño de Procesos de Negocio",
    "Seguridad y Criptografía",
    "Gestion de Proyectos",
    "Auditoría de Sistemas",
    "Business Intelligence",
  ],
  "Hardware y Arquitectura de Computadoras": [
    "Internet de las Cosas",
    "Sistemas Digitales",
  ],
  "Otras Ingenierías y Tecnologías": [
    "Comunicación",
    "Desarrollo Personal",
    "Métodos de Estudios Universitario",
    "Derechos Fundamentales de la Persona y la Sociedad",
    "Fisica General",
    "Cultura Ambiental y Resposabilidad Social",
    "Derecho Empresarial",
    "Ética Deontológica",
    "Practicas Pre Profesionales II",
    "Teoría General de Sistemas",
  ],
};

const ciclos = [
  "Seleccione Ciclo Académico",
  "I",
  "II",
  "IV",
  "VI",
  "VIII",
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

// Control de estado del registro desde variables de entorno
const REGISTRO_ABIERTO = process.env.NEXT_PUBLIC_REGISTRO_ABIERTO === 'true';

const RegisterForm = () => {
  const [selectedDisciplina, setSelectedDisciplina] = useState("");

  const [formData, setFormData] = useState(initialFormData);
  const [files, setFiles] = useState<File[]>([]);

  const [nombresIntegrantes, setNombresIntegrantes] = useState<string[]>([]);
  const [inputIntegrante, setInputIntegrante] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ---- VALIDACIONES ----
    if (!formData.docente.trim()) {
      Swal.fire(
        "Campos incompletos",
        "Debe seleccionar un docente asesor.",
        "warning"
      );
      return;
    }

    if (!formData.nombre_proyecto.trim()) {
      Swal.fire(
        "Campos incompletos",
        "Debe ingresar el nombre del proyecto.",
        "warning"
      );
      return;
    }

    if (!formData.num_integrantes.trim()) {
      Swal.fire(
        "Campos incompletos",
        "Debe seleccionar el número de integrantes.",
        "warning"
      );
      return;
    }

    if (nombresIntegrantes.length === 0) {
      Swal.fire(
        "Campos incompletos",
        "Debe ingresar al menos un código universitario de integrante.",
        "warning"
      );
      return;
    }

    if (!formData.disciplina.trim()) {
      Swal.fire(
        "Campos incompletos",
        "Debe seleccionar una disciplina.",
        "warning"
      );
      return;
    }

    if (!formData.curso.trim()) {
      Swal.fire("Campos incompletos", "Debe seleccionar un curso.", "warning");
      return;
    }

    if (!formData.ciclo.trim()) {
      Swal.fire(
        "Campos incompletos",
        "Debe seleccionar un ciclo académico.",
        "warning"
      );
      return;
    }

    if (!formData.turno.trim()) {
      Swal.fire(
        "Campos incompletos",
        "Debe seleccionar un turno y sección.",
        "warning"
      );
      return;
    }

    if (!files || files.length === 0) {
      Swal.fire(
        "Archivo requerido",
        "Debe subir al menos un archivo PDF",
        "warning"
      );
      return;
    }

    // ---- SI TODO ES CORRECTO, ARMAMOS LA DATA ----

    const data = new FormData();
    Object.entries({
      ...formData,
      nombres_integrantes: nombresIntegrantes.join(", "),
    }).forEach(([key, value]) => {
      data.append(key, value);
    });
    files.forEach((file) => data.append("files", file));

    try {
      const res = await axios.post(API_ENDPOINTS.register, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Proyecto registrado con éxito",
        confirmButtonColor: "#2563eb", // azul
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
        confirmButtonColor: "#ef4444", // rojo
      });
    }
  };

  return (
    <div className="shadow-lg rounded-lg p-8 w-full max-w-4xl relative">
      <h1 className="text-4xl font-semibold mb-6 md:pt-20 pt-5 text-center">
        Registro de Proyectos Académicos
      </h1>
      <div className="flex gap-4 mb-6 justify-center">
        <Link
          href="https://drive.google.com/file/d/12GtthXUdCvCd03QdrR0yb2-KyRCzMTIo/view?usp=sharing"
          target="_blank"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Bases
        </Link>
        <Link
          href="https://drive.google.com/drive/folders/1joWrgTmtFmMVCgcMhaWkd8B-YVFfuzAf?usp=sharing"
          target="_blank"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Formatos
        </Link>
      </div>

      <div className="md:col-span-2 my-5">
        <p className="text-center mb-2">Consultas: Ing. Carlos Cayahuallpa - 907625151 | Ing. Beni Luyo - 910922963</p>
      </div>

      {/* Overlay cuando el registro está cerrado */}
      {!REGISTRO_ABIERTO && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-lg flex items-center justify-center z-10 animate-fadeIn">
          <div className="bg-slate-800 border-2 border-yellow-500/50 rounded-2xl shadow-2xl p-10 m-4 max-w-md text-center transform transition-all animate-scaleIn">
            <div className="mb-6">
              <svg
                className="w-24 h-24 mx-auto text-yellow-500 animate-bounce drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-md">
              Registro Pausado
            </h2>
            <p className="text-gray-200 text-lg mb-6 leading-relaxed">
              El periodo de registro será muy pronto.
            </p>
            {/* <div className="bg-blue-600/20 border border-blue-500/40 rounded-lg p-4">
              <p className="text-sm text-blue-100 font-medium">
                Para más información, contactar a los coordinadores
              </p>
            </div> */}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 ${!REGISTRO_ABIERTO ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <div className="flex flex-col">
          <label className="text-sm text-white mb-1">Docente Asesor</label>
          <select
            required
            className="border rounded px-4 py-2 w-full"
            value={formData.docente}
            onChange={(e) =>
              setFormData({ ...formData, docente: e.target.value })
            }
          >
            {docentes.map((docente, index) => (
              <option key={index} value={docente}>
                {docente}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-white mb-1">Nombre del Proyecto</label>
          <input
            required
            type="text"
            placeholder="Implementación de la herramienta..."
            className="border rounded px-4 py-2 w-full"
            value={formData.nombre_proyecto}
            onChange={(e) =>
              setFormData({ ...formData, nombre_proyecto: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-white mb-1">
            Número de Integrantes
          </label>
          <select
            required
            className="border rounded px-4 py-2 w-full"
            value={formData.num_integrantes}
            onChange={(e) =>
              setFormData({ ...formData, num_integrantes: e.target.value })
            }
          >
            {integrantes.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm text-white mb-1">
            Código Universitario de los Integrantes
          </label>
          <div className="border rounded px-4 py-2 w-full min-h-[100px]">
            <div className="flex flex-wrap gap-2 mb-2">
              {nombresIntegrantes.map((nombre, idx) => (
                <span
                  key={idx}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {nombre}
                  <button
                    type="button"
                    onClick={() =>
                      setNombresIntegrantes(
                        nombresIntegrantes.filter((_, i) => i !== idx)
                      )
                    }
                    className="ml-1 text-xs"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder=" Ingrese código del estudiante y presione Enter"
              className="w-full border rounded outline-none"
              value={inputIntegrante}
              onChange={(e) => setInputIntegrante(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputIntegrante.trim()) {
                  e.preventDefault();
                  setNombresIntegrantes([
                    ...nombresIntegrantes,
                    inputIntegrante.trim(),
                  ]);
                  setInputIntegrante("");
                }
              }}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-white mb-1">Disciplina</label>
          <select
            required
            className="border rounded px-4 py-2 w-full"
            value={formData.disciplina}
            onChange={(e) => {
              setSelectedDisciplina(e.target.value);
              setFormData({
                ...formData,
                disciplina: e.target.value,
                curso: "",
              });
            }}
          >
            <option value="">Seleccione Disciplina</option>
            {Object.keys(disciplinas).map((disc, index) => (
              <option key={index} value={disc}>
                {disc}
              </option>
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
            onChange={(e) =>
              setFormData({ ...formData, curso: e.target.value })
            }
          >
            <option value="">Seleccione Curso</option>
            {selectedDisciplina &&
              disciplinas[selectedDisciplina].map((curso, index) => (
                <option key={index} value={curso}>
                  {curso}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-white mb-1">Ciclo Académico</label>
          <select
            required
            className="border rounded px-4 py-2 w-full"
            value={formData.ciclo}
            onChange={(e) =>
              setFormData({ ...formData, ciclo: e.target.value })
            }
          >
            {ciclos.map((ciclo, index) => (
              <option key={index} value={ciclo}>
                {ciclo}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-white mb-1">Turno y Sección</label>
          <select
            required
            className="border rounded px-4 py-2 w-full"
            value={formData.turno}
            onChange={(e) =>
              setFormData({ ...formData, turno: e.target.value })
            }
          >
            {turnos.map((turno, index) => (
              <option key={index} value={turno}>
                {turno}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <UploadFiles files={files} setFiles={setFiles} />
        </div>
        <div className="md:col-span-2">
          {/*<p className="text-center mb-2">Tiempo Cumplido</p>
                    <div className="w-full text-center bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
                        Registro Cerrado
                    </div>*/}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Registrar Proyecto
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
