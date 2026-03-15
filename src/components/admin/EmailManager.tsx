import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/* ── Story data for broadcast dropdown ── */
const ESSAYS = [
  { id: 'persia', title: 'The Immortal Empire', subtitle: 'How Persia shaped the world', hook: 'An empire that refused to die — from Cyrus to Khomeini, 2,500 years of survival.', path: '/persia' },
  { id: 'wisdom', title: 'The Library That Lit the World', subtitle: 'Baghdad\'s House of Wisdom', hook: 'In a round city on the Tigris, scholars translated the world\'s knowledge — and changed it forever.', path: '/wisdom' },
  { id: 'buddhism', title: 'The Path That Split', subtitle: 'How one teaching became many', hook: 'A prince abandoned everything. His followers couldn\'t agree on what he meant.', path: '/buddhism' },
  { id: 'samurai', title: 'Stipends, Bonds & the Death of a Class', subtitle: 'The economic end of the samurai', hook: 'Japan didn\'t defeat the samurai with swords. It defeated them with bonds.', path: '/samurai' },
  { id: '1857', title: 'The Signal and the Fire', subtitle: 'India\'s first war of independence', hook: 'A cartridge, a rumour, and a continent on fire.', path: '/1857' },
  { id: 'napoleon', title: 'The Rise and Fall of Napoleon', subtitle: 'From Corsica to St. Helena', hook: 'He conquered Europe in a decade and lost it in a season.', path: '/napoleon' },
  { id: 'constantinople', title: 'The City of Layers', subtitle: 'Byzantium → Constantinople → Istanbul', hook: 'Every empire wanted this city. Each one left a layer.', path: '/constantinople' },
  { id: 'india-states', title: 'The Mosaic Republic', subtitle: 'How India unified 565 princely states', hook: 'One man, one map, 565 pieces. The greatest jigsaw puzzle in history.', path: '/india-states' },
  { id: 'mongol-india', title: 'The Wall That Held', subtitle: 'Why the Mongols never conquered India', hook: 'The Mongols broke every wall they faced — except one.', path: '/mongol-india' },
  { id: 'nuclear', title: 'The Chain Reaction', subtitle: 'How the bomb spread', hook: 'One secret. Nine nations. A world that can never go back.', path: '/nuclear' },
  { id: 'nutmeg', title: 'The Spice That Built Empires', subtitle: 'Nutmeg, Manhattan, and genocide', hook: 'A seed so valuable they traded an island for it.', path: '/nutmeg' },
  { id: 'hormuz', title: 'The Throat of the World', subtitle: 'The strait that controls the global economy', hook: 'Twenty-one miles. Twenty-one million barrels. Every single day.', path: '/hormuz' },
];

const SITE_URL = 'https://pastlives.site';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

interface LogEntry {
  id: string;
  template_name: string;
  recipient_email: string;
  status: string;
  error_message: string | null;
  created_at: string;
  message_id: string | null;
}

export const EmailManager = () => {
  const [tab, setTab] = useState<'broadcast' | 'preview' | 'log'>('broadcast');

  return (
    <div>
      <p className="font-body text-muted-foreground mb-4 text-sm">
        Send new-essay notifications to all active subscribers, preview the email template, and monitor delivery.
      </p>

      <div className="flex gap-1 mb-6 p-1 rounded-lg bg-muted inline-flex">
        {([
          { key: 'broadcast' as const, label: 'Broadcast' },
          { key: 'preview' as const, label: 'Preview' },
          { key: 'log' as const, label: 'Send Log' },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-md text-xs font-body font-semibold transition-all ${
              tab === t.key
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'broadcast' && <BroadcastPanel />}
      {tab === 'preview' && <PreviewPanel />}
      {tab === 'log' && <LogPanel />}
    </div>
  );
};

/* ═══════════════════════════════════════════
   BROADCAST PANEL — trigger new-essay emails
   ═══════════════════════════════════════════ */
const BroadcastPanel = () => {
  const [selectedEssay, setSelectedEssay] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [customHook, setCustomHook] = useState('');
  const [customImage, setCustomImage] = useState('');
  const [sendStatus, setSendStatus] = useState<SendStatus>('idle');
  const [enqueuedCount, setEnqueuedCount] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const essay = ESSAYS.find(e => e.id === selectedEssay);

  useEffect(() => {
    if (essay) {
      setCustomTitle(essay.title);
      setCustomSubtitle(essay.subtitle);
      setCustomHook(essay.hook);
      setCustomImage('');
    }
  }, [selectedEssay]);

  const handleSend = async () => {
    if (!selectedEssay) return;
    setSendStatus('sending');
    setConfirmOpen(false);

    try {
      const { data, error } = await supabase.functions.invoke('send-transactional-email', {
        body: {
          template: 'new-essay',
          data: {
            essayTitle: customTitle,
            essaySubtitle: customSubtitle,
            essayHook: customHook,
            essayUrl: `${SITE_URL}${essay?.path || `/${selectedEssay}`}`,
            essayImageUrl: customImage || undefined,
          },
        },
      });

      if (error) throw error;
      setEnqueuedCount(data?.enqueued || 0);
      setSendStatus('sent');
      toast.success(`Enqueued ${data?.enqueued || 0} emails for delivery`);
    } catch (err: unknown) {
      setSendStatus('error');
      toast.error(err instanceof Error ? err.message : 'Failed to send');
    }
  };

  return (
    <div className="space-y-4">
      {/* Essay selector */}
      <div>
        <label className="block text-xs font-body font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
          Select Essay
        </label>
        <select
          value={selectedEssay}
          onChange={e => setSelectedEssay(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-foreground font-body text-sm"
        >
          <option value="">Choose an essay…</option>
          {ESSAYS.map(e => (
            <option key={e.id} value={e.id}>{e.title}</option>
          ))}
        </select>
      </div>

      <AnimatePresence>
        {selectedEssay && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden"
          >
            <Field label="Title" value={customTitle} onChange={setCustomTitle} />
            <Field label="Subtitle" value={customSubtitle} onChange={setCustomSubtitle} />
            <Field label="Hook (quote)" value={customHook} onChange={setCustomHook} multiline />
            <Field label="Image URL (optional)" value={customImage} onChange={setCustomImage} placeholder="https://…" />

            {sendStatus === 'sent' ? (
              <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                <p className="font-body text-sm text-primary font-semibold">
                  ✓ {enqueuedCount} emails enqueued for delivery
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Emails are being processed. Check the Send Log tab for status.
                </p>
                <button
                  onClick={() => { setSendStatus('idle'); setSelectedEssay(''); }}
                  className="mt-3 px-4 py-2 rounded-md text-xs font-body font-semibold bg-muted hover:bg-muted/80 text-foreground transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                {!confirmOpen ? (
                  <button
                    onClick={() => setConfirmOpen(true)}
                    disabled={sendStatus === 'sending' || !customTitle}
                    className="px-5 py-2.5 rounded-lg font-body font-semibold text-xs tracking-wide bg-primary text-primary-foreground hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {sendStatus === 'sending' ? 'Sending…' : 'Send to All Subscribers'}
                  </button>
                ) : (
                  <div className="p-4 rounded-lg border border-destructive/40 bg-destructive/5">
                    <p className="font-body text-sm text-foreground font-semibold mb-1">
                      ⚠ Confirm Broadcast
                    </p>
                    <p className="font-body text-xs text-muted-foreground mb-3">
                      This will send "{customTitle}" to <strong>all active subscribers</strong>. This action cannot be undone.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSend}
                        disabled={sendStatus === 'sending'}
                        className="px-4 py-2 rounded-md text-xs font-body font-semibold bg-destructive text-destructive-foreground hover:brightness-110 transition-all disabled:opacity-50"
                      >
                        {sendStatus === 'sending' ? 'Sending…' : 'Yes, Send Now'}
                      </button>
                      <button
                        onClick={() => setConfirmOpen(false)}
                        className="px-4 py-2 rounded-md text-xs font-body font-semibold bg-muted text-muted-foreground hover:text-foreground transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════
   PREVIEW PANEL — see the email template
   ═══════════════════════════════════════ */
const PreviewPanel = () => {
  const [selectedEssay, setSelectedEssay] = useState(ESSAYS[0].id);
  const essay = ESSAYS.find(e => e.id === selectedEssay)!;
  const font = { fontFamily: "'Cormorant Garamond', Georgia, serif" };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-body font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
          Preview Essay
        </label>
        <select
          value={selectedEssay}
          onChange={e => setSelectedEssay(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-foreground font-body text-sm"
        >
          {ESSAYS.map(e => (
            <option key={e.id} value={e.id}>{e.title}</option>
          ))}
        </select>
      </div>

      {/* Dark cinematic preview */}
      <div className="rounded-lg border border-[#2A2318] overflow-hidden bg-[#0F0D0A]">
        {/* Gold bar */}
        <div className="h-1 bg-[#D4A933]" />

        <div className="px-10 py-10 max-w-[520px] mx-auto bg-[#1A1510] border-x border-[#2A2318]">
          {/* Brand */}
          <p className="text-[13px] font-bold tracking-[0.25em] text-[#D4A933] text-center mb-1" style={font}>
            ✦ &nbsp; EPOCH LIVES &nbsp; ✦
          </p>
          <p className="text-[12px] text-[#6B5E4E] italic text-center tracking-[0.08em] mb-7" style={font}>
            turning points, felt
          </p>

          {/* Hero image placeholder */}
          <div className="-mx-10 mb-6 bg-[#2A2318] flex items-center justify-center py-16">
            <span className="text-[#4A4035] text-xs tracking-widest uppercase font-body">Hero Image</span>
          </div>

          {/* Ornamental label */}
          <p className="text-[11px] font-semibold tracking-[0.3em] text-[#D4A933] text-center mb-4" style={font}>
            ── &nbsp; NEW ESSAY &nbsp; ──
          </p>

          {/* Title */}
          <h2 className="text-[34px] font-bold text-[#D4A933] text-center leading-[1.1] mb-2" style={font}>
            {essay.title}
          </h2>
          <p className="text-[16px] text-[#C4B8A0] italic text-center mb-6 leading-relaxed" style={font}>
            {essay.subtitle}
          </p>

          {/* Gold divider */}
          <hr className="border-[#D4A933] opacity-25 mx-16 mb-6" />

          {/* Hook */}
          <p className="text-[18px] text-[#E8DFD0] leading-[1.7] italic border-l-[3px] border-[#D4A933] pl-4 mb-2" style={font}>
            "{essay.hook}"
          </p>

          {/* CTA */}
          <div className="text-center my-8">
            <span className="inline-block bg-[#D4A933] text-[#1A1510] text-[13px] font-bold rounded px-10 py-4 tracking-[0.12em] uppercase" style={font}>
              Read the Essay →
            </span>
          </div>

          {/* Footer divider */}
          <hr className="border-[#D4A933] opacity-15 mb-5" />

          <p className="text-[13px] text-[#6B5E4E] leading-relaxed mb-3" style={font}>
            You're receiving this because you subscribed to <span className="text-[#D4A933] underline">Epoch Lives</span>.
            No schedule — just history.
          </p>

          <p className="text-[14px] text-[#8A7E6E] italic mb-4" style={font}>
            — The editors
          </p>

          <p className="text-[11px] text-[#4A4035] text-center">
            <span className="underline">Unsubscribe</span>
          </p>
        </div>

        {/* Gold bar */}
        <div className="h-1 bg-[#D4A933]" />
      </div>
    </div>
  );
};

/* ═════════════════════════════════════════
   LOG PANEL — view email delivery status
   ═════════════════════════════════════════ */
const LogPanel = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    const now = new Date();
    const rangeMap = { '24h': 1, '7d': 7, '30d': 30 };
    const since = new Date(now.getTime() - rangeMap[timeRange] * 24 * 60 * 60 * 1000).toISOString();

    let query = supabase
      .from('email_send_log')
      .select('*')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(200);

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;
    if (error) {
      toast.error('Failed to load logs');
    } else {
      // Deduplicate by message_id — keep latest per message
      const seen = new Map<string, LogEntry>();
      for (const row of (data as LogEntry[]) || []) {
        const key = row.message_id || row.id;
        if (!seen.has(key)) {
          seen.set(key, row);
        }
      }
      setLogs(Array.from(seen.values()));
    }
    setLoading(false);
  }, [timeRange, statusFilter]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      sent: 'bg-emerald-500/20 text-emerald-400',
      pending: 'bg-amber-500/20 text-amber-400',
      failed: 'bg-red-500/20 text-red-400',
      dlq: 'bg-red-500/20 text-red-400',
      suppressed: 'bg-yellow-500/20 text-yellow-400',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-body font-semibold uppercase tracking-wider ${colors[status] || 'bg-muted text-muted-foreground'}`}>
        {status}
      </span>
    );
  };

  const stats = {
    total: logs.length,
    sent: logs.filter(l => l.status === 'sent').length,
    pending: logs.filter(l => l.status === 'pending').length,
    failed: logs.filter(l => l.status === 'dlq' || l.status === 'failed').length,
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1 p-1 rounded-lg bg-muted">
          {(['24h', '7d', '30d'] as const).map(r => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-md text-[10px] font-body font-semibold transition-all ${
                timeRange === r ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {r === '24h' ? '24h' : r === '7d' ? '7 days' : '30 days'}
            </button>
          ))}
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground font-body text-xs"
        >
          <option value="all">All statuses</option>
          <option value="sent">Sent</option>
          <option value="pending">Pending</option>
          <option value="dlq">Failed (DLQ)</option>
          <option value="suppressed">Suppressed</option>
        </select>

        <button
          onClick={fetchLogs}
          className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground font-body text-xs hover:bg-muted transition-all"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total', value: stats.total, color: 'text-foreground' },
          { label: 'Sent', value: stats.sent, color: 'text-emerald-400' },
          { label: 'Pending', value: stats.pending, color: 'text-amber-400' },
          { label: 'Failed', value: stats.failed, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="p-3 rounded-lg border border-border bg-card">
            <p className="text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-wider">{s.label}</p>
            <p className={`text-2xl font-display font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-muted-foreground font-body text-sm py-8 text-center">Loading…</p>
      ) : logs.length === 0 ? (
        <p className="text-muted-foreground font-body text-sm py-8 text-center">No emails found for this period.</p>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-wider">Template</th>
                  <th className="px-4 py-3 text-left text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-wider">Recipient</th>
                  <th className="px-4 py-3 text-left text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-wider">Time</th>
                  <th className="px-4 py-3 text-left text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-wider">Error</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-body text-xs text-foreground">{log.template_name}</td>
                    <td className="px-4 py-3 font-body text-xs text-muted-foreground font-mono">{log.recipient_email}</td>
                    <td className="px-4 py-3">{statusBadge(log.status)}</td>
                    <td className="px-4 py-3 font-body text-xs text-muted-foreground">
                      {new Date(log.created_at).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-3 font-body text-xs text-red-400 max-w-[200px] truncate">
                      {log.error_message || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Shared field component ── */
const Field = ({ label, value, onChange, multiline, placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-xs font-body font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
      {label}
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={3}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground font-body text-sm resize-none"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground font-body text-sm"
      />
    )}
  </div>
);
