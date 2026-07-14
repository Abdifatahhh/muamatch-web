"use client";

import Image from "next/image";
import * as React from "react";
import { AnimatePresence, motion, useSpring, useTransform } from "framer-motion";
import { BadgeCheck, Check, Heart, Sparkles, Star } from "lucide-react";

type Screen = { label: string; caption: string };
type FloatCopy = {
  verified: string;
  favorite: string;
  chatTitle: string;
  chatBody: string;
  bookingTitle: string;
  bookingBody: string;
  reviewQuote: string;
  reviewName: string;
};

type TransType = "push" | "page" | "reset";
type Trans = { from: number; to: number; type: TransType; run: boolean };
type GestureStage = "pre" | "in" | "press" | "drag" | "lift";
type Gesture = { kind: "tap" | "swipe"; stage: GestureStage; x: number; y: number };

// Choreography for the five homepage screenshots, in dictionary order:
// home, explore, glam-ai, bookings, reviews. Each step says how the demo
// leaves that screen: a tap (x/y in % of the screen, aimed at a real UI
// element in the screenshot), a swipe to the next page, or a soft cut back
// to the start. drift is the fake scroll amplitude in % of screen height.
const STEPS: { kind: "tap" | "swipe" | "loop"; x: number; y: number; drift: number }[] = [
  // Home: Explore tab in the bottom nav. The home screenshot is padded to
  // the frame aspect (white bands top/bottom), so y is calibrated for that.
  { kind: "tap", x: 30, y: 88.9, drift: 1.2 },
  { kind: "swipe", x: 74, y: 52, drift: 1.3 }, // Explore: swipe across the artist grid
  { kind: "tap", x: 41, y: 46.2, drift: 0.5 }, // Glam AI: "available this weekend?" chip
  { kind: "swipe", x: 74, y: 48, drift: 1.2 }, // Bookings: swipe across the list
  { kind: "loop", x: 50, y: 50, drift: 1.1 }, // Reviews: fade back to Home
];

// Zoom that gives the fake scroll room to move without exposing the edges.
const SCALE = 1.05;

// iOS-like navigation curve plus stronger variants of the default easings.
const EASE_NAV = "cubic-bezier(0.32, 0.72, 0, 1)";
const EASE_SCROLL = "cubic-bezier(0.77, 0, 0.175, 1)";
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

// One screen cycle on the demo clock, in ms from the moment a screen settles.
// Kept tight so a visitor sees several screens without waiting around.
const AT = { scroll: 200, cursor: 1800, press: 2100, tap: 2270, drag: 2250, reset: 2000 };
const MS = { tap: 620, drag: 680, reset: 640, scroll: 1450 };

const dur = (t: TransType) => (t === "push" ? MS.tap : t === "page" ? MS.drag : MS.reset);

const CHIP_SPRING = { type: "spring" as const, duration: 0.6, bounce: 0.3, delay: 0.4 };
const CHIP_EXIT = { duration: 0.22, ease: "easeOut" as const };

// A hands-off product tour: the front phone plays the app journey (scroll,
// tap, swipe, screen pushes), a second phone floats behind it slowly cycling
// through other screens, and small UI cards fade in around the phones in
// sync with the story. No controls; it loops while in view.
export function AppShowcase({
  screens,
  sources,
  float,
}: {
  screens: Screen[];
  sources: string[];
  float: FloatCopy;
}) {
  const count = Math.min(screens.length, sources.length);
  const [index, setIndex] = React.useState(0);
  const [trans, setTrans] = React.useState<Trans | null>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [gesture, setGesture] = React.useState<Gesture | null>(null);
  const [inView, setInView] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const [finePointer, setFinePointer] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const transRef = React.useRef<Trans | null>(null);
  transRef.current = trans;

  const playing = inView && !hidden && !reduced && count > 1;
  const displayIndex = trans?.run ? trans.to : index;
  // The back phone stays two steps ahead so both phones switch together.
  const backIndex = count > 0 ? (displayIndex + 2) % count : 0;

  // Mouse parallax, spring-smoothed. Layers move at different depths:
  // back phone least, front phone more, floating cards most.
  const mx = useSpring(0, { stiffness: 110, damping: 22 });
  const my = useSpring(0, { stiffness: 110, damping: 22 });
  const frontX = useTransform(mx, (v) => v * 10);
  const frontRotX = useTransform(my, (v) => v * -3);
  const frontRotY = useTransform(mx, (v) => v * 4);
  const backX = useTransform(mx, (v) => v * 5);
  const backY = useTransform(my, (v) => v * 4);
  const chipX = useTransform(mx, (v) => v * 16);
  const chipY = useTransform(my, (v) => v * 12);

  React.useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      setReduced(motionMq.matches);
      setFinePointer(pointerMq.matches);
    };
    sync();
    motionMq.addEventListener("change", sync);
    pointerMq.addEventListener("change", sync);
    return () => {
      motionMq.removeEventListener("change", sync);
      pointerMq.removeEventListener("change", sync);
    };
  }, []);

  // Only play while the stage is on screen and the tab is visible.
  React.useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(node);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // One screen cycle: settle, scroll drift, gesture, then hand over to the
  // transition effects below. Going off screen clears pending steps; on
  // return the cycle replays from the scroll position it already reached.
  React.useEffect(() => {
    if (!playing || transRef.current) return;
    const step = STEPS[index % STEPS.length];
    const next = (index + 1) % count;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) =>
      timers.push(
        window.setTimeout(() => {
          if (transRef.current) return;
          fn();
        }, ms)
      );

    at(AT.scroll, () => setScrolled(true));
    if (step.kind === "tap") {
      at(AT.cursor, () => setGesture({ kind: "tap", stage: "pre", x: step.x, y: step.y }));
      at(AT.press, () => setGesture((g) => g && { ...g, stage: "press" }));
      at(AT.tap, () => {
        setGesture((g) => g && { ...g, stage: "lift" });
        setTrans({ from: index, to: next, type: "push", run: false });
      });
    } else if (step.kind === "swipe") {
      at(AT.cursor, () => setGesture({ kind: "swipe", stage: "pre", x: step.x, y: step.y }));
      at(AT.press, () => setGesture((g) => g && { ...g, stage: "press" }));
      at(AT.drag, () => {
        setGesture((g) => g && { ...g, stage: "drag" });
        setTrans({ from: index, to: next, type: "page", run: false });
      });
    } else {
      at(AT.reset, () => setTrans({ from: index, to: next, type: "reset", run: false }));
    }
    return () => {
      timers.forEach(clearTimeout);
      setGesture(null);
    };
  }, [index, playing, count]);

  // Let the browser paint the pre-position, then run the screen transition.
  React.useEffect(() => {
    if (!trans || trans.run) return;
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setTrans((t) => t && { ...t, run: true }));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [trans]);

  // Same double-frame trick for the cursor entrance.
  React.useEffect(() => {
    if (gesture?.stage !== "pre") return;
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() =>
        setGesture((g) => (g && g.stage === "pre" ? { ...g, stage: "in" } : g))
      );
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [gesture?.stage]);

  // Commit once the transition has played out.
  React.useEffect(() => {
    if (!trans?.run) return;
    const id = window.setTimeout(() => {
      setIndex(trans.to);
      setTrans(null);
      setScrolled(false);
      setGesture(null);
    }, dur(trans.type) + 60);
    return () => window.clearTimeout(id);
  }, [trans]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!finePointer || reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const outerStyle = (i: number): React.CSSProperties => {
    const parked: React.CSSProperties = {
      transform: "translateX(100%)",
      opacity: 0,
      transition: "none",
      zIndex: 0,
    };
    if (reduced) {
      return { opacity: i === index ? 1 : 0, transition: "opacity 500ms ease", zIndex: i === index ? 10 : 0 };
    }
    if (trans) {
      const d = dur(trans.type);
      const fade = `opacity ${d}ms ${EASE_OUT}, transform ${d}ms ${EASE_OUT}, filter ${d}ms ${EASE_OUT}`;
      if (i === trans.from) {
        if (trans.type === "push" || trans.type === "page") {
          const out = trans.type === "push" ? "translateX(-24%)" : "translateX(-100%)";
          return {
            transform: trans.run ? out : "translateX(0)",
            transition: trans.run ? `transform ${d}ms ${EASE_NAV}` : "none",
            zIndex: 10,
          };
        }
        return {
          transform: trans.run ? "scale(0.985)" : "none",
          opacity: trans.run ? 0 : 1,
          filter: trans.run ? "blur(6px)" : "blur(0px)",
          transition: trans.run ? fade : "none",
          zIndex: 10,
        };
      }
      if (i === trans.to) {
        if (trans.type === "push" || trans.type === "page") {
          return {
            transform: trans.run ? "translateX(0)" : "translateX(100%)",
            transition: trans.run ? `transform ${d}ms ${EASE_NAV}` : "none",
            zIndex: 20,
          };
        }
        return {
          transform: trans.run ? "none" : "scale(1.03)",
          opacity: trans.run ? 1 : 0,
          filter: trans.run ? "blur(0px)" : "blur(6px)",
          transition: trans.run ? fade : "none",
          zIndex: 20,
        };
      }
      return parked;
    }
    if (i === index) return { transform: "none", opacity: 1, transition: "none", zIndex: 10 };
    return parked;
  };

  // Fake scroll: the screenshot is slightly zoomed so it can drift upward
  // like a slow scroll without exposing its edges.
  const innerStyle = (i: number): React.CSSProperties => {
    if (reduced) return {};
    const drift = STEPS[i % STEPS.length].drift;
    const down = i === index && scrolled;
    return {
      transform: `scale(${SCALE}) translateY(${down ? -drift : drift}%)`,
      transition: down ? `transform ${MS.scroll}ms ${EASE_SCROLL}` : "none",
    };
  };

  // Old screen dims a touch while the new one pushes over it.
  const dimStyle = (i: number): React.CSSProperties => {
    const on = trans?.type === "push" && i === trans.from;
    return {
      opacity: on && trans?.run ? 0.14 : 0,
      transition: on && trans?.run ? `opacity ${MS.tap}ms ${EASE_NAV}` : "none",
    };
  };

  // Gesture targets are % positions on the raw screenshot; the screen is
  // zoomed and scrolled up by the time the finger lands, so map them through
  // the same transform to keep the finger on the tapped element.
  const gesturePos = (g: Gesture): React.CSSProperties => {
    const drift = STEPS[index % STEPS.length].drift;
    return {
      left: `${50 + (g.x - 50) * SCALE}%`,
      top: `${50 + (g.y - 50) * SCALE - drift}%`,
    };
  };

  const cursorBase = "translate(-50%, -50%)";
  const cursorStyle = ((): React.CSSProperties => {
    if (!gesture) return {};
    const pos = gesturePos(gesture);
    switch (gesture.stage) {
      case "pre":
        return { ...pos, opacity: 0, transform: `${cursorBase} scale(0.65)`, transition: "none" };
      case "in":
        return {
          ...pos,
          opacity: 1,
          transform: `${cursorBase} scale(1)`,
          transition: `transform 240ms ${EASE_OUT}, opacity 240ms ${EASE_OUT}`,
        };
      case "press":
        return {
          ...pos,
          opacity: 1,
          transform: `${cursorBase} scale(${gesture.kind === "swipe" ? 0.85 : 0.75})`,
          transition: `transform 150ms ${EASE_OUT}`,
        };
      case "drag":
        // Fades out on its own near the end of the drag.
        return {
          ...pos,
          opacity: 0,
          transform: `${cursorBase} scale(0.8)`,
          transition: `transform 160ms ${EASE_OUT}, opacity 220ms ${EASE_OUT} ${MS.drag - 240}ms`,
        };
      case "lift":
        return {
          ...pos,
          opacity: 0,
          transform: `${cursorBase} scale(1)`,
          transition: `transform 260ms ${EASE_OUT}, opacity 260ms ${EASE_OUT}`,
        };
    }
  })();

  // During a swipe the finger and both screens travel on the same curve.
  const dragStyle: React.CSSProperties =
    gesture?.kind === "swipe" && gesture.stage === "drag"
      ? { transform: "translateX(-46%)", transition: `transform ${MS.drag}ms ${EASE_NAV}` }
      : { transform: "translateX(0)", transition: "none" };

  // One floating UI card per screen, shown in sync with the journey.
  const chips: { key: string; cls: string; node: React.ReactNode }[] = [
    {
      key: "verified",
      cls: "right-[4%] top-[1%]",
      node: (
        <div className="flex items-center gap-2 rounded-xl border border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur-sm">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-primary">
            <BadgeCheck className="h-4 w-4" strokeWidth={2.25} />
          </span>
          <span className="text-xs font-semibold text-foreground">{float.verified}</span>
        </div>
      ),
    },
    {
      key: "favorite",
      cls: "right-0 top-[30%] sm:right-[-2%]",
      node: (
        <div className="flex items-center gap-2 rounded-xl border border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur-sm">
          <motion.span
            className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary"
            initial={reduced ? false : { scale: 0.3 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.55, bounce: 0.55, delay: 0.55 }}
          >
            <Heart className="h-4 w-4 fill-primary" strokeWidth={2} />
          </motion.span>
          <span className="text-xs font-semibold text-foreground">{float.favorite}</span>
        </div>
      ),
    },
    {
      key: "chat",
      cls: "left-0 top-[6%] sm:left-[-1%]",
      node: (
        <div className="flex max-w-[13rem] items-center gap-2.5 rounded-xl border border-border bg-background/95 px-3.5 py-2.5 shadow-lg backdrop-blur-sm sm:max-w-[15rem]">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" strokeWidth={2.25} />
          </span>
          <div className="leading-tight">
            <p className="text-xs font-bold text-foreground">{float.chatTitle}</p>
            <p className="text-[11px] text-muted-foreground">{float.chatBody}</p>
          </div>
        </div>
      ),
    },
    {
      key: "booking",
      cls: "right-[0%] bottom-[10%]",
      node: (
        <div className="flex max-w-[13rem] items-center gap-2.5 rounded-xl border border-border bg-background/95 px-3.5 py-2.5 shadow-lg backdrop-blur-sm sm:max-w-[15rem]">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <div className="leading-tight">
            <p className="text-xs font-bold text-foreground">{float.bookingTitle}</p>
            <p className="text-[11px] text-muted-foreground">{float.bookingBody}</p>
          </div>
        </div>
      ),
    },
    {
      key: "review",
      cls: "left-[1%] bottom-[3%]",
      node: (
        <div className="max-w-[12rem] rounded-xl border border-border bg-background/95 px-3.5 py-2.5 shadow-lg backdrop-blur-sm sm:max-w-[14rem]">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star key={s} className="h-3 w-3 fill-[#f7c948] text-[#f7c948]" strokeWidth={0} />
            ))}
          </div>
          <p className="mt-1 text-[11px] leading-snug text-foreground">“{float.reviewQuote}”</p>
          <p className="mt-0.5 text-[10px] font-semibold text-muted-foreground">{float.reviewName}</p>
        </div>
      ),
    },
  ];
  const chip = chips[displayIndex % chips.length];

  return (
    <div
      ref={rootRef}
      className="relative isolate mx-auto w-full max-w-[560px]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Soft pink glow behind the stage */}
      <div aria-hidden className="pointer-events-none absolute -inset-12 -z-10">
        <div className="absolute left-[4%] top-[8%] h-[80%] w-[80%] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-[0%] right-[0%] h-[62%] w-[62%] rounded-full bg-secondary/80 blur-3xl" />
        <div className="absolute left-[28%] top-[44%] h-[48%] w-[48%] rounded-full bg-accent/50 blur-3xl" />
      </div>

      {/* Back phone: slow tour of the other screens, two steps ahead */}
      <motion.div
        aria-hidden
        className="absolute left-[3%] top-[7%] z-0 w-[44%] max-w-[250px] sm:left-0 sm:w-[47%]"
        style={reduced ? undefined : { x: backX, y: backY }}
      >
        <div className="demo-float-b">
          <div className="-rotate-[7deg]">
            <div className="relative aspect-[736/1600] w-full overflow-hidden rounded-[2rem] border-[6px] border-foreground/70 bg-foreground/70 shadow-soft">
              <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] bg-card">
                {sources.slice(0, count).map((src, i) => (
                  <div
                    key={src}
                    className="absolute inset-0"
                    style={{
                      opacity: i === backIndex ? 1 : 0,
                      transition: reduced ? "opacity 500ms ease" : "opacity 900ms ease",
                      zIndex: i === backIndex ? 1 : 0,
                    }}
                  >
                    <div className="demo-back-drift absolute inset-0">
                      <Image src={src} alt="" fill className="object-cover object-top" sizes="250px" quality={90} />
                    </div>
                  </div>
                ))}
                {/* Recede the back phone a little */}
                <div className="absolute inset-0 z-[2] bg-foreground/[0.05]" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Front phone: the main journey */}
      <motion.div
        className="relative z-10 ml-auto w-[58%] min-w-[200px] max-w-[300px] sm:min-w-[220px]"
        style={reduced ? undefined : { x: frontX, rotateX: frontRotX, rotateY: frontRotY, transformPerspective: 900 }}
      >
        <div className="demo-float-a">
          <div className="relative aspect-[736/1600] w-full overflow-hidden rounded-[2.4rem] border-[7px] border-foreground/85 bg-foreground/85 shadow-soft">
            <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-card">
              {sources.slice(0, count).map((src, i) => (
                <div key={src} className="absolute inset-0" style={outerStyle(i)}>
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0" style={innerStyle(i)}>
                      <Image
                        src={src}
                        alt={i === displayIndex ? `MUA Match app: ${screens[i].label}` : ""}
                        fill
                        className="object-cover object-top"
                        sizes="300px"
                        quality={90}
                        loading={i === 0 ? "eager" : undefined}
                      />
                    </div>
                  </div>
                  <div aria-hidden className="absolute inset-0 bg-black" style={dimStyle(i)} />
                  {trans?.type === "push" && i === trans.to && (
                    <div
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-8 -translate-x-full bg-gradient-to-l from-black/25 via-black/10 to-transparent"
                    />
                  )}
                </div>
              ))}

              {/* The demo finger */}
              {!reduced && gesture && (
                <div aria-hidden className="pointer-events-none absolute inset-0 z-30" style={dragStyle}>
                  <div
                    className="absolute h-[26px] w-[26px] rounded-full border border-white/80 bg-primary/40 shadow-[0_2px_10px_rgba(0,0,0,0.22)]"
                    style={cursorStyle}
                  />
                  {gesture.kind === "tap" && (gesture.stage === "press" || gesture.stage === "lift") && (
                    <span
                      key={`ripple-${index}`}
                      className="demo-ripple absolute h-[26px] w-[26px] rounded-full border-2 border-white/70 bg-primary/25"
                      style={gesturePos(gesture)}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating UI cards, one per chapter of the journey */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={reduced ? undefined : { x: chipX, y: chipY }}
      >
        <AnimatePresence>
          <motion.div
            key={chip.key}
            className={`absolute ${chip.cls}`}
            initial={reduced ? false : { opacity: 0, y: 18, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0, transition: { duration: 0.15 } } : { opacity: 0, y: -10, scale: 0.96, transition: CHIP_EXIT }}
            transition={reduced ? { duration: 0 } : CHIP_SPRING}
          >
            {chip.node}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
