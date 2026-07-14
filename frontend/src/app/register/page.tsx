import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Registro institucional - VII JEPA 2026",
  icons: {
    icon: "images/logo/es-undc.png",
  },
};

const SIJE_PROJECT_URL = process.env.NEXT_PUBLIC_SIJE_PROJECT_URL || "https://sije.episundc.pe/proyecto";

const Register = () => {
  redirect(SIJE_PROJECT_URL);
};

export default Register;
