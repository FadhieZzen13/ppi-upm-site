import { useRef, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Calendar, ChevronLeft, ChevronRight, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ProkerStatus, PublicProker } from "@/content";
import type { TeamCard } from "@/team";
import { useSite, type SiteDivision } from "@/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-6xl mx-auto px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Hand-lettered title (IG marker style) with an optional intro paragraph. */
export function Heading({
  title,
  intro,
  as: Tag = "h2",
  align = "center",
  className = "",
}: {
  title: string;
  intro?: ReactNode;
  as?: "h1" | "h2";
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <Tag className={`font-marker uppercase leading-[1.05] text-foreground ${Tag === "h1" ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"}`}>{title}</Tag>
      {intro && (
        <div className={`mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-foreground/75 ${align === "center" ? "mx-auto" : ""}`}>{intro}</div>
      )}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, hint }: { icon: LucideIcon; title: string; hint?: string }) {
  return (
    <Card className="border-dashed border-border shadow-none bg-transparent">
      <CardContent className="py-12 text-center">
        <Icon className="h-9 w-9 text-muted-foreground/40 mx-auto mb-3" />
        <p className="text-sm font-semibold text-foreground/70">{title}</p>
        {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
      </CardContent>
    </Card>
  );
}

/** Renders `value`, or a quiet "not filled" line. Hidden while content is loading. */
export function Pending({ value, className = "", hint = "Belum diisi." }: { value?: string; className?: string; hint?: string }) {
  const { loading } = useSite();
  if (value) return <p className={className}>{value}</p>;
  return <p className={`text-sm text-muted-foreground ${loading ? "invisible" : ""}`}>{hint}</p>;
}

/** Division photo as in the IG series; lettered placeholder when there is no photo yet. */
export function DivisionPhoto({ division, className = "", eager = false }: { division: SiteDivision; className?: string; eager?: boolean }) {
  if (division.photo) {
    return (
      <img
        src={division.photo}
        alt={`Divisi ${division.code}`}
        loading={eager ? "eager" : "lazy"}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return (
    <div className={`h-full w-full flex flex-col items-center justify-center gap-2 bg-card ${className}`}>
      <span className="font-marker text-4xl sm:text-5xl text-foreground">{division.code}</span>
      <span className="text-[10px] text-muted-foreground">Foto segera</span>
    </div>
  );
}

export function MemberCard({ card }: { card: TeamCard }) {
  const initials = card.name.split(" ").slice(0, 2).map((w) => w[0]).join("");
  const isLead = /^(Ketua|Wakil)/.test(card.role);
  return (
    <figure className="w-full">
      <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-border bg-card shadow-card">
        {card.photo ? (
          <img src={card.photo} alt={card.name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-secondary">
            <span className="font-marker text-5xl text-primary/70">{initials}</span>
            {card.role === "Ketua Departemen" && (
              <Crown className="absolute top-3 right-3 h-7 w-7 -rotate-12 fill-gold text-foreground" strokeWidth={1.5} aria-hidden />
            )}
          </div>
        )}
      </div>
      <figcaption className="mt-3">
        <p className="font-bold leading-snug text-foreground">{card.name}</p>
        {card.detail && <p className="text-xs text-muted-foreground mt-0.5">{card.detail}</p>}
        <span
          className={`mt-2 inline-block rounded-sm px-1.5 py-0.5 text-[10px] font-semibold ${
            isLead ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70"
          }`}
        >
          {card.role}
        </span>
      </figcaption>
    </figure>
  );
}

/** Horizontal scroll-snap carousel with arrow buttons. */
export function Carousel({ children, label }: { children: ReactNode[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <div className="relative" role="region" aria-label={label}>
      <div ref={ref} className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2">
        {children.map((child, i) => (
          <div key={i} className="snap-start shrink-0 w-[62%] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)]">
            {child}
          </div>
        ))}
      </div>
      {children.length > 2 && (
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-card" onClick={() => scroll(-1)} aria-label="Sebelumnya">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-card" onClick={() => scroll(1)} aria-label="Berikutnya">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export const STATUS: Record<ProkerStatus, { label: string; className: string }> = {
  upcoming: { label: "Akan datang", className: "bg-amber-500/10 text-amber-800 border-amber-300" },
  ongoing: { label: "Berjalan", className: "bg-primary/10 text-primary border-primary/30" },
  done: { label: "Selesai", className: "bg-green-600/10 text-green-800 border-green-300" },
};

export function ProkerCard({ proker }: { proker: PublicProker }) {
  const date = new Date(`${proker.date}T00:00:00`);
  return (
    <Card className="overflow-hidden border-border bg-card shadow-card">
      <div className="h-1.5 w-full bg-primary" />
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-foreground line-clamp-2 break-words">{proker.name}</h3>
          <Badge className={`${STATUS[proker.status].className} text-[10px] shrink-0 hover:bg-transparent`}>{STATUS[proker.status].label}</Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          {proker.division}
          {proker.collab_divisions?.length ? ` + ${proker.collab_divisions.join(", ")}` : ""} · {proker.type}
        </p>
        {proker.description && <p className="text-sm text-foreground/75 line-clamp-2 mb-3">{proker.description}</p>}
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
        </p>
      </CardContent>
    </Card>
  );
}
