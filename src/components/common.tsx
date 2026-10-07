import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { divisionColor, type ProkerStatus, type PublicProker } from "@/content";
import { useSite } from "@/site";

/** Centered content column used by every page. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-6xl mx-auto px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Centered page/section title with an optional intro paragraph (ppiunimalaya.id structure). */
export function Heading({
  title,
  intro,
  as: Tag = "h2",
  className = "",
}: {
  title: string;
  intro?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <Tag className={`font-extrabold tracking-tight text-primary ${Tag === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}>{title}</Tag>
      {intro && <div className="mt-4 mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-foreground/75">{intro}</div>}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, hint }: { icon: LucideIcon; title: string; hint?: string }) {
  return (
    <Card className="border-dashed border-border/60 shadow-none">
      <CardContent className="py-14 text-center">
        <Icon className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
      </CardContent>
    </Card>
  );
}

/** Renders `value`, or a muted "not filled" line. Hidden while content is loading. */
export function Pending({ value, className = "", hint = "Belum diisi." }: { value?: string; className?: string; hint?: string }) {
  const { loading } = useSite();
  if (value) return <p className={className}>{value}</p>;
  return <p className={`text-sm text-muted-foreground/70 ${loading ? "invisible" : ""}`}>{hint}</p>;
}

export const STATUS: Record<ProkerStatus, { label: string; className: string }> = {
  upcoming: { label: "Akan datang", className: "bg-amber-500/10 text-amber-700 border-amber-200" },
  ongoing: { label: "Berjalan", className: "bg-blue-500/10 text-blue-600 border-blue-200" },
  done: { label: "Selesai", className: "bg-green-500/10 text-green-600 border-green-200" },
};

/** Public version of the dashboard's ProkerCard. */
export function ProkerCard({ proker }: { proker: PublicProker }) {
  const date = new Date(`${proker.date}T00:00:00`);
  return (
    <Card className="overflow-hidden border-border/60 shadow-card animate-fade-in">
      <div className="h-1.5 w-full" style={{ background: divisionColor(proker.division) }} />
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground line-clamp-2 break-words">{proker.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {proker.division}
              {proker.collab_divisions?.length ? ` + ${proker.collab_divisions.join(", ")}` : ""}
            </p>
          </div>
          <div className="flex gap-1.5 flex-wrap justify-end shrink-0">
            <Badge
              variant={proker.type === "Internal" ? "default" : "secondary"}
              className={proker.type === "Internal" ? "bg-primary text-primary-foreground text-[10px]" : "text-[10px]"}
            >
              {proker.type}
            </Badge>
            <Badge className={`${STATUS[proker.status].className} text-[10px] hover:bg-transparent`}>{STATUS[proker.status].label}</Badge>
          </div>
        </div>
        {proker.description && <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{proker.description}</p>}
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
        </p>
      </CardContent>
    </Card>
  );
}
