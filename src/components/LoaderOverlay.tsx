import { useState, useEffect } from "react";
import { Modal, Button, useOverlayState } from "@heroui/react";
import { assetsReady } from "../assets";

interface LoaderOverlayProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export default function LoaderOverlay({ isOpen, onDismiss }: LoaderOverlayProps) {
  const state = useOverlayState({ isOpen, onOpenChange: () => {} });
  const [loaded, setLoaded] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const minDelay = new Promise((r) => setTimeout(r, 1000));
    Promise.all([assetsReady, minDelay]).then(() => setFadingOut(true));
  }, []);

  useEffect(() => {
    if (fadingOut) {
      const t = setTimeout(() => {
        setLoaded(true);
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
        <Modal.Container placement="center" size="sm">
          <Modal.Dialog className="bg-white rounded-2xl shadow-2xl p-0 overflow-hidden border-2 border-[#e8d5f0]">
            <div className="h-3 w-full animate-gradient-cycle" style={{ background: "linear-gradient(90deg, #f6c443, #77c572, #b07fd0, #7eb8da, #f6c443)", backgroundSize: "200% 100%" }} />

            <div className="flex flex-col items-center px-8 py-10">
              {!loaded ? (
                <div
                  className={`w-48 h-2 bg-[#e8d5f0] rounded-full overflow-hidden transition-opacity duration-250 ${
                    fadingOut ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="h-full bg-gradient-to-r from-[#6b4c8a] to-[#b07fd0] rounded-full animate-loading-bar" />
                </div>
              ) : (
                <Button
                  onPress={onDismiss}
                  className={`bg-gradient-to-r from-[#5aad55] to-[#77c572] text-white text-xl px-16 py-6 rounded-full shadow-lg hover:scale-105 transition-all duration-250 cursor-pointer ${
                    showButton ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  Continue
                </Button>
              )}
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
