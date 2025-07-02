"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CardSlider from "./slider";
import { getImagePrefix } from "@/utils/utils";

const Hero = () => {

  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section
      className="relative md:pt-40 md:pb-28 py-20 overflow-hidden z-1"
      id="main-banner"
    >
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="grid grid-cols-12 lg:pb-40 lg:pt-0 pt-20 pb-20">
          <motion.div {...leftAnimation} className="lg:col-span-5 col-span-12">

            <h1 className="font-medium lg:text-76 md:text-70 text-54 lg:text-start text-center text-white mb-10">
              V Jornada de <span className="text-primary">Exposición</span> de Productos{" "}
              <span className="text-primary">Académicos</span>
            </h1>
            <div className="flex items-center md:justify-start justify-center gap-8">
              <Link href={"https://drive.google.com/file/d/1QR3EZHhhIVib2lFS0Nhpt8ZsK7upqN6v/view?usp=sharing"} target="_blank" className="bg-transparent border border-primary rounded-lg text-21 font-medium hover:bg-primary hover:text-darkmode text-primary py-2 px-7">
                Bases
              </Link>
              <Link href={"/#upgrade"} className="bg-primary border border-primary rounded-lg text-21 font-medium hover:bg-transparent hover:text-primary text-darkmode py-2 px-7 z-50">
                Registro
              </Link>
            </div>
          </motion.div>

          <motion.div
            {...rightAnimation}
            className="col-span-7 lg:block hidden"
          >
            <div className="w-full max-w-[800px] aspect-[4/3]">
              <Image
                src={`${getImagePrefix()}images/hero/programacion.jpg`}
                alt="Banner"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
        <CardSlider />
      </div>
      <div className="absolute w-50 h-50 bg-gradient-to-bl from-tealGreen from-50% to-charcoalGray to-60% blur-400 rounded-full -top-64 -right-14 -z-1"></div>

    </section>
  );
};

export default Hero;