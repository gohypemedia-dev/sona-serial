"use client";
import { useEffect, useState } from 'react';

export default function OfferSettings() {
  const [form, setForm] = useState({ offerStart: '', offerEnd: '' });
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('/api/settings').then(async res => {
      if (!res.ok) throw new Error('Unable to load offer dates. Reload to retry.');
      const data = await res.json();
      setForm({ offerStart: data.offerStart, offerEnd: data.offerEnd });
      setReady(true);
    }).catch(error => setMessage(error.message));
  }, []);
  return <form className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-4" onSubmit={async event => {
    event.preventDefault(); setSaving(true); setMessage('');
    try {
      const res = await fetch('/api/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unable to save dates');
      setMessage('Offer dates saved.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to save dates'); }
    finally { setSaving(false); }
  }}>
    <h2 className="text-xl font-bold">Offer validity</h2>
    <p className="text-sm text-zinc-500">Both dates are inclusive. Manage the QTL targets and reward choices below.</p>
    <div className="flex flex-wrap items-end gap-4">
      <label className="grid gap-2 text-sm font-bold">Start date<input required type="date" disabled={!ready} value={form.offerStart} max={form.offerEnd || undefined} onChange={e => setForm({ ...form, offerStart: e.target.value })} className="border rounded-xl p-3" /></label>
      <label className="grid gap-2 text-sm font-bold">End date<input required type="date" disabled={!ready} value={form.offerEnd} min={form.offerStart || undefined} onChange={e => setForm({ ...form, offerEnd: e.target.value })} className="border rounded-xl p-3" /></label>
      <button disabled={!ready || saving} className="bg-zinc-900 text-white px-6 py-3 rounded-xl disabled:opacity-50">{saving ? 'Saving…' : 'Save dates'}</button>
    </div>
    {message && <p role="status" className="text-sm">{message}</p>}
  </form>;
}
