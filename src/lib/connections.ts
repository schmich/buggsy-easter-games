import type { ConnectionsGroup, ConnectionsPuzzle } from "./connectionsData";

export interface GuessResult {
  correct: boolean;
  group?: ConnectionsGroup;
  oneAway: boolean;
}

export function checkGuess(
  selectedWords: string[],
  puzzle: ConnectionsPuzzle
): GuessResult {
  for (const group of puzzle.groups) {
    const matches = selectedWords.filter((w) =>
      group.words.includes(w)
    ).length;
    if (matches === 4) {
      return { correct: true, group, oneAway: false };
    }
    if (matches === 3) {
      return { correct: false, oneAway: true };
    }
  }
  return { correct: false, oneAway: false };
}

export function shuffleWords<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
