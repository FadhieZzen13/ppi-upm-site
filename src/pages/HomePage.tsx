import { Newspaper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/content";
import { useSite } from "@/site";
import { Container, Heading, EmptyState } from "@/components/common";
import { MemberStrip } from "@/components/MemberStrip";
import { KabinetGlance } from "@/components/KabinetGlance";

export default function HomePage() {
  const site = useSite();

  return (
    <>
      {/* Welcome */}
      <section className="pt-12 pb-10 sm:pt-16">
        <Container>
          <Heading as="h1" title={site.home.headline} intro={<p>{site.home.lead}</p>} />
        </Container>
      </section>

      {/* Members of the kabinet, looping */}
      <section className="pb-16" aria-label="Anggota">
        <MemberStrip />
      </section>

      {/* Kabinet at a glance */}
      <section className="border-t border-border py-16">
        <Container>
          <KabinetGlance />
        </Container>
      </section>

      {/* Latest */}
      {site.sections.latest && (
        <section className="border-t border-border bg-secondary/60 py-16">
          <Container>
            <Heading title={`Terbaru dari ${SITE.shortName}`} className="mb-10" />
            {site.latest.length === 0 ? (
              <EmptyState icon={Newspaper} title="Belum ada update" hint="Guidebook, video, dan kabar kegiatan akan tampil di sini." />
            ) : (
              <div className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
                {site.latest.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="snap-start shrink-0 w-[80%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                  >
                    <Card className="h-full overflow-hidden border-border shadow-card hover:shadow-card-hover transition-shadow">
                      <div className="aspect-[4/3] bg-muted">
                        {item.image && <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover" />}
                      </div>
                      <CardContent className="p-5 text-center">
                        <p className="font-bold text-foreground">{item.title}</p>
                        {item.kind && <p className="text-xs text-muted-foreground mt-1">{item.kind}</p>}
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            )}
          </Container>
        </section>
      )}
    </>
  );
}
