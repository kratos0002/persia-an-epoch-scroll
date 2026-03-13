import React from 'react';
import { Link } from 'react-router-dom';
import { SubscribeForm } from './SubscribeForm';

export const SiteFooter = ({ variant = 'light' }: { variant?: 'light' | 'dark' }) => {
  const isLight = variant === 'light';

  return (
    <footer
      className={`py-16 px-6 ${
        isLight
          ? 'bg-[hsl(35,25%,90%)] text-[hsl(25,15%,35%)]'
          : 'bg-background text-foreground/40'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <p className="font-display text-lg tracking-[0.1em] font-bold opacity-70">
              EPOCH LIVES
            </p>
            <p className="font-body text-sm max-w-xs leading-relaxed opacity-60">
              Turning points in history, felt — not summarized. Visual essays with maps, timelines, and primary sources.
            </p>
          </div>

          {/* Subscribe */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-[0.25em] uppercase font-semibold opacity-50">Get notified</p>
            <p className="font-body text-sm opacity-60 max-w-xs">New essay? We'll write. No spam, no schedule — just history.</p>
            <SubscribeForm variant={isLight ? 'light' : 'dark'} />
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div className="space-y-3">
              <p className="text-[10px] tracking-[0.25em] uppercase font-semibold opacity-50">Explore</p>
              <div className="space-y-2 font-body text-sm">
                <Link to="/" className="block hover:opacity-70 transition-opacity">Home</Link>
                <Link to="/#stories" className="block hover:opacity-70 transition-opacity">Stories</Link>
                <Link to="/about" className="block hover:opacity-70 transition-opacity">About</Link>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] tracking-[0.25em] uppercase font-semibold opacity-50">Connect</p>
              <div className="space-y-2 font-body text-sm">
                <a href="https://twitter.com/EpochLives" target="_blank" rel="noopener" className="block hover:opacity-70 transition-opacity">Twitter / X</a>
                <Link to="/auth" className="block hover:opacity-70 transition-opacity">Sign in</Link>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-12 pt-6 border-t text-xs font-body opacity-40 ${
          isLight ? 'border-[hsl(25,15%,70%)]/30' : 'border-border/30'
        }`}>
          <p>© {new Date().getFullYear()} Epoch Lives. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
