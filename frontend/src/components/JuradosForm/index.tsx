"use client";

import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import Link from "next/link";
import { API_ENDPOINTS } from "@/config/api";

const HORARIO_DISPONIBLE = "Solo disponible turno mañana de 9:00 AM a 1:00 PM";

const initialFormData = {
  nombres: "",
  apellidos: "",
  celular: "",
  correo: "",
  horario: HORARIO_DISPONIBLE,
};


const fieldClass =
  "h-12 w-full rounded-xl border border-slate-600/70 bg-deepSlate/95 px-4 text-16 text-slate-50 outline-none transition placeholder:text-slate-400 focus:border-secondary focus:bg-slate-900 focus:ring-2 focus:ring-secondary/25 disabled:cursor-not-allowed disabled:opacity-60 [color-scheme:dark]";
const labelClass = "mb-2 text-sm font-semibold text-slate-200";

const JuradosForm = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(API_ENDPOINTS.jurados, formData);

      Swal.fire({
        icon: "success",
        title: "Jurado registrado con éxito",
        confirmButtonColor: "#0ea5e9",
      });
      setFormData(initialFormData);
    } catch (err) {
      console.error(err);
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || "Ocurrió un problema al enviar los datos."
        : "Ocurrió un problema al enviar los datos.";

      Swal.fire({
        icon: "error",
        title: "Error al registrar jurado",
        text: message,
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <section className="relative w-full overflow-hidden px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-14 font-semibold uppercase tracking-[0.22em] text-secondary">Convocatoria 2026</p>
          <h1 className="text-32 font-semibold text-white sm:text-44">Registro de Jurados Evaluadores</h1>
          <p className="mx-auto mt-4 max-w-3xl text-16 leading-7 text-slate-300 sm:text-18">
            Inscribe tu disponibilidad para participar como jurado evaluador en la VII Jornada de Exposición de Productos Académicos.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-soft-blue backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="mb-8 grid gap-4 border-b border-white/10 pb-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-24 font-semibold text-white">Datos del jurado</h2>
              <p className="mt-2 text-15 leading-6 text-slate-400">
                Completa tus datos de contacto y el horario en el que puedes evaluar proyectos.
              </p>
            </div>
            <Link
              href="https://drive.google.com/file/d/1lGBomBkEzs6XhFz1L238AhoyyMliAlWT/view?usp=sharing"
              target="_blank"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center text-16 font-semibold text-slate-100 transition hover:border-secondary hover:text-secondary"
            >
              Bases
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="flex flex-col">
              <label className={labelClass}>Nombres</label>
              <input
                required
                type="text"
                placeholder="Gianmarcos Kevin"
                className={fieldClass}
                value={formData.nombres}
                onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Apellidos</label>
              <input
                required
                type="text"
                placeholder="Arias Anchante"
                className={fieldClass}
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Celular</label>
              <input
                required
                type="tel"
                inputMode="numeric"
                placeholder="963021256"
                className={fieldClass}
                value={formData.celular}
                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Correo de contacto</label>
              <input
                required
                type="email"
                placeholder="empresa@gmail.com"
                className={fieldClass}
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              />
            </div>

            <div className="flex flex-col lg:col-span-2">
              <label className={labelClass}>Horario de disponibilidad</label>
              <div className="rounded-xl border border-slate-600/70 bg-deepSlate/95 px-4 py-3 text-16 leading-7 text-slate-50">
                {HORARIO_DISPONIBLE}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="mb-5 rounded-2xl border border-secondary/20 bg-secondary/10 px-5 py-4 text-15 leading-6 text-slate-200">
                La coordinación usará estos datos para confirmar tu participación y enviarte un certificado.
              </div>
              <button
                type="submit"
                className="w-full rounded-xl border border-primary bg-primary px-7 py-4 text-18 font-semibold text-white shadow-soft-blue transition hover:bg-secondary hover:text-darkmode focus:outline-none focus:ring-2 focus:ring-secondary/40"
              >
                Registrar jurado
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JuradosForm;

