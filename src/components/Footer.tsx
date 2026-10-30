"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-900 text-white relative overflow-hidden pt-12 md:pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-10 md:mb-14">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-3 md:gap-4 group">
              <img
                src="/logo-blank.png"
                alt="Sona Cereal Logo"
                className="h-10 md:h-12 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="flex flex-col gap-2">
                <span className="text-2xl md:text-3xl font-headline font-black uppercase leading-none text-white">
                  SONA CEREAL
                </span>
                <span className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">
                  Pure Rice From Indian Soil
                </span>
              </div>
            </Link>
            <p className="text-sm md:text-base text-zinc-400 font-medium leading-relaxed max-w-md">
              Empowering the next generation of retailers through premium grains and performance-driven digital rewards. Experience the Sona Cereal standard.
            </p>
            <div className="flex gap-3.5">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/sona_cereal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.848 0-3.204.012-3.584.07-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/sonacereal/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Portal Column */}
            <div className="space-y-5">
              <span className="block text-sm md:text-base font-black uppercase tracking-wider text-primary mb-4 md:mb-5">
                Portal
              </span>
              <nav className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Registration
                </Link>
                <Link
                  href="/milestones"
                  className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Slab Milestones
                </Link>
                <Link
                  href="/redeem"
                  className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  How to Redeem
                </Link>
                <Link
                  href="/helpdesk"
                  className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Helpcenter
                </Link>
              </nav>
            </div>

            {/* Legal Column */}
            <div className="space-y-5">
              <span className="block text-sm md:text-base font-black uppercase tracking-wider text-primary mb-4 md:mb-5">
                Legal
              </span>
              <nav className="flex flex-col gap-3">
                <Link
                  href="/terms"
                  className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Terms of Use
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Cookie Control
                </Link>
              </nav>
            </div>

            {/* Support Column */}
            <div className="space-y-5 col-span-2 md:col-span-1">
              <span className="block text-sm md:text-base font-black uppercase tracking-wider text-primary mb-4 md:mb-5">
                Support
              </span>
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-3.5 max-w-xs">
                <p className="text-xs md:text-sm text-zinc-400 font-medium leading-relaxed">
                  Stuck on a voucher or grain query? Our elite team is ready.
                </p>
                <Link
                  href="/helpdesk"
                  className="inline-flex items-center gap-2 text-sm font-black uppercase text-primary hover:gap-3 transition-all"
                >
                  PORTAL SUPPORT{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
            &copy; {new Date().getFullYear()} SONA CEREAL PVT LTD. ALL RIGHTS
            RESERVED.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3"
          >
            <span className="text-xs font-black uppercase tracking-widest text-zinc-500 group-hover:text-primary transition-colors">
              Back to summit
            </span>
            <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all">
              <span className="material-symbols-outlined text-sm group-hover:-translate-y-0.5 transition-transform">
                arrow_upward
              </span>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
