// In-memory set — survives route navigation but resets on page reload
const seen = new Set<string>();

export function hasSeenIntro(key: string): boolean {
  return seen.has(key);
}

export function markIntroSeen(key: string): void {
  seen.add(key);
}
