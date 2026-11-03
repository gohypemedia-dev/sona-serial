import { NextResponse } from 'next/server';
import { adminPassword, createAdminSession, isAdmin } from '@/lib/admin-session';
export async function GET() { return NextResponse.json({ authenticated: await isAdmin() }); }
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!adminPassword() || body?.password !== adminPassword()) return NextResponse.json({ error: 'Invalid access key' }, { status: 401 });
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set('sona_admin_session', createAdminSession(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 28800 });
  return response;
}
export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.delete('sona_admin_session');
  return response;
}
