// Materi library: approved items come from the public_materi view; submissions go through the
// dashboard's `materi` Edge Function and wait for an admin / AKSI to approve them.
import type { MateriCategory } from "./content";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
export const MATERI_READY = !!SUPABASE_URL && !!SUPABASE_KEY;

export const MAX_MB = 20;
export const ACCEPT = ".pdf,.doc,.docx,.ppt,.pptx";

export interface Materi {
  id: string;
  title: string;
  faculty: string;
  course: string;
  category: MateriCategory;
  uploader_name: string;
  intake: string;
  link_url: string | null;
  file_path: string | null;
  file_name: string | null;
  file_size: number | null;
  approved_at: string | null;
}

const headers = () => ({ apikey: SUPABASE_KEY!, Authorization: `Bearer ${SUPABASE_KEY}` });

export async function fetchMateri(): Promise<Materi[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/public_materi?select=*&order=approved_at.desc`, { headers: headers() });
  if (!res.ok) throw new Error(`materi: ${res.status}`);
  return res.json();
}

export const materiUrl = (m: Materi) =>
  m.link_url ?? `${SUPABASE_URL}/storage/v1/object/public/materi/${(m.file_path ?? "").split("/").map(encodeURIComponent).join("/")}`;

async function fn<T>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/materi`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Gagal mengirim. Coba lagi.");
  return data as T;
}

export interface Submission {
  title: string;
  faculty: string;
  course: string;
  category: string;
  uploaderName: string;
  intake: string;
}

export async function submitMateri(meta: Submission, source: { file: File } | { link: string }): Promise<void> {
  if ("link" in source) {
    await fn({ action: "submit", ...meta, link: source.link });
    return;
  }
  const { file } = source;
  const r = await fn<{ id: string; bucket: string; path: string; token: string; contentType: string }>({
    action: "submit",
    ...meta,
    file: { name: file.name, size: file.size },
  });
  const key = r.path.split("/").map(encodeURIComponent).join("/");
  const up = await fetch(`${SUPABASE_URL}/storage/v1/object/upload/sign/${r.bucket}/${key}?token=${encodeURIComponent(r.token)}`, {
    method: "PUT",
    headers: { ...headers(), "Content-Type": r.contentType },
    body: file,
  });
  if (!up.ok) throw new Error("Upload file gagal. Coba lagi.");
  await fn({ action: "finish", id: r.id });
}
