'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {ExternalLink} from 'lucide-react';
import type {Project} from '@/lib/content';

type Props = {
  projects: Project[];
};

const FILTER_CATEGORIES = ['All', 'Backend', 'Frontend', 'App', 'Infrastructure', 'Game', 'Fullstack'] as const;

export function ProjectsSection({projects}: Props) {
  const t = useTranslations('projects');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterLabels: Record<string, string> = {
    All: t('filter_all'),
    Backend: t('filter_backend'),
    Frontend: t('filter_frontend'),
    App: t('filter_app'),
    Infrastructure: t('filter_infra'),
    Game: 'Game',
    Fullstack: 'Fullstack',
  };

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.type === activeFilter);

  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
          {t('heading')}
        </h2>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === cat
                  ? 'bg-accent-from text-white'
                  : 'border border-border text-text-secondary hover:border-accent-from/40 hover:text-text-primary'
              }`}
            >
              {filterLabels[cat] ?? cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <div
              key={project.slug}
              className="flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent-from/40"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-heading text-base font-semibold">{project.name}</h3>
                <span className="shrink-0 rounded-full bg-accent-from/10 px-2.5 py-0.5 text-xs text-accent-from">
                  {project.type}
                </span>
              </div>

              <p className="mt-3 flex-1 text-sm text-text-secondary leading-relaxed">
                {project.description}
              </p>

              {project.techTags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface-hover px-2 py-0.5 text-xs text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {project.url && (
                <div className="mt-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition hover:text-text-primary"
                  >
                    {t('visit')}
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
