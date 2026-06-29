"use client";

import { useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= 24);
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && navbarOpen) {
        setNavbarOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen]);

  useEffect(() => {
    document.body.style.overflow = navbarOpen ? "hidden" : "";
  }, [navbarOpen]);

  return (
    <header className="fixed top-0 z-40 w-full px-3 pt-4 transition-all duration-300">
      <div
        className={`mx-auto flex max-w-screen-xl items-center justify-between gap-4 rounded-2xl border px-4 py-3 backdrop-blur-xl transition-all duration-300 ${
          sticky
            ? "border-white/10 bg-darkmode/90 shadow-soft-blue"
            : "border-white/10 bg-darkmode/55"
        }`}
      >
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {headerData.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))}
        </nav>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
          aria-label="Abrir menú móvil"
        >
          <span className="sr-only">Abrir menú</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-white"></span>
            <span className="block h-0.5 w-6 bg-white"></span>
            <span className="block h-0.5 w-6 bg-white"></span>
          </div>
        </button>
      </div>

      {navbarOpen && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" />}
      <div
        ref={mobileMenuRef}
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-white/10 bg-darkmode/95 shadow-soft-blue backdrop-blur-xl transition-transform duration-300 lg:hidden ${
          navbarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <Logo />
          <button
            onClick={() => setNavbarOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-2xl leading-none text-white"
            aria-label="Cerrar menú móvil"
          >
            ×
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {headerData.map((item, index) => (
            <MobileHeaderLink key={index} item={item} />
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
