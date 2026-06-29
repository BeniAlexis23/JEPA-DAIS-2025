import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Link
        href={item.href}
        onClick={item.submenu ? () => setSubmenuOpen(!submenuOpen) : undefined}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-slate-100 transition hover:bg-white/10 hover:text-secondary focus:outline-none"
      >
        {item.label}
        {item.submenu && (
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10l5 5l5-5" />
          </svg>
        )}
      </Link>
      {submenuOpen && item.submenu && (
        <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-2">
          {item.submenu.map((subItem, index) => (
            <Link key={index} href={subItem.href} className="block rounded-lg px-4 py-2 text-slate-300 hover:bg-white/10 hover:text-secondary">
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
