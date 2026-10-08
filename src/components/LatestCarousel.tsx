import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LatestItem } from "@/content";

/** "Terbaru": one wide slide at a time, with arrows, dots and swipe (scroll-snap). */
export function LatestCarousel({ items }: { items: LatestItem[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const many = items.length > 1;

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = (i + items.length) % items.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    setIndex(next);
  };

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label="Terbaru">
      <div
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
        }}
      >
        {items.map((item, i) => (
          <a
            key={item.id}
            href={item.url || undefined}
            target="_blank"
            rel="noreferrer"
            aria-roledescription="slide"
            aria-label={`${i + 1} dari ${items.length}: ${item.title}`}
            className="group w-full shrink-0 snap-start"
          >
            <div className="grid overflow-hidden rounded-md border border-border bg-card shadow-card md:grid-cols-[1.5fr_1fr]">
              <div className="aspect-[16/10] bg-muted md:aspect-auto md:min-h-[360px]">
                {item.image && <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover" />}
              </div>
              <div className="flex flex-col justify-center gap-3 p-6 sm:p-10">
                {item.kind && <p className="text-xs font-bold uppercase tracking-widest text-primary">{item.kind}</p>}
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight text-foreground">{item.title}</h3>
                {item.url && (
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:underline underline-offset-4">
                    Buka <ArrowUpRight className="h-4 w-4" />
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>

      {many && (
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex gap-2" role="tablist" aria-label="Pilih slide">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-2 bg-foreground/20 hover:bg-foreground/40"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-card" onClick={() => go(index - 1)} aria-label="Sebelumnya">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-card" onClick={() => go(index + 1)} aria-label="Berikutnya">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
