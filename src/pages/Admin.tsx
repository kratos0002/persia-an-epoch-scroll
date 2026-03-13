import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { SiteHeader } from '@/components/site/SiteHeader';
import { toast } from 'sonner';

type StoryStatus = 'live' | 'coming-soon' | 'draft';

interface StoryOverride {
  story_id: string;
  status: StoryStatus;
}

/* Config-default stories (same IDs as Home.tsx) */
const STORY_IDS = [
  { id: 'persia', title: 'The Immortal Empire', defaultStatus: 'live' as StoryStatus },
  { id: 'wisdom', title: 'The Library That Lit the World', defaultStatus: 'live' as StoryStatus },
  { id: 'buddhism', title: 'The Path That Split', defaultStatus: 'live' as StoryStatus },
  { id: 'samurai', title: 'Stipends, Bonds & the Death of a Class', defaultStatus: 'live' as StoryStatus },
  { id: '1857', title: 'The Signal and the Fire', defaultStatus: 'live' as StoryStatus },
  { id: 'napoleon', title: 'The Rise and Fall of Napoleon', defaultStatus: 'live' as StoryStatus },
  { id: 'constantinople', title: 'The City of Layers', defaultStatus: 'live' as StoryStatus },
  { id: 'india-states', title: 'The Mosaic Republic', defaultStatus: 'live' as StoryStatus },
  { id: 'mongol-india', title: 'The Wall That Held', defaultStatus: 'live' as StoryStatus },
];

const STATUS_OPTIONS: { value: StoryStatus; label: string; color: string }[] = [
  { value: 'live', label: 'Live', color: 'hsl(142, 71%, 45%)' },
  { value: 'coming-soon', label: 'Coming Soon', color: 'hsl(43, 85%, 55%)' },
  { value: 'draft', label: 'Draft', color: 'hsl(0, 0%, 50%)' },
];

const Admin = () => {
  const { isAdmin, loading: authLoading } = useAdminCheck();
  const navigate = useNavigate();
  const [overrides, setOverrides] = useState<Record<string, StoryStatus>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/');
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    const fetchOverrides = async () => {
      const { data } = await supabase
        .from('story_overrides')
        .select('story_id, status');
      if (data) {
        const map: Record<string, StoryStatus> = {};
        data.forEach((row: { story_id: string; status: string }) => {
          map[row.story_id] = row.status as StoryStatus;
        });
        setOverrides(map);
      }
      setLoaded(true);
    };
    if (isAdmin) fetchOverrides();
  }, [isAdmin]);

  const handleStatusChange = async (storyId: string, newStatus: StoryStatus, defaultStatus: StoryStatus) => {
    setSaving(storyId);

    // If setting back to default, remove the override
    if (newStatus === defaultStatus) {
      const { error } = await supabase
        .from('story_overrides')
        .delete()
        .eq('story_id', storyId);
      if (error) {
        toast.error('Failed to update status');
      } else {
        setOverrides(prev => {
          const next = { ...prev };
          delete next[storyId];
          return next;
        });
        toast.success(`${storyId} reset to default (${defaultStatus})`);
      }
    } else {
      const { data: session } = await supabase.auth.getSession();
      const { error } = await supabase
        .from('story_overrides')
        .upsert({
          story_id: storyId,
          status: newStatus,
          updated_by: session.session?.user.id,
        }, { onConflict: 'story_id' });
      if (error) {
        toast.error('Failed to update status');
      } else {
        setOverrides(prev => ({ ...prev, [storyId]: newStatus }));
        toast.success(`${storyId} → ${newStatus}`);
      }
    }
    setSaving(null);
  };

  if (authLoading || !loaded) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground font-body">Loading…</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-2 font-body font-semibold">
            Admin Panel
          </p>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Essay Status Manager
          </h1>
          <p className="font-body text-muted-foreground mb-10">
            Toggle essays between Live, Coming Soon, and Draft. Changes take effect instantly on the homepage.
            Draft essays are completely hidden.
          </p>

          <div className="space-y-3">
            {STORY_IDS.map((story) => {
              const currentStatus = overrides[story.id] || story.defaultStatus;
              const isOverridden = story.id in overrides;
              const statusMeta = STATUS_OPTIONS.find(s => s.value === currentStatus)!;

              return (
                <motion.div
                  key={story.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Status dot */}
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: statusMeta.color }}
                  />

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm font-bold text-foreground truncate">
                      {story.title}
                    </p>
                    <p className="text-[10px] font-body text-muted-foreground">
                      {story.id}
                      {isOverridden && (
                        <span className="ml-2 text-primary">(overridden)</span>
                      )}
                    </p>
                  </div>

                  {/* Status selector */}
                  <div className="flex gap-1.5 flex-shrink-0">
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleStatusChange(story.id, opt.value, story.defaultStatus)}
                        disabled={saving === story.id}
                        className={`px-3 py-1.5 rounded-md text-[10px] tracking-[0.08em] uppercase font-body font-semibold transition-all ${
                          currentStatus === opt.value
                            ? 'text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted'
                        } ${saving === story.id ? 'opacity-50' : ''}`}
                        style={currentStatus === opt.value ? { background: opt.color } : {}}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs font-body text-muted-foreground">
              <strong className="text-foreground">How it works:</strong> Each essay has a default status set in the config file.
              Changes here create database overrides that take priority. Resetting to the default status removes the override.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
