import Link from "next/link";

const contactOptions = [
  {
    title: "Vertrieb",
    description: "Individuelle Produktberatung und Enterprise-Angebote",
    email: "sales@nextlevel.example"
  },
  {
    title: "Support",
    description: "24/7 Hotline und dedizierte Customer Success Manager",
    email: "support@nextlevel.example"
  },
  {
    title: "Presse",
    description: "Aktuelle Pressemitteilungen und Media-Kit",
    email: "press@nextlevel.example"
  }
];

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl bg-white p-10 shadow">
        <h1 className="text-3xl font-semibold text-slate-900">Kontakt</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Wir freuen uns auf den Austausch mit Ihnen. Nutzen Sie unser Kontaktformular oder wenden Sie sich direkt an eines
          unserer Teams.
        </p>
        <form className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700">Name</label>
            <input
              type="text"
              className="mt-2 rounded-lg border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-primary focus:outline-none"
              placeholder="Max Mustermann"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700">E-Mail</label>
            <input
              type="email"
              className="mt-2 rounded-lg border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-primary focus:outline-none"
              placeholder="max.mustermann@example.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Nachricht</label>
            <textarea
              className="mt-2 h-32 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-primary focus:outline-none"
              placeholder="Wie können wir Sie unterstützen?"
            />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="btn-primary">
              Nachricht senden
            </button>
          </div>
        </form>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {contactOptions.map((option) => (
          <div key={option.title} className="card">
            <h2 className="text-lg font-semibold text-slate-900">{option.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{option.description}</p>
            <Link href={`mailto:${option.email}`} className="mt-4 inline-block text-sm font-semibold text-primary">
              {option.email}
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
