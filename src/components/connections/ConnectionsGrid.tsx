import ConnectionsTile from "./ConnectionsTile";

interface ConnectionsGridProps {
  words: string[];
  selectedWords: string[];
  onToggle: (word: string) => void;
  shake: boolean;
  bouncingWords: string[];
  shrinkingWords: string[];
}

export default function ConnectionsGrid({
  words,
  selectedWords,
  onToggle,
  shake,
  bouncingWords,
  shrinkingWords,
}: ConnectionsGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2 w-full max-w-[480px]">
      {words.map((word) => {
        const bounceIndex = bouncingWords.indexOf(word);
        return (
          <ConnectionsTile
            key={word}
            word={word}
            isSelected={selectedWords.includes(word)}
            onToggle={() => onToggle(word)}
            shake={shake && selectedWords.includes(word)}
            bounce={bounceIndex >= 0}
            bounceDelay={bounceIndex >= 0 ? bounceIndex * 100 : 0}
            shrink={shrinkingWords.includes(word)}
          />
        );
      })}
    </div>
  );
}
