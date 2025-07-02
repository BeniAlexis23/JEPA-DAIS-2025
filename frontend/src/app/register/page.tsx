import { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
    title: "DAIS - FI",
    icons: {
        icon: "images/logo/es-undc.png",
    },
};

const Register = () => {

    return (
        <main className="min-h-screen flex items-center justify-center mt-12">
            <RegisterForm />
        </main>
    )
}

export default Register;