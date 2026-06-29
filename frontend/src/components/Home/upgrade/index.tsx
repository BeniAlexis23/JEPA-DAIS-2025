"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getImagePrefix } from "@/utils/utils";

const Upgrade = () => {
  return (
    <section className="py-20 lg:py-28" id="upgrade">
      <div className="container mx-auto px-4 lg:max-w-screen-xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div whileInView={{ y: 0, opacity: 1 }} initial={{ y: 24, opacity: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-3 text-16 font-semibold uppercase tracking-[0.2em] text-secondary">Formulario de registro</p>
            <h2 className="mb-5 text-30 font-semibold text-white sm:text-40">
              Participa en la <span className="text-primary">convocatoria 2026</span>
            </h2>
            <p className="mb-8 text-17 leading-8 text-slate-300 lg:text-18">
              Revisa las bases oficiales, prepara los archivos solicitados y completa el formulario con los datos del proyecto. El registro está diseñado para que equipos y docentes asesores puedan enviar su información de forma ordenada.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/register" className="rounded-xl border border-primary bg-primary px-7 py-3 text-center text-18 font-semibold text-white shadow-soft-blue transition hover:bg-secondary hover:text-darkmode">
                Registrar proyecto
              </Link>
              <Link href="/jurados" className="rounded-xl border border-white/15 bg-white/5 px-7 py-3 text-center text-18 font-semibold text-slate-100 transition hover:border-secondary hover:text-secondary">
                Registro de jurados
              </Link>
            </div>
          </motion.div>
          <motion.div whileInView={{ y: 0, opacity: 1 }} initial={{ y: 24, opacity: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="relative mx-auto max-w-[560px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-2 shadow-soft-blue">
              <Image src={`${getImagePrefix()}images/upgrade/form.webp`} alt="Formulario de registro académico" width={625} height={580} className="h-auto w-full rounded-xl object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Upgrade;
