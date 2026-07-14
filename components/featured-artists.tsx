"use client";

import Image from "next/image";
import * as React from "react";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import { MouseParallax } from "@/components/mouse-parallax";
import { RevealGroup } from "@/components/reveal";

type Artist = { name: string; location: string; specialty: string; rating: string; verified?: boolean };

const SLOTS = 4;
const ROTATE_MS = 7000;
const FADE_MS = 300;

// The featured-artist grid as a living marketplace: four visible cards, a
// larger pool behind them, and every few seconds one slot fades through to
// an artist who is not on screen yet. Floats, hover lift, rating glow and a
// "view profile" pill are layered on top; layout matches the old static grid.
export function FeaturedArtists({
  artists,
  photos,
  portfolios,
  alts,
  verifiedLabel,
}: {
  artists: Artist[];
  photos: string[];
  // Per artist: a close-up of a finished look in their specialty, faded in
  // on hover. null hides the effect for artists without a portfolio shot.
  portfolios: (string | null)[];
  alts: string[];
  verifiedLabel: string;
}) {
  const pool = Math.min(artists.length, photos.length, alts.length);
  const visible = Math.min(SLOTS, pool);
  const [slots, setSlots] = React.useState(() => Array.from({ length: visible }, (_, i) => i));
  const [fading, setFading] = React.useState<number | null>(null);
  const [inView, setInView] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const queueRef = React.useRef<number[]>(Array.from({ length: Math.max(0, pool - visible) }, (_, k) => k + visible));
  const tickRef = React.useRef(0);
  const swapTimerRef = React.useRef(0);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  React.useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(node);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const playing = inView && !hidden && !reduced && pool > visible;

  // Rotate one slot at a time: fade its card out, swap in the longest-hidden
  // artist, fade back in. The queue keeps everyone cycling through.
  React.useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const slot = tickRef.current++ % visible;
      setFading(slot);
      swapTimerRef.current = window.setTimeout(() => {
        setSlots((prev) => {
          const incoming = queueRef.current.shift();
          if (incoming === undefined) return prev;
          const next = [...prev];
          queueRef.current.push(next[slot]);
          next[slot] = incoming;
          return next;
        });
        setFading(null);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(swapTimerRef.current);
    };
  }, [playing, visible]);

  return (
    <MouseParallax strength={5} className="relative">
      {/* Soft glow plus a faint radial pool for depth behind the grid */}
      <div aria-hidden className="pointer-events-none absolute -inset-6 -z-10">
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-secondary/50 to-accent/40 blur-2xl" />
        <div className="absolute inset-0 opacity-60 [background:radial-gradient(65%_55%_at_50%_35%,var(--secondary),transparent_72%)]" />
      </div>

      <div ref={rootRef}>
        <RevealGroup as="ul" step={70} className="grid grid-cols-2 gap-3 sm:gap-4">
          {slots.map((a, i) => {
            const artist = artists[a];
            const mid = fading === i && !reduced;
            return (
              // Slot-keyed so the DOM persists and only the content fades.
              <li key={`slot-${i}`}>
                <div className={i % 2 === 0 ? "mua-float-a" : "mua-float-b"} style={{ animationDelay: `${i * 1100}ms` }}>
                  {/* Not a link on purpose: profiles live in the app. */}
                  <div className="mua-card group overflow-hidden rounded-3xl bg-card shadow-sm">
                    <div
                      style={{
                        opacity: mid ? 0 : 1,
                        filter: mid ? "blur(4px)" : "blur(0px)",
                        transform: mid ? "scale(0.985)" : "none",
                        transition: `opacity ${mid ? FADE_MS : 340}ms var(--ease-out), filter ${mid ? FADE_MS : 340}ms var(--ease-out), transform ${mid ? FADE_MS : 340}ms var(--ease-out)`,
                      }}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                        <Image
                          src={photos[a]}
                          alt={alts[a]}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                          sizes="(max-width: 1023px) 45vw, 22vw"
                          quality={96}
                        />
                        {portfolios[a] && (
                          // Portfolio look sits at the primary's hover zoom so
                          // the crossfade lands without a scale jump.
                          <Image
                            src={portfolios[a]}
                            alt=""
                            aria-hidden
                            fill
                            className="scale-[1.06] object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                            sizes="(max-width: 1023px) 45vw, 22vw"
                            quality={90}
                          />
                        )}
                        <span className="rating-badge absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                          <Star className="h-3.5 w-3.5 fill-[#f7c948] text-[#f7c948]" strokeWidth={0} />
                          {artist.rating}
                        </span>
                      </div>
                      <div className="p-3.5">
                        <h3 className="flex items-center gap-1 text-sm font-semibold text-foreground">
                          {artist.name}
                          {artist.verified && (
                            <>
                              {/* Instagram-style blue verified badge */}
                              <BadgeCheck className="h-3.5 w-3.5 shrink-0 fill-[#0095f6] text-white" strokeWidth={2} aria-hidden />
                              <span className="sr-only">{verifiedLabel}</span>
                            </>
                          )}
                        </h3>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0" strokeWidth={1.75} />
                          {artist.location}
                        </p>
                        <p className="mt-0.5 text-xs text-accent-foreground">{artist.specialty}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </RevealGroup>
      </div>
    </MouseParallax>
  );
}
