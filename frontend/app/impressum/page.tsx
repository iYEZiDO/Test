export default function ImpressumPage() {
  return (
    <div className="space-y-8 rounded-3xl bg-white p-10 shadow">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Impressum</h1>
        <p className="text-sm text-slate-500">Angaben gemäß § 5 TMG</p>
      </header>
      <section className="space-y-4 text-sm text-slate-600">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">NextLevel GmbH</h2>
          <p>Innovationsstraße 42</p>
          <p>12345 Berlin</p>
        </div>
        <div>
          <p>
            Vertreten durch die Geschäftsführerinnen Jana Schneider und Lea Müller. Eingetragen beim Amtsgericht Berlin unter der
            Handelsregisternummer HRB 123456.
          </p>
        </div>
        <div>
          <p>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE123456789</p>
          <p>Aufsichtsbehörde: Bundesnetzagentur</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">Kontakt</h3>
          <p>Telefon: +49 (0)30 1234567</p>
          <p>E-Mail: impressum@nextlevel.example</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">Haftungsausschluss</h3>
          <p>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt
            der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </div>
      </section>
    </div>
  );
}
