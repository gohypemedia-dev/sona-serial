"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import OfferValidity from "@/components/OfferValidity";
import styles from "./rewards.module.css";

type Slab = {
   id: string; level: string; target: number; giftA: string;
   giftAImg?: string | null; giftB?: string | null; giftBImg?: string | null;
   giftC?: string | null; giftCImg?: string | null; giftD?: string | null; giftDImg?: string | null;
};

export default function MilestonesPage() {
   const [slabs, setSlabs] = useState<Slab[]>([]);
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
                        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em] text-[#CBA35C]">Sona Cereal rewards</span>
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
                     <div className="bg-zinc-900 rounded-3xl p-8 text-white"><h2 className="text-2xl font-bold">Sona Cereal voucher offer</h2><OfferValidity /><p className="text-zinc-300">Explore the current QTL milestones and reward choices below.</p><a className="inline-block mt-6 text-[#CBA35C] underline" href="/New%20Sona%20Cereal%20Voucher.pdf" target="_blank" rel="noreferrer">View original voucher</a></div>
                  </div>
               </div>
            </section>

            <div className={styles.sectionHeading}>
               <div><p className={styles.eyebrow}>THE REWARD COLLECTION</p><h2>Every milestone has its reward.</h2></div>
               <p>Select a tier to explore your rewards.</p>
            </div>

            {/* Milestone Grid - Edge-to-Edge */}
            <div className="space-y-4 md:space-y-5 w-full mx-auto">
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

function SlabCard({ slab }: { slab: Slab }) {
   const [open, setOpen] = useState(false);
   const panelId = React.useId();
   const rewards = [
      { name: slab.giftA?.trim(), img: slab.giftAImg },
      { name: slab.giftB?.trim(), img: slab.giftBImg },
      { name: slab.giftC?.trim(), img: slab.giftCImg },
      { name: slab.giftD?.trim(), img: slab.giftDImg },
   ].filter(reward => Boolean(reward.name));
   const quantity = slab.target.toLocaleString('en-IN');

   return (
      <article className={`${styles.tier} ${open ? styles.expanded : ''}`}>
         <button type="button" className={styles.toggle} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={panelId}>
            <span className={styles.tierNumber}><span>SLAB</span><strong>{String(slab.level).padStart(2, '0')}</strong></span>
            <span className={styles.target}><span>TARGET</span><strong>{quantity}<small>QTL</small></strong></span>
            <span className={styles.preview}>{rewards.map(reward => reward.name).join(' / ')}</span>
            <span className={styles.action}>{open ? 'Hide rewards' : 'View rewards'}<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m6 9 6 6 6-6" /></svg></span>
         </button>
         <div id={panelId} hidden={!open}>
            {open && <div className={styles.panel}>
               {rewards.length > 1 && <p className={styles.choice}>Choose one reward</p>}
               <div className={`${styles.rewardGrid} ${rewards.length === 1 ? styles.single : ''}`}>
                  {rewards.map((reward, index) => (
                     <div key={index} className={styles.reward}>
                        <div className={styles.imageStage}>
                           {rewards.length > 1 && <span className={styles.option}>OPTION {String.fromCharCode(65 + index)}</span>}
                           <img src={reward.img || '/reward-placeholder.svg'} alt={reward.name || 'Reward'} width={800} height={600} loading="lazy" onError={event => {
                              if (!event.currentTarget.src.endsWith('/reward-placeholder.svg')) event.currentTarget.src = '/reward-placeholder.svg';
                           }} />
                        </div>
                        <div className={styles.rewardDetails}>
                           <h3>{reward.name}</h3>
                           <p className={styles.description}>{quantity} QTL target</p>
                        </div>
                     </div>
                  ))}
               </div>
               <p className={styles.note}>Images are illustrative. <Link href="/terms">Offer terms</Link>.</p>
            </div>}
         </div>
      </article>
   );
}
