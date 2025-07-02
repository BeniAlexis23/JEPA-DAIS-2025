"use client";
import { motion } from "framer-motion";

const Portfolio = () => {
  return (
    <section className="py-20" id="portfolio">
      <div className="container mx-auto px-6">
        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">Galeria de <span className="text-primary"> Fotos</span></h2>
            <p className="max-w-2xl mx-auto text-white mt-6 text-lg">Recordemos la IV Jornada de Exposición de Productos Académicos</p>
          </div>
        </motion.div>
        <motion.div
          whileInView={{ scale: 1, opacity: 1 }}
          initial={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="images/portfolio/IMG_3159.webp"
                alt="Concert crowd"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">IV JEPA</h3>
                  <p className="text-white/80 mt-1">Diciembre 2024</p>
                </div>
              </div>
            </div>


            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="images/portfolio/IMG_3177.webp"
                alt="Team building"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">IV JEPA</h3>
                  <p className="text-white/80 mt-1">Diciembre 2024</p>
                </div>
              </div>
            </div>


            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="images/portfolio/IMG_3190.webp"
                alt="Office meeting"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">IV JEPA</h3>
                  <p className="text-white/80 mt-1">Diciembre 2024</p>
                </div>
              </div>
            </div>


            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="images/portfolio/IMG_3235.webp"
                alt="Team celebration"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">IV JEPA</h3>
                  <p className="text-white/80 mt-1">Diciembre 2024</p>
                </div>
              </div>
            </div>


            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="images/portfolio/IMG_3346.webp"
                alt="Conference"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">IV JEPA</h3>
                  <p className="text-white/80 mt-1">Diciembre 2024</p>
                </div>
              </div>
            </div>


            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="images/portfolio/IMG_3452.webp"
                alt="Volunteering"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">IV JEPA</h3>
                  <p className="text-white/80 mt-1">Diciembre 2024</p>
                </div>
              </div>
            </div>


            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="images/portfolio/IMG_3481.webp"
                alt="Award ceremony"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">IV JEPA</h3>
                  <p className="text-white/80 mt-1">Diciembre 2024</p>
                </div>
              </div>
            </div>


            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="images/portfolio/IMG_3491.webp"
                alt="Office party"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">IV JEPA</h3>
                  <p className="text-white/80 mt-1">Diciembre 2024</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;