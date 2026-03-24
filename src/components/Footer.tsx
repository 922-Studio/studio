import {Github} from 'lucide-react';
import {useTranslations} from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="relative z-10 border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-sm text-text-muted">
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/922-Studio"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-text-secondary"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
        </div>
        <p>
          {t('built_with')}{' '}
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-text-secondary">Next.js</a>
          {' & '}
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-text-secondary">Tailwind CSS</a>
        </p>
        <p>&copy; 2026 922-Studio</p>
      </div>
    </footer>
  );
}
