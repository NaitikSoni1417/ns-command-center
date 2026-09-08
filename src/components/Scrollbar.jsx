import { useState, useEffect, useRef, useCallback } from "react";

const MIN_THUMB = 40;
const HIDE_DELAY = 800;

export default function Scrollbar() {
  const [visible, setVisible] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const raf = useRef(null);
  const timer = useRef(null);
  const scrollable = useRef(false);

  const recalc = useCallback(() => {
    const vh = window.innerHeight;
    const dh = document.documentElement.scrollHeight;
    const st = window.scrollY;
    const max = dh - vh;

    if (dh <= vh) {
      scrollable.current = false;
      setThumbHeight(0);
      return;
    }

    scrollable.current = true;
    const h = Math.max(MIN_THUMB, (vh / dh) * vh);
    const progress = max > 0 ? st / max : 0;
    const t = progress * (vh - h);

    setThumbHeight(h);
    setThumbTop(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!scrollable.current) return;
      setVisible(true);
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(recalc);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setVisible(false), HIDE_DELAY);
    };

    const onResize = () => {
      recalc();
      const dh = document.documentElement.scrollHeight;
      const vh = window.innerHeight;
      if (dh <= vh) setVisible(false);
    };

    recalc();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    const ro = new ResizeObserver(recalc);
    ro.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      cancelAnimationFrame(raf.current);
      clearTimeout(timer.current);
    };
  }, [recalc]);

  if (!scrollable.current || thumbHeight <= 0) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        right: 4,
        top: 0,
        bottom: 0,
        width: 5,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.22s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          height: thumbHeight,
          borderRadius: 999,
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          boxShadow: "0 0 6px rgba(255, 255, 255, 0.08)",
          transform: `translateY(${thumbTop}px)`,
          willChange: "transform",
        }}
      />
    </div>
  );
}
