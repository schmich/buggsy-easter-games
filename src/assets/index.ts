// Images
import bunny from "./bunny.webp";
import basket from "./basket.webp";
import grass from "./grass.webp";
import eggsGrass from "./eggs-grass.webp";
import grassBasket from "./grass-basket.webp";
import eggfather from "./eggfather.webp";
import eggfatherWin from "./eggfather-win.webp";
import eggfatherLose from "./eggfather-lose.webp";
import eggfatherEggdle from "./eggfather-eggdle.webp";
import eggfatherConneggtions from "./eggfather-coneggtions.webp";

// Audio
import eggdleWin from "./eggfather-eggdle-win.mp3";
import introMusic from "./intro-music.mp3";
import swingMiss from "./eggfather-swing-miss.mp3";
import aintItChief from "./eggfather-aint-it-chief.mp3";

export const images = {
  bunny,
  basket,
  grass,
  eggsGrass,
  grassBasket,
  eggfather,
  eggfatherWin,
  eggfatherLose,
  eggfatherEggdle,
  eggfatherConneggtions,
} as const;

// Preload all images and audio — returns a promise that resolves when all are loaded
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
    preloadedImages.push(img);
  });
}

function preloadAudio(audioEl: HTMLAudioElement): Promise<void> {
  return new Promise((resolve) => {
    if (audioEl.readyState >= 3) {
      resolve();
      return;
    }
    audioEl.addEventListener("canplaythrough", () => resolve(), { once: true });
    audioEl.addEventListener("error", () => resolve(), { once: true });
  });
}

const preloadedImages: HTMLImageElement[] = [];

export const audio = {
  eggdleWin: new Audio(eggdleWin),
  introMusic: new Audio(introMusic),
} as const;

// Failed guess audio set — shuffled, cycles through all before reshuffling
const failedClips = [
  new Audio(swingMiss),
  new Audio(aintItChief),
];

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const failedQueue: HTMLAudioElement[] = shuffle(failedClips);
let failedIndex = 0;

export function playFailedAudio() {
  const clip = failedQueue[failedIndex % failedQueue.length];
  failedIndex++;
  clip.currentTime = 0;
  clip.play();
}

const allAudio = [...Object.values(audio), ...failedClips];

export const assetsReady: Promise<void> = Promise.all([
  ...Object.values(images).map(preloadImage),
  ...allAudio.map(preloadAudio),
]).then(() => {});
