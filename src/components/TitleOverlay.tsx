import { useState, useEffect, useCallback } from "react";
import { Modal, Button, useOverlayState } from "@heroui/react";
import { assetsReady, images, isSoundsMuted, isMusicMuted, toggleSoundsMuted, toggleMusicMuted, onSoundsChange, onMusicChange, playEnter } from "../assets";

interface TitleOverlayProps {
  isOpen: boolean;
  onDismiss: () => void;
  onLoaded?: () => void;
}

export default function TitleOverlay({ isOpen, onDismiss, onLoaded }: TitleOverlayProps) {
  const state = useOverlayState({ isOpen, onOpenChange: () => {} });
  const [loaded, setLoaded] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [soundsMuted, setSoundsMuted] = useState(isSoundsMuted);
  const [musicMuted, setMusicMuted] = useState(isMusicMuted);
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  useEffect(() => onSoundsChange(setSoundsMuted), []);
  useEffect(() => onMusicChange(setMusicMuted), []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }, []);

  useEffect(() => {
    const minDelay = new Promise((r) => setTimeout(r, 1000));
    Promise.all([assetsReady, minDelay]).then(() => setFadingOut(true));
  }, []);

  useEffect(() => {
    if (fadingOut) {
      const t = setTimeout(() => {
        setLoaded(true);
        onLoaded?.();
        setTimeout(() => setShowButton(true), 50);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [fadingOut]);

  return (
    <Modal state={state}>
      <Modal.Backdrop
        isDismissable={false}
        className="bg-black/10 backdrop-blur-sm"
      >
        <Modal.Container placement="center" size="sm" className="!overflow-visible relative">
          {loaded && showButton && (<>
            <div
              className="absolute left-1/2 top-1/2 pointer-events-none animate-sun-rays"
              style={{
                width: "200vmax",
                height: "200vmax",
                background: `conic-gradient(
                  from 0deg,
                  transparent 0deg, rgba(246,196,67,0.5) 4deg, rgba(255,215,80,0.3) 8deg, transparent 12deg,
                  transparent 15deg, rgba(246,196,67,0.35) 18deg, transparent 21deg,
                  transparent 24deg, rgba(246,196,67,0.45) 28deg, rgba(255,215,80,0.25) 32deg, transparent 36deg,
                  transparent 39deg, rgba(255,215,80,0.3) 42deg, transparent 45deg,
                  transparent 48deg, rgba(246,196,67,0.5) 52deg, rgba(255,215,80,0.3) 56deg, transparent 60deg,
                  transparent 63deg, rgba(246,196,67,0.35) 66deg, transparent 69deg,
                  transparent 72deg, rgba(246,196,67,0.45) 76deg, rgba(255,215,80,0.25) 80deg, transparent 84deg,
                  transparent 87deg, rgba(255,215,80,0.3) 90deg, transparent 93deg,
                  transparent 96deg, rgba(246,196,67,0.5) 100deg, rgba(255,215,80,0.3) 104deg, transparent 108deg,
                  transparent 111deg, rgba(246,196,67,0.35) 114deg, transparent 117deg,
                  transparent 120deg, rgba(246,196,67,0.45) 124deg, rgba(255,215,80,0.25) 128deg, transparent 132deg,
                  transparent 135deg, rgba(255,215,80,0.3) 138deg, transparent 141deg,
                  transparent 144deg, rgba(246,196,67,0.5) 148deg, rgba(255,215,80,0.3) 152deg, transparent 156deg,
                  transparent 159deg, rgba(246,196,67,0.35) 162deg, transparent 165deg,
                  transparent 168deg, rgba(246,196,67,0.45) 172deg, rgba(255,215,80,0.25) 176deg, transparent 180deg,
                  transparent 183deg, rgba(255,215,80,0.3) 186deg, transparent 189deg,
                  transparent 192deg, rgba(246,196,67,0.5) 196deg, rgba(255,215,80,0.3) 200deg, transparent 204deg,
                  transparent 207deg, rgba(246,196,67,0.35) 210deg, transparent 213deg,
                  transparent 216deg, rgba(246,196,67,0.45) 220deg, rgba(255,215,80,0.25) 224deg, transparent 228deg,
                  transparent 231deg, rgba(255,215,80,0.3) 234deg, transparent 237deg,
                  transparent 240deg, rgba(246,196,67,0.5) 244deg, rgba(255,215,80,0.3) 248deg, transparent 252deg,
                  transparent 255deg, rgba(246,196,67,0.35) 258deg, transparent 261deg,
                  transparent 264deg, rgba(246,196,67,0.45) 268deg, rgba(255,215,80,0.25) 272deg, transparent 276deg,
                  transparent 279deg, rgba(255,215,80,0.3) 282deg, transparent 285deg,
                  transparent 288deg, rgba(246,196,67,0.5) 292deg, rgba(255,215,80,0.3) 296deg, transparent 300deg,
                  transparent 303deg, rgba(246,196,67,0.35) 306deg, transparent 309deg,
                  transparent 312deg, rgba(246,196,67,0.45) 316deg, rgba(255,215,80,0.25) 320deg, transparent 324deg,
                  transparent 327deg, rgba(255,215,80,0.3) 330deg, transparent 333deg,
                  transparent 336deg, rgba(246,196,67,0.5) 340deg, rgba(255,215,80,0.3) 344deg, transparent 348deg,
                  transparent 351deg, rgba(246,196,67,0.35) 354deg, transparent 360deg
                )`,
                borderRadius: "50%",
                filter: "blur(6px)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 pointer-events-none animate-sun-rays animate-shimmer"
              style={{
                width: "200vmax",
                height: "200vmax",
                animationDuration: "25s, 4s",
                animationDelay: "-5s, -1s",
                background: `conic-gradient(
                  from 7deg,
                  transparent 0deg, rgba(255,215,80,0.4) 3deg, transparent 6deg,
                  transparent 12deg, rgba(246,196,67,0.35) 15deg, transparent 18deg,
                  transparent 24deg, rgba(255,215,80,0.4) 27deg, transparent 30deg,
                  transparent 36deg, rgba(246,196,67,0.35) 39deg, transparent 42deg,
                  transparent 48deg, rgba(255,215,80,0.4) 51deg, transparent 54deg,
                  transparent 60deg, rgba(246,196,67,0.35) 63deg, transparent 66deg,
                  transparent 72deg, rgba(255,215,80,0.4) 75deg, transparent 78deg,
                  transparent 84deg, rgba(246,196,67,0.35) 87deg, transparent 90deg,
                  transparent 96deg, rgba(255,215,80,0.4) 99deg, transparent 102deg,
                  transparent 108deg, rgba(246,196,67,0.35) 111deg, transparent 114deg,
                  transparent 120deg, rgba(255,215,80,0.4) 123deg, transparent 126deg,
                  transparent 132deg, rgba(246,196,67,0.35) 135deg, transparent 138deg,
                  transparent 144deg, rgba(255,215,80,0.4) 147deg, transparent 150deg,
                  transparent 156deg, rgba(246,196,67,0.35) 159deg, transparent 162deg,
                  transparent 168deg, rgba(255,215,80,0.4) 171deg, transparent 174deg,
                  transparent 180deg, rgba(246,196,67,0.35) 183deg, transparent 186deg,
                  transparent 192deg, rgba(255,215,80,0.4) 195deg, transparent 198deg,
                  transparent 204deg, rgba(246,196,67,0.35) 207deg, transparent 210deg,
                  transparent 216deg, rgba(255,215,80,0.4) 219deg, transparent 222deg,
                  transparent 228deg, rgba(246,196,67,0.35) 231deg, transparent 234deg,
                  transparent 240deg, rgba(255,215,80,0.4) 243deg, transparent 246deg,
                  transparent 252deg, rgba(246,196,67,0.35) 255deg, transparent 258deg,
                  transparent 264deg, rgba(255,215,80,0.4) 267deg, transparent 270deg,
                  transparent 276deg, rgba(246,196,67,0.35) 279deg, transparent 282deg,
                  transparent 288deg, rgba(255,215,80,0.4) 291deg, transparent 294deg,
                  transparent 300deg, rgba(246,196,67,0.35) 303deg, transparent 306deg,
                  transparent 312deg, rgba(255,215,80,0.4) 315deg, transparent 318deg,
                  transparent 324deg, rgba(246,196,67,0.35) 327deg, transparent 330deg,
                  transparent 336deg, rgba(255,215,80,0.4) 339deg, transparent 342deg,
                  transparent 348deg, rgba(246,196,67,0.35) 351deg, transparent 354deg,
                  transparent 360deg
                )`,
                borderRadius: "50%",
                filter: "blur(4px)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 pointer-events-none animate-shimmer"
              style={{
                width: "500px",
                height: "500px",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(246,196,67,0.6) 0%, rgba(255,215,80,0.3) 35%, transparent 65%)",
                borderRadius: "50%",
              }}
            />
          </>)}
          <Modal.Dialog className="bg-white rounded-2xl p-0 overflow-hidden animate-shadow-cycle">
            <div className="h-3 w-full animate-gradient-cycle rounded-t-2xl" style={{ background: "linear-gradient(90deg, #f6c443, #77c572, #b07fd0, #7eb8da, #f6c443)", backgroundSize: "200% 100%" }} />

            <div className="flex flex-col items-center px-8 py-8">
              {!loaded ? (
                <div
                  className={`w-48 h-2 bg-[#e8d5f0] rounded-full overflow-hidden transition-opacity duration-250 ${
                    fadingOut ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="h-full bg-gradient-to-r from-[#6b4c8a] to-[#b07fd0] rounded-full animate-loading-bar" />
                </div>
              ) : (
                <div className={`flex flex-col items-center transition-opacity duration-250 -mx-8 ${
                  showButton ? "opacity-100" : "opacity-0"
                }`}>
                  <div className="relative w-full -mt-8">
                    <img src={images.title} alt="2026 Easter Games" className="w-full" />
                  </div>
                  <div className="flex flex-col gap-3 w-64 mt-36">
                    <Button
                      onPress={toggleFullscreen}
                      className="bg-gradient-to-r from-[#7eb8da] to-[#a0d0ef] text-white text-base w-full py-4 rounded-full shadow-md hover:scale-105 transition-all duration-250 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isFullscreen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="4 14 10 14 10 20" />
                          <polyline points="20 10 14 10 14 4" />
                          <line x1="14" y1="10" x2="21" y2="3" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                      )}
                      {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    </Button>
                    <div className="flex gap-3 w-full">
                      <Button
                        onPress={toggleSoundsMuted}
                        className={`bg-gradient-to-r from-[#b07fd0] to-[#cda4e6] text-white text-base flex-1 py-4 rounded-full shadow-md hover:scale-105 transition-all duration-250 cursor-pointer flex items-center justify-center gap-2 ${soundsMuted ? "opacity-50" : ""}`}
                      >
                        {soundsMuted ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                          </svg>
                        )}
                        Sounds
                      </Button>
                      <Button
                        onPress={toggleMusicMuted}
                        className={`bg-gradient-to-r from-[#b07fd0] to-[#cda4e6] text-white text-base flex-1 py-4 rounded-full shadow-md hover:scale-105 transition-all duration-250 cursor-pointer flex items-center justify-center gap-2 ${musicMuted ? "opacity-50" : ""}`}
                      >
                        {musicMuted ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="5.5" cy="17.5" r="2.5" />
                            <path d="M8 17.5V3l12 2v12.5" />
                            <circle cx="17.5" cy="17.5" r="2.5" />
                            <line x1="2" y1="2" x2="22" y2="22" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="5.5" cy="17.5" r="2.5" />
                            <path d="M8 17.5V3l12 2v12.5" />
                            <circle cx="17.5" cy="17.5" r="2.5" />
                          </svg>
                        )}
                        Music
                      </Button>
                    </div>
                  </div>
                  <Button
                    onPress={() => { playEnter(); onDismiss(); }}
                    className="bg-gradient-to-r from-[#5aad55] to-[#77c572] text-white text-xl w-64 mt-4 mb-4 py-6 rounded-full shadow-lg hover:scale-105 transition-all duration-250 cursor-pointer"
                  >
                    Play
                  </Button>
                </div>
              )}
            </div>
          </Modal.Dialog>
          {loaded && showButton && (
            <img src={images.banner} alt="The 2026 Easter Games" className="absolute left-1/2 -translate-x-1/2 w-[520px] max-w-[110dvw] pointer-events-none" style={{ top: "27%" }} />
          )}
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
