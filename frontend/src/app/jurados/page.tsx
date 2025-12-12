import { Metadata } from "next";
import JuradosForm from "@/components/JuradosForm";

export const metadata: Metadata = {
    title: "FI - EPIS",
    icons: {
        icon: "images/logo/es-undc.png",
    },
};

const Jurados = () => {

    return (
        <main className="min-h-screen flex items-center justify-center">
            <JuradosForm />
        </main>
    )
}

export default Jurados;