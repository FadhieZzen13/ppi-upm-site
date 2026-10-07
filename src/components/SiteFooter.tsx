import { Link } from "react-router-dom";
import { Instagram, Linkedin, Music2, Youtube } from "lucide-react";
import { SITE } from "@/content";
import { useSite } from "@/site";
import { NAV } from "./nav";

const SOCIALS = [
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "youtube", label: "YouTube", icon: Youtube },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "tiktok", label: "TikTok", icon: Music2 },
] as const;

export function SiteFooter() {
  const site = useSite();
  const socials = SOCIALS.filter((s) => site.socials[s.key]);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 flex flex-col items-center text-center gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img src="/logo.png" alt="" className="h-16 w-16 rounded-full bg-primary-foreground object-contain p-1" />
          <div className="text-sm sm:text-left">
            <p className="font-bold">PPI Universiti Putra Malaysia</p>
            <p className="text-primary-foreground/75">{SITE.location}</p>
            {site.email && (
              <a href={`mailto:${site.email}`} className="text-primary-foreground/75 hover:text-primary-foreground">{site.email}</a>
            )}
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/85 hover:text-primary-foreground">
              {n.label}
            </Link>
          ))}
        </nav>

        {socials.length > 0 && (
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.key}
                href={site.socials[s.key]}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}

        <p className="text-xs text-primary-foreground/60">© {new Date().getFullYear()} {SITE.shortName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
