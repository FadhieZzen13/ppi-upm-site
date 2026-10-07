import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/content";
import { useSite } from "@/site";
import { Container, Heading, EmptyState, Pending } from "@/components/common";

export default function HomePage() {
  const site = useSite();

  return (
    <>
      {/* Welcome: centered title, intro, one CTA, then the group photo */}
      <section className="pt-14 pb-16 sm:pt-20">
        <Container>
          <Heading as="h1" title={site.home.headline} intro={<p>{site.home.lead}</p>} />
          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link to="/overview">Tentang kami</Link>
            </Button>
          </div>
          <div className="mt-12">
            {site.heroImage ? (
              <img src={site.heroImage} alt={`Foto bersama ${SITE.shortName}`} className="w-full aspect-[16/7] rounded-lg object-cover shadow-card-hover" />
            ) : (
              <div className="w-full aspect-[16/7] rounded-lg border border-border/60 bg-secondary shadow-card flex flex-col items-center justify-center gap-3">
                <img src="/logo.png" alt="" className="h-20 w-20 rounded-full object-contain opacity-40" />
                <p className="text-xs text-muted-foreground">Foto bersama belum diunggah</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Divisions: one white panel, 3x3 text grid with the logo in the middle */}
      <section className="pb-16">
        <Container>
          <Card className="border-border/60 shadow-card">
            <CardContent className="p-6 sm:p-10">
              <Heading
                title="Divisi Kami"
                intro={
                  <p>
                    Setiap divisi di {SITE.shortName} bekerja sama untuk mewujudkan visi organisasi, dengan peran masing-masing dalam
                    pengembangan, koordinasi, advokasi, budaya, dan komunikasi.
                  </p>
                }
              />
              <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {site.divisions.map((d, i) => (
                  <Fragment key={d.code}>
                    {i === 4 && (
                      <div className="hidden lg:flex items-center justify-center">
                        <img src="/logo.png" alt="" className="h-36 w-36 rounded-full object-contain" />
                      </div>
                    )}
                    <Link to={`/proker?divisi=${d.code}`} className="group">
                      <h3 className="text-lg font-bold text-primary group-hover:underline underline-offset-4">{d.name || d.code}</h3>
                      {d.name && <p className="text-xs font-semibold text-muted-foreground mb-2">{d.code}</p>}
                      <Pending value={d.description} className="text-sm leading-relaxed text-foreground/80" hint="Deskripsi divisi belum diisi." />
                    </Link>
                  </Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Latest: tinted band with image cards */}
      {site.sections.latest && (
        <section className="bg-secondary py-16">
          <Container>
            <Heading title={`Terbaru dari ${SITE.shortName}`} className="mb-10" />
            {site.latest.length === 0 ? (
              <EmptyState icon={Newspaper} title="Belum ada update" hint="Guidebook, video, dan kabar kegiatan akan tampil di sini." />
            ) : (
              <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
                {site.latest.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="snap-start shrink-0 w-[80%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                  >
                    <Card className="h-full overflow-hidden border-border/60 shadow-card hover:shadow-card-hover transition-shadow">
                      <div className="aspect-[4/3] bg-muted">
                        {item.image && <img src={item.image} alt="" className="h-full w-full object-cover" />}
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
