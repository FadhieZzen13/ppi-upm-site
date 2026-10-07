import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSite } from "@/site";
import { NAV } from "./nav";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-semibold transition-colors ${isActive ? "text-primary" : "text-foreground/70 hover:text-primary"}`;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { dashboardUrl } = useSite();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
      <div className="max-w-6xl mx-auto h-16 px-5 sm:px-8 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src="/logo.png" alt="" className="h-10 w-10 rounded-full object-contain" />
          <span className="text-base sm:text-lg font-bold text-foreground">PPI Universiti Putra Malaysia</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 ml-auto" aria-label="Utama">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === "/"} className={linkClass}>
              {n.label}
            </NavLink>
          ))}
          <Button asChild size="sm" variant="outline">
            <a href={dashboardUrl || "#"}>Dashboard</a>
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border bg-card px-5 py-4 flex flex-col gap-4" aria-label="Utama">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === "/"} className={linkClass}>
              {n.label}
            </NavLink>
          ))}
          <a href={dashboardUrl || "#"} className="text-sm font-semibold text-muted-foreground">Dashboard pengurus</a>
        </nav>
      )}
    </header>
  );
}
