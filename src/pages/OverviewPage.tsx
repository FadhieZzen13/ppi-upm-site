import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/content";
import { useSite } from "@/site";
import { Container, Heading, Pending } from "@/components/common";
import { KabinetGrid } from "@/components/KabinetGrid";

export default function OverviewPage() {
  const site = useSite();

  return (
    <Container className="py-14 sm:py-20 space-y-20">
      <section>
        <Heading
          as="h1"
          title="Tentang Kami"
          intro={<Pending value={site.about} className="whitespace-pre-line" hint={`Profil ${SITE.shortName} belum diisi.`} />}
        />
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <Card className="border-border shadow-card">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-marker text-4xl uppercase text-foreground mb-4">Visi</h2>
            <Pending value={site.vision} className="text-base leading-relaxed text-foreground/80" hint="Visi belum diisi." />
          </CardContent>
        </Card>
        <Card className="border-border shadow-card">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-marker text-4xl uppercase text-foreground mb-4">Misi</h2>
            {site.missions.length === 0 ? (
              <Pending hint="Misi belum diisi." />
            ) : (
              <ol className="list-decimal pl-5 space-y-2 text-base leading-relaxed text-foreground/80 marker:font-bold marker:text-primary">
                {site.missions.map((m) => <li key={m}>{m}</li>)}
              </ol>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Kabinet: IG-feed grid, Kabinet tile + 8 divisions */}
      <section>
        <Heading title="Kabinet Prabhadhara" intro={<p>{site.term ? `Kepengurusan ${site.term}. ` : ""}Pilih divisi untuk melihat anggota dan prokernya.</p>} className="mb-10" />
        <KabinetGrid />
      </section>

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
