"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "../admin.module.css";
type Ticket = { id: string; phone: string; category: string; message: string; status: string; createdAt: string };
export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [saving, setSaving] = useState<string | null>(null);
  const fetchTickets = useCallback(async () => {
    setLoading(true); setError('');
    try { const res = await fetch('/api/admin/support'); if (!res.ok) throw new Error(); const data = await res.json(); if (!Array.isArray(data)) throw new Error(); setTickets(data); }
    catch { setError('Unable to load messages. Try refreshing.'); } finally { setLoading(false); }
  }, []);
  useEffect(() => { void fetchTickets(); }, [fetchTickets]);
  const pending = tickets.filter(t => t.status === 'pending').length;
  const filtered = tickets.filter(t => (filter === 'all' || t.status === filter) && `${t.phone} ${t.category} ${t.message}`.toLowerCase().includes(query.toLowerCase()));
  return <section className={styles.support}>
    <div className={styles.pageHeading}><div><h1>Support messages</h1><p>Review retailer queries and keep track of responses.</p></div><button className={styles.secondary} onClick={fetchTickets} disabled={loading}>{loading ? 'Loading...' : 'Refresh'}</button></div>
    <div className={styles.stats}>{[['All messages', tickets.length], ['Pending', pending], ['Resolved', tickets.length - pending]].map(([label, count]) => <div key={label}><span>{label}</span><strong>{loading ? '-' : count}</strong></div>)}</div>
    <div className={styles.inbox}>
      <div className={styles.toolbar}><div className={styles.filters} aria-label="Filter messages">{['all','pending','resolved'].map(value => <button key={value} aria-pressed={filter === value} className={filter === value ? styles.selected : ''} onClick={() => setFilter(value)}>{value === 'all' ? 'All messages' : value === 'pending' ? 'Pending' : 'Resolved'}</button>)}</div><input aria-label="Search support messages" placeholder="Search phone or message..." value={query} onChange={e => setQuery(e.target.value)} /></div>
      {error && <p role="alert" className={styles.error}>{error}</p>}
      {loading ? <div className={styles.empty} role="status">Loading messages...</div> : filtered.length === 0 ? <div className={styles.empty}><span aria-hidden="true" className="material-symbols-outlined">inbox</span><h2>{tickets.length === 0 ? 'No messages yet' : 'No matching messages'}</h2><p>{tickets.length === 0 ? 'Retailer support requests will appear here when they arrive.' : 'Try a different search or status filter.'}</p></div> : <div>{filtered.map(ticket => <article key={ticket.id} className={styles.ticket}>
        <div className={styles.ticketTop}><strong>{ticket.phone}</strong><span className={ticket.status === 'pending' ? styles.pending : styles.resolved}>{ticket.status}</span><time dateTime={ticket.createdAt}>{new Date(ticket.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} IST</time></div>
        <p className={styles.category}>{ticket.category}</p><p className={styles.message}>{ticket.message}</p>
        <button disabled={saving !== null} className={styles.secondary} onClick={async () => {
          setSaving(ticket.id); setError(''); const status = ticket.status === 'pending' ? 'resolved' : 'pending';
          try { const res = await fetch('/api/admin/support', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: ticket.id, status }) }); if (!res.ok) throw new Error(); setTickets(current => current.map(t => t.id === ticket.id ? { ...t, status } : t)); }
          catch { setError('Unable to update this message. Please try again.'); } finally { setSaving(null); }
        }}>{saving === ticket.id ? 'Saving...' : ticket.status === 'pending' ? 'Mark resolved' : 'Reopen message'}</button>
      </article>)}</div>}
      <div className={styles.inboxFooter}>{filtered.length} {filtered.length === 1 ? 'message' : 'messages'}</div>
    </div>
  </section>;
}
