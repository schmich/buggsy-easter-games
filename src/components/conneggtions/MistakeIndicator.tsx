interface MistakeIndicatorProps {
  remaining: number;
}

export default function MistakeIndicator({ remaining }: MistakeIndicatorProps) {
  return (
    <div className="flex items-center gap-2 my-3">
      <span
        className="text-base text-[#6b4c8a] font-medium"

      >
        Mistakes remaining:
      </span>
      <div className="flex gap-1.5">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              i < remaining ? "bg-[#6b4c8a]" : "bg-[#e8d5f0]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
