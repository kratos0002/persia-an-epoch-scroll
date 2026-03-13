import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type StoryStatus = 'live' | 'coming-soon' | 'draft';

export interface StoryOverride {
  story_id: string;
  status: StoryStatus;
}

export const useStoryOverrides = () => {
  const [overrides, setOverrides] = useState<Record<string, StoryStatus>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
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
      setLoading(false);
    };
    fetch();
  }, []);

  return { overrides, loading };
};
