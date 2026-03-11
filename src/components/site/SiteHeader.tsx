import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Stories', href: '/#stories' },
  { label: 'About', href: '/about' },
];

export const SiteHeader = () => {
  const location = useLocation();
  const isEssay = location.pathname !== '/' && location.pathname !== '/about';
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isEssay
          ? 'bg-background/80 backdrop-blur-md border-b border-border/30'
          : 'bg-[hsl(38,30%,94%)]/90 backdrop-blur-md border-b border-[hsl(35,20%,80%)]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className={`font-display text-xl tracking-[0.12em] font-bold transition-colors ${
            isEssay ? 'text-primary' : 'text-[hsl(25,30%,25%)]'
          }`}
        >
          EPOCH LIVES
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-xs tracking-[0.2em] uppercase font-body font-semibold transition-colors hover:opacity-70 ${
                isEssay ? 'text-foreground/60' : 'text-[hsl(25,15%,40%)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`w-5 h-px transition-all duration-300 ${
                  isEssay ? 'bg-foreground/60' : 'bg-[hsl(25,15%,40%)]'
                } ${
                  menuOpen && i === 0 ? 'rotate-45 translate-y-[7px]' : ''
                } ${menuOpen && i === 1 ? 'opacity-0' : ''} ${
                  menuOpen && i === 2 ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`md:hidden overflow-hidden border-t ${
              isEssay ? 'bg-background border-border/30' : 'bg-[hsl(38,30%,94%)] border-[hsl(35,20%,80%)]/40'
            }`}
          >
            <div className="px-6 py-4 space-y-4">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-sm tracking-[0.15em] uppercase font-body font-semibold ${
                    isEssay ? 'text-foreground/60' : 'text-[hsl(25,15%,40%)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
