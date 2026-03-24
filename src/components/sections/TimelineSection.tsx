import {useTranslations} from 'next-intl';
import {getTimelineEntries} from '@/lib/content';

export function TimelineSection() {
  const t = useTranslations('timeline');
  const entries = getTimelineEntries();

  return (
    <section id="timeline" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
          {t('heading')}
        </h2>

        <div className="relative mt-12">
          {/* Center line */}
          <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-border sm:block" />

          <div className="flex flex-col gap-8">
            {entries.map((entry, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={entry.slug}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'}`}>
                    <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent-from/40">
                      <time className="text-xs font-medium text-accent-from">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </time>
                      <h3 className="mt-1 font-heading text-base font-semibold">{entry.title}</h3>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">{entry.description}</p>
                      {entry.tags.length > 0 && (
                        <div className={`mt-3 flex flex-wrap gap-2 ${isLeft ? 'sm:justify-end' : 'sm:justify-start'}`}>
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-accent-from/10 px-2.5 py-0.5 text-xs text-accent-from"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 h-3 w-3 rounded-full border-2 border-accent-from bg-background" />

                  {/* Spacer for opposite side */}
                  <div className="hidden sm:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
