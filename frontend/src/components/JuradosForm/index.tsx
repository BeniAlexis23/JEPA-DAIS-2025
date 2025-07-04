"use client";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import Link from "next/link";

const initialFormData = {
    nombres: "",
    apellidos: "",
    celular: "",
    correo: "",
    horario: ""
};

const horarios = [
    "Seleccione horario",
    "Mañana - 8:00 - 13:00",
    "Tarde - 14:00 - 18:00",
    "Ambos turnos"
]

const JuradosForm = () => {

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("nombres", formData.nombres);
        data.append("apellidos", formData.apellidos);
        data.append("celular", formData.celular);
        data.append("correo", formData.correo);
        data.append("horario", formData.horario);

        try {
            const res = await axios.post("https://api-register-bk.episundc.pe/api/jurados", data, { //dev environment: http://localhost:3001/api/jurados
                headers: {
                    "Content-Type": "application/json",
                },
            });

            Swal.fire({
                icon: "success",
                title: "Jurado registrado con éxito",
                confirmButtonColor: "#2563eb",
            });
            setFormData(initialFormData);

        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error al registrar Jurado",
                text: "Ocurrió un problema al enviar los datos.",
                confirmButtonColor: "#ef4444",
            });
        }
    };

    return (
        <div className="shadow-lg rounded-lg p-8 w-full max-w-4xl">
            <h1 className="text-4xl font-semibold mb-6 md:pt-20 pt-5 text-center">Registro de Jurados Evaluador de Proyectos</h1>
            <div className="flex gap-4 mb-6 justify-start">
                <Link href="https://drive.google.com/file/d/1QR3EZHhhIVib2lFS0Nhpt8ZsK7upqN6v/view?usp=sharing" target="_blank" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                    Bases
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex flex-col">
                    <label className="text-sm text-white mb-1">Nombres</label>
                    <input required type="text" placeholder="Gianmarcos Kevin"
                        className="border rounded px-4 py-2 w-full"
                        value={formData.nombres}
                        onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm text-white mb-1">Apellidos</label>
                    <input required type="text" placeholder="Arias Anchante"
                        className="border rounded px-4 py-2 w-full"
                        value={formData.apellidos}
                        onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm text-white mb-1">Celular</label>
                    <input required type="text" placeholder="963021256"
                        className="border rounded px-4 py-2 w-full"
                        value={formData.celular}
                        onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm text-white mb-1">Correo a donde se enviara la invitación</label>
                    <input required type="email" placeholder="empresa@gmail.com"
                        className="border rounded px-4 py-2 w-full"
                        value={formData.correo}
                        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm text-white mb-1">Horario de disponibilidad</label>
                    <select required className="border rounded px-4 py-2 w-full"
                        value={formData.horario}
                        onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                    >
                        {horarios.map((horario, index) => (
                            <option key={index} value={horario}>{horario}</option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                        Registrar Jurado
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JuradosForm;