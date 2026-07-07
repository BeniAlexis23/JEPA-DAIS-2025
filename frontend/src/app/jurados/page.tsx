import { Metadata } from "next";
import JuradosForm from "@/components/JuradosForm";

export const metadata: Metadata = {
  title: "Registro de Jurados - VII JEPA 2026",
  icons: {
    icon: "images/logo/es-undc.png",
  },
};

const Jurados = () => {
  return (
    <main className="min-h-screen bg-site-radial pt-28 lg:pt-32">
      <JuradosForm />
    </main>
  );
};

export default Jurados;
