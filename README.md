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
- `/` Beranda: welcome + group photo, Divisi Kami, Terbaru
- `/overview` Tentang Kami: about, visi & misi, pengurus, contact
- `/proker`: published prokers, filter by status, division, search (`?divisi=AKSI` works)
- `/materi`: materi library + upload form (upload disabled until storage exists)

## Where things live
- `src/site.tsx`: loads `site_settings`, `public_prokers`, `public_pengurus` from Supabase and merges with defaults
- `src/content.ts`: fallback content, types (`SiteContent` mirrors `proker-hub/src/lib/siteContent.ts`), division colors
- `src/components/common.tsx`: shared layout pieces; `src/components/ui/`: shadcn components copied from the dashboard

Database setup, the security model and the **UI direction** (structure from ppiunimalaya.id, visual style from the dashboard) are documented in [`proker-hub/docs/PUBLIC_WEBSITE.md`](https://github.com/FadhieZzen13/proker-hub/blob/public-site-admin/docs/PUBLIC_WEBSITE.md). Read it before changing the UI.
