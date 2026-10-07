import { useMemo, useState } from "react";
import { AlertTriangle, Download, FileText, FolderOpen, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MATERI, MATERI_CATEGORIES, type MateriCategory } from "@/content";
import { Container, Heading, EmptyState } from "@/components/common";

// Upload needs a storage backend (e.g. Supabase Storage + a `materi` table) before it can go live.
const UPLOAD_ENABLED = false;

const selectClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const labelClass = "text-xs font-medium text-foreground";

export default function MateriPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MateriCategory | "all">("all");
  const [fileName, setFileName] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MATERI.filter(
      (m) =>
        (category === "all" || m.category === category) &&
        (!q || [m.title, m.faculty, m.course, m.uploader].some((v) => v.toLowerCase().includes(q)))
    );
  }, [query, category]);

  return (
    <Container className="py-14 sm:py-20">
      <Heading
        as="h1"
        title="Materi"
        intro={<p>Kumpulan catatan kuliah, soal, dan referensi yang dibagikan alumni dan kating untuk adik tingkat.</p>}
        className="mb-10"
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
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

          {items.length === 0 ? (
            <EmptyState icon={FolderOpen} title="Belum ada materi" hint="Materi dari alumni dan kating akan tampil di sini." />
          ) : (
            <Card className="border-border/60 shadow-card divide-y divide-border">
              {items.map((m) => (
                <div key={m.id} className="flex items-center gap-3 p-4">
                  <FileText className="h-5 w-5 text-primary shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground truncate">{m.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{m.course} · {m.faculty} · {m.uploader} ({m.intake})</p>
                  </div>
                  <Badge variant="secondary" className="hidden sm:inline-flex text-[10px]">{m.category}</Badge>
                  <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                    <a href={m.url} target="_blank" rel="noreferrer" aria-label={`Unduh ${m.title}`}><Download className="h-4 w-4" /></a>
                  </Button>
                </div>
              ))}
            </Card>
          )}
        </section>

        <Card className="border-border/60 shadow-card lg:sticky lg:top-20">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Upload className="h-4 w-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">Upload materi</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Untuk alumni dan kating.</p>

            {!UPLOAD_ENABLED && (
              <div className="mb-4 rounded-lg border border-amber-300/70 bg-amber-50/50 p-3 flex gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">Upload belum aktif. Form ini dibuka setelah penyimpanan file tersambung.</p>
              </div>
            )}

            <form onSubmit={(e) => e.preventDefault()}>
              <fieldset disabled={!UPLOAD_ENABLED} className="space-y-3 disabled:opacity-60">
                <div className="space-y-1.5">
                  <label className={labelClass} htmlFor="m-title">Judul</label>
                  <Input id="m-title" placeholder="Rangkuman Kalkulus I" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className={labelClass} htmlFor="m-faculty">Fakultas</label>
                    <Input id="m-faculty" />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass} htmlFor="m-course">Mata kuliah</label>
                    <Input id="m-course" placeholder="Kode" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass} htmlFor="m-cat">Kategori</label>
                  <select id="m-cat" className={selectClass} defaultValue="">
                    <option value="" disabled>Pilih kategori</option>
                    {MATERI_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className={labelClass} htmlFor="m-name">Nama</label>
                    <Input id="m-name" />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass} htmlFor="m-intake">Angkatan</label>
                    <Input id="m-intake" placeholder="2022" inputMode="numeric" />
                  </div>
                </div>
                <label className="flex items-center gap-2 rounded-md border border-dashed border-input px-3 py-3 cursor-pointer hover:border-primary/40 transition-colors">
                  <Upload className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground truncate">{fileName || "Pilih file (PDF, DOCX, PPTX)"}</span>
                  <input type="file" className="sr-only" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
                </label>
                <Button type="submit" className="w-full">Kirim materi</Button>
              </fieldset>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
