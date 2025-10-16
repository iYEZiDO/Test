"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Produkte" },
  { href: "/contact", label: "Kontakt" },
  { href: "/impressum", label: "Impressum" }
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-primary">
          NextLevel GmbH
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative transition hover:text-primary ${
                  isActive ? "text-primary" : ""
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
