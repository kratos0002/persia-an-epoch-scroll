import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profile?: { display_name: string | null; avatar_url: string | null };
}

export const CommentsSection = ({ pageSlug }: { pageSlug: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [pageSlug]);

  const fetchComments = async () => {
    const { data: commentsData } = await supabase
      .from('comments')
      .select('*')
      .eq('page_slug', pageSlug)
      .order('created_at', { ascending: true });

    if (!commentsData) return;

    // Fetch profiles for all comment authors
    const userIds = [...new Set(commentsData.map(c => c.user_id))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, display_name, avatar_url')
      .in('user_id', userIds);

    const profileMap = new Map(profiles?.map(p => [p.user_id, p]) ?? []);
    setComments(commentsData.map(c => ({
      ...c,
      profile: profileMap.get(c.user_id) ?? { display_name: null, avatar_url: null },
    })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    setLoading(true);
    await supabase.from('comments').insert({
      content: newComment.trim(),
      page_slug: pageSlug,
      user_id: user.id,
    });
    setNewComment('');
    setLoading(false);
    fetchComments();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('comments').delete().eq('id', id);
    fetchComments();
  };

  const handleUpdate = async (id: string) => {
    if (!editContent.trim()) return;
    await supabase.from('comments').update({ content: editContent.trim() }).eq('id', id);
    setEditingId(null);
    setEditContent('');
    fetchComments();
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getInitial = (name: string | null) => (name ? name.charAt(0).toUpperCase() : '?');

  return (
    <section className="py-16 px-6 border-t border-border/20">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">Discussion</h2>
        <p className="font-body text-sm text-muted-foreground mb-8">
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </p>

        {/* Comment list */}
        <div className="space-y-6 mb-10">
          <AnimatePresence>
            {comments.map(c => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold font-body shrink-0 mt-0.5">
                  {getInitial(c.profile?.display_name ?? null)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-body font-semibold text-sm text-foreground">
                      {c.profile?.display_name ?? 'Reader'}
                    </span>
                    <span className="font-body text-xs text-muted-foreground">
                      {formatDate(c.created_at)}
                    </span>
                  </div>
                  {editingId === c.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-card text-foreground border border-border font-body text-sm resize-none focus:border-primary outline-none"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdate(c.id)} className="text-xs font-body font-semibold text-primary hover:underline">Save</button>
                        <button onClick={() => setEditingId(null)} className="text-xs font-body text-muted-foreground hover:underline">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <p className="font-body text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{c.content}</p>
                  )}
                  {user?.id === c.user_id && editingId !== c.id && (
                    <div className="flex gap-3 mt-1.5">
                      <button
                        onClick={() => { setEditingId(c.id); setEditContent(c.content); }}
                        className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-xs font-body text-muted-foreground hover:text-destructive transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {comments.length === 0 && (
            <p className="font-body text-sm text-muted-foreground/60 italic">No comments yet. Be the first to share your thoughts.</p>
          )}
        </div>

        {/* New comment form */}
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Share your thoughts on this essay..."
              className="w-full px-4 py-3 rounded-lg bg-card text-foreground border border-border font-body text-sm resize-none focus:border-primary outline-none transition-colors placeholder:text-muted-foreground"
              rows={3}
            />
            <button
              type="submit"
              disabled={loading || !newComment.trim()}
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all disabled:opacity-40"
            >
              {loading ? '...' : 'Post comment'}
            </button>
          </form>
        ) : (
          <p className="font-body text-sm text-muted-foreground">
            <a href="/auth" className="text-primary hover:underline">Sign in</a> to join the discussion.
          </p>
        )}
      </div>
    </section>
  );
};
