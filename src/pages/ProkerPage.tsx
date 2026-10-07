import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CalendarX, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { SITE, type ProkerStatus } from "@/content";

const SITE_SHORT = SITE.shortName;
import { useSite } from "@/site";
import { Container, Heading, EmptyState, ProkerCard, STATUS } from "@/components/common";

const selectClass =
  "h-10 w-full sm:w-44 rounded-md border border-input bg-background pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function ProkerPage() {
  const site = useSite();
  const [params, setParams] = useSearchParams();
  const division = params.get("divisi") ?? "all";
  const [status, setStatus] = useState<ProkerStatus | "all">("all");
  const [search, setSearch] = useState("");

  const setDivision = (value: string) => {
    const next = new URLSearchParams(params);
    if (value === "all") next.delete("divisi");
    else next.set("divisi", value);
    setParams(next, { replace: true });
  };

  const prokers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return site.prokers.filter(
      (p) =>
        (division === "all" || p.division === division || p.collab_divisions?.includes(division)) &&
        (status === "all" || p.status === status) &&
        (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    );
  }, [site.prokers, division, status, search]);

  return (
    <Container className="py-14 sm:py-20">
      <Heading
        as="h1"
        title="Proker Term Ini"
        intro={<p>{site.term ? `Program kerja seluruh divisi ${SITE_SHORT} untuk term ${site.term}.` : `Program kerja seluruh divisi ${SITE_SHORT} untuk term ini.`}</p>}
        className="mb-10"
      />

      <div className="flex justify-center mb-6">
        <div className="flex rounded-md border border-border overflow-hidden w-fit bg-card">
          {(["all", "upcoming", "ongoing", "done"] as const).map((s) => (
            <Button key={s} variant={status === s ? "default" : "ghost"} size="sm" className="rounded-none" onClick={() => setStatus(s)}>
              {s === "all" ? "Semua" : STATUS[s].label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari proker..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="relative">
          <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select className={selectClass} value={division} onChange={(e) => setDivision(e.target.value)} aria-label="Divisi">
            <option value="all">Semua divisi</option>
            {site.divisions.map((d) => (
              <option key={d.code} value={d.code}>{d.code}</option>
            ))}
          </select>
        </div>
      </div>

      {site.loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-40" />)}
        </div>
      ) : prokers.length === 0 ? (
        <EmptyState
          icon={CalendarX}
          title={site.prokers.length === 0 ? "Belum ada proker" : "Tidak ada proker yang cocok"}
          hint={site.prokers.length === 0 ? "Proker yang dirilis pengurus akan tampil di sini." : "Coba ubah filter atau kata kunci."}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prokers.map((p) => <ProkerCard key={p.id} proker={p} />)}
        </div>
      )}
    </Container>
  );
}
