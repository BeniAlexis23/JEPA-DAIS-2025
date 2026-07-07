import { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Registro de Proyectos - VII JEPA 2026",
  icons: {
    icon: "images/logo/es-undc.png",
  },
};

const Register = () => {
  return (
    <main className="min-h-screen bg-site-radial pt-28 lg:pt-32">
      <RegisterForm />
    </main>
  );
};

export default Register;
