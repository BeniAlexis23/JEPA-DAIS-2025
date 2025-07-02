"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getImagePrefix } from "@/utils/utils";

const Work = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  };

  const bottomAnimation = {
    initial: { y: "100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  };

  const services = [
    {
      icon: "images/icons/icon-consulting.svg",
      text: "Ciencias Naturales",
    },
    {
      icon: "images/icons/icon-blockchain.svg",
      text: "Ingeniería y Tecnología",
    },
  ];

  return (
    <section className="lg:pt-40 lg:pb-36 pt-28" id="work">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
          <motion.div
            {...bottomAnimation}
            className="lg:col-span-7 col-span-1 order-2 lg:order-1"
          >
            <h2 className="text-30 sm:text-40 text-white font-medium text-center lg:text-left">
              Acerca de nuestro <span className="text-primary">trabajo</span>
            </h2>
            <p className="text-18 lg:text-20 mt-5 text-white text-justify">
              <span>La Jornada de Exposición de Productos Académicos es una actividad académica promovida
                por el Departamento Académico de Ingeniería de Sistemas de la Facultad de Ingeniería de la UNDC, con el objetivo de
                visibilizar los trabajos desarrollados por los estudiantes durante su proceso formativo. Este espacio permite a los
                estudiantes presentar públicamente proyectos, prototipos, investigaciones y soluciones tecnológicas, aplicando lo
                aprendido en el aula a contextos reales. La jornada fomenta el pensamiento crítico, la innovación y la comunicación
                efectiva, fortaleciendo las competencias profesionales desde las primeras etapas de la carrera.</span>
            </p>
            <div className="grid md:grid-cols-2 gap-7 mt-11 justify-center lg:justify-start">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-5">
                  <div className="px-5 py-5 bg-light_grey bg-opacity-30 rounded-full">
                    <Image
                      src={`${getImagePrefix()}${service.icon}`}
                      alt={`${service.text} icon`}
                      width={40}
                      height={40}
                    />
                  </div>
                  <p className="text-24 text-muted">{service.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...TopAnimation} className="lg:col-span-5 col-span-1 order-1 lg:order-2">
            <div className="w-full flex justify-center lg:justify-end mt-9">
              <Image
                src={`${getImagePrefix()}images/work/vi-jornada.png`}
                alt="image"
                width={600}
                height={425}
                className="w-full h-auto max-w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Work;