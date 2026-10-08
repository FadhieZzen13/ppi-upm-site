import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_CONTENT, DIVISION_COLORS, type Division, type PublicMember, type PublicProker, type SiteContent } from "./content";

// Read-only access to the dashboard's Supabase. The anon key is public by design;
// the public_* views and site_settings only expose what admins chose to publish.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

async function rest<T>(path: string): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_KEY!, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return res.json();
}

type Status = "loading" | "live" | "offline";

function buildSite(remote: SiteContent, prokers: PublicProker[], members: PublicMember[], status: Status) {
  const d = DEFAULT_CONTENT;
  // Remote text wins when filled in; blank fields fall back to the defaults.
  const pick = (r: string | undefined, fallback: string) => (r && r.trim() ? r : fallback);

  return {
    status,
    loading: status === "loading",
    term: pick(remote.term, d.term),
    email: pick(remote.email, d.email),
    kabinetImage: pick(remote.kabinetImage, d.kabinetImage),
    home: {
      headline: pick(remote.home?.headline, d.home.headline ?? ""),
      lead: pick(remote.home?.lead, d.home.lead ?? ""),
    },
    about: pick(remote.about, d.about),
    vision: pick(remote.vision, d.vision),
    missions: remote.missions?.length ? remote.missions : d.missions,
    divisions: (Object.keys(DIVISION_COLORS) as Division[]).map((code) => ({
      code,
      color: DIVISION_COLORS[code],
      name: pick(remote.divisions?.[code]?.name, d.divisions[code].name),
      description: pick(remote.divisions?.[code]?.description, d.divisions[code].description),
      photo: pick(remote.divisions?.[code]?.photo, d.divisions[code].photo),
    })),
    socials: {
      instagram: pick(remote.socials?.instagram, d.socials.instagram ?? ""),
      youtube: pick(remote.socials?.youtube, d.socials.youtube ?? ""),
      linkedin: pick(remote.socials?.linkedin, d.socials.linkedin ?? ""),
      tiktok: pick(remote.socials?.tiktok, d.socials.tiktok ?? ""),
    },
    latest: (remote.latest ?? d.latest).filter((l) => l.title),
    sections: {
      latest: remote.sections?.latest ?? d.sections.latest ?? true,
      // Stored as `pengurus` for backwards compatibility: "show member cards".
      members: remote.sections?.pengurus ?? d.sections.pengurus ?? false,
    },
    prokers,
    members,
  };
}

export type Site = ReturnType<typeof buildSite>;
export type SiteDivision = Site["divisions"][number];

const SiteContext = createContext<Site>(buildSite({}, [], [], "loading"));

export function SiteProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<Site>(() => buildSite({}, [], [], SUPABASE_URL && SUPABASE_KEY ? "loading" : "offline"));

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_KEY) return;
    let cancelled = false;
    Promise.all([
      rest<{ content: SiteContent }[]>("site_settings?select=content&id=eq.1"),
      rest<PublicProker[]>("public_prokers?select=*&order=date.asc"),
      // Members need the 20261008 migration; the rest of the site works without it.
      rest<PublicMember[]>("public_members?select=*&order=name.asc").catch(() => [] as PublicMember[]),
    ])
      .then(([settings, prokers, members]) => {
        if (!cancelled) setSite(buildSite(settings[0]?.content ?? {}, prokers, members, "live"));
      })
      .catch((err) => {
        console.warn("Falling back to built-in content:", err);
        if (!cancelled) setSite(buildSite({}, [], [], "offline"));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export function useSite() {
  return useContext(SiteContext);
}
