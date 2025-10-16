const products = [
  {
    title: "Insight Hub",
    description:
      "360° Dashboard für Echtzeit-Analysen mit individuell konfigurierbaren KPI-Widgets und Automatisierungsregeln.",
    badge: "Analytics"
  },
  {
    title: "Flow Automator",
    description:
      "No-Code Workflow Builder zur Orchestrierung komplexer Geschäftsprozesse über Teams und Systeme hinweg.",
    badge: "Automation"
  },
  {
    title: "Engage Suite",
    description:
      "Personalisierte Customer-Journey-Tools inklusive Kampagnenmanager, Segmentierung und Conversational AI.",
    badge: "Customer Experience"
  },
  {
    title: "Secure Ops",
    description:
      "Cloud-native Sicherheitsplattform mit Compliance-Reporting, Identity-Governance und SIEM-Integration.",
    badge: "Security"
  },
  {
    title: "Connect API",
    description:
      "Erweiterbares API-Gateway mit SDKs für über 40 Integrationen und Echtzeit-Monitoring der Datenströme.",
    badge: "Integration"
  },
  {
    title: "Vision AI",
    description:
      "KI-gestützte Bilderkennungs- und Prognosemodelle für Qualitätssicherung, Maintenance und Smart Retail.",
    badge: "AI"
  }
];

export default function ProductGrid() {
  return (
    <section id="produkte" className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Produkt-Highlights</h2>
          <p className="text-slate-500">Skalierbare Module, die sich nahtlos kombinieren lassen.</p>
        </div>
        <button className="btn-primary">Demo vereinbaren</button>
      </div>
      <div className="main-grid">
        {products.map((product) => (
          <article key={product.title} className="card">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {product.badge}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-slate-900">{product.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{product.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
