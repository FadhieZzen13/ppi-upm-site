import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Download, ExternalLink, FileText, FolderOpen, Link2, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MATERI_CATEGORIES, type MateriCategory } from "@/content";
import { ACCEPT, MATERI_READY, MAX_MB, fetchMateri, materiUrl, submitMateri, type Materi } from "@/materi";
import { Container, Heading, EmptyState } from "@/components/common";

const selectClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-base sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const labelClass = "text-xs font-medium text-foreground";

export default function MateriPage() {
  const [items, setItems] = useState<Materi[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MateriCategory | "all">("all");

  useEffect(() => {
    if (!MATERI_READY) return setItems([]);
    fetchMateri()
      .then(setItems)
      .catch(() => { setItems([]); setLoadError(true); });
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (items ?? []).filter(
      (m) =>
        (category === "all" || m.category === category) &&
        (!q || [m.title, m.faculty, m.course, m.uploader_name].some((v) => v.toLowerCase().includes(q)))
    );
  }, [items, query, category]);

  return (
    <Container className="py-14 sm:py-20">
      <Heading
        as="h1"
        title="Materi"
        intro={<p>Kumpulan catatan kuliah, soal, dan referensi yang dibagikan alumni dan kating untuk adik tingkat.</p>}
        className="mb-10"
      />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <section>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari judul, fakultas, mata kuliah..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <select className={`${selectClass} sm:w-48`} value={category} onChange={(e) => setCategory(e.target.value as MateriCategory | "all")} aria-label="Kategori">
              <option value="all">Semua kategori</option>
              {MATERI_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {items === null ? (
            <Card className="border-border/60 shadow-card divide-y divide-border">
              {[0, 1, 2].map((i) => <div key={i} className="p-4"><Skeleton className="h-10 w-full" /></div>)}
            </Card>
          ) : shown.length === 0 ? (
            <EmptyState
              icon={FolderOpen}
              title={items.length ? "Tidak ada yang cocok" : "Belum ada materi"}
              hint={loadError ? "Materi belum bisa dimuat. Coba lagi nanti." : items.length ? "Coba kata kunci atau kategori lain." : "Materi dari alumni dan kating akan tampil di sini."}
            />
          ) : (
            <Card className="border-border/60 shadow-card divide-y divide-border">
              {shown.map((m) => {
                const isLink = !!m.link_url;
                return (
                  <a key={m.id} href={materiUrl(m)} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 hover:bg-muted/40 transition-colors">
                    {isLink ? <Link2 className="h-5 w-5 text-primary shrink-0" /> : <FileText className="h-5 w-5 text-primary shrink-0" />}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground truncate">{m.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {[m.course, m.faculty, m.intake ? `${m.uploader_name} (${m.intake})` : m.uploader_name].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <Badge variant="secondary" className="hidden sm:inline-flex text-xs">{m.category}</Badge>
                    <span className="h-8 w-8 inline-flex items-center justify-center text-muted-foreground" aria-label={isLink ? `Buka ${m.title}` : `Unduh ${m.title}`}>
                      {isLink ? <ExternalLink className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                    </span>
                  </a>
                );
              })}
            </Card>
          )}
        </section>

        <UploadCard />
      </div>
    </Container>
  );
}

const EMPTY = { title: "", faculty: "", course: "", category: "", uploaderName: "", intake: "", link: "" };

function UploadCard() {
  const [form, setForm] = useState(EMPTY);
  const [mode, setMode] = useState<"file" | "link">("file");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setError("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim() || !form.uploaderName.trim() || !form.category) return setError("Judul, kategori, dan nama wajib diisi.");
    if (mode === "file" && !file) return setError("Pilih file dulu.");
    if (mode === "file" && file && file.size > MAX_MB * 1024 * 1024) return setError(`Ukuran file maksimal ${MAX_MB} MB.`);
    if (mode === "link" && !/^https?:\/\//i.test(form.link.trim())) return setError("Link harus diawali https://");
    setBusy(true);
    try {
      const { link, ...meta } = form;
      await submitMateri(meta, mode === "file" ? { file: file! } : { link: link.trim() });
      setSent(true);
      setForm(EMPTY);
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="border-border/60 shadow-card lg:sticky lg:top-20">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <Upload className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Upload materi</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Untuk alumni dan kating. Materi dicek dulu oleh PPI UPM sebelum tampil.</p>

        {sent ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-green-300 bg-green-50/60 p-3 flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-700 shrink-0 mt-0.5" />
              <p className="text-xs text-foreground">Terima kasih! Materi kamu sudah terkirim dan akan tampil setelah dicek.</p>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setSent(false)}>Kirim materi lain</Button>
          </div>
        ) : !MATERI_READY ? (
          <p className="text-xs text-muted-foreground">Upload belum tersedia.</p>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <div className="space-y-1.5">
              <label className={labelClass} htmlFor="m-title">Judul</label>
              <Input id="m-title" placeholder="Rangkuman Kalkulus I" value={form.title} onChange={set("title")} maxLength={120} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className={labelClass} htmlFor="m-faculty">Fakultas</label>
                <Input id="m-faculty" value={form.faculty} onChange={set("faculty")} maxLength={80} />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass} htmlFor="m-course">Mata kuliah</label>
                <Input id="m-course" placeholder="Kode" value={form.course} onChange={set("course")} maxLength={80} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className={labelClass} htmlFor="m-cat">Kategori</label>
              <select id="m-cat" className={selectClass} value={form.category} onChange={set("category")}>
                <option value="" disabled>Pilih kategori</option>
                {MATERI_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className={labelClass} htmlFor="m-name">Nama</label>
                <Input id="m-name" value={form.uploaderName} onChange={set("uploaderName")} maxLength={80} />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass} htmlFor="m-intake">Angkatan</label>
                <Input id="m-intake" placeholder="2022" inputMode="numeric" value={form.intake} onChange={set("intake")} maxLength={10} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 rounded-md bg-muted p-1" role="tablist">
              {(["file", "link"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => { setMode(m); setError(""); }}
                  className={`rounded px-2 py-2.5 text-sm font-medium transition-colors ${mode === m ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {m === "file" ? "Upload file" : "Pakai link"}
                </button>
              ))}
            </div>

            {mode === "file" ? (
              <label className="flex items-center gap-2 rounded-md border border-dashed border-input px-3 py-3 cursor-pointer hover:border-primary/40 transition-colors">
                <Upload className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground truncate">{file?.name || `Pilih file (PDF, DOCX, PPTX, maks ${MAX_MB} MB)`}</span>
                <input ref={fileInput} type="file" className="sr-only" accept={ACCEPT} onChange={(e) => { setFile(e.target.files?.[0] ?? null); setError(""); }} />
              </label>
            ) : (
              <div className="space-y-1.5">
                <label className={labelClass} htmlFor="m-link">Link Google Drive / OneDrive</label>
                <Input id="m-link" placeholder="https://drive.google.com/..." value={form.link} onChange={set("link")} maxLength={500} />
                <p className="text-xs text-muted-foreground">Pastikan aksesnya "Anyone with the link".</p>
              </div>
            )}

            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={busy}>{busy ? "Mengirim…" : "Kirim materi"}</Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
