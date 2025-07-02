"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { getImagePrefix } from "@/utils/utils";

const TimeLine = () => {


  return (
    <section className="md:pt-40 pt-9" id="development">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-16 px-4">
        <div className="text-center">
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white text-30 sm:text-40 font-medium lg:text-left mb-20">
              Cronograma <span className="text-primary">académico</span>
            </h2>
          </motion.div>
          <motion.div
            whileInView={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center">
              <div>
                <Image
                  src={`${getImagePrefix()}images/timeline/cronograma-vjepa.png`}
                  alt="image"
                  width={1220}
                  height={1000}
                  className="w-80% mx-auto"
                />
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TimeLine;