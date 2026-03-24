import {useTranslations} from 'next-intl';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        <span className="text-gradient">{t('title')}</span>
      </h1>
      <p className="mt-4 text-lg text-text-secondary sm:text-xl">{t('tagline')}</p>
      <p className="mt-3 max-w-xl text-base text-text-muted sm:text-lg">{t('subtitle')}</p>
    </section>
  );
}
