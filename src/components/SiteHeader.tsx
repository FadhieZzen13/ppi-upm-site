import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RING_ORDER } from "@/content";
import { NAV } from "./nav";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex min-h-11 items-center text-sm font-semibold transition-colors ${isActive ? "text-primary" : "text-foreground/70 hover:text-primary"}`;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [divOpen, setDivOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const onDivision = pathname.startsWith("/divisi/");

  useEffect(() => {
    setOpen(false);
    setDivOpen(false);
  }, [pathname]);

  // Close the Divisi dropdown on outside click / Escape.
  useEffect(() => {
    if (!divOpen) return;
    const onClick = (e: PointerEvent) => {
      if (!dropdown.current?.contains(e.target as Node)) setDivOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDivOpen(false);
    };
    document.addEventListener("pointerdown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [divOpen]);

  const [home, about, ...rest] = NAV;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="max-w-6xl mx-auto h-16 px-5 sm:px-8 flex items-center gap-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src="/logo.png" alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full object-contain" />
          <span className="text-base sm:text-lg font-bold text-foreground">
            <span className="min-[420px]:hidden">PPI UPM</span>
            <span className="hidden min-[420px]:inline">PPI Universiti Putra Malaysia</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 ml-auto" aria-label="Utama">
          <NavLink to={home.to} end className={linkClass}>{home.label}</NavLink>
          <NavLink to={about.to} className={linkClass}>{about.label}</NavLink>
          <div ref={dropdown} className="relative">
            <button
              type="button"
              onClick={() => setDivOpen((v) => !v)}
              aria-expanded={divOpen}
              aria-haspopup="true"
              className={`inline-flex min-h-11 items-center gap-1 text-sm font-semibold transition-colors ${onDivision ? "text-primary" : "text-foreground/70 hover:text-primary"}`}
            >
              Divisi <ChevronDown className={`h-3.5 w-3.5 transition-transform ${divOpen ? "rotate-180" : ""}`} />
            </button>
            {divOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-44 rounded-md border border-border bg-card p-1.5 shadow-card-hover">
                {RING_ORDER.map((code) => (
                  <NavLink
                    key={code}
                    to={`/divisi/${code}`}
                    className={({ isActive }) =>
                      `block rounded-sm px-3 py-2.5 text-sm font-semibold ${isActive ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-secondary"}`
                    }
                  >
                    {code}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
          {rest.map((n) => (
            <NavLink key={n.to} to={n.to} className={linkClass}>{n.label}</NavLink>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-11 w-11 shrink-0 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <nav className="lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-border bg-background px-5 py-3 flex flex-col gap-1" aria-label="Utama">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === "/"} className={linkClass}>
              {n.label}
            </NavLink>
          ))}
          <div className="pt-2 pb-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Divisi</p>
            <div className="grid grid-cols-4 gap-2">
              {RING_ORDER.map((code) => (
                <NavLink
                  key={code}
                  to={`/divisi/${code}`}
                  className={({ isActive }) =>
                    `rounded-sm border px-2 py-3 text-center text-sm font-bold ${isActive ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground/80"}`
                  }
                >
                  {code}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
