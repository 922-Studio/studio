import {setRequestLocale} from 'next-intl/server';
import {useTranslations} from 'next-intl';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {getBlogPost, getBlogPosts} from '@/lib/content';
import {MDXRemote} from 'next-mdx-remote/rsc';
import {Calendar, Clock, ArrowLeft, User} from 'lucide-react';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({slug: post.slug}));
}

function BlogPostContent({post}: {post: ReturnType<typeof getBlogPost>}) {
  const t = useTranslations('blog');

  if (!post) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-text-muted transition hover:text-text-secondary"
      >
        <ArrowLeft size={14} />
        {t('back')}
      </Link>

      <article className="mt-8">
        <header>
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">{post.title}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {t('by')} {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTime}
            </span>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
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
        </header>

        <div className="mt-10 prose prose-sm max-w-none text-text-primary [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-4 [&_p]:text-text-secondary [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-text-primary [&_a]:text-accent-from [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-text-secondary [&_li]:mb-1">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
}

export default async function BlogPostPage({params}: Props) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const post = getBlogPost(slug);
  if (!post) notFound();

  return <BlogPostContent post={post} />;
}
