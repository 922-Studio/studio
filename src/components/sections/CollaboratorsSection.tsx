import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {ExternalLink} from 'lucide-react';
import {getPeople} from '@/lib/content';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

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
              className="flex flex-col items-center rounded-2xl border border-border bg-surface p-8 text-center transition-colors hover:border-accent-from/40"
            >
              <div className="mb-4">
                {person.avatar ? (
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-accent-from/60">
                    <Image
                      src={person.avatar}
                      alt={person.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent-from/60 bg-accent-from/10">
                    <span className="font-heading text-xl font-semibold text-accent-from">
                      {getInitials(person.name)}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="font-heading text-xl font-semibold">{person.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent-from">{person.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">{person.bio}</p>

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
