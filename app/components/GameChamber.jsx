"use client";

import { useMemo, useState } from "react";
import {
  Boxes,
  CodeXml,
  Database,
  ExternalLink,
  Gamepad2,
  Layers3,
  MonitorCog,
  ServerCog,
  Sparkles,
} from "lucide-react";
import { robloxCapabilities, robloxGames } from "../lib/robloxGames";

const capabilityIcons = {
  boxes: Boxes,
  code: CodeXml,
  database: Database,
  layers: Layers3,
  server: ServerCog,
  ui: MonitorCog,
};

function ChamberMetric({ metric }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="vt-text text-lg text-on-surface-variant">{metric.label}</span>
        <span className="pixel-text text-[6px] text-primary">{metric.value}%</span>
      </div>
      <div className="stat-bar-track">
        <div
          className={`stat-bar-fill ${metric.tone || ""}`}
          style={{ width: `${metric.value}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function GameChamber() {
  const [selectedId, setSelectedId] = useState(robloxGames[0].id);
  const [imageLoaded, setImageLoaded] = useState(false);
  const selected = useMemo(
    () => robloxGames.find((game) => game.id === selectedId) || robloxGames[0],
    [selectedId],
  );

  function selectGame(id) {
    setImageLoaded(false);
    setSelectedId(id);
  }

  return (
    <section
      className="py-32 border-t border-outline-variant/15 roblox-section-bg"
      id="roblox"
    >
      <div className="reveal mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="pixel-text text-[7px] text-primary neon-text">
                GAME_CHAMBER
              </span>
              <div className="h-[1px] w-16 bg-primary/30"></div>
              <span className="pixel-badge" style={{ fontSize: "5px" }}>
                ROBLOX_DEV
              </span>
            </div>
            <h3 className="text-5xl font-headline font-bold">Roblox Systems Lab</h3>
            <p className="text-on-surface-variant mt-4 max-w-xl">
              A dedicated chamber for Roblox development work: gameplay systems,
              Luau architecture, UI flows, persistence, and published prototypes.
            </p>
          </div>
          <a
            href="https://www.roblox.com/id/users/9690392018/profile"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn inline-flex items-center gap-3 bg-primary px-6 py-4 text-[10px] font-bold text-on-primary"
          >
            ROBLOX_PROFILE
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="game-chamber-grid grid gap-8 lg:grid-cols-[minmax(360px,1.05fr)_minmax(0,0.95fr)] reveal-scale">
        <div
          key={selected.id}
          className="game-screen pixel-panel relative overflow-hidden border border-outline-variant/15 bg-surface-container-low p-6 md:p-8"
        >
          <span className="corner-mark corner-mark-tl">▛</span>
          <span className="corner-mark corner-mark-tr">▜</span>
          <span className="corner-mark corner-mark-bl">▙</span>
          <span className="corner-mark corner-mark-br">▟</span>

          <div className="mb-6 flex items-center justify-between border-b border-outline-variant/15 pb-4">
            <span className="pixel-text text-[6px] text-primary neon-text">
              PLAYER_SESSION // GAME_BUILD
            </span>
            <span className="pixel-text text-[5px] text-outline">SERVER_READY</span>
          </div>

          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <span className="pixel-text text-[6px] text-primary neon-text">
                {selected.code} // {selected.genre}
              </span>
              <h4 className="mt-5 text-4xl font-headline font-bold leading-tight">
                {selected.title}
              </h4>
              <p className="mt-3 text-sm font-bold uppercase tracking-wider text-on-surface-variant">
                {selected.role}
              </p>
            </div>
            <span className="pixel-badge" style={{ fontSize: "5px" }}>
              {selected.status}
            </span>
          </div>

          <div className="game-preview scanlines relative aspect-video overflow-hidden border border-outline-variant/15 bg-surface-container-high">
            {selected.image ? (
              <>
                {!imageLoaded && <div className="image-skeleton absolute inset-0"></div>}
                <img
                  className={`h-full w-full object-cover grayscale contrast-125 transition-all duration-700 hover:grayscale-0 hover:contrast-100 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  src={selected.image}
                  alt={`${selected.title} Roblox preview`}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                />
              </>
            ) : (
              <div className="specimen-fallback absolute inset-0 flex flex-col items-center justify-center gap-4">
                <Gamepad2 className="h-14 w-14 text-primary" aria-hidden="true" />
                <span className="pixel-text text-[6px] text-primary neon-text">
                  BUILD_SLOT_LOCKED
                </span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/45 px-4 py-3 text-white">
              <span className="pixel-text text-[5px]">ROBLOX_STUDIO</span>
              <span className="pixel-text text-[5px]">{selected.status}</span>
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_220px]">
            <div>
              <p className="text-on-surface-variant leading-relaxed">
                {selected.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {selected.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-surface-container-high px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {selected.url && (
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn mt-8 inline-flex items-center gap-2 bg-primary px-5 py-3 text-[10px] font-bold text-on-primary"
                >
                  PLAY_ON_ROBLOX
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>

            <div className="space-y-5">
              {selected.stats.map((metric) => (
                <ChamberMetric key={metric.label} metric={metric} />
              ))}
            </div>
          </div>
        </div>

        <div className="pixel-panel relative overflow-hidden border border-outline-variant/15 bg-surface-container-lowest p-4 md:p-6 scanlines">
          <span className="corner-mark corner-mark-tl">▛</span>
          <span className="corner-mark corner-mark-tr">▜</span>
          <span className="corner-mark corner-mark-bl">▙</span>
          <span className="corner-mark corner-mark-br">▟</span>

          <div className="mb-5 flex items-center justify-between">
            <span className="pixel-text text-[6px] text-primary neon-text">
              CARTRIDGE_RACK
            </span>
            <span className="pixel-text text-[5px] text-outline">
              {robloxGames.length.toString().padStart(2, "0")} BUILDS
            </span>
          </div>

          <div className="space-y-3">
            {robloxGames.map((game, index) => {
              const active = selected.id === game.id;

              return (
                <button
                  key={game.id}
                  type="button"
                  onClick={() => selectGame(game.id)}
                  className={`game-cartridge group relative w-full border p-4 text-left transition-all ${
                    active
                      ? "active border-primary bg-surface-container-high"
                      : "border-outline-variant/15 bg-surface-container-low hover:border-primary/50"
                  }`}
                  aria-pressed={active}
                >
                  <span className="select-cursor pixel-text text-[7px] text-primary">
                    &gt;
                  </span>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="pixel-text text-[5px] text-primary neon-text">
                        SLOT_{String(index + 1).padStart(2, "0")}
                      </span>
                      <h5 className="mt-3 font-headline text-xl font-bold">
                        {game.title}
                      </h5>
                      <p className="mt-2 text-sm text-on-surface-variant">
                        {game.genre}
                      </p>
                    </div>
                    <span className="pixel-badge outline" style={{ fontSize: "5px" }}>
                      {game.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3 reveal">
        {robloxCapabilities.map((capability) => {
          const Icon = capabilityIcons[capability.icon] || Gamepad2;

          return (
            <div
              key={capability.title}
              className="game-capability border border-outline-variant/15 bg-surface-container-low p-5 transition-all hover:border-primary/40"
            >
              <div className="mb-5 flex items-center justify-between">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <Sparkles className="h-4 w-4 text-outline" aria-hidden="true" />
              </div>
              <h5 className="font-headline text-lg font-bold">{capability.title}</h5>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                {capability.detail}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
