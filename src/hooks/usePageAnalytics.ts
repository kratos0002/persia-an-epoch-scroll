import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

const getSessionId = () => {
  let id = sessionStorage.getItem('epoch_session');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('epoch_session', id);
  }
  return id;
};

export const usePageAnalytics = (pageSlug: string) => {
  const startTime = useRef(Date.now());
  const maxScroll = useRef(0);
  const sent = useRef(false);

  useEffect(() => {
    startTime.current = Date.now();
    maxScroll.current = 0;
    sent.current = false;

    const handleScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      maxScroll.current = Math.max(maxScroll.current, Math.min(scrollPct, 1));
    };

    const sendAnalytics = async () => {
      if (sent.current) return;
      sent.current = true;

      const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);
      if (timeOnPage < 3) return; // skip bounces

      const { data: { user } } = await supabase.auth.getUser();

      await supabase.from('page_analytics').insert({
        page_slug: pageSlug,
        user_id: user?.id || null,
        session_id: getSessionId(),
        scroll_depth: Math.round(maxScroll.current * 100) / 100,
        time_on_page_seconds: timeOnPage,
        referrer: document.referrer || null,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', sendAnalytics);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', sendAnalytics);
      sendAnalytics();
    };
  }, [pageSlug]);
};
