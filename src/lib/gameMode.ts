export type GameMode = "standard" | "random";

let gameMode: GameMode = (localStorage.getItem("game-mode") as GameMode) || "standard";

const listeners = new Set<(mode: GameMode) => void>();

export function getGameMode(): GameMode {
  return gameMode;
}

export function isRandomMode(): boolean {
  return gameMode === "random";
}

export function setGameMode(mode: GameMode) {
  gameMode = mode;
  localStorage.setItem("game-mode", mode);
  listeners.forEach((fn) => fn(mode));
}

export function toggleGameMode() {
  setGameMode(gameMode === "standard" ? "random" : "standard");
}

export function onGameModeChange(fn: (mode: GameMode) => void) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}
