import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { headerData } from "../Header/Navigation/menuData";
import { footerlabels } from "@/app/api/data";
import { Icon } from "@iconify/react";
import { getImagePrefix } from "@/utils/utils";

const Footer: FC = () => {
  return (
    <footer className="border-t border-white/10 bg-deepSlate">
      <div className="container mx-auto px-4 py-12 lg:max-w-screen-xl lg:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex" aria-label="Ir al inicio">
              <Image
                src={`${getImagePrefix()}images/logo/epis-logo.png`}
                alt="Escuela Profesional de Ingeniería de Sistemas"
                width={260}
                height={76}
                className="h-auto w-[230px] max-w-full"
                quality={100}
              />
            </Link>
            <p className="mt-5 max-w-md text-16 leading-7 text-slate-300">
              VII Jornada de Exposición de Productos Académicos 2026 de la Escuela Profesional de Ingeniería de Sistemas, Facultad de Ingeniería - UNDC.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="https://www.facebook.com/FIUNDC" target="_blank" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-secondary hover:text-secondary" aria-label="Facebook FI UNDC">
                <Icon icon="fa6-brands:facebook-f" width="18" height="18" />
              </Link>
              <Link href="https://fi.undc.edu.pe/" target="_blank" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-secondary hover:text-secondary" aria-label="Sitio web FI UNDC">
                <Icon icon="mdi:web" width="22" height="22" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-18 font-semibold text-white">Navegación</h4>
            <ul className="space-y-3">
              {headerData.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-16 text-slate-300 transition hover:text-secondary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-18 font-semibold text-white">Áreas</h4>
            <ul className="space-y-3">
              {footerlabels.map((item, index) => (
                <li key={index}>
                  <Link href={item.herf} className="text-16 text-slate-300 transition hover:text-secondary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 text-18 font-semibold text-white">Contacto institucional</h4>
            <div className="space-y-3 text-16 leading-7 text-slate-300">
              <p>Facultad de Ingeniería</p>
              <p>Universidad Nacional de Cañete</p>
              <Link href="https://fi.undc.edu.pe/" target="_blank" className="inline-flex break-all text-secondary transition hover:text-primary">
                fi.undc.edu.pe
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm leading-6 text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Facultad de Ingeniería.</p>
          <p className="sm:text-right">Diseñado para la Jornada de Exposición de Productos Académicos.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
