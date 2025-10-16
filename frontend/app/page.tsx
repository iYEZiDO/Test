import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />
      <ProductGrid />
      <section className="rounded-3xl bg-white p-10 shadow">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Warum NextLevel?</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <strong>Enterprise-ready:</strong> ISO 27001 zertifizierte Infrastruktur und DSGVO-konforme Datenspeicherung.
              </li>
              <li>
                <strong>Schnelle Implementierung:</strong> Onboarding innerhalb von 14 Tagen mit dediziertem Solution-Team.
              </li>
              <li>
                <strong>Skalierbar:</strong> Flexible Modul-Lizenzen und transparente Kostenstruktur für Teams jeder Größe.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Erfolgsgeschichten</h2>
            <p className="mt-4 text-sm text-slate-600">
              Über 250 Unternehmen vertrauen auf unsere Plattform – vom Mittelstand bis zum globalen Enterprise. Entdecken Sie,
              wie wir Effizienzsteigerungen von bis zu 37% und signifikante Umsatzsteigerungen ermöglicht haben.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-3xl font-bold text-primary">37%</p>
                <p className="text-xs uppercase tracking-wider text-slate-500">Produktivitätssteigerung</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-3xl font-bold text-primary">2.5x</p>
                <p className="text-xs uppercase tracking-wider text-slate-500">Schnellere Einführung</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
