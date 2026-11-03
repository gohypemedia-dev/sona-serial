import { NextResponse } from 'next/server';
import { getSlabs, saveSlab, deleteSlab } from '@/lib/data';
import { isAdmin } from '@/lib/admin-session';
import { z } from 'zod';
export const dynamic = 'force-dynamic';
const optionalText = z.string().trim().max(2000).optional();
const schema = z.object({
  id: z.string().optional().nullable(), level: z.string().trim().min(1).max(50),
  target: z.number().int().positive().max(2147483647), giftA: z.string().trim().min(1).max(500),
  giftAImg: optionalText, giftB: optionalText, giftBImg: optionalText,
  giftC: optionalText, giftCImg: optionalText, giftD: optionalText, giftDImg: optionalText,
}).strict();
export async function GET() {
  try { return NextResponse.json(await getSlabs()); }
  catch { return NextResponse.json({ error: 'Unable to load reward tiers' }, { status: 500 }); }
}
export async function POST(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Admin login required' }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Enter a level, positive whole QTL target and reward name. Finish image uploads before saving.' }, { status: 400 });
  try { return NextResponse.json(await saveSlab(parsed.data)); }
  catch { return NextResponse.json({ error: 'Unable to save reward tier' }, { status: 500 }); }
}
export async function DELETE(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Admin login required' }, { status: 401 });
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  try { await deleteSlab(id); return NextResponse.json({ success: true }); }
  catch { return NextResponse.json({ error: 'Unable to remove reward tier' }, { status: 500 }); }
}
