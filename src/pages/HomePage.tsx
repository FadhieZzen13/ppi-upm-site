import { Newspaper } from "lucide-react";
import { SITE } from "@/content";
import { useSite } from "@/site";
import { Container, Heading, EmptyState } from "@/components/common";
import { MemberStrip } from "@/components/MemberStrip";
import { KabinetGlance } from "@/components/KabinetGlance";
import { LatestCarousel } from "@/components/LatestCarousel";

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
              <LatestCarousel items={site.latest} />
            )}
          </Container>
        </section>
      )}
    </>
  );
}
