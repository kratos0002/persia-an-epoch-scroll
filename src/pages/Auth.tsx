import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { SiteHeader } from '@/components/site/SiteHeader';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'initial' | 'otp-sent'>('initial');
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

  const handleGoogleSignIn = async () => {
    setError('');
    const { error } = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: window.location.origin,
    });
    if (error) setError(error.message);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: true },
    });

    if (error) {
      setError(error.message);
    } else {
      setStep('otp-sent');
      setMessage('Check your email for a sign-in code.');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: otp.trim(),
      type: 'email',
    });

    if (error) {
      setError(error.message);
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
              {step === 'initial' ? 'Welcome' : 'Enter your code'}
            </h1>
            <p className="font-body text-muted-foreground">
              {step === 'initial'
                ? 'Sign in to save progress and join discussions'
                : `We sent a code to ${email}`}
            </p>
          </div>

          {step === 'initial' ? (
            <div className="space-y-4">
              {/* Google sign in */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-card text-foreground border border-border font-body font-semibold text-sm tracking-wide hover:bg-muted transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.26c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground font-body tracking-wider uppercase">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Email OTP */}
              <form onSubmit={handleSendOtp} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-card text-foreground border border-border font-body focus:border-primary outline-none transition-colors placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold tracking-wide hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {loading ? '...' : 'Send sign-in code'}
                </button>
              </form>
            </div>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input
                type="text"
                required
                placeholder="6-digit code"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                maxLength={6}
                className="w-full px-4 py-3 rounded-lg bg-card text-foreground border border-border font-body text-center text-lg tracking-[0.3em] focus:border-primary outline-none transition-colors placeholder:text-muted-foreground placeholder:tracking-normal placeholder:text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold tracking-wide hover:brightness-110 transition-all disabled:opacity-50"
              >
                {loading ? '...' : 'Verify & sign in'}
              </button>
              <button
                type="button"
                onClick={() => { setStep('initial'); setOtp(''); setError(''); setMessage(''); }}
                className="w-full text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                Use a different email
              </button>
            </form>
          )}

          {error && <p className="text-destructive font-body text-sm text-center">{error}</p>}
          {message && <p className="text-primary font-body text-sm text-center">{message}</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
