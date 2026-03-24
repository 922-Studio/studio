import {setRequestLocale} from 'next-intl/server';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {getBlogPosts} from '@/lib/content';
import {Calendar, Clock, Tag} from 'lucide-react';

type Props = {
  params: Promise<{locale: string}>;
};

function BlogListContent() {
  const t = useTranslations('blog');
  const posts = getBlogPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">{t('heading')}</h1>

      <div className="mt-10 flex flex-col gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent-from/40"
          >
            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readingTime}
              </span>
            </div>

            <h2 className="mt-3 font-heading text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">{post.excerpt}</p>

            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Tag size={12} className="text-text-muted" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent-from/10 px-2.5 py-0.5 text-xs text-accent-from"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5">
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-medium text-accent-from transition hover:opacity-80"
              >
                {t('read_more')} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default async function BlogPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <BlogListContent />;
}
