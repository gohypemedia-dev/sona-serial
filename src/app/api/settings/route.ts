import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/data';
import { isAdmin } from '@/lib/admin-session';
import { z } from 'zod';
export const dynamic = 'force-dynamic';
const schema = z.object({ rewardsDistributed: z.boolean().optional(), offerStart: z.iso.date().optional(), offerEnd: z.iso.date().optional() }).strict();
export async function GET() {
  try { return NextResponse.json(await getSettings()); }
  catch { return NextResponse.json({ error: 'Unable to load settings' }, { status: 500 }); }
}
export async function PATCH(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Admin login required' }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid settings or dates' }, { status: 400 });
  try {
    const current = await getSettings();
    if ((parsed.data.offerStart ?? current.offerStart) > (parsed.data.offerEnd ?? current.offerEnd)) return NextResponse.json({ error: 'End date must be on or after start date' }, { status: 400 });
    return NextResponse.json({ success: true, settings: await updateSettings(parsed.data) });
  } catch { return NextResponse.json({ error: 'Unable to save settings' }, { status: 500 }); }
}
