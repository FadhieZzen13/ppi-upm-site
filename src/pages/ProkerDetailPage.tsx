import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSite } from "@/site";
import { Container, Heading, DivisionPhoto, ProkerCard, STATUS, formatProkerDate } from "@/components/common";
import NotFound from "./NotFound";

/** Only http(s) links from the admin page become buttons. */
const safeUrl = (url?: string) => (url && /^https?:\/\//i.test(url.trim()) ? url.trim() : undefined);

export default function ProkerDetailPage() {
  const { id = "" } = useParams();
  const site = useSite();
  const proker = site.prokers.find((p) => p.id === id);
  const division = site.divisions.find((d) => d.code === proker?.division);

  const more = useMemo(
    () => (proker ? site.prokers.filter((p) => p.id !== proker.id && p.division === proker.division).slice(0, 3) : []),
    [site.prokers, proker]
  );

  if (site.loading) {
    return (
      <Container className="py-12">
        <Skeleton className="h-4 w-32" />
        <div className="mt-6 grid gap-10 md:grid-cols-[1fr_minmax(0,460px)]">
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-14 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>
          <Skeleton className="aspect-[4/3] w-full" />
        </div>
      </Container>
    );
  }
  if (!proker) return <NotFound />;

  const details = proker.details ?? {};
  const link = safeUrl(details.link);
  const paragraphs = (details.body ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const gallery = (details.gallery ?? []).filter(Boolean);

  return (
    <>
      {/* Header: cover + key facts */}
      <section className="pt-8 pb-12 sm:pt-12">
        <Container>
          <Link to="/proker" className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/70 hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Semua proker
          </Link>
          <div className="mt-6 grid gap-10 md:grid-cols-[1fr_minmax(0,460px)] md:items-center">
            <div className="order-2 md:order-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link to={`/divisi/${proker.division}`} className="text-xs font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4">
                  Proker {proker.division}
                </Link>
                <Badge className={`${STATUS[proker.status].className} text-[10px] hover:bg-transparent`}>{STATUS[proker.status].label}</Badge>
              </div>
              <h1 className="mt-3 font-marker text-4xl sm:text-5xl leading-[1.08] text-foreground break-words">{proker.name}</h1>
              {proker.description && <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/80">{proker.description}</p>}

              <dl className="mt-6 grid gap-2.5 text-sm text-foreground/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary shrink-0" aria-hidden />
                  <dt className="sr-only">Tanggal</dt>
                  <dd>{formatProkerDate(proker.date, "long")}</dd>
                </div>
                {details.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary shrink-0" aria-hidden />
                    <dt className="sr-only">Lokasi</dt>
                    <dd>{details.location}</dd>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary shrink-0" aria-hidden />
                  <dt className="sr-only">Penyelenggara</dt>
                  <dd>
                    {proker.division}
                    {proker.collab_divisions?.length ? ` bersama ${proker.collab_divisions.join(", ")}` : ""} · {proker.type}
                  </dd>
                </div>
              </dl>

              {link && (
                <Button asChild className="mt-7">
                  <a href={link} target="_blank" rel="noreferrer">
                    {details.linkLabel || "Selengkapnya"} <ArrowUpRight className="h-4 w-4 ml-1.5" />
                  </a>
                </Button>
              )}
            </div>
            <div className="order-1 md:order-2 w-full aspect-[4/3] overflow-hidden rounded-md border border-border bg-card shadow-card">
              {details.cover ? (
                <img src={details.cover} alt={proker.name} className="h-full w-full object-cover" />
              ) : division ? (
                <DivisionPhoto division={division} eager />
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      {/* Story */}
      {paragraphs.length > 0 && (
        <section className="border-t border-border py-14">
          <Container>
            <div className="max-w-2xl space-y-4 text-base leading-relaxed text-foreground/85">
              {paragraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line">{p}</p>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="border-t border-border py-14">
          <Container>
            <Heading title="Galeri" align="left" className="mb-8" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {gallery.map((url, i) => (
                <a
                  key={url + i}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden rounded-md border border-border bg-muted"
                >
                  <img
                    src={url}
                    alt={`Foto ${i + 1} ${proker.name}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </a>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* More from this division */}
      {more.length > 0 && (
        <section className="border-t border-border py-14 bg-secondary/50">
          <Container>
            <Heading title={`Proker ${proker.division} lainnya`} align="left" className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {more.map((p) => <ProkerCard key={p.id} proker={p} />)}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
