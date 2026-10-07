import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/content";
import { useSite } from "@/site";
import { Container, Heading, Pending } from "@/components/common";

export default function OverviewPage() {
  const site = useSite();
  const leader = (division: string, position: "Kadep" | "Wakadep") =>
    site.sections.pengurus ? site.pengurus.find((p) => p.division === division && p.position === position)?.name : undefined;

  return (
    <Container className="py-14 sm:py-20 space-y-16">
      {/* About */}
      <section>
        <Heading
          as="h1"
          title="Tentang Kami"
          intro={<Pending value={site.about} className="whitespace-pre-line" hint={`Profil ${SITE.shortName} belum diisi.`} />}
        />
      </section>

      {/* Visi & Misi */}
      <section className="grid gap-5 md:grid-cols-2">
        <Card className="border-border/60 shadow-card">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold text-primary mb-3">Visi</h2>
            <Pending value={site.vision} className="text-sm sm:text-base leading-relaxed text-foreground/85" hint="Visi belum diisi." />
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-card">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold text-primary mb-3">Misi</h2>
            {site.missions.length === 0 ? (
              <Pending hint="Misi belum diisi." />
            ) : (
              <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base leading-relaxed text-foreground/85 marker:font-bold marker:text-primary">
                {site.missions.map((m) => <li key={m}>{m}</li>)}
              </ol>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Pengurus */}
      <section>
        <Heading
          title="Pengurus"
          intro={<p>{site.term ? `Kabinet ${site.term}` : "Kabinet periode ini"}</p>}
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.divisions.map((d) => (
            <Card key={d.code} className="border-border/60 shadow-card">
              <CardContent className="p-5 text-center">
                <p className="text-lg font-bold text-primary">{d.code}</p>
                <p className="text-xs text-muted-foreground min-h-4">{d.name}</p>
                <div className="mt-4 space-y-3 text-sm">
                  <Person role="Kepala Departemen" name={leader(d.code, "Kadep")} />
                  <Person role="Wakil Kepala Departemen" name={leader(d.code, "Wakadep")} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="text-center">
        <h2 className="text-xl font-bold text-foreground">Ada pertanyaan?</h2>
        {site.email ? (
          <a href={`mailto:${site.email}`} className="mt-2 inline-block font-semibold text-primary hover:underline">{site.email}</a>
        ) : (
          <div className="mt-2"><Pending hint="Kontak belum diisi." /></div>
        )}
      </section>
    </Container>
  );
}

function Person({ role, name }: { role: string; name?: string }) {
  const { loading } = useSite();
  return (
    <div>
      <p className={name ? "font-semibold text-foreground" : "text-muted-foreground/70"}>{name || (loading ? " " : "Belum diisi")}</p>
      <p className="text-xs text-muted-foreground">{role}</p>
    </div>
  );
}
