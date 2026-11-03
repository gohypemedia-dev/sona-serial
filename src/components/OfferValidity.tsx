"use client";
import { useEffect, useState } from 'react';
export default function OfferValidity() {
  const [dates, setDates] = useState<{ offerStart: string; offerEnd: string } | null>(null);
  useEffect(() => { fetch('/api/settings').then(res => res.ok ? res.json() : null).then(setDates).catch(() => {}); }, []);
  if (!dates?.offerStart || !dates?.offerEnd) return null;
  const format = (date: string) => new Date(`${date}T00:00:00+05:30`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
  return <p className="text-sm font-bold text-[#CBA35C] py-4">Offer valid: {format(dates.offerStart)} – {format(dates.offerEnd)}</p>;
}
