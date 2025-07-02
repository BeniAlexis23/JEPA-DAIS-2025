"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getImagePrefix } from "@/utils/utils";

const Upgrade = () => {
  return (
    <section className="md:py-40 py-20" id="upgrade">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="grid lg:grid-cols-2 sm:gap-0 gap-10 items-center">
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary sm:text-28 text-18 mb-3">Formulario de Registro</p>
            <h2 className="text-white sm:text-40 text-30  font-medium mb-5">
              Revisa bien las bases y completa tu registro
            </h2>
            <p className="text-muted text-opacity-60 text-18 mb-7 text-justify lg:mr-12">
              Las fechas de inscripción son desde el 14 de julio al 20 de julio del 2025 hasta las 23:59 horas.
              (Tener cuenta que después de la fecha y hora establecida, no se aceptará más inscripciones.)
            </p>
            <div className="flex items-center md:justify-start justify-center gap-8">
              <Link href={"/register"} className="bg-primary border border-primary rounded-lg text-21 font-medium hover:bg-transparent hover:text-primary text-darkmode py-2 px-7 z-50">
                Formulario
              </Link>
            </div>
          </motion.div>
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="">
              <Image
                src={`${getImagePrefix()}images/upgrade/register_2.svg`}
                alt="image"
                width={625}
                height={580}
                className="-mr-5"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Upgrade;