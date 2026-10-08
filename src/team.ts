import type { Division } from "./content";

// Per-member posts from the Kabinet Prabhadhara IG series (public/members/*.jpg).
// Division, role and nickname are printed on each photo; this list mirrors them.
// The site matches these to dashboard members (same division + nickname in name)
// to add full name, batch and faculty. Order = order in the IG series.
export interface TeamPhoto {
  division: Division;
  nickname: string;
  role: string;
  photo: string;
}

export const TEAM_PHOTOS: TeamPhoto[] = [
  { division: "BPH", nickname: "Mikail", role: "Ketua Umum", photo: "/members/bph-mikail.jpg" },
  { division: "BPH", nickname: "Fadhie", role: "Wakil Ketua Umum I", photo: "/members/bph-fadhie.jpg" },
  { division: "BPH", nickname: "Sidqin", role: "Wakil Ketua Umum II", photo: "/members/bph-sidqin.jpg" },
  { division: "BPH", nickname: "Kayla", role: "Sekretaris I", photo: "/members/bph-kayla.jpg" },
  { division: "BPH", nickname: "Harist", role: "Sekretaris II", photo: "/members/bph-harist.jpg" },
  { division: "BPH", nickname: "Indira", role: "Bendahara", photo: "/members/bph-indira.jpg" },
  { division: "MEDIFO", nickname: "Atha", role: "Ketua Departemen", photo: "/members/medifo-atha.jpg" },
  { division: "MEDIFO", nickname: "Oca", role: "Wakil Ketua Departemen", photo: "/members/medifo-oca.jpg" },
  { division: "MEDIFO", nickname: "Niki", role: "Anggota", photo: "/members/medifo-niki.jpg" },
  { division: "MEDIFO", nickname: "Tiera", role: "Anggota", photo: "/members/medifo-tiera.jpg" },
  { division: "MEDIFO", nickname: "Habib", role: "Anggota", photo: "/members/medifo-habib.jpg" },
  { division: "MEDIFO", nickname: "Fabs", role: "Anggota", photo: "/members/medifo-fabs.jpg" },
  { division: "MEDIFO", nickname: "Merssal", role: "Anggota", photo: "/members/medifo-merssal.jpg" },
  { division: "AKSI", nickname: "Haryo", role: "Ketua Departemen", photo: "/members/aksi-haryo.jpg" },
  { division: "AKSI", nickname: "Icha", role: "Wakil Ketua Departemen", photo: "/members/aksi-icha.jpg" },
  { division: "AKSI", nickname: "Sadira", role: "Anggota", photo: "/members/aksi-sadira.jpg" },
  { division: "AKSI", nickname: "Cleo", role: "Anggota", photo: "/members/aksi-cleo.jpg" },
  { division: "AKSI", nickname: "Hanif", role: "Anggota", photo: "/members/aksi-hanif.jpg" },
  { division: "AKSI", nickname: "Arib", role: "Anggota", photo: "/members/aksi-arib.jpg" },
  { division: "AKSI", nickname: "Dani", role: "Anggota", photo: "/members/aksi-dani.jpg" },
  { division: "POSDM", nickname: "Thoriq", role: "Ketua Departemen", photo: "/members/posdm-thoriq.jpg" },
  { division: "POSDM", nickname: "Sabrina", role: "Wakil Ketua Departemen", photo: "/members/posdm-sabrina.jpg" },
  { division: "POSDM", nickname: "Gani", role: "Anggota", photo: "/members/posdm-gani.jpg" },
  { division: "POSDM", nickname: "Shea", role: "Anggota", photo: "/members/posdm-shea.jpg" },
  { division: "POSDM", nickname: "Ocan", role: "Anggota", photo: "/members/posdm-ocan.jpg" },
  { division: "HUMAS", nickname: "Dhafin", role: "Ketua Departemen", photo: "/members/humas-dhafin.jpg" },
  { division: "HUMAS", nickname: "Syofia", role: "Wakil Ketua Departemen", photo: "/members/humas-syofia.jpg" },
  { division: "HUMAS", nickname: "Syakira", role: "Anggota", photo: "/members/humas-syakira.jpg" },
  { division: "HUMAS", nickname: "Radhwa", role: "Anggota", photo: "/members/humas-radhwa.jpg" },
  { division: "HUMAS", nickname: "Abel", role: "Anggota", photo: "/members/humas-abel.jpg" },
  { division: "HUMAS", nickname: "Daffa", role: "Anggota", photo: "/members/humas-daffa.jpg" },
  { division: "HUMAS", nickname: "Humaidy", role: "Anggota", photo: "/members/humas-humaidy.jpg" },
  { division: "HUMAS", nickname: "Faiz", role: "Anggota", photo: "/members/humas-faiz.jpg" },
  { division: "ROMAS", nickname: "Silvia", role: "Ketua Departemen", photo: "/members/romas-silvia.jpg" },
  { division: "ROMAS", nickname: "Aya", role: "Wakil Ketua Departemen", photo: "/members/romas-aya.jpg" },
  { division: "ROMAS", nickname: "Rere", role: "Anggota", photo: "/members/romas-rere.jpg" },
  { division: "ROMAS", nickname: "Clarissa", role: "Anggota", photo: "/members/romas-clarissa.jpg" },
  { division: "ROMAS", nickname: "Hafiza", role: "Anggota", photo: "/members/romas-hafiza.jpg" },
  { division: "ROMAS", nickname: "Nafis", role: "Anggota", photo: "/members/romas-nafis.jpg" },
  { division: "ROMAS", nickname: "Dimas", role: "Anggota", photo: "/members/romas-dimas.jpg" },
  { division: "ROMAS", nickname: "Jaqitho", role: "Anggota", photo: "/members/romas-jaqitho.jpg" },
  { division: "DANUS", nickname: "Dhina", role: "Ketua Departemen", photo: "/members/danus-dhina.jpg" },
  { division: "DANUS", nickname: "Ratu", role: "Wakil Ketua Departemen", photo: "/members/danus-ratu.jpg" },
  { division: "DANUS", nickname: "Alyyah", role: "Anggota", photo: "/members/danus-alyyah.jpg" },
  { division: "DANUS", nickname: "Nova", role: "Anggota", photo: "/members/danus-nova.jpg" },
  { division: "DANUS", nickname: "Fildza", role: "Anggota", photo: "/members/danus-fildza.jpg" },
  { division: "DANUS", nickname: "Zara", role: "Anggota", photo: "/members/danus-zara.jpg" },
  { division: "DANUS", nickname: "Hilmi", role: "Anggota", photo: "/members/danus-hilmi.jpg" },
  { division: "SEBURA", nickname: "Dimas", role: "Ketua Departemen", photo: "/members/sebura-dimas.jpg" },
  { division: "SEBURA", nickname: "Zakee", role: "Wakil Ketua Departemen", photo: "/members/sebura-zakee.jpg" },
  { division: "SEBURA", nickname: "Arin", role: "Anggota", photo: "/members/sebura-arin.jpg" },
  { division: "SEBURA", nickname: "Kia", role: "Anggota", photo: "/members/sebura-kia.jpg" },
  { division: "SEBURA", nickname: "Habib", role: "Anggota", photo: "/members/sebura-habib.jpg" },
];

/** One card in a division's member carousel. */
export interface TeamCard {
  key: string;
  photo: string; // "" = show initials
  name: string; // full name from the dashboard when matched, else the nickname on the photo
  role: string;
  detail: string; // "Angkatan 2023 · Fakulti ..." when matched, else ""
}

interface MemberRow {
  id: string;
  name: string;
  division: string;
  position: string;
  intake: number;
  faculty: string;
  photo_url: string;
}

// Photo role -> dashboard `position`, used when the nickname isn't in the member's name.
const ROLE_TO_POSITION: Record<string, string> = {
  "Ketua Departemen": "Kadep",
  "Wakil Ketua Departemen": "Wakadep",
  Bendahara: "Bendahara",
};

const POSITION_LABEL: Record<string, string> = {
  Kadep: "Ketua Departemen",
  Wakadep: "Wakil Ketua Departemen",
  Secretary: "Sekretaris",
  Bendahara: "Bendahara",
  Staff: "Anggota",
};

const nameMatches = (fullName: string, nickname: string) => {
  const nick = nickname.toLowerCase();
  return fullName
    .toLowerCase()
    .split(/\s+/)
    .some((t) => t === nick || (t.length >= 3 && (t.startsWith(nick) || nick.startsWith(t))));
};

const detailOf = (m: MemberRow) => `Angkatan ${m.intake}${m.faculty ? ` · ${m.faculty}` : ""}`;

/**
 * Carousel cards for one division: every IG photo, enriched with dashboard data when
 * `members` is non-empty (admin toggle on + migration run), then any dashboard members
 * that have no IG photo.
 */
export function buildTeam(division: string, members: MemberRow[]): TeamCard[] {
  const pool = members.filter((m) => m.division === division);
  const used = new Set<string>();
  const take = (m: MemberRow | undefined) => (m && !used.has(m.id) ? (used.add(m.id), m) : undefined);

  const cards: TeamCard[] = TEAM_PHOTOS.filter((p) => p.division === division).map((p) => {
    const free = pool.filter((m) => !used.has(m.id));
    const byName = free.filter((m) => nameMatches(m.name, p.nickname));
    const position = ROLE_TO_POSITION[p.role];
    const byRole = position ? free.filter((m) => m.position === position) : [];
    const match = take(byName.length === 1 ? byName[0] : byRole.length === 1 ? byRole[0] : undefined);
    return {
      key: p.photo,
      photo: match?.photo_url || p.photo,
      name: match?.name ?? p.nickname,
      role: p.role,
      detail: match ? detailOf(match) : "",
    };
  });

  for (const m of pool) {
    if (used.has(m.id)) continue;
    cards.push({ key: m.id, photo: m.photo_url, name: m.name, role: POSITION_LABEL[m.position] ?? m.position, detail: detailOf(m) });
  }
  return cards;
}
