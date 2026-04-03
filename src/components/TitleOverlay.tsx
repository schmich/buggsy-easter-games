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
                  transparent 0deg, rgba(246,196,67,0.4) 3deg, rgba(255,215,80,0.5) 10deg, rgba(246,196,67,0.4) 17deg, transparent 20deg,
                  transparent 30deg, rgba(246,196,67,0.35) 33deg, rgba(255,215,80,0.45) 40deg, rgba(246,196,67,0.35) 47deg, transparent 50deg,
                  transparent 60deg, rgba(246,196,67,0.4) 63deg, rgba(255,215,80,0.5) 70deg, rgba(246,196,67,0.4) 77deg, transparent 80deg,
                  transparent 90deg, rgba(246,196,67,0.35) 93deg, rgba(255,215,80,0.45) 100deg, rgba(246,196,67,0.35) 107deg, transparent 110deg,
                  transparent 120deg, rgba(246,196,67,0.4) 123deg, rgba(255,215,80,0.5) 130deg, rgba(246,196,67,0.4) 137deg, transparent 140deg,
                  transparent 150deg, rgba(246,196,67,0.35) 153deg, rgba(255,215,80,0.45) 160deg, rgba(246,196,67,0.35) 167deg, transparent 170deg,
                  transparent 180deg, rgba(246,196,67,0.4) 183deg, rgba(255,215,80,0.5) 190deg, rgba(246,196,67,0.4) 197deg, transparent 200deg,
                  transparent 210deg, rgba(246,196,67,0.35) 213deg, rgba(255,215,80,0.45) 220deg, rgba(246,196,67,0.35) 227deg, transparent 230deg,
                  transparent 240deg, rgba(246,196,67,0.4) 243deg, rgba(255,215,80,0.5) 250deg, rgba(246,196,67,0.4) 257deg, transparent 260deg,
                  transparent 270deg, rgba(246,196,67,0.35) 273deg, rgba(255,215,80,0.45) 280deg, rgba(246,196,67,0.35) 287deg, transparent 290deg,
                  transparent 300deg, rgba(246,196,67,0.4) 303deg, rgba(255,215,80,0.5) 310deg, rgba(246,196,67,0.4) 317deg, transparent 320deg,
                  transparent 330deg, rgba(246,196,67,0.35) 333deg, rgba(255,215,80,0.45) 340deg, rgba(246,196,67,0.35) 347deg, transparent 350deg,
                  transparent 360deg
                )`,
                borderRadius: "50%",
                filter: "blur(8px)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 pointer-events-none animate-sun-rays animate-shimmer"
              style={{
                width: "200vmax",
                height: "200vmax",
                animationDuration: "27s, 4s",
                animationDelay: "-5s, -1s",
                background: `conic-gradient(
                  from 15deg,
                  transparent 0deg, rgba(255,215,80,0.35) 2deg, rgba(246,196,67,0.45) 8deg, rgba(255,215,80,0.35) 14deg, transparent 16deg,
                  transparent 30deg, rgba(255,215,80,0.3) 32deg, rgba(246,196,67,0.4) 38deg, rgba(255,215,80,0.3) 44deg, transparent 46deg,
                  transparent 60deg, rgba(255,215,80,0.35) 62deg, rgba(246,196,67,0.45) 68deg, rgba(255,215,80,0.35) 74deg, transparent 76deg,
                  transparent 90deg, rgba(255,215,80,0.3) 92deg, rgba(246,196,67,0.4) 98deg, rgba(255,215,80,0.3) 104deg, transparent 106deg,
                  transparent 120deg, rgba(255,215,80,0.35) 122deg, rgba(246,196,67,0.45) 128deg, rgba(255,215,80,0.35) 134deg, transparent 136deg,
                  transparent 150deg, rgba(255,215,80,0.3) 152deg, rgba(246,196,67,0.4) 158deg, rgba(255,215,80,0.3) 164deg, transparent 166deg,
                  transparent 180deg, rgba(255,215,80,0.35) 182deg, rgba(246,196,67,0.45) 188deg, rgba(255,215,80,0.35) 194deg, transparent 196deg,
                  transparent 210deg, rgba(255,215,80,0.3) 212deg, rgba(246,196,67,0.4) 218deg, rgba(255,215,80,0.3) 224deg, transparent 226deg,
                  transparent 240deg, rgba(255,215,80,0.35) 242deg, rgba(246,196,67,0.45) 248deg, rgba(255,215,80,0.35) 254deg, transparent 256deg,
                  transparent 270deg, rgba(255,215,80,0.3) 272deg, rgba(246,196,67,0.4) 278deg, rgba(255,215,80,0.3) 284deg, transparent 286deg,
                  transparent 300deg, rgba(255,215,80,0.35) 302deg, rgba(246,196,67,0.45) 308deg, rgba(255,215,80,0.35) 314deg, transparent 316deg,
                  transparent 330deg, rgba(255,215,80,0.3) 332deg, rgba(246,196,67,0.4) 338deg, rgba(255,215,80,0.3) 344deg, transparent 346deg,
                  transparent 360deg
                )`,
                borderRadius: "50%",
                filter: "blur(6px)",
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
