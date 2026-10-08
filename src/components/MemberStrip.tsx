import { Link } from "react-router-dom";
import { TEAM_PHOTOS } from "@/team";

const thumb = (photo: string) => photo.replace("/members/", "/members/thumbs/");

/**
 * All member portraits from the IG series in a slow, looping strip.
 * The list is rendered twice and shifted by -50% so the loop is seamless.
 * Pauses on hover/focus; with reduced motion it becomes a still, swipeable row.
 */
export function MemberStrip() {
  const items = [...TEAM_PHOTOS, ...TEAM_PHOTOS];
  return (
    <div
      className="group relative overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      aria-label="Anggota Kabinet Prabhadhara"
    >
      <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none">
        {items.map((p, i) => {
          const duplicate = i >= TEAM_PHOTOS.length;
          return (
            <li key={`${p.photo}-${i}`} className="w-40 sm:w-48 shrink-0 pr-5" aria-hidden={duplicate || undefined}>
              <Link to={`/divisi/${p.division}`} tabIndex={duplicate ? -1 : undefined} className="block">
                <img
                  src={thumb(p.photo)}
                  alt={`${p.nickname}, ${p.role} ${p.division}`}
                  width={320}
                  height={400}
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-300 hover:-translate-y-1"
                />
                <p className="mt-2 text-sm font-bold text-foreground">{p.nickname}</p>
                <p className="text-xs text-muted-foreground">{p.division}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
