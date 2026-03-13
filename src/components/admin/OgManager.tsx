import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Copy, Upload, Sparkles, ExternalLink, Check } from 'lucide-react';

interface OgData {
  og_title: string;
  og_description: string;
  og_image_url: string;
}

const STORY_IDS = [
  { id: 'persia', title: 'The Immortal Empire' },
  { id: 'wisdom', title: 'The Library That Lit the World' },
  { id: 'buddhism', title: 'The Path That Split' },
  { id: 'samurai', title: 'Stipends, Bonds & the Death of a Class' },
  { id: '1857', title: 'The Signal and the Fire' },
  { id: 'napoleon', title: 'The Rise and Fall of Napoleon' },
  { id: 'constantinople', title: 'The City of Layers' },
  { id: 'india-states', title: 'The Mosaic Republic' },
  { id: 'mongol-india', title: 'The Wall That Held' },
];

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const OgManager = () => {
  const [ogData, setOgData] = useState<Record<string, OgData>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<OgData>({ og_title: '', og_description: '', og_image_url: '' });
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAiPrompt, setShowAiPrompt] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const { data } = await supabase.from('story_og').select('*');
    if (data) {
      const map: Record<string, OgData> = {};
      data.forEach((row: any) => {
        map[row.story_id] = {
          og_title: row.og_title || '',
          og_description: row.og_description || '',
          og_image_url: row.og_image_url || '',
        };
      });
      setOgData(map);
    }
  };

  const startEditing = (storyId: string, title: string) => {
    setEditing(storyId);
    setForm(ogData[storyId] || {
      og_title: `${title} — Epoch Lives`,
      og_description: '',
      og_image_url: '',
    });
    setShowAiPrompt(null);
  };

  const saveOg = async (storyId: string) => {
    setSaving(true);
    const { data: session } = await supabase.auth.getSession();
    const { error } = await supabase.from('story_og').upsert({
      story_id: storyId,
      og_title: form.og_title || null,
      og_description: form.og_description || null,
      og_image_url: form.og_image_url || null,
      updated_by: session.session?.user.id,
    }, { onConflict: 'story_id' });

    if (error) {
      toast.error('Failed to save OG data');
    } else {
      setOgData(prev => ({ ...prev, [storyId]: { ...form } }));
      setEditing(null);
      toast.success('OG data saved');
    }
    setSaving(false);
  };

  const handleImageUpload = async (storyId: string, file: File) => {
    const ext = file.name.split('.').pop();
    const path = `${storyId}.${ext}`;

    // Delete old file if exists
    await supabase.storage.from('og-images').remove([path]);

    const { error } = await supabase.storage
      .from('og-images')
      .upload(path, file, { upsert: true, contentType: file.type });

    if (error) {
      toast.error('Upload failed: ' + error.message);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('og-images')
      .getPublicUrl(path);

    setForm(prev => ({ ...prev, og_image_url: urlData.publicUrl }));
    toast.success('Image uploaded');
  };

  const generateAiImage = async (storyId: string, storyTitle: string) => {
    const prompt = aiPrompt.trim() || `Create a dramatic, cinematic social share image (1200x630) for a historical essay titled "${storyTitle}". Rich colors, evocative composition, no text overlays.`;
    setGenerating(storyId);

    try {
      const { data: fnData, error: fnError } = await supabase.functions.invoke('generate-og-image', {
        body: { prompt, storyId },
      });

      if (fnError) throw fnError;
      if (fnData?.imageUrl) {
        setForm(prev => ({ ...prev, og_image_url: fnData.imageUrl }));
        toast.success('AI image generated & uploaded');
      } else {
        throw new Error('No image returned');
      }
    } catch (e: any) {
      toast.error('AI generation failed: ' + (e.message || 'Unknown error'));
    }
    setGenerating(null);
    setShowAiPrompt(null);
  };

  const getShareUrl = (storyId: string) => {
    return `${SUPABASE_URL}/functions/v1/og-share?story=${storyId}`;
  };

  const copyShareUrl = (storyId: string) => {
    navigator.clipboard.writeText(getShareUrl(storyId));
    setCopied(storyId);
    toast.success('Share URL copied!');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4">
      <p className="font-body text-muted-foreground text-sm mb-6">
        Manage OG images and metadata per essay. Use the share URL when posting on social media — crawlers will see rich previews.
      </p>

      {STORY_IDS.map(({ id, title }) => {
        const data = ogData[id];
        const isEditing = editing === id;

        return (
          <div key={id} className="rounded-lg border border-border bg-card p-4">
            {/* Header row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm font-bold text-foreground truncate">{title}</p>
                <p className="text-[10px] font-body text-muted-foreground">{id}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => copyShareUrl(id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] tracking-[0.08em] uppercase font-body font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  {copied === id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === id ? 'Copied' : 'Share URL'}
                </button>
                {!isEditing && (
                  <button
                    onClick={() => startEditing(id, title)}
                    className="px-3 py-1.5 rounded-md text-[10px] tracking-[0.08em] uppercase font-body font-semibold text-primary hover:bg-primary/10 transition-all"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {/* Preview when not editing */}
            {!isEditing && data && (
              <div className="flex gap-3 mt-2">
                {data.og_image_url && (
                  <img
                    src={data.og_image_url}
                    alt="OG preview"
                    className="w-32 h-[67px] object-cover rounded border border-border flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-xs font-body font-semibold text-foreground truncate">{data.og_title || '—'}</p>
                  <p className="text-[10px] font-body text-muted-foreground line-clamp-2">{data.og_description || '—'}</p>
                </div>
              </div>
            )}

            {!isEditing && !data && (
              <p className="text-[10px] font-body text-muted-foreground italic mt-1">No OG data set — will use site defaults</p>
            )}

            {/* Edit form */}
            {isEditing && (
              <div className="mt-3 space-y-3">
                <div>
                  <label className="text-[10px] font-body font-semibold uppercase tracking-wider text-muted-foreground">OG Title</label>
                  <input
                    type="text"
                    value={form.og_title}
                    onChange={e => setForm(p => ({ ...p, og_title: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Essay title for social sharing"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-body font-semibold uppercase tracking-wider text-muted-foreground">OG Description</label>
                  <textarea
                    value={form.og_description}
                    onChange={e => setForm(p => ({ ...p, og_description: e.target.value }))}
                    rows={2}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    placeholder="Compelling description under 160 characters"
                  />
                  <p className="text-[10px] font-body text-muted-foreground mt-0.5">{form.og_description.length}/160</p>
                </div>

                {/* Image section */}
                <div>
                  <label className="text-[10px] font-body font-semibold uppercase tracking-wider text-muted-foreground">OG Image (1200×630)</label>
                  {form.og_image_url && (
                    <img
                      src={form.og_image_url}
                      alt="OG preview"
                      className="mt-2 w-full max-w-md aspect-[1200/630] object-cover rounded border border-border"
                    />
                  )}
                  <div className="flex gap-2 mt-2">
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(id, file);
                    }} />
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] tracking-[0.08em] uppercase font-body font-semibold border border-input hover:bg-muted transition-all"
                    >
                      <Upload className="w-3 h-3" /> Upload
                    </button>
                    <button
                      onClick={() => setShowAiPrompt(showAiPrompt === id ? null : id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] tracking-[0.08em] uppercase font-body font-semibold border border-input hover:bg-muted transition-all"
                    >
                      <Sparkles className="w-3 h-3" /> AI Generate
                    </button>
                  </div>

                  {showAiPrompt === id && (
                    <div className="mt-2 space-y-2">
                      <textarea
                        value={aiPrompt}
                        onChange={e => setAiPrompt(e.target.value)}
                        rows={2}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body resize-none"
                        placeholder={`e.g. "A dramatic scene of Napoleon at Waterloo, cinematic lighting, oil painting style"`}
                      />
                      <button
                        onClick={() => generateAiImage(id, title)}
                        disabled={generating === id}
                        className="px-4 py-1.5 rounded-md text-[10px] tracking-[0.08em] uppercase font-body font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50"
                      >
                        {generating === id ? 'Generating…' : 'Generate Image'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Social preview card */}
                {(form.og_title || form.og_image_url) && (
                  <div className="mt-4">
                    <p className="text-[10px] font-body font-semibold uppercase tracking-wider text-muted-foreground mb-2">Preview</p>
                    <div className="border border-border rounded-lg overflow-hidden max-w-sm bg-card">
                      {form.og_image_url && (
                        <img src={form.og_image_url} alt="" className="w-full aspect-[1200/630] object-cover" />
                      )}
                      <div className="px-3 py-2">
                        <p className="text-[10px] font-body text-muted-foreground uppercase">pastlives.site</p>
                        <p className="text-sm font-body font-semibold text-foreground truncate">{form.og_title}</p>
                        <p className="text-xs font-body text-muted-foreground line-clamp-2">{form.og_description}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => saveOg(id)}
                    disabled={saving}
                    className="px-4 py-1.5 rounded-md text-[10px] tracking-[0.08em] uppercase font-body font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="px-4 py-1.5 rounded-md text-[10px] tracking-[0.08em] uppercase font-body font-semibold text-muted-foreground hover:text-foreground transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
