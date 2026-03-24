import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {Space_Grotesk, Inter} from 'next/font/google';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {Background} from '@/components/Background';
import {GoogleAnalytics} from '@/components/GoogleAnalytics';
import {ThemeProvider} from '@/components/ThemeProvider';
import '../globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

const descriptions: Record<string, string> = {
  en: 'A small group of hobby developers building real things — web apps, APIs, games, and self-hosted infrastructure.',
  de: 'Eine kleine Gruppe von Hobby-Entwicklern, die echte Dinge bauen — Web-Apps, APIs, Spiele und selbst gehostete Infrastruktur.',
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const description = descriptions[locale] ?? descriptions.en;
  const url = `https://studio.922-studio.com/${locale}`;

  return {
    title: '922-Studio — Hobby Dev Collective',
    description,
    alternates: {
      canonical: url,
      languages: {
        en: 'https://studio.922-studio.com/en',
        de: 'https://studio.922-studio.com/de',
        'x-default': 'https://studio.922-studio.com/en',
      },
    },
    openGraph: {
      title: '922-Studio — Hobby Dev Collective',
      description,
      url,
      siteName: '922-Studio',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    icons: {
      icon: '/favicon.svg',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`dark ${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{__html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}}catch(e){}})()`}}
        />
      </head>
      <body className="font-body bg-background text-text-primary min-h-screen antialiased">
        <GoogleAnalytics />
        <ThemeProvider>
          <NextIntlClientProvider>
            <Background />
            <Header />
            <main className="relative z-10 pt-16 pb-20">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
