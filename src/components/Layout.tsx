import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div
      className="flex flex-col h-dvh font-sans select-none relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #f0e6f6 0%, #e8f5e9 40%, #fef9e7 100%)",
      }}
    >
      {/* Easter decorations */}
      <img
        src="/images/grass.webp"
        alt=""
        className="absolute bottom-0 left-0 w-full opacity-20 pointer-events-none z-[1]"
      />
      <img
        src="/images/eggs-grass.webp"
        alt=""
        className="absolute bottom-0 left-0 w-[180px] opacity-80 pointer-events-none z-[2]"
      />
      <img
        src="/images/grass-basket.webp"
        alt=""
        className="absolute bottom-0 right-0 w-[160px] opacity-80 pointer-events-none z-[2]"
      />
      <img
        src="/images/bunny.webp"
        alt=""
        className="absolute top-[70px] left-3 w-[60px] opacity-30 pointer-events-none animate-float"
      />
      <img
        src="/images/basket.webp"
        alt=""
        className="absolute top-[70px] right-3 w-[60px] opacity-30 pointer-events-none animate-float"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
