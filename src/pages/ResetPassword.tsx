import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { SiteHeader } from '@/components/site/SiteHeader';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      setMessage('Password updated! Redirecting...');
      setTimeout(() => navigate('/'), 2000);
    }
    setLoading(false);
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <p className="font-body text-muted-foreground">Verifying reset link...</p>
        </div>
      </div>
    );
  }

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
            <h1 className="font-display text-3xl font-bold text-foreground">New password</h1>
            <p className="font-body text-muted-foreground">Choose a new password for your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              required
              minLength={6}
              placeholder="New password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card text-foreground border border-border font-body focus:border-primary outline-none transition-colors placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold tracking-wide hover:brightness-110 transition-all disabled:opacity-50"
            >
              {loading ? '...' : 'Update password'}
            </button>
          </form>
          {error && <p className="text-destructive font-body text-sm text-center">{error}</p>}
          {message && <p className="text-primary font-body text-sm text-center">{message}</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
