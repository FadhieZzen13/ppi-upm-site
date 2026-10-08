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

/** Row of the public_members view (no phone / birth date / password). */
export interface PublicMember {
  id: string;
  name: string;
  division: string;
  position: string; // Kadep | Wakadep | Secretary | Bendahara | Staff
  intake: number;
  faculty: string;
  photo_url: string;
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
  heroImage?: string;
  kabinetImage?: string;
  home?: { eyebrow?: string; headline?: string; lead?: string };
  about?: string;
  vision?: string;
  missions?: string[];
  stats?: { label: string; value: string }[];
  divisions?: Record<string, { name?: string; description?: string; photo?: string }>;
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

/** Order of the 8 tiles around the Kabinet image, clockwise from the top. */
export const RING_ORDER: Division[] = ["BPH", "AKSI", "POSDM", "ROMAS", "HUMAS", "DANUS", "SEBURA", "MEDIFO"];

export function divisionColor(code: string): string {
  return DIVISION_COLORS[code as Division] ?? "#6b7280";
}

export const DEFAULT_CONTENT: Required<Omit<SiteContent, "divisions">> & {
  divisions: Record<Division, { name: string; description: string; photo: string }>;
} = {
  term: "",
  email: "",
  heroImage: "",
  kabinetImage: "/divisions/kabinet.png", // transparent cut-out of the IG "mid feed" post
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
    BPH: { name: "Badan Pengurus Harian", description: "BPH adalah pusat koordinasi PPI UPM. BPH memastikan setiap divisi bergerak searah dengan visi kabinet, mengawal program kerja dari perencanaan sampai evaluasi, dan mewakili PPI UPM di hadapan kampus, KBRI, serta mitra.", photo: "/divisions/bph.jpg" },
    AKSI: { name: "Akademik Mahasiswa", description: "AKSI hadir untuk mendukung perjalanan studi pelajar Indonesia di UPM. Lewat sharing session, diskusi akademik, serta info beasiswa dan peluang riset, AKSI membantu teman-teman berkembang di kelas maupun di luar kelas.", photo: "/divisions/aksi.jpg" },
    POSDM: { name: "Pembangunan Organisasi dan Sumber Daya Manusia", description: "POSDM menjaga agar PPI UPM tumbuh sehat dari dalam. Divisi ini mengembangkan potensi setiap anggota lewat pelatihan, upgrading, dan evaluasi kinerja, sekaligus merawat budaya kerja yang solid dan penuh kekeluargaan.", photo: "/divisions/posdm.jpg" },
    ROMAS: { name: "Rohani dan Masyarakat", description: "ROMAS menjadi ruang untuk menumbuhkan nilai spiritual dan kepedulian sosial. Lewat kegiatan keagamaan, aksi sosial, dan program pengabdian, ROMAS mengajak pelajar Indonesia di UPM untuk hadir dan bermanfaat bagi sesama.", photo: "/divisions/romas.jpg" },
    HUMAS: { name: "Hubungan Masyarakat", description: "HUMAS menjembatani PPI UPM dengan dunia luar. Divisi ini membangun dan merawat hubungan dengan PPI kampus lain, KBRI, organisasi mahasiswa, dan berbagai mitra, supaya PPI UPM selalu terhubung dan dikenal baik.", photo: "/divisions/humas.jpg" },
    DANUS: { name: "Dana Usaha", description: "DANUS menjaga roda keuangan PPI UPM tetap berputar. Lewat usaha kreatif, penjualan merchandise, dan kerja sama sponsor, DANUS menggalang dana mandiri agar setiap program kerja bisa berjalan maksimal.", photo: "/divisions/danus.jpg" },
    SEBURA: { name: "Seni, Budaya, dan Olahraga", description: "SEBURA adalah ruang berekspresi pelajar Indonesia di UPM. Dari pentas seni dan pengenalan budaya Indonesia sampai turnamen olahraga, SEBURA menghadirkan kegiatan yang menyatukan, menyenangkan, dan membawa semangat Indonesia di negeri orang.", photo: "/divisions/sebura.jpg" },
    MEDIFO: { name: "Media dan Informasi", description: "MEDIFO adalah dapur kreatif PPI UPM. Divisi ini membuat poster, konten media sosial, foto, dan video, serta mendokumentasikan setiap kegiatan agar informasi PPI UPM tersampaikan dengan menarik dan konsisten.", photo: "/divisions/medifo.jpg" },
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
