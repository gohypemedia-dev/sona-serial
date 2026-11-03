import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
export function adminPassword() { return process.env.ADMIN_PASSWORD; }
function signature(value: string) { const secret = process.env.ADMIN_SESSION_SECRET; if (!secret) throw new Error('ADMIN_SESSION_SECRET is required'); return createHmac('sha256', secret).update(value).digest('hex'); }
export function createAdminSession() {
  const expiry = String(Date.now() + 28800000);
  return `${expiry}.${signature(expiry)}`;
}
export async function isAdmin() {
  const token = (await cookies()).get('sona_admin_session')?.value;
  if (!token) return false;
  const [expiry, digest] = token.split('.');
  if (!expiry || !digest || !Number.isFinite(Number(expiry)) || Number(expiry) <= Date.now()) return false;
  const expected = Buffer.from(signature(expiry));
  const actual = Buffer.from(digest);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
