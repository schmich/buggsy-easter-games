import { useState, useEffect, useRef, useCallback } from "react";
import { images } from "../assets";

const CLOUD_SRCS = images.clouds;
const TARGET_COUNT = 3;
const SPAWN_INTERVAL = 2000;
const MIN_SPEED = 0.3;
const MAX_SPEED = 0.8;
const CLOUD_WIDTH = 200;
const HEADER_HEIGHT = 56;

interface Cloud {
  id: number;
  srcIndex: number;
  x: number;
  yPct: number; // percentage within the allowed vertical band
  speed: number;
  direction: 1 | -1; // 1 = moving right, -1 = moving left
}

let nextId = 0;

/** Random y as a percentage (0–100) of the allowed cloud band */
function randomYPct() {
  return Math.random() * 100;
}

/** Convert yPct to actual top px — clouds live in top 50% of viewport, below the header */
function yPctToPx(pct: number) {
  const bandHeight = window.innerHeight * 0.5 - HEADER_HEIGHT;
  if (bandHeight <= 0) return HEADER_HEIGHT;
  return HEADER_HEIGHT + (pct / 100) * bandHeight;
}

export default function Clouds() {
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const cloudsRef = useRef(clouds);
  cloudsRef.current = clouds;
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const spawnTimerRef = useRef(0);

  const spawnCloud = useCallback(() => {
    const current = cloudsRef.current;
    if (current.length >= TARGET_COUNT) return;

    const usedIndices = new Set(current.map((c) => c.srcIndex));
    const available = CLOUD_SRCS.map((_, i) => i).filter((i) => !usedIndices.has(i));
    if (available.length === 0) return;

    const srcIndex = available[Math.floor(Math.random() * available.length)];
    const direction = (Math.random() < 0.5 ? 1 : -1) as 1 | -1;
    const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
    const yPct = randomYPct();
    const x = direction === 1 ? -CLOUD_WIDTH : window.innerWidth;

    setClouds((prev) => [
      ...prev,
      { id: nextId++, srcIndex, x, yPct, speed, direction },
    ]);
  }, []);

  useEffect(() => {
    // Seed initial clouds spread across screen
    const initial: Cloud[] = [];
    const usedIndices = new Set<number>();
    for (let i = 0; i < TARGET_COUNT; i++) {
      const available = CLOUD_SRCS.map((_, idx) => idx).filter((idx) => !usedIndices.has(idx));
      if (available.length === 0) break;
      const srcIndex = available[Math.floor(Math.random() * available.length)];
      usedIndices.add(srcIndex);
      const direction = (Math.random() < 0.5 ? 1 : -1) as 1 | -1;
      const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
      const yPct = randomYPct();
      const x = (window.innerWidth / (TARGET_COUNT + 1)) * (i + 1) - CLOUD_WIDTH / 2;
      initial.push({ id: nextId++, srcIndex, x, yPct, speed, direction });
    }
    setClouds(initial);
  }, []);

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;

      setClouds((prev) => {
        const next = prev
          .map((c) => ({ ...c, x: c.x + c.speed * c.direction * (dt / 16) }))
          .filter((c) => {
            if (c.direction === 1) return c.x < window.innerWidth + 10;
            return c.x > -CLOUD_WIDTH - 10;
          });
        return next;
      });

      spawnTimerRef.current += dt;
      if (spawnTimerRef.current >= SPAWN_INTERVAL) {
        spawnTimerRef.current = 0;
        spawnCloud();
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [spawnCloud]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {clouds.map((c) => (
        <img
          key={c.id}
          src={CLOUD_SRCS[c.srcIndex]}
          alt=""
          className="absolute pointer-events-none"
          style={{
            left: c.x,
            top: yPctToPx(c.yPct),
            width: CLOUD_WIDTH,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}
