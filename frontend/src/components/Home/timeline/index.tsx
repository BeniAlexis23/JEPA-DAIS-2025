"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { getImagePrefix } from "@/utils/utils";

const TimeLine = () => {
  return (
    <section className="py-20 lg:py-28" id="development">
      <div className="container mx-auto px-4 lg:max-w-screen-xl">
        <motion.div whileInView={{ y: 0, opacity: 1 }} initial={{ y: 24, opacity: 0 }} transition={{ duration: 0.6 }} className="mb-10 max-w-3xl">
          <p className="mb-3 text-16 font-semibold uppercase tracking-[0.2em] text-secondary">Cronograma</p>
          <h2 className="text-30 font-semibold text-white sm:text-40">
            Cronograma <span className="text-primary">académico 2026</span>
          </h2>
        </motion.div>
        <motion.div whileInView={{ scale: 1, opacity: 1 }} initial={{ scale: 0.96, opacity: 0 }} transition={{ duration: 0.6 }}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-3 shadow-soft-blue">
            <Image src={`${getImagePrefix()}images/timeline/cronograma.jpg`} alt="Cronograma académico de la jornada" width={1220} height={1000} className="mx-auto h-auto w-full rounded-xl object-contain" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimeLine;
