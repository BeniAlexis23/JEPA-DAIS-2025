"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { getImagePrefix } from "@/utils/utils";

const photos = [
  "IMG_6067.webp",
  "IMG_6223.webp",
  "IMG_6278.webp",
  "IMG_6139.webp",
  "IMG_6247.webp",
  "IMG_6307.webp",
  "IMG_6369.webp",
  "IMG_6285.webp",
];

const Portfolio = () => {
  return (
    <section className="py-20 lg:py-28" id="portfolio">
      <div className="container mx-auto px-4 lg:max-w-screen-xl">
        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="mb-3 text-16 font-semibold uppercase tracking-[0.2em] text-secondary">Galería</p>
          <h2 className="text-30 font-semibold text-white sm:text-40">
            Momentos de la <span className="text-primary">jornada académica</span>
          </h2>
          <p className="mt-5 text-17 leading-8 text-slate-300">
            Registro visual de la participación estudiantil, presentaciones y espacios de evaluación de ediciones anteriores.
          </p>
        </motion.div>

        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {photos.map((photo) => (
              <article
                key={photo}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_18px_60px_-36px_rgba(14,165,233,0.5)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={`${getImagePrefix()}images/portfolio/${photo}`}
                    alt="Galería de la Jornada de Exposición de Productos Académicos"
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-white/10 bg-darkmode/80 p-5">
                  <p className="text-18 font-semibold text-white">JEPA</p>
                  <p className="mt-1 text-sm text-slate-300">Archivo académico</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
