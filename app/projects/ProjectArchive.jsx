"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, Github, Search } from "lucide-react";
import ProjectVisual from "../components/ProjectVisual";
import { projectCategories, projects } from "../lib/projects";

export default function ProjectArchive() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const categoryMatch =
        activeCategory === "all" || project.category === activeCategory;
      const queryMatch =
        !normalizedQuery ||
        [project.title, project.className, project.description, ...project.tech]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return categoryMatch && queryMatch;
    });
  }, [activeCategory, query]);

  return (
    <main className="relative z-10 min-h-screen px-6 pt-24 md:px-12">
      <div className="mx-auto max-w-[1440px]">
        <section className="py-16">
          <div className="mb-12 flex flex-col gap-8 border-b border-outline-variant/15 pb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Link
                href="/#projects"
                className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                BACK_TO_SPECIMENS
              </Link>
              <div className="mb-5 flex items-center gap-3">
                <span className="pixel-text text-[7px] text-primary neon-text">
                  PROJECT_ARCHIVE
                </span>
                <span className="pixel-badge" style={{ fontSize: "5px" }}>
                  ALL_RECORDS
                </span>
              </div>
              <h1 className="text-5xl font-headline font-bold md:text-7xl">
                Research Archive
              </h1>
              <p className="mt-5 text-on-surface-variant leading-relaxed">
                A scalable archive for every project specimen. Add more project
                records in one data file, and the grid will stay consistent.
              </p>
            </div>

            <div className="w-full max-w-md">
              <label className="pixel-text mb-3 block text-[6px] text-outline">
                SEARCH_RECORD
              </label>
              <div className="flex items-center gap-3 border border-outline-variant/20 bg-surface-container-low px-4 py-3">
                <Search className="h-4 w-4 text-outline" aria-hidden="true" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-outline"
                  placeholder="PROJECT / TECH / CLASS"
                  type="search"
                />
              </div>
            </div>
          </div>

          <div className="mb-10 flex flex-wrap gap-3">
            {projectCategories.map((category) => {
              const active = category.id === activeCategory;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-all ${
                    active
                      ? "bg-primary text-on-primary"
                      : "border border-outline-variant/20 text-outline hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="archive-card group flex min-h-[520px] flex-col border border-outline-variant/15 bg-surface-container-lowest p-5 transition-all hover:border-primary/40"
              >
                <ProjectVisual project={project} />

                <div className="flex flex-1 flex-col pt-6">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <span className="pixel-text text-[6px] text-primary neon-text">
                        {project.specimen}
                      </span>
                      <h2 className="mt-3 text-2xl font-headline font-bold">
                        {project.title}
                      </h2>
                    </div>
                    <span className="pixel-badge" style={{ fontSize: "5px" }}>
                      {project.status}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface-container-high px-2 py-1 text-[9px] font-bold uppercase text-outline"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase text-primary transition-all hover:gap-3"
                      >
                        Demo
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase text-primary transition-all hover:gap-3"
                      >
                        Source
                        <Github className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!filteredProjects.length && (
            <div className="border border-outline-variant/15 bg-surface-container-low p-10 text-center">
              <p className="pixel-text text-[7px] text-primary neon-text">
                NO_RECORD_FOUND
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
