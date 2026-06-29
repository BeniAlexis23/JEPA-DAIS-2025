"use client";
import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();
  const isActive = path === item.href;

  return (
    <div
      className="relative"
      onMouseEnter={() => item.submenu && setSubmenuOpen(true)}
      onMouseLeave={() => setSubmenuOpen(false)}
    >
      <Link
        href={item.href}
        className={`text-16 flex items-center rounded-full px-4 py-2 font-medium transition duration-200 ${
          isActive
            ? "bg-primary/15 text-secondary"
            : "text-slate-200 hover:bg-white/10 hover:text-secondary"
        }`}
      >
        {item.label}
        {item.submenu && (
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10l5 5l5-5" />
          </svg>
        )}
      </Link>
      {submenuOpen && (
        <div className="absolute left-0 mt-2 w-60 rounded-xl border border-white/10 bg-dark_grey/95 p-2 text-white shadow-soft-blue backdrop-blur">
          {item.submenu?.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className={`block rounded-lg px-4 py-2 transition ${
                path === subItem.href ? "bg-primary text-white" : "text-slate-200 hover:bg-white/10 hover:text-secondary"
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
