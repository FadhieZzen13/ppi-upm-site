# PPI UPM public site

Public info website for Persatuan Pelajar Indonesia Universiti Putra Malaysia. Content and prokers come from the PPI dashboard ([proker-hub](https://github.com/FadhieZzen13/proker-hub)); admins manage them there under **Public Website**.

## Run

```
cp .env.example .env   # same Supabase URL + anon key as proker-hub/.env
npm install
npm run dev
```

Without `.env` the site still runs, using the fallback content in `src/content.ts`.

## Pages
- `/` Beranda: welcome, looping strip of member portraits, Kabinet at a glance (divisi / anggota / proker counts), Terbaru
- `/overview` Tentang Kami: about, visi & misi, the Kabinet Prabhadhara 3x3 (Kabinet artwork in the middle, 8 divisions around it), contact
- `/divisi/:code`: division photo header, about, member carousel (IG portraits, enriched with name / batch / faculty from the dashboard when enabled), the division's prokers
- `/proker`: published prokers, filter by status, division, search (`?divisi=AKSI` works)
- `/materi`: materi library + upload form (upload disabled until storage exists)

## Photos
Originals from the Kabinet Prabhadhara IG series, resized for the web: `public/divisions/` (division posts + `kabinet.png`, a transparent cut-out) and `public/members/` (per-member posts, plus small `thumbs/` for the home strip). Members are listed in `src/team.ts`; to add one, drop the image in and add a line there.

## Sharing a preview
`npm run build && npm run preview -- --host` serves the optimised build. `vite.config.ts` allows ngrok and Tailscale Funnel hostnames, so either tunnel can point at it. Prefer Funnel: ngrok's free warning page shows blank in browsers with built-in blockers.

## Where things live
- `src/site.tsx`: loads `site_settings`, `public_prokers`, `public_pengurus` from Supabase and merges with defaults
- `src/content.ts`: fallback content, types (`SiteContent` mirrors `proker-hub/src/lib/siteContent.ts`), division colors
- `src/components/common.tsx`: shared layout pieces; `KabinetGrid.tsx`, `MemberStrip.tsx`, `KabinetGlance.tsx`: Tentang Kami grid and Beranda sections; `src/components/ui/`: shadcn components copied from the dashboard

Database setup, the security model and the **UI direction** (structure from ppiunimalaya.id, visual style from the dashboard) are documented in [`proker-hub/docs/PUBLIC_WEBSITE.md`](https://github.com/FadhieZzen13/proker-hub/blob/public-site-admin/docs/PUBLIC_WEBSITE.md). Read it before changing the UI.
