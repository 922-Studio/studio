import {useTranslations} from 'next-intl';
import {ExternalLink} from 'lucide-react';
import {getPeople} from '@/lib/content';

export function CollaboratorsSection() {
  const t = useTranslations('collaborators');
  const people = getPeople();

  return (
    <section id="collaborators" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
          {t('heading')}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {people.map((person) => (
            <div
              key={person.slug}
              className="rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-accent-from/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-semibold">{person.name}</h3>
                  <p className="mt-1 text-sm font-medium text-accent-from">{person.role}</p>
                  <p className="mt-4 text-sm text-text-secondary leading-relaxed">{person.bio}</p>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={person.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition hover:text-text-primary"
                >
                  {t('portfolio_link')}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
