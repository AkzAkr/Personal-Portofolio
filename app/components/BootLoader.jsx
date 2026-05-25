"use client";

import { useEffect, useState } from "react";

const bootSteps = [
  "BOOTING LAB...",
  "LOADING SPECIMENS...",
  "SYNCING GAME CHAMBER...",
  "READY",
];

export default function BootLoader() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("lab-boot-complete") === "true") {
      setVisible(false);
      return;
    }

    const closeTimer = window.setTimeout(() => {
      setClosing(true);
      sessionStorage.setItem("lab-boot-complete", "true");
    }, 3100);

    const removeTimer = window.setTimeout(() => {
      setVisible(false);
    }, 3550);

    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`boot-loader ${closing ? "closing" : ""}`} role="status" aria-live="polite">
      <div className="boot-panel scanlines">
        <div className="mb-6 flex items-center justify-between">
          <span className="pixel-text text-[7px] text-primary neon-text">
            THE_EXPERIMENTAL_LAB
          </span>
          <span className="pixel-badge" style={{ fontSize: "5px" }}>
            SYS_BOOT
          </span>
        </div>

        <div className="space-y-3">
          {bootSteps.map((step, index) => (
            <div className="boot-line" style={{ "--delay": `${index * 0.42}s` }} key={step}>
              <span className="text-primary">&gt;</span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 h-2 overflow-hidden bg-surface-container-high">
          <div className="boot-progress"></div>
        </div>
      </div>
    </div>
  );
}
