"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const SHOWCASE_REWARDS = [
   {
      category: "Superbike Milestone",
      title: "Royal Enfield Hunter 350",
      tier: "Slab 7 · 1500 Quintals",
      img: "https://res.cloudinary.com/dmyiv38if/image/upload/v1775462794/slabs/yl0sjanxckrcljca3jvz.avif",
      fallback: "/reward-bike.png",
      tag: "FLAGSHIP ASSET",
      specs: "350cc J-Series · On-Road Delivery"
   },
   {
      category: "Elite Flagship Tech",
      title: "Apple iPhone 16 Pro Max",
      tier: "Slab 5 · 1000 Quintals",
      img: "https://res.cloudinary.com/dmyiv38if/image/upload/v1775462747/slabs/uo94vswem9thyrr9zltk.jpg",
      fallback: "/reward-iphone.png",
      tag: "PRO PERFORMANCE",
      specs: "256GB · Super Retina XDR Display"
   },
   {
      category: "Gold & Diamond Wealth",
      title: "Tanishq Diamond & Gold Voucher",
      tier: "Slab 7 · 1500 Quintals",
      img: "https://res.cloudinary.com/dmyiv38if/image/upload/v1775462779/slabs/mjz2yitgy7mpka9prbbn.jpg",
      fallback: "/reward-gold.png",
      tag: "CERTIFIED WEALTH",
      specs: "Worth ₹1,65,000 · Official Tanishq / Kalyan"
   },
   {
      category: "Smart Home Cinema",
      title: "VU 75\" 4K QLED Cinema TV",
      tier: "Slab 4 · 750 Quintals",
      img: "https://res.cloudinary.com/dmyiv38if/image/upload/v1775462696/slabs/zeg1rto5tomcpppgxidt.webp",
      fallback: "/reward-tv.png",
      tag: "4K CINEMA",
      specs: "75-Inch Ultra HD · Vibe Series Audio"
   },
   {
      category: "Modern Kitchen",
      title: "Panasonic 23L Microwave & JBL Audio",
      tier: "Slab 1 · 200 Quintals",
      img: "https://res.cloudinary.com/dmyiv38if/image/upload/v1775462489/slabs/gplmsbfbxhxxto6mz41t.webp",
      fallback: "/reward-laptop.png",
      tag: "STARTER TIER",
      specs: "Unlockable at Just 200 Quintals"
   }
];

function fallbackImageByName(name: string): string {
   const lower = (name || "").toLowerCase();
   if (lower.includes("bike") || lower.includes("hunter") || lower.includes("harley") || lower.includes("apache") || lower.includes("ola") || lower.includes("guerrilla")) return "/reward-bike.png";
   if (lower.includes("gold") || lower.includes("jewelry") || lower.includes("diamond") || lower.includes("voucher") || lower.includes("bullion")) return "/reward-gold.png";
   if (lower.includes("phone") || lower.includes("iphone") || lower.includes("realme") || lower.includes("tab") || lower.includes("one plus") || lower.includes("lenovo")) return "/reward-iphone.png";
   if (lower.includes("tv") || lower.includes("qled") || lower.includes("xiaomi") || lower.includes("vu")) return "/reward-tv.png";
   if (lower.includes("laptop") || lower.includes("hp") || lower.includes("think") || lower.includes("intel")) return "/reward-laptop.png";
   return "/reward-gold.png";
}

export default function MilestonesPage() {
   const [slabs, setSlabs] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetch("/api/slabs")
         .then((res) => res.json())
         .then((data) => {
            setSlabs(Array.isArray(data) ? data : []);
         })
         .catch((err) => console.error(err))
         .finally(() => setLoading(false));
   }, []);

   return (
      <div className="min-h-screen bg-white font-body selection:bg-[#CBA35C] selection:text-black">
         <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
            {/* Hero Section: Centered viewport fit without unnecessary top spacing */}
            <section className="lg:min-h-[calc(100vh-5.5rem)] flex flex-col justify-center py-4 lg:py-6 mb-12 lg:mb-16">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left: REWARD ARCHITECTURE */}
                  <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-center">
                     <div className="inline-flex items-center gap-2.5 bg-zinc-900 text-white px-4 py-2 rounded-full mb-5 md:mb-6 border border-white/10 shadow-xl w-fit">
                        <span className="w-2 h-2 bg-[#CBA35C] rounded-full animate-pulse"></span>
                        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em] text-[#CBA35C]">Sona Elite Slabs 2025</span>
                     </div>
                     <h1 className="font-headline font-black text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[5rem] uppercase text-zinc-900 leading-[0.95] tracking-tighter mb-4 md:mb-5">
                        <span className="block">REWARD</span>
                        <span className="block text-[#CBA35C] mt-1 md:mt-2">ARCHITECTURE.</span>
                     </h1>
                     <p className="text-zinc-500 text-sm sm:text-base md:text-lg max-w-lg font-medium leading-relaxed">
                        Reach the weight milestones to unlock exclusive assets. Elite validation for Sona Cereal market leaders.
                     </p>
                  </div>

                  {/* Right: 3D Interactive Showcase */}
                  <div className="lg:col-span-7 xl:col-span-6">
                     <EliteRewardsShowcase />
                  </div>
               </div>
            </section>

            {/* Legend / Table Header - Absolute Width Pill */}
            <div className="hidden lg:grid grid-cols-12 gap-8 px-24 py-8 bg-zinc-900 rounded-full text-white items-center shadow-2xl mb-12 border border-white/5 w-full">
               <div className="col-span-2 text-[11px] font-black uppercase tracking-[0.8em] text-[#CBA35C]">SLABS</div>
               <div className="col-span-3 text-[11px] font-black uppercase tracking-[0.8em] text-white/40">MILESTONE</div>
               <div className="col-span-7 text-[11px] font-black uppercase tracking-[0.8em] text-[#CBA35C] text-right pr-12">REWARDS PORTFOLIO</div>
            </div>

            {/* Milestone Grid - Edge-to-Edge */}
            <div className="space-y-8 md:space-y-10 w-full mx-auto px-2 md:px-0">
               {loading ? (
                  <div className="text-center py-32 bg-zinc-50/50 rounded-[4rem]">
                     <div className="inline-block w-16 h-16 border-[6px] border-zinc-100 border-t-[#CBA35C] rounded-full animate-spin"></div>
                     <p className="mt-6 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Loading Elite Slabs...</p>
                  </div>
               ) : (
                  slabs.map((slab) => (
                     <SlabCard key={slab.id} slab={slab} />
                  ))
               )}
            </div>

            {/* Global CTA - Equal Top and Bottom Spacing */}
            <div className="py-14 md:py-20">
               <div className="relative group font-body max-w-5xl mx-auto text-center md:text-left">
                  <div className="absolute inset-0 bg-[#CBA35C] rounded-[3rem] blur-3xl opacity-5"></div>
                  <div className="relative bg-zinc-900 p-16 md:p-24 rounded-[3rem] text-center overflow-hidden border border-white/5 shadow-2xl">
                     <div className="max-w-3xl mx-auto space-y-8 relative z-10 text-center">
                        <h2 className="text-3xl md:text-5xl font-headline font-black uppercase text-white tracking-widest leading-none">
                           <span className="block mb-1 md:mb-1.5">SCALE</span>
                           <span className="block">THROUGH <span className="text-[#CBA35C]">LEGACY.</span></span>
                        </h2>
                        <p className="text-zinc-500 text-lg font-medium leading-relaxed opacity-70">
                           Instant elite validation for Sona Cereal market leaders. Start your journey today.
                        </p>
                        <div className="pt-6">
                           <Link href="/" className="inline-flex items-center justify-center bg-[#CBA35C] text-black px-12 py-5 rounded-2xl font-headline font-black text-xl uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                              Enter Portal
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

/**
 * 3D Interactive Hero Showcase
 * Replaces the static banner with a luxury, animated 3D card display
 */
function EliteRewardsShowcase() {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isPaused, setIsPaused] = useState(false);

   useEffect(() => {
      if (isPaused) return;
      const interval = setInterval(() => {
         setCurrentIndex((prev) => (prev + 1) % SHOWCASE_REWARDS.length);
      }, 4500);
      return () => clearInterval(interval);
   }, [isPaused]);

   const current = SHOWCASE_REWARDS[currentIndex];

   return (
      <div 
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}
         className="relative bg-gradient-to-br from-[#222120] via-[#1a1918] to-[#141312] rounded-2xl md:rounded-3xl p-4 sm:p-5 lg:p-6 border border-white/10 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.5)] overflow-hidden group transition-all duration-500 hover:border-[#CBA35C]/40 max-w-[580px] ml-auto"
      >
         {/* Luxury Ambient Lighting Glow */}
         <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#CBA35C]/25 rounded-full blur-3xl pointer-events-none group-hover:bg-[#CBA35C]/35 transition-all duration-700"></div>
         <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#CBA35C]/15 rounded-full blur-3xl pointer-events-none"></div>

         {/* Top Header Bar */}
         <div className="flex items-center justify-between gap-4 mb-3 md:mb-4 relative z-10">
            <div className="flex items-center gap-2.5">
               <span className="w-2 h-2 rounded-full bg-[#CBA35C] animate-ping"></span>
               <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-[#CBA35C]">
                  {current.tag}
               </span>
            </div>
            <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full">
               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">
                  {current.tier}
               </span>
            </div>
         </div>

         {/* Center 3D Showcase Card */}
         <div className="relative z-10 rounded-xl md:rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 p-3.5 sm:p-4.5 lg:p-5 mb-3 md:mb-4 overflow-hidden flex flex-col md:flex-row items-center gap-4 md:gap-5 group-hover:border-[#CBA35C]/30 transition-all duration-500 shadow-2xl">
            {/* 3D Floating Product Image */}
            <div className="w-full md:w-[190px] lg:w-[205px] aspect-square shrink-0 bg-white rounded-xl md:rounded-2xl p-3 md:p-3.5 flex items-center justify-center relative shadow-[0_15px_35px_rgba(0,0,0,0.35)] group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-700">
               <img
                  src={current.img}
                  alt={current.title}
                  className="w-full h-full object-contain drop-shadow-xl"
                  onError={(e: any) => {
                     e.currentTarget.src = current.fallback;
                  }}
               />
            </div>

            {/* Info details */}
            <div className="w-full md:flex-1 flex flex-col justify-center text-center md:text-left space-y-1.5 md:space-y-2 min-w-0">
               <span className="text-[8.5px] md:text-[9.5px] font-black uppercase tracking-[0.3em] text-[#CBA35C]/80 block">
                  {current.category}
               </span>
               <h3 className="font-headline font-black text-lg sm:text-xl lg:text-2xl uppercase text-white leading-tight tracking-tight">
                  {current.title}
               </h3>
               <p className="text-zinc-400 text-xs sm:text-[13px] font-medium leading-relaxed">
                  {current.specs}
               </p>
               <div className="pt-1 flex items-center justify-center md:justify-start gap-2 text-[8.5px] md:text-[9.5px] font-black uppercase tracking-widest text-[#CBA35C]">
                  <span>Tier Milestone</span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-white bg-white/10 px-2.5 py-0.5 rounded-md border border-white/5">{current.tier}</span>
               </div>
            </div>
         </div>

         {/* Selector Thumbnails Row */}
         <div className="relative z-10 grid grid-cols-5 gap-2 md:gap-2.5">
            {SHOWCASE_REWARDS.map((item, idx) => {
               const isActive = idx === currentIndex;
               return (
                  <button
                     key={item.title}
                     type="button"
                     onClick={() => setCurrentIndex(idx)}
                     className={`flex flex-col items-center p-1.5 sm:p-2 rounded-lg md:rounded-xl border transition-all duration-300 relative overflow-hidden group/btn ${
                        isActive 
                           ? "bg-[#CBA35C]/20 border-[#CBA35C] shadow-[0_0_20px_rgba(203,163,92,0.35)] scale-[1.02]" 
                           : "bg-white/[0.08] border-white/10 hover:border-white/25 opacity-80 hover:opacity-100"
                     }`}
                  >
                     <div className="w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-white rounded-md md:rounded-lg p-1 mb-1.5 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                        <img 
                           src={item.img} 
                           alt={item.title} 
                           className="w-full h-full object-contain"
                           onError={(e: any) => { e.currentTarget.src = item.fallback; }} 
                        />
                     </div>
                     <span className={`text-[7px] md:text-[7.5px] font-black uppercase tracking-tight truncate w-full text-center ${isActive ? "text-[#CBA35C]" : "text-zinc-400"}`}>
                        {item.title.split(" ")[0]}
                     </span>
                     {isActive && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CBA35C]"></div>
                     )}
                  </button>
               );
            })}
         </div>
      </div>
   );
}

/**
 * SlabCard Component with 3D Animated Reward Cards (matching Redeem Section)
 */
function SlabCard({ slab }: { slab: any }) {
   const [open, setOpen] = useState(false);

   const rewards = [
      { name: slab.giftA?.trim(), img: slab.giftAImg },
      { name: slab.giftB?.trim(), img: slab.giftBImg },
      { name: slab.giftC?.trim(), img: slab.giftCImg },
      { name: slab.giftD?.trim(), img: slab.giftDImg },
   ].filter((r): r is { name: string; img: string | undefined } => Boolean(r.name));

   return (
      <div className="flex flex-col gap-4">
         <div
            className={`group bg-white rounded-2xl md:rounded-3xl border border-zinc-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.02)] py-8 lg:py-4 px-8 md:px-16 lg:px-24 relative overflow-hidden transition-all hover:shadow-[0_45px_90px_-25px_rgba(203,163,92,0.1)] hover:border-[#CBA35C]/20 duration-500 w-full z-20 ${open ? "border-[#CBA35C]/40" : ""}`}
         >
            {/* High-Performance Top Lighting */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#CBA35C]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div className="flex flex-col lg:grid lg:grid-cols-12 items-center w-full relative z-10 gap-10 lg:gap-8">
               {/* Tier Specification */}
               <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left relative lg:pr-12 lg:scale-90 lg:origin-left">
                  <span className="text-[#CBA35C] text-[9px] font-black uppercase tracking-[0.8em] mb-1 opacity-40">SLAB</span>
                  <div className="relative inline-block scale-90 lg:scale-100">
                     <h3 className="text-6xl lg:text-7xl font-headline font-black text-zinc-900/[0.04] leading-none select-none">
                        0{slab.level}
                     </h3>
                     <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl lg:text-5xl font-headline font-black text-zinc-900 tracking-tighter">
                        {slab.level}
                     </span>
                  </div>
               </div>

               {/* Milestone Configuration */}
               <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left px-0 lg:px-8 lg:scale-90 lg:origin-left">
                  <span className="text-[#CBA35C] text-[9px] font-black uppercase tracking-[0.8em] mb-1 opacity-40">STAKE</span>
                  <div className="flex items-baseline gap-1 group-hover:translate-x-4 transition-transform duration-1000 scale-90 lg:scale-100">
                     <span className="text-5xl lg:text-6xl font-headline font-black text-zinc-900 leading-none tracking-tighter drop-shadow-lg">
                        {slab.target}
                     </span>
                     <span className="text-[#CBA35C] text-[9px] font-black uppercase tracking-widest ml-1">QTL</span>
                  </div>
               </div>

               {/* Reward Dropdown Action */}
               <div className="lg:col-span-6 flex flex-col items-center lg:items-end pt-0 lg:pl-16 relative w-full lg:w-auto">
                  <button
                     onClick={() => setOpen(!open)}
                     className={`flex items-center justify-between lg:justify-center gap-6 px-10 py-3.5 rounded-full font-headline font-black uppercase tracking-[0.2em] transition-all duration-500 border group w-full lg:w-auto ${open ? "bg-zinc-900 text-[#CBA35C] border-[#CBA35C]" : "bg-transparent text-zinc-400 border-zinc-100 hover:border-[#CBA35C] hover:text-[#CBA35C] hover:bg-zinc-50"}`}
                  >
                     <span className="text-[10px] sm:text-xs">{open ? "HIDE REWARDS" : "VIEW GIFTS"}</span>
                     <div className="flex items-center gap-2 border-l border-current pl-4 ml-2 opacity-50">
                        <span className="text-[10px]">{rewards.length}</span>
                        <svg 
                           className={`w-4 h-4 transition-transform duration-500 ${open ? "rotate-180" : ""}`} 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                        </svg>
                     </div>
                  </button>
               </div>
            </div>

            {/* Background Vector Motif */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#CBA35C]/[0.02] rounded-full blur-[80px] pointer-events-none group-hover:bg-[#CBA35C]/[0.05] transition-all duration-1000"></div>
         </div>

         {/* 3D Animated Reward Cards Grid (styled like the Redeem Section) */}
         {open && (
            <div 
               className="animate-in fade-in slide-in-from-top-4 duration-500 bg-gradient-to-br from-[#222120] via-[#1a1918] to-[#141312] rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-7 border border-white/10 shadow-2xl relative overflow-hidden -mt-7 pt-14 z-0"
            >
               {/* Ambient Glow */}
               <div className="absolute top-0 right-0 w-80 h-80 bg-[#CBA35C]/15 rounded-full blur-3xl pointer-events-none"></div>

               <div className="relative z-10 w-full">
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 sm:pb-5 mb-5 border-b border-white/10 gap-3">
                     <div>
                        <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.35em] text-[#CBA35C] block mb-1">
                           SLAB 0{slab.level} REWARD PORTFOLIO
                        </span>
                        <h4 className="text-lg sm:text-xl md:text-2xl font-headline font-black uppercase text-white tracking-tight">
                           Available Rewards ({slab.target} Quintals Milestone)
                        </h4>
                     </div>
                     <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-zinc-300 bg-white/5 px-3.5 py-1 rounded-full border border-white/10">
                        {rewards.length} Reward {rewards.length === 1 ? "Option" : "Options"} · Choose 1
                     </span>
                  </div>

                  {/* Refined Cards Grid */}
                  <div className={`grid gap-3.5 sm:gap-4 lg:gap-4.5 ${
                     rewards.length === 1 
                        ? "grid-cols-1 max-w-xs mx-auto" 
                        : rewards.length === 2 
                        ? "grid-cols-1 sm:grid-cols-2 max-w-lg mx-auto" 
                        : rewards.length === 3 
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto" 
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto"
                  }`}>
                     {rewards.map((reward, rIdx) => {
                        const fallback = fallbackImageByName(reward.name);
                        return (
                           <div
                              key={rIdx}
                              className="group relative bg-[#21201f] rounded-lg md:rounded-xl border border-white/10 hover:border-[#CBA35C]/60 hover:bg-[#292826] p-3.5 sm:p-4 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(203,163,92,0.22)] overflow-hidden"
                           >
                              {/* Option Tag */}
                              <div className="w-full flex items-center justify-between mb-2.5 px-0.5">
                                 <span className="text-[7.5px] sm:text-[8px] font-black uppercase tracking-[0.2em] text-[#CBA35C] bg-[#CBA35C]/15 px-2 py-0.5 rounded-full border border-[#CBA35C]/30">
                                    Option {String.fromCharCode(65 + rIdx)}
                                 </span>
                                 <span className="text-[7.5px] sm:text-[8px] font-black uppercase tracking-wider text-zinc-400">
                                    {slab.target} QTL
                                 </span>
                              </div>

                              {/* Proportional Image Box */}
                              <div className="w-full aspect-[4/3] rounded-md md:rounded-lg bg-white p-2.5 sm:p-3 flex items-center justify-center overflow-hidden mb-2.5 relative shadow-sm group-hover:scale-[1.02] transition-transform duration-500">
                                 {reward.img ? (
                                    <img
                                       src={reward.img}
                                       alt={reward.name}
                                       className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                       onError={(e: any) => {
                                          e.currentTarget.src = fallback;
                                       }}
                                    />
                                 ) : (
                                    <img
                                       src={fallback}
                                       alt={reward.name}
                                       className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                    />
                                 )}
                              </div>

                              {/* Title - Fixed height for perfect row alignment */}
                              <h5 className="font-headline font-black text-xs sm:text-[12px] uppercase tracking-tight text-white line-clamp-2 h-8 flex items-center justify-center text-center px-1 mb-1.5 leading-tight">
                                 {reward.name}
                              </h5>

                              {/* Footer Badge */}
                              <div className="mt-auto pt-2 border-t border-white/10 w-full flex items-center justify-center gap-1.5 text-[#CBA35C]">
                                 <span className="material-symbols-outlined text-xs">verified</span>
                                 <span className="text-[7px] sm:text-[7.5px] font-black uppercase tracking-[0.15em] text-[#CBA35C]/90">Sona Elite Reward</span>
                              </div>

                              {/* Bottom Accent Hover Line */}
                              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CBA35C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
