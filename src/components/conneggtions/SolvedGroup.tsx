import type { ConneggtionsGroup } from "../../lib/conneggtionsData";

const DIFFICULTY_COLORS: Record<number, { bg: string; text: string }> = {
  0: { bg: "#f6c443", text: "#1a1a2e" },
  1: { bg: "#77c572", text: "#ffffff" },
  2: { bg: "#7eb8da", text: "#ffffff" },
  3: { bg: "#b07fd0", text: "#ffffff" },
};

interface SolvedGroupProps {
  group: ConneggtionsGroup;
}

export default function SolvedGroup({ group }: SolvedGroupProps) {
  const colors = DIFFICULTY_COLORS[group.difficulty];

  return (
    <div
      className="w-full max-w-[480px] rounded-lg py-2 px-4 text-center animate-reveal-pulse"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      <p
        className="text-lg uppercase"

      >
        {group.category}
      </p>
      <p className="text-sm opacity-80">
        {group.words.join(", ")}
      </p>
    </div>
  );
}
