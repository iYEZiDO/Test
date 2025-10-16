import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} NextLevel GmbH. Alle Rechte vorbehalten.</p>
        <div className="flex gap-4">
          <Link href="/impressum" className="hover:text-primary">
            Impressum
          </Link>
          <Link href="/contact" className="hover:text-primary">
            Kontakt
          </Link>
        </div>
      </div>
    </footer>
  );
}
