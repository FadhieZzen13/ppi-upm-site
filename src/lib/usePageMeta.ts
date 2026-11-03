import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://ppimupm.top";
const DEFAULT_TITLE = "PPI UPM | Persatuan Pelajar Indonesia Universiti Putra Malaysia";
const DEFAULT_DESCRIPTION =
  "Persatuan Pelajar Indonesia Universiti Putra Malaysia (PPI UPM), wadah pelajar Indonesia di UPM. Info kegiatan, program kerja, dan materi kuliah.";

interface PageMeta {
  title?: string;
  description?: string;
  /** Every unknown URL still answers 200 (SPA rewrite), so 404 pages opt out of Google here. */
  noindex?: boolean;
}

/** Google shows about 160 characters, so cut there at a word boundary. */
const clip = (text: string) => (text.length <= 160 ? text : `${text.slice(0, 157).replace(/\s+\S*$/, "")}...`);

function setHeadTag(selector: string, tag: "meta" | "link", attrs: Record<string, string>) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tag);
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
}

/** Per-page title, description and canonical URL. Pass null while the page's data isn't known yet. */
export function usePageMeta(meta: PageMeta | null) {
  const { pathname } = useLocation();
  const title = meta?.title ? `${meta.title} | PPI UPM` : DEFAULT_TITLE;
  const description = clip(meta?.description?.trim() || DEFAULT_DESCRIPTION);
  const noindex = meta?.noindex ?? false;
  const skip = meta === null;

  useEffect(() => {
    if (skip) return;
    document.title = title;
    setHeadTag('meta[name="description"]', "meta", { name: "description", content: description });
    setHeadTag('link[rel="canonical"]', "link", { rel: "canonical", href: SITE_URL + (pathname.replace(/\/+$/, "") || "/") });
    if (!noindex) return;
    setHeadTag('meta[name="robots"]', "meta", { name: "robots", content: "noindex" });
    return () => document.head.querySelector('meta[name="robots"]')?.remove();
  }, [skip, title, description, pathname, noindex]);
}
