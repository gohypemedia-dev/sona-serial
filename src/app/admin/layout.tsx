"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./admin.module.css";
const navigation = [
  { href: '/admin/submissions', label: 'Submissions', icon: 'description' },
  { href: '/admin/registrations', label: 'Businesses', icon: 'storefront' },
  { href: '/admin/slabs', label: 'Offers & rewards', icon: 'redeem' },
  { href: '/admin/support', label: 'Support messages', icon: 'inbox' },
  { href: '/admin/coupons', label: 'Coupons', icon: 'confirmation_number' },
];
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    fetch('/api/admin/session').then(r => r.json()).then(data => setAuthenticated(data.authenticated === true)).catch(() => setAuthenticated(false)).finally(() => setChecking(false));
  }, []);
  if (checking) return <div className={styles.login} role="status">Loading admin...</div>;
  if (!authenticated) return <div className={styles.login}><form className={styles.loginCard} onSubmit={async event => {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const res = await fetch('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      if (!res.ok) throw new Error();
      setAuthenticated(true); setPassword('');
    } catch { setError('Unable to sign in. Check your password and try again.'); }
    finally { setBusy(false); }
  }}>
    <p className={styles.brand}>SONA <span>CEREAL</span></p><h1>Admin sign in</h1><p>Manage retailers, rewards and support.</p>
    <label htmlFor="admin-password">Password</label><input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} />
    {error && <p role="alert" className={styles.error}>{error}</p>}
    <button disabled={busy} className={styles.primary}>{busy ? 'Signing in...' : 'Sign in'}</button><Link href="/">Back to retailer portal</Link>
  </form></div>;
  return <div className={styles.shell}>
    <aside className={styles.sidebar}>
      <Link href="/admin" className={styles.brand}>SONA <span>CEREAL</span><small>Administration</small></Link>
      <p className={styles.navLabel}>WORKSPACE</p>
      <nav aria-label="Admin navigation">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} className={pathname === item.href ? styles.active : ''}><span aria-hidden="true" className="material-symbols-outlined">{item.icon}</span>{item.label}</Link>)}</nav>
      <Link href="/" className={styles.portal}><span aria-hidden="true" className="material-symbols-outlined">open_in_new</span>View retailer portal</Link>
    </aside>
    <div className={styles.main}>
      <header className={styles.topbar}><span>Workspace <span className={styles.separator}>/</span> <strong>{navigation.find(item => item.href === pathname)?.label || 'Overview'}</strong></span><button disabled={busy} onClick={async () => {
        setBusy(true); setError('');
        try { const res = await fetch('/api/admin/session', { method: 'DELETE' }); if (!res.ok) throw new Error(); setAuthenticated(false); }
        catch { setError('Unable to sign out. Please try again.'); } finally { setBusy(false); }
      }}>Sign out</button></header>
      {error && <p role="alert" className={styles.error}>{error}</p>}
      <main className={styles.content}>{children}</main>
    </div>
  </div>;
}
