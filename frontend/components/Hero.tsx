import Link from "next/link";

export default function Hero() {
  return (
    <section className="mb-12 rounded-3xl bg-gradient-to-r from-primary to-primary-dark px-10 py-14 text-white shadow-lg">
      <div className="max-w-2xl space-y-6">
        <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em]">
          Innovativ seit 2012
        </span>
        <h1 className="text-4xl font-bold sm:text-5xl">
          Digitale Produkte, die Ihr Wachstum beschleunigen
        </h1>
        <p className="text-lg text-white/80">
          Unsere modulare Plattform unterstützt Unternehmen bei der Automatisierung ihrer Prozesse, dem Monitoring von KPIs und der Erstellung einzigartiger Kundenerlebnisse.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="#produkte" className="btn-primary">
            Produkte entdecken
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-white/60 px-6 py-2 font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            Beratung anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}
