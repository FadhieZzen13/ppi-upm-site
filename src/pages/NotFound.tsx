import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-5xl font-extrabold text-primary">404</p>
      <p className="mt-3 text-muted-foreground">Halaman tidak ditemukan.</p>
      <Link to="/" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">Kembali ke beranda</Link>
    </div>
  );
}
