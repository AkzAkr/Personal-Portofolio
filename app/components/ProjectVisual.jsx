"use client";

import { useState } from "react";
import { BrainCircuit, CodeXml, Database, Gamepad2, Globe, ReceiptText } from "lucide-react";

const iconMap = {
  frontend: Globe,
  fullstack: CodeXml,
  ml: BrainCircuit,
  iot: ReceiptText,
  game: Gamepad2,
};

export default function ProjectVisual({ project, compact = false }) {
  const [loaded, setLoaded] = useState(false);
  const Icon = iconMap[project.category] || Database;

  return (
    <div
      className={`project-visual scanlines relative overflow-hidden bg-surface-container-high ${
        compact ? "aspect-[4/3]" : "aspect-video"
      }`}
    >
      {project.image ? (
        <>
          {!loaded && <div className="image-skeleton absolute inset-0"></div>}
          <img
            className={`h-full w-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100 ${
              loaded ? "opacity-80" : "opacity-0"
            }`}
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        </>
      ) : (
        <div className="specimen-fallback absolute inset-0 flex flex-col items-center justify-center gap-4">
          <Icon className="h-12 w-12 text-primary" aria-hidden="true" />
          <span className="pixel-text text-[6px] text-primary neon-text">
            PREVIEW_PENDING
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
      <div className="absolute left-2 top-2 pixel-text text-[6px] text-white/60">▛</div>
      <div className="absolute right-2 top-2 pixel-text text-[6px] text-white/60">▜</div>
      <div className="absolute bottom-2 left-2 pixel-text text-[6px] text-white/60">▙</div>
      <div className="absolute bottom-2 right-2 pixel-text text-[6px] text-white/60">▟</div>
    </div>
  );
}
