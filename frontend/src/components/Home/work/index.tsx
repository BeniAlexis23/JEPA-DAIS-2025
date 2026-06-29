"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getImagePrefix } from "@/utils/utils";

const Work = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: 24, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 },
    transition: { duration: 0.6, delay: 0.2 },
  };

  const bottomAnimation = {
    initial: { y: 24, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 },
    transition: { duration: 0.6 },
  };

  const services = [
    { icon: "images/icons/icon-consulting.svg", text: "Ciencias naturales" },
    { icon: "images/icons/icon-blockchain.svg", text: "Ingeniería y tecnología" },
  ];

  return (
    <section className="py-20 lg:py-28" id="work">
      <div className="container mx-auto px-4 lg:max-w-screen-xl">
        <div ref={ref} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <motion.div {...bottomAnimation} className="order-2 lg:order-1 lg:col-span-7">
            <p className="mb-3 text-16 font-semibold uppercase tracking-[0.2em] text-secondary">Acerca de la jornada</p>
            <h2 className="text-center text-30 font-semibold text-white sm:text-40 lg:text-left">
              Un espacio para convertir el aprendizaje en <span className="text-primary">evidencia pública</span>
            </h2>
            <p className="mt-6 text-17 leading-8 text-slate-300 lg:text-18">
              La Jornada de Exposición de Productos Académicos, promovida por el Departamento Académico de Ingeniería de Sistemas de la Facultad de Ingeniería de la UNDC, visibiliza proyectos, prototipos, investigaciones y soluciones tecnológicas desarrolladas por estudiantes durante su formación.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/15">
                    <Image src={`${getImagePrefix()}${service.icon}`} alt={`${service.text} icon`} width={34} height={34} />
                  </div>
                  <p className="text-18 font-semibold text-white">{service.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...TopAnimation} className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative mx-auto max-w-[520px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-2 shadow-soft-blue">
              <Image src={`${getImagePrefix()}images/work/acerca.webp`} alt="Presentación de productos académicos" width={600} height={425} className="h-auto w-full rounded-xl object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Work;
