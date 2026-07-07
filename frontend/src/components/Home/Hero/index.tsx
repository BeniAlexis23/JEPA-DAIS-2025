"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CardSlider from "./slider";
import { getImagePrefix } from "@/utils/utils";

const Hero = () => {
  const leftAnimation = {
    initial: { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 24, opacity: 0 },
    transition: { duration: 0.6 },
  };

  const rightAnimation = {
    initial: { y: 32, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 32, opacity: 0 },
    transition: { duration: 0.7, delay: 0.1 },
  };

  return (
    <section className="relative overflow-hidden bg-site-radial pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-32" id="main-banner">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />
      <div className="container relative z-10 mx-auto px-4 lg:max-w-screen-xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <motion.div {...leftAnimation} className="lg:col-span-6">
            <div className="mb-6 inline-flex items-center rounded-full border border-secondary/25 bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
              Edición 2026 · Escuela Profesional de Ingeniería de Sistemas
            </div>
            <h1 className="max-w-3xl text-center text-44 font-semibold text-white sm:text-54 lg:text-left lg:text-70">
              VII Jornada de <span className="text-secondary">Exposición</span> de Productos <span className="text-primary">Académicos</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-center text-18 leading-8 text-slate-300 lg:mx-0 lg:text-left">
              Un encuentro para presentar proyectos, prototipos e investigaciones desarrolladas por estudiantes de Ingeniería de Sistemas.
            </p>
            <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <Link href="/#upgrade" className="rounded-xl border border-primary bg-primary px-7 py-3 text-center text-18 font-semibold text-white shadow-soft-blue transition hover:bg-secondary hover:text-darkmode">
                Registro
              </Link>
              <Link href="https://drive.google.com/file/d/1lGBomBkEzs6XhFz1L238AhoyyMliAlWT/view?usp=sharing" target="_blank" className="rounded-xl border border-white/15 bg-white/5 px-7 py-3 text-center text-18 font-semibold text-slate-100 transition hover:border-secondary hover:text-secondary">
                Bases
              </Link>
            </div>
          </motion.div>

          <motion.div {...rightAnimation} className="lg:col-span-6">
            <div className="relative mx-auto w-full max-w-[640px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-soft-blue">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={`${getImagePrefix()}images/hero/IMG_9932.webp`}
                  alt="Estudiantes de Ingeniería de Sistemas presentando proyectos académicos"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkmode/45 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-darkmode/75 p-3 text-center backdrop-blur">
                <div>
                  <p className="text-18 font-semibold text-white">VII</p>
                  <p className="text-xs text-slate-300">Edición</p>
                </div>
                <div>
                  <p className="text-18 font-semibold text-white">2026 - I</p>
                  <p className="text-xs text-slate-300">Convocatoria</p>
                </div>
                <div>
                  <p className="text-18 font-semibold text-white">EPIS</p>
                  <p className="text-xs text-slate-300">UNDC</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <CardSlider />
      </div>
    </section>
  );
};

export default Hero;
