import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { SiteHeader } from '@/components/site/SiteHeader';

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/');
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/');
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (mode === 'forgot') {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) setError(error.message);
      else setMessage('Check your email for a reset link.');
      setLoading(false);
      return;
    }

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) setError(error.message);
      else setMessage('Check your email to confirm your account.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="font-display text-3xl font-bold text-foreground">
              {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Join Epoch Lives' : 'Reset password'}
            </h1>
            <p className="font-body text-muted-foreground">
              {mode === 'login' ? 'Sign in to your account' : mode === 'signup' ? 'Save progress, comment on essays' : 'We\'ll email you a reset link'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <input
                type="text"
                placeholder="Display name"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-card text-foreground border border-border font-body focus:border-primary outline-none transition-colors placeholder:text-muted-foreground"
              />
            )}
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card text-foreground border border-border font-body focus:border-primary outline-none transition-colors placeholder:text-muted-foreground"
            />
            {mode !== 'forgot' && (
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength={6}
                className="w-full px-4 py-3 rounded-lg bg-card text-foreground border border-border font-body focus:border-primary outline-none transition-colors placeholder:text-muted-foreground"
              />
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold tracking-wide hover:brightness-110 transition-all disabled:opacity-50"
            >
              {loading ? '...' : mode === 'login' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send reset link'}
            </button>
          </form>

          {error && <p className="text-destructive font-body text-sm text-center">{error}</p>}
          {message && <p className="text-primary font-body text-sm text-center">{message}</p>}

          <div className="text-center space-y-2 font-body text-sm text-muted-foreground">
            {mode === 'login' && (
              <>
                <button onClick={() => setMode('forgot')} className="block mx-auto hover:text-foreground transition-colors">
                  Forgot password?
                </button>
                <p>
                  No account?{' '}
                  <button onClick={() => setMode('signup')} className="text-primary hover:underline">Sign up</button>
                </p>
              </>
            )}
            {mode === 'signup' && (
              <p>
                Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-primary hover:underline">Sign in</button>
              </p>
            )}
            {mode === 'forgot' && (
              <button onClick={() => setMode('login')} className="text-primary hover:underline">Back to sign in</button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
