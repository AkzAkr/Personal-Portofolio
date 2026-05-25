"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ExternalLink, Github, ScanLine } from "lucide-react";
import { projects } from "../lib/projects";
import ProjectVisual from "./ProjectVisual";

const featuredProjects = projects.filter((project) => project.featured);

function MetricBar({ metric }) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
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

export default function SpecimenSelect() {
  const [selectedId, setSelectedId] = useState(featuredProjects[0]?.id);
  const selected = useMemo(
    () => featuredProjects.find((project) => project.id === selectedId) || featuredProjects[0],
    [selectedId],
  );

  if (!selected) return null;

  function selectSpecimen(id) {
    if (id !== selectedId) {
      setSelectedId(id);
    }
  }

  return (
    <section className="py-32 border-t border-outline-variant/15" id="projects">
      <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between reveal">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="pixel-text text-[7px] text-primary neon-text">
              SPECIMEN_SELECT
            </span>
            <span className="pixel-badge" style={{ fontSize: "5px" }}>
              FEATURED_PROJECTS
            </span>
          </div>
          <h3 className="text-5xl font-headline font-bold">Choose Your Specimen</h3>
          <p className="mt-5 max-w-xl text-on-surface-variant leading-relaxed">
            Featured projects are shown like lab specimens. The complete archive lives
            on its own page, so the homepage stays focused even when the project list grows.
          </p>
        </div>

        <Link
          href="/projects"
          className="pixel-btn inline-flex items-center justify-center gap-3 bg-primary px-6 py-4 text-sm font-bold text-on-primary transition-all"
        >
          OPEN_ARCHIVE
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="specimen-console grid gap-8 lg:grid-cols-[minmax(360px,1.05fr)_minmax(0,0.95fr)] reveal-scale">
        <div
          key={selected.id}
          className="specimen-detail pixel-panel bg-surface-container-low border border-outline-variant/15 p-6 md:p-8 relative overflow-hidden lg:order-1"
        >
          <div className="hidden absolute right-3 top-3 pixel-text text-[7px] text-primary/30">
            ▛ ▜ ▙ ▟
          </div>

          <span className="corner-mark corner-mark-tl">▛</span>
          <span className="corner-mark corner-mark-tr">▜</span>
          <span className="corner-mark corner-mark-bl">▙</span>
          <span className="corner-mark corner-mark-br">▟</span>

          <div className="mb-6 flex items-center justify-between border-b border-outline-variant/15 pb-4">
            <span className="pixel-text text-[6px] text-primary neon-text">
              PLAYER_SELECT // SPECIMEN_FILE
            </span>
            <span className="pixel-text text-[5px] text-outline">PRESS_START</span>
          </div>

          <div className="mb-8 flex items-start justify-between gap-6">
            <div>
              <span className="pixel-text text-[6px] text-primary neon-text">
                {selected.specimen} // ACTIVE
              </span>
              <h4 className="mt-5 text-4xl font-headline font-bold leading-tight">
                {selected.title}
              </h4>
            </div>
            <span className="pixel-badge" style={{ fontSize: "5px" }}>
              {selected.status}
            </span>
          </div>

          <ProjectVisual project={selected} />

          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_220px]">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <ScanLine className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="pixel-text text-[6px] text-primary neon-text">
                  SPECIMEN_DATA
                </span>
              </div>
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

              <div className="mt-8 flex flex-wrap gap-3">
                {selected.demoUrl && (
                  <a
                    href={selected.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-btn inline-flex items-center gap-2 bg-primary px-5 py-3 text-[10px] font-bold text-on-primary"
                  >
                    VIEW_DEMO
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
                {selected.repoUrl && (
                  <a
                    href={selected.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-outline-variant/30 px-5 py-3 text-[10px] font-bold text-on-surface transition-all hover:border-primary/50"
                  >
                    SOURCE
                    <Github className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="pixel-text mb-2 text-[5px] text-outline">CLASS</p>
                <p className="font-headline text-xl font-bold">{selected.className}</p>
              </div>
              {selected.metrics.map((metric) => (
                <MetricBar key={metric.label} metric={metric} />
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 border border-outline-variant/15 bg-surface-container-lowest text-center">
            <div className="border-r border-outline-variant/15 px-3 py-3">
              <p className="pixel-text text-[5px] text-outline">TYPE</p>
              <p className="mt-2 text-xs font-bold uppercase">{selected.category}</p>
            </div>
            <div className="border-r border-outline-variant/15 px-3 py-3">
              <p className="pixel-text text-[5px] text-outline">STATE</p>
              <p className="mt-2 text-xs font-bold uppercase text-primary">{selected.status}</p>
            </div>
            <div className="px-3 py-3">
              <p className="pixel-text text-[5px] text-outline">SLOT</p>
              <p className="mt-2 text-xs font-bold uppercase">{selected.specimen}</p>
            </div>
          </div>
        </div>

        <div className="pixel-panel bg-surface-container-lowest border border-outline-variant/15 p-4 md:p-6 scanlines lg:order-2 relative overflow-hidden">
          <span className="corner-mark corner-mark-tl">▛</span>
          <span className="corner-mark corner-mark-tr">▜</span>
          <span className="corner-mark corner-mark-bl">▙</span>
          <span className="corner-mark corner-mark-br">▟</span>

          <div className="mb-5 flex items-center justify-between">
            <span className="pixel-text text-[6px] text-primary neon-text">
              CHARACTER_ROSTER
            </span>
            <span className="pixel-text text-[5px] text-outline">
              {featuredProjects.length.toString().padStart(2, "0")} UNITS
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {featuredProjects.map((project, index) => {
              const active = project.id === selected.id;

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => selectSpecimen(project.id)}
                  className={`specimen-slot group relative min-h-[168px] overflow-hidden border p-3 text-left transition-all ${
                    active
                      ? "active border-primary bg-surface-container-high"
                      : "border-outline-variant/15 bg-surface-container-low hover:border-primary/50"
                  }`}
                  aria-pressed={active}
                >
                  <span className="select-cursor pixel-text text-[7px] text-primary">
                    &gt;
                  </span>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="pixel-text text-[5px] text-primary neon-text">
                      {project.specimen}
                    </span>
                    <span className="pixel-text text-[5px] text-outline">
                      P{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <ProjectVisual project={project} compact />

                  <div className="mt-3">
                    <p className="line-clamp-1 font-headline text-sm font-bold">
                      {project.title}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <p className="pixel-text text-[5px] text-outline">
                        {project.status}
                      </p>
                      <span className="pixel-text text-[5px] text-primary specimen-ready">
                        SELECT
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
