import type React from "react";
import { Link } from "react-router-dom";
import type { Division } from "@/content";
import { useSite } from "@/site";
import { DivisionPhoto } from "./common";

// 3x3 cells, row by row: clockwise from the top (BPH) around the Kabinet artwork.
// Each tile is slightly tilted and the corners are nudged toward the center, so the
// eight divisions read as a loose, hand-placed circle rather than a strict grid.
const CELLS: { code: Division | "KABINET"; tilt: number; dx: number; dy: number }[] = [
  { code: "MEDIFO", tilt: 2.5, dx: 7, dy: 7 },
  { code: "BPH", tilt: -3, dx: 0, dy: -2 },
  { code: "AKSI", tilt: 2.5, dx: -7, dy: 7 },
  { code: "SEBURA", tilt: -3, dx: -3, dy: 0 },
  { code: "KABINET", tilt: 0, dx: 0, dy: 0 },
  { code: "POSDM", tilt: -2, dx: 3, dy: 0 },
  { code: "DANUS", tilt: 2, dx: 7, dy: -7 },
  { code: "HUMAS", tilt: -2.5, dx: 0, dy: 2 },
  { code: "ROMAS", tilt: 3, dx: -7, dy: -7 },
];

/** Kabinet artwork in the center cell, the 8 divisions around it. Frameless, like the IG posts. */
export function KabinetGrid({ className = "" }: { className?: string }) {
  const site = useSite();
  return (
    <div className={`mx-auto grid max-w-3xl grid-cols-3 gap-2 sm:gap-6 ${className}`}>
      {CELLS.map(({ code, tilt, dx, dy }) => {
        if (code === "KABINET") {
          return (
            <div key={code} className="aspect-[4/5] flex items-center justify-center">
              <img src={site.kabinetImage} alt={`Kabinet Prabhadhara ${site.term}`} className="w-full object-contain" />
            </div>
          );
        }
        const d = site.divisions.find((x) => x.code === code)!;
        const place = { "--tilt": `${tilt}deg`, "--dx": `${dx}%`, "--dy": `${dy}%` } as React.CSSProperties;
        return (
          <Link
            key={code}
            to={`/divisi/${code}`}
            aria-label={`Divisi ${code}`}
            className="group relative aspect-[4/5] rounded-md hover:z-10 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div
              style={place}
              className="h-full w-full transition-transform duration-300 ease-out [transform:translate(var(--dx),var(--dy))_rotate(var(--tilt))] group-hover:[transform:translate(var(--dx),var(--dy))_rotate(0deg)_scale(1.07)]"
            >
              <DivisionPhoto division={d} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
