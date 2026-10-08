import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TEAM_PHOTOS } from "@/team";
import { useSite } from "@/site";

/** Big numbers counted from real data + a link to Tentang Kami. */
export function KabinetGlance() {
  const site = useSite();
  const stats = [
    { value: site.divisions.length, label: "Divisi" },
    { value: TEAM_PHOTOS.length, label: "Anggota" },
    { value: site.loading ? null : site.prokers.length, label: "Proker" },
  ];

  return (
    <div className="text-center">
      <p className="flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-widest text-primary">
        <span className="pennant h-4 w-12 bg-primary" aria-hidden />
        Kabinet Prabhadhara{site.term ? ` ${site.term}` : ""}
      </p>
      <dl className="mt-8 grid grid-cols-3 divide-x divide-border">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse px-2">
            <dt className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</dt>
            <dd className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none text-foreground">{s.value ?? "-"}</dd>
          </div>
        ))}
      </dl>
      <Link to="/overview" className="mt-10 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline underline-offset-4">
        Kenalan dengan Kabinet Prabhadhara <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
