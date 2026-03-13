import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Monitor, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'mobile-notice-dismissed';

export const MobileNotice = () => {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isMobile && !sessionStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
      const timer = setTimeout(() => dismiss(), 8000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 z-50 flex items-center gap-3 rounded-lg border border-white/10 bg-black/80 backdrop-blur-md px-4 py-3 shadow-2xl"
          onClick={dismiss}
        >
          <Monitor className="h-5 w-5 shrink-0 text-amber-400" />
          <p className="text-sm text-white/90 flex-1">
            For the best experience, open this essay on a desktop browser.
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); dismiss(); }}
            className="shrink-0 rounded p-1 text-white/50 hover:text-white/90 transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
