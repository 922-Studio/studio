'use client';

import {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import {Github} from 'lucide-react';
import {usePathname, Link} from '@/i18n/navigation';
import {LanguageSwitcher} from './LanguageSwitcher';
import {ThemeToggle} from './ThemeToggle';

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 50) {
        setHidden(false);
      } else if (currentY < lastScrollY.current) {
        setHidden(false);
      } else {
        setHidden(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      {isHome ? (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
          }}
          className="flex items-center"
        >
          <Image src="/922-studio-logo.png" alt="922-Studio" width={36} height={36} className="rounded-lg" />
        </a>
      ) : (
        <Link href="/" className="flex items-center">
          <Image src="/922-studio-logo.png" alt="922-Studio" width={36} height={36} className="rounded-lg" />
        </Link>
      )}

      <nav className="hidden sm:flex items-center gap-6">
        <Link
          href="/"
          className={`text-sm transition-colors ${pathname === '/' ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'}`}
        >
          Home
        </Link>
        <Link
          href="/blog"
          className={`text-sm transition-colors ${pathname.startsWith('/blog') ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'}`}
        >
          Blog
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/922-Studio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-text-primary transition-colors"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
