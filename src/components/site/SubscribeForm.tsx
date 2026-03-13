import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

export const SubscribeForm = ({ variant = 'dark' }: { variant?: 'dark' | 'light' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    const trimmedEmail = email.trim().toLowerCase();
    const { error } = await supabase.from('subscribers').insert({ email: trimmedEmail });

    if (error) {
      if (error.code === '23505') {
        setStatus('success'); // already subscribed — don't reveal
      } else {
        setErrorMsg('Something went wrong. Please try again.');
        setStatus('error');
      }
    } else {
      setStatus('success');
      // Fire-and-forget welcome email
      supabase.functions.invoke('send-transactional-email', {
        body: { template: 'subscriber-welcome', data: { email: trimmedEmail } },
      }).catch(() => {});
    }
  };

  const isDark = variant === 'dark';

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-body text-lg ${isDark ? 'text-[hsl(43,85%,55%)]' : 'text-[hsl(25,40%,35%)]'}`}
          >
            You're in. We'll write when history demands it.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex gap-2"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`flex-1 px-4 py-3 rounded-lg font-body text-base outline-none transition-colors ${
                isDark
                  ? 'bg-[hsl(220,15%,15%)] text-foreground border border-border focus:border-[hsl(43,85%,55%)] placeholder:text-muted-foreground'
                  : 'bg-white text-[hsl(25,15%,25%)] border border-[hsl(25,15%,80%)] focus:border-[hsl(25,40%,45%)] placeholder:text-[hsl(25,15%,60%)]'
              }`}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`px-5 py-3 rounded-lg font-body font-semibold text-sm tracking-wide transition-all whitespace-nowrap ${
                isDark
                  ? 'bg-primary text-primary-foreground hover:brightness-110'
                  : 'bg-[hsl(25,40%,35%)] text-white hover:bg-[hsl(25,40%,30%)]'
              } disabled:opacity-50`}
            >
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {status === 'error' && (
        <p className="mt-2 font-body text-sm text-destructive">{errorMsg}</p>
      )}
    </div>
  );
};
