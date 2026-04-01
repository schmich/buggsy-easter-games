interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center justify-center border-b border-[#e8d5f0] px-4 h-[56px] shrink-0 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <img src="/images/bunny.webp" alt="" className="h-9 w-auto" />
        <h1 className="text-[1.8rem] uppercase text-[#6b4c8a]">
          {title}
        </h1>
        <img src="/images/basket.webp" alt="" className="h-9 w-auto" />
      </div>
    </header>
  );
}
