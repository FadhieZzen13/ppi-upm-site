// Fallback content. The live site loads content and prokers from the dashboard's
// database (see src/site.tsx); admins edit them in the dashboard under
// "Public Website". These defaults show when the database is unreachable or a
// field hasn't been filled in yet.

export type Division = "BPH" | "AKSI" | "POSDM" | "ROMAS" | "HUMAS" | "DANUS" | "SEBURA" | "MEDIFO";
export type ProkerStatus = "upcoming" | "ongoing" | "done";

export interface PublicProker {
  id: string;
  name: string;
  division: Division;
  collab_divisions?: string[];
  date: string; // ISO date
  status: ProkerStatus;
  description: string;
  type: "Internal" | "External";
}

export interface Pengurus {
  name: string;
  division: string;
  position: "Kadep" | "Wakadep";
}

export interface LatestItem {
  id: string;
  title: string;
  kind: string;
  url: string;
  image: string;
}

/** Shape of site_settings.content in the dashboard DB. Mirrors proker-hub/src/lib/siteContent.ts. */
export interface SiteContent {
  term?: string;
  email?: string;
  dashboardUrl?: string;
  heroImage?: string;
  home?: { eyebrow?: string; headline?: string; lead?: string };
  about?: string;
  vision?: string;
  missions?: string[];
  stats?: { label: string; value: string }[];
  divisions?: Record<string, { name?: string; description?: string }>;
  socials?: { instagram?: string; youtube?: string; linkedin?: string; tiktok?: string };
  latest?: LatestItem[];
  sections?: { latest?: boolean; pengurus?: boolean };
}

export const SITE = {
  shortName: "PPI UPM",
  fullName: "Persatuan Pelajar Indonesia Universiti Putra Malaysia",
  location: "Serdang, Selangor, Malaysia",
};

// Same palette as proker-hub/src/lib/divisionColors.ts
export const DIVISION_COLORS: Record<Division, string> = {
  BPH: "#ba1a14",
  AKSI: "#2563eb",
  POSDM: "#7c3aed",
  ROMAS: "#0d9488",
  HUMAS: "#ea580c",
  DANUS: "#16a34a",
  SEBURA: "#db2777",
  MEDIFO: "#4f46e5",
};

export function divisionColor(code: string): string {
  return DIVISION_COLORS[code as Division] ?? "#6b7280";
}

export const DEFAULT_CONTENT: Required<Omit<SiteContent, "divisions">> & {
  divisions: Record<Division, { name: string; description: string }>;
} = {
  term: "",
  email: "",
  dashboardUrl: "",
  heroImage: "",
  home: {
    eyebrow: "",
    headline: "Selamat Datang",
    lead: "Persatuan Pelajar Indonesia Universiti Putra Malaysia (PPI UPM) adalah wadah bagi pelajar Indonesia yang menempuh studi di UPM. Temukan informasi kegiatan, program kerja, dan materi kuliah di sini.",
  },
  about: "",
  vision: "",
  missions: [],
  stats: [],
  divisions: {
    BPH: { name: "Badan Pengurus Harian", description: "" },
    AKSI: { name: "", description: "" },
    POSDM: { name: "", description: "" },
    ROMAS: { name: "", description: "" },
    HUMAS: { name: "Hubungan Masyarakat", description: "" },
    DANUS: { name: "Dana Usaha", description: "" },
    SEBURA: { name: "Seni & Budaya", description: "" },
    MEDIFO: { name: "Media & Informasi", description: "" },
  },
  socials: { instagram: "", youtube: "", linkedin: "", tiktok: "" },
  latest: [],
  sections: { latest: true, pengurus: false },
};

export const MATERI_CATEGORIES = ["Catatan Kuliah", "Soal Ujian", "Skripsi / Tesis", "Beasiswa", "Lainnya"] as const;
export type MateriCategory = (typeof MATERI_CATEGORIES)[number];

export interface Materi {
  id: string;
  title: string;
  faculty: string;
  course: string;
  category: MateriCategory;
  uploader: string; // alumni / kating name
  intake: string; // angkatan
  url: string;
}

export const MATERI: Materi[] = [];
