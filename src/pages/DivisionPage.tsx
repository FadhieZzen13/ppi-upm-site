import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarX } from "lucide-react";
import { RING_ORDER, type Division } from "@/content";
import { useSite } from "@/site";
import { Container, Heading, Pending, DivisionPhoto, MemberCard, Carousel, ProkerCard, EmptyState } from "@/components/common";
import { buildTeam } from "@/team";
import NotFound from "./NotFound";

export default function DivisionPage() {
  const { code = "" } = useParams();
  const site = useSite();
  const division = site.divisions.find((d) => d.code === code.toUpperCase());

  // IG photos always show; full name / batch / faculty only when the admin enabled member details.
  const team = useMemo(
    () => (division ? buildTeam(division.code, site.sections.members ? site.members : []) : []),
    [division, site.members, site.sections.members]
  );
  const prokers = useMemo(
    () => (division ? site.prokers.filter((p) => p.division === division.code || p.collab_divisions?.includes(division.code)) : []),
    [site.prokers, division]
  );

  if (!division) return <NotFound />;

  const index = RING_ORDER.indexOf(division.code as Division);
  const prev = RING_ORDER[(index + RING_ORDER.length - 1) % RING_ORDER.length];
  const next = RING_ORDER[(index + 1) % RING_ORDER.length];

  return (
    <>
      {/* Header: division photo + intro */}
      <section className="pt-8 pb-12 sm:pt-12">
        <Container>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/70 hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Semua divisi
          </Link>
          <div className="mt-6 grid gap-10 md:grid-cols-[1fr_minmax(0,420px)] md:items-center">
            <div className="order-2 md:order-1">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Divisi
              </p>
              <h1 className="mt-3 font-marker text-6xl sm:text-7xl leading-none text-foreground">{division.code}</h1>
              {division.name && <p className="mt-3 text-lg font-bold text-primary">{division.name}</p>}
              <div className="mt-5 max-w-xl">
                <Pending value={division.description} className="text-base leading-relaxed text-foreground/80 whitespace-pre-line" hint="Deskripsi divisi belum diisi." />
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                {team.length > 0 && <>{team.length} anggota · </>}
                {prokers.length} proker
              </p>
            </div>
            <div className="order-1 md:order-2 mx-auto w-full max-w-[420px] aspect-[4/5] overflow-hidden rounded-md">
              <DivisionPhoto division={division} eager />
            </div>
          </div>
        </Container>
      </section>

      {/* Members */}
      {team.length > 0 && (
        <section className="border-t border-border py-14">
          <Container>
            <Heading title="Anggota" align="left" className="mb-8" />
            <Carousel label={`Anggota ${division.code}`}>
              {team.map((c) => <MemberCard key={c.key} card={c} />)}
            </Carousel>
          </Container>
        </section>
      )}

      {/* Prokers */}
      <section className="border-t border-border py-14 bg-secondary/50">
        <Container>
          <Heading title="Proker" align="left" className="mb-8" />
          {site.loading ? null : prokers.length === 0 ? (
            <EmptyState icon={CalendarX} title="Belum ada proker" hint={`Proker ${division.code} yang dirilis akan tampil di sini.`} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prokers.map((p) => <ProkerCard key={p.id} proker={p} />)}
            </div>
          )}
        </Container>
      </section>

      {/* Prev / next */}
      <nav className="border-t border-border" aria-label="Divisi lain">
        <Container className="flex items-center justify-between py-6 text-sm font-semibold">
          <Link to={`/divisi/${prev}`} className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> {prev}
          </Link>
          <Link to={`/divisi/${next}`} className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary">
            {next} <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </nav>
    </>
  );
}
