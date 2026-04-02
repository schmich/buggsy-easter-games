// Images
import bunny from "./bunny.webp";
import basket from "./basket.webp";
import grass from "./grass.webp";
import eggsGrass from "./eggs-grass.webp";
import grassBasket from "./grass-basket.webp";
import eggfather from "./eggfather.webp";
import eggfatherWin from "./eggfather-win.webp";
import eggfatherLose from "./eggfather-lose.webp";

// Audio
import applause from "./applause.mp3";

export const images = {
  bunny,
  basket,
  grass,
  eggsGrass,
  grassBasket,
  eggfather,
  eggfatherWin,
  eggfatherLose,
} as const;

// Preload all images on module load
Object.values(images).forEach((src) => {
  const img = new Image();
  img.src = src;
});

export const audio = {
  applause: new Audio(applause),
} as const;
