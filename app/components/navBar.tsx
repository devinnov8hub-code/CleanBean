"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/Brand_logo_1.png";
import Logo2 from "../assets/Brand_logo_2.png";
import Image from "next/image";

const links = [
  { label: "Home", href: "#home" },
  { label: "Overview", href: "#about" },
  { label: "Process", href: "#how-it-works" },
  { label: "Features", href: "#services" },
  { label: "Specs", href: "#specifications" },
  

];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/25 text-gray-900 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        <a
          href="/"
          className="rounded-sm text-lg font-semibold text-primary transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
         <Image
         src={Logo2}
         width={250}
         alt="Logo of clean bean"
         />
        </a>

        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-sm text-sm font-medium text-gray-800 transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((isOpen) => !isOpen)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
        >
          {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="space-y-1 bg-white/25 px-4 pb-4 pt-1 backdrop-blur-md sm:px-6 md:hidden"
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-white/40 hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
