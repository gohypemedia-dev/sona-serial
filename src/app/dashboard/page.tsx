"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Country {
   code: string;
   name: string;
   dialCode: string;
   flag: string;
}

const COUNTRIES: Country[] = [
   { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
   { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
   { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
   { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
   { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
   { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
   { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
   { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
   { code: "QA", name: "Qatar", dialCode: "+974", flag: "🇶🇦" },
   { code: "KW", name: "Kuwait", dialCode: "+965", flag: "🇰🇼" },
   { code: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲" },
   { code: "BH", name: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
   { code: "NP", name: "Nepal", dialCode: "+977", flag: "🇳🇵" },
   { code: "BD", name: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
   { code: "LK", name: "Sri Lanka", dialCode: "+94", flag: "🇱🇰" },
   { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
   { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
   { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
   { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
   { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
   { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
   { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
   { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
   { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
   { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
   { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
   { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
   { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
   { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
   { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
   { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
   { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
   { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
   { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
   { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
   { code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
   { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
   { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
   { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
   { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
   { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
   { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱" },
   { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
   { code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹" },
   { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
   { code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰" },
   { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
   { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺" }
];

export default function DashboardPage() {
   const [phone, setPhone] = useState("");
   const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
   const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
   const [openUpwards, setOpenUpwards] = useState(false);
   const [availableHeight, setAvailableHeight] = useState<number>(200);

   const [userProfile, setUserProfile] = useState<any>(null);
   const [submissions, setSubmissions] = useState<any[]>([]);
   const [error, setError] = useState("");
   const [searched, setSearched] = useState(false);
   const [loading, setLoading] = useState(false);

   const cardRef = useRef<HTMLDivElement>(null);
   const dropdownRef = useRef<HTMLDivElement>(null);
   const dropdownAnchorRef = useRef<HTMLDivElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);

   const toggleCountryDropdown = () => {
      setIsCountryDropdownOpen((prev) => !prev);
   };

   // Close country dropdown when clicking outside
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsCountryDropdownOpen(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   // Adjust dropdown positioning within visible card boundaries
   useEffect(() => {
      if (isCountryDropdownOpen) {
         if (cardRef.current && dropdownAnchorRef.current) {
            const cardRect = cardRef.current.getBoundingClientRect();
            const anchorRect = dropdownAnchorRef.current.getBoundingClientRect();
            // Available space below input within card boundary (leaving 16px safety padding)
            const spaceBelow = cardRect.bottom - anchorRect.bottom - 16;
            // Available space above input within card boundary (leaving 65px for top bar header)
            const spaceAbove = anchorRect.top - cardRect.top - 65;

            if (spaceBelow < 150 && spaceAbove > spaceBelow) {
               setOpenUpwards(true);
               setAvailableHeight(Math.max(120, Math.min(spaceAbove, 220)));
            } else {
               setOpenUpwards(false);
               setAvailableHeight(Math.max(120, Math.min(spaceBelow, 220)));
            }
         }
      }
   }, [isCountryDropdownOpen]);

   const checkStatus = async (overridePhone?: string) => {
      const targetPhone = overridePhone !== undefined ? overridePhone : phone;
      const cleanDigits = targetPhone.replace(/\D/g, '').slice(-10);

      if (cleanDigits.length < 10) {
         setError("Please enter a valid 10-digit phone number.");
         return;
      }

      setError("");
      setLoading(true);
      try {
         const formattedPhone = `${selectedCountry.dialCode} ${cleanDigits}`;
         localStorage.setItem("current_user_phone", formattedPhone);

         const res = await fetch(`/api/submissions?phone=${encodeURIComponent(formattedPhone)}`);
         const data = await res.json();

         if (data.submissions && data.submissions.length > 0) {
            setUserProfile(data.user);
            setSubmissions(data.submissions.reverse());
            setError("");
            setSearched(true);
         } else {
            setError("No registration found with this phone number.");
            setSubmissions([]);
            setSearched(false);
         }
      } catch (err) {
         setError("Connection error. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const digitsOnly = val.replace(/\D/g, '');
      let cleaned = digitsOnly;
      
      const dialDigits = selectedCountry.dialCode.replace(/\D/g, '');
      if (digitsOnly.startsWith(dialDigits) && digitsOnly.length > 10) {
         cleaned = digitsOnly.slice(dialDigits.length);
      } else if (digitsOnly.startsWith('0') && digitsOnly.length > 10) {
         cleaned = digitsOnly.slice(1);
      }

      setPhone(cleaned.slice(0, 10));
      if (error) setError("");
   };

   const handleSelectCountry = (country: Country) => {
      setSelectedCountry(country);
      setIsCountryDropdownOpen(false);
      inputRef.current?.focus();
   };

   useEffect(() => {
      const storedPhone = localStorage.getItem("current_user_phone");
      if (storedPhone) {
         const matchedCountry = COUNTRIES.find((c) => storedPhone.startsWith(c.dialCode));
         if (matchedCountry) {
            setSelectedCountry(matchedCountry);
         }
         const cleanDigits = storedPhone.replace(/\D/g, '').slice(-10);
         if (cleanDigits) {
            setPhone(cleanDigits);
         }
      }
   }, []);

   return (
      <div className={`bg-[#F6F4F0] min-h-[calc(100vh-80px)] font-body transition-all ${!searched ? "flex items-center justify-center p-4 md:p-8" : "pb-24 pt-10 md:pt-16"}`}>
         <section className="relative w-full">
            <div className="container mx-auto px-2 sm:px-4 max-w-[1440px]">
               {!searched ? (
                  <div
                     ref={cardRef}
                     style={{ boxShadow: "0 12px 40px rgba(45, 35, 20, 0.06)" }}
                     className="w-full max-w-[700px] mx-auto bg-[#F8F6F2] border border-[#EAE5DC] rounded-[28px] md:rounded-[32px] overflow-visible"
                  >
                     {/* Top Bar */}
                     <div className="px-6 md:px-10 py-5 flex items-center justify-between border-b border-[#EAE5DC]">
                        <span className="text-[#B28A49] font-headline font-bold text-sm md:text-[15px] uppercase tracking-[0.2em]">
                           SONACEREAL
                        </span>
                        <div className="text-[#B28A49] flex items-center justify-center">
                           <svg className="w-5 h-5 text-[#B28A49]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                           </svg>
                        </div>
                     </div>

                     {/* Card Body */}
                     <div className="p-6 md:p-10 pt-8 md:pt-10 pb-10 md:pb-14">
                        {/* Heading */}
                        <div className="text-center mb-7">
                           <p className="text-[#B28A49] font-headline font-bold text-xs uppercase tracking-[0.2em] mb-2">
                              YOUR ACCOUNT
                           </p>
                           <h1 className="font-headline font-black text-3xl md:text-4xl uppercase text-zinc-900 leading-none tracking-tight">
                              USER
                           </h1>
                           <h2 className="font-headline font-black text-3xl md:text-4xl uppercase text-[#CBA35C] leading-none tracking-tight mt-1">
                              DASHBOARD.
                           </h2>
                           <p className="text-[#716F6A] text-sm md:text-[15px] mt-3">
                              Your orders, all in one place.
                           </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={(e) => { e.preventDefault(); checkStatus(); }} className="space-y-4">
                           <div className="relative" ref={dropdownRef}>
                              <label htmlFor="dashboard-phone" className="block text-left text-xs md:text-sm font-semibold text-zinc-800 mb-2">
                                 Mobile number
                              </label>

                              {/* Input Container */}
                              <div
                                 ref={dropdownAnchorRef}
                                 className="relative flex items-center bg-white border border-[#DFD9CD] rounded-2xl px-4 py-3.5 focus-within:border-[#CBA35C] focus-within:ring-2 focus-within:ring-[#CBA35C]/20 transition-all shadow-sm"
                              >
                                 {/* Country Code Trigger Button */}
                                 <button
                                    type="button"
                                    onClick={toggleCountryDropdown}
                                    className="flex items-center gap-1.5 text-zinc-800 select-none shrink-0 pr-1 py-1 px-1.5 -ml-1 rounded-lg hover:bg-zinc-100/80 active:bg-zinc-200/70 transition-all cursor-pointer group"
                                    title="Select country code"
                                    aria-label="Select country code"
                                    aria-expanded={isCountryDropdownOpen}
                                    aria-haspopup="listbox"
                                 >
                                    <span className="font-semibold text-xs md:text-sm text-zinc-700 group-hover:text-zinc-900">
                                       {selectedCountry.code}
                                    </span>
                                    <span className="font-bold text-xs md:text-sm text-zinc-900">
                                       {selectedCountry.dialCode}
                                    </span>
                                    <svg
                                       className={`w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-800 transition-transform duration-200 ${
                                          isCountryDropdownOpen ? "rotate-180 text-[#CBA35C]" : ""
                                       }`}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       stroke="currentColor"
                                       strokeWidth="2.2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    >
                                       <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                 </button>

                                 {/* Vertical Separator */}
                                 <div className="h-5 w-[1px] bg-[#DFD9CD] mx-3 shrink-0" />

                                 {/* Phone Input */}
                                 <input
                                    ref={inputRef}
                                    id="dashboard-phone"
                                    name="phone"
                                    autoComplete="tel"
                                    type="tel"
                                    inputMode="numeric"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder="Enter phone number"
                                    maxLength={10}
                                    className="w-full bg-transparent outline-none text-zinc-900 placeholder:text-zinc-400 font-medium text-sm md:text-base tracking-wide"
                                 />
                              </div>

                              {/* Country Dropdown Menu (Without search field, directly showing country options) */}
                              {isCountryDropdownOpen && (
                                 <div
                                    style={{
                                       maxHeight: `${availableHeight}px`
                                    }}
                                    className={`absolute left-0 w-full sm:w-80 z-50 bg-white border border-[#DFD9CD] rounded-2xl shadow-[0_12px_36px_rgba(45,35,20,0.14)] overflow-y-auto divide-y divide-zinc-50 animate-in fade-in duration-150 ${
                                       openUpwards
                                          ? "bottom-full mb-2 origin-bottom"
                                          : "top-full mt-2 origin-top"
                                    }`}
                                    role="listbox"
                                 >
                                    {COUNTRIES.map((c) => {
                                       const isSelected = c.code === selectedCountry.code;
                                       return (
                                          <button
                                             key={`${c.code}-${c.dialCode}`}
                                             type="button"
                                             role="option"
                                             aria-selected={isSelected}
                                             onClick={() => handleSelectCountry(c)}
                                             className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs transition-colors cursor-pointer ${
                                                isSelected
                                                   ? "bg-[#CBA35C]/15 text-zinc-900 font-semibold"
                                                   : "hover:bg-zinc-50 text-zinc-700"
                                             }`}
                                          >
                                             <span className="flex items-center gap-2 min-w-0">
                                                <span className="text-sm leading-none select-none shrink-0" aria-hidden="true">
                                                   {c.flag}
                                                </span>
                                                <span className="w-6 py-0.5 text-center text-[10px] font-bold tracking-wider rounded bg-zinc-100 text-zinc-600 border border-zinc-200 shrink-0 uppercase">
                                                   {c.code}
                                                </span>
                                                <span className="truncate text-zinc-800 font-medium">
                                                   {c.name}
                                                </span>
                                             </span>
                                             <span className="font-bold text-[#B28A49] ml-2 shrink-0">
                                                {c.dialCode}
                                             </span>
                                          </button>
                                       );
                                    })}
                                 </div>
                              )}

                              {error && (
                                 <p className="text-red-500 text-xs font-semibold mt-2 text-left animate-in fade-in">
                                    {error}
                                 </p>
                              )}
                           </div>

                           {/* Submit Button */}
                           <button
                              type="submit"
                              disabled={loading}
                              className="w-full bg-[#191817] hover:bg-black text-white font-headline font-black py-4 px-6 rounded-2xl text-xs md:text-sm uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-70 cursor-pointer mt-4"
                           >
                              <span>{loading ? "CHECKING..." : "CHECK STATUS"}</span>
                              <span className="text-[#CBA35C] font-bold text-base leading-none">→</span>
                           </button>

                           {/* Security Note */}
                           <div className="pt-2 flex items-center justify-center gap-2 text-xs md:text-[13px] text-[#716F6A]">
                              <svg className="w-4 h-4 text-[#B28A49] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                 <path d="m9 12 2 2 4-4" />
                              </svg>
                              <span>Your information stays secure</span>
                           </div>
                        </form>
                     </div>
                  </div>
                ) : loading ? (
                   <div className="py-24 text-center space-y-8 animate-in fade-in duration-700">
                      <div className="relative w-20 h-20 mx-auto">
                         <div className="absolute inset-0 border-4 border-[#EAE5DC] rounded-full"></div>
                         <div className="absolute inset-0 border-4 border-t-[#CBA35C] rounded-full animate-spin"></div>
                      </div>
                      <div className="space-y-2">
                         <h3 className="font-headline font-black text-2xl uppercase tracking-tight text-zinc-900">Synchronizing Data</h3>
                         <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#716F6A]">Verifying secure database node</p>
                      </div>
                   </div>
                ) : (
                   <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
                      {/* Back button */}
                      <div>
                         <button
                            onClick={() => { setSearched(false); setError(""); }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#EAE5DC] text-zinc-700 hover:text-zinc-900 text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all cursor-pointer"
                         >
                            <span>←</span>
                            <span>Back to search</span>
                         </button>
                      </div>

                      {/* PROFILE HEADER */}
                      {submissions.length > 0 ? (
                         <>
                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-900 text-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-[#CBA35C]/10 rounded-full blur-[100px]"></div>
                            <div className="space-y-4 relative z-10 w-full md:w-auto">
                               <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
                                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Verified Retailer Dashboard</span>
                               </div>
                               <h2 className="font-headline font-black text-2xl md:text-6xl uppercase tracking-tighter">
                                  {userProfile?.name || 'Retailer Name'}
                               </h2>
                               <p className="text-[#CBA35C] font-black text-xs md:text-lg uppercase tracking-widest leading-none">
                                  {userProfile?.shopName || 'Business Entity'} • {userProfile?.city}
                               </p>
                            </div>
                            <div className="mt-8 md:mt-0 text-left md:text-right relative z-10 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 flex gap-8 md:gap-12 w-full md:w-auto">
                               <div className="flex-1 md:flex-none">
                                  <span className="block text-zinc-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Achievement</span>
                                  <div className="flex items-center gap-1">
                                     <span className="text-2xl md:text-6xl font-headline font-black text-[#CBA35C] leading-none">
                                        {submissions.filter(s => s.status !== 'rejected').reduce((sum, sub) => sum + (parseInt(sub.capacity) || 0), 0)}
                                     </span>
                                     <span className="text-zinc-400 text-[8px] font-black uppercase mt-2 md:mt-4">Total QTL</span>
                                  </div>
                               </div>
                               <div className="flex-1 md:flex-none">
                                  <span className="block text-zinc-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2">Application Portfolio</span>
                                  <div className="flex items-center gap-1">
                                     <span className="text-2xl md:text-6xl font-headline font-black text-[#CBA35C] leading-none">{submissions.length}</span>
                                     <span className="text-zinc-400 text-[8px] font-black uppercase mt-2 md:mt-4">Active Records</span>
                                  </div>
                               </div>
                            </div>
                         </div>

                         <div className="space-y-6">
                            <div className="flex items-center gap-4 px-12 opacity-30">
                               <div className="h-[1px] flex-1 bg-zinc-200"></div>
                               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Voucher Record Archives</span>
                               <div className="h-[1px] flex-1 bg-zinc-200"></div>
                            </div>

                            {submissions.map((sub: any) => (
                               <div key={sub.id} className="bg-white rounded-[2rem] lg:rounded-full border border-zinc-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] p-6 lg:p-3 lg:px-12 relative overflow-hidden group w-full border-b-2 hover:border-[#CBA35C]/30 transition-all">
                                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#CBA35C]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                  
                                  <div className="flex flex-col lg:grid lg:grid-cols-12 items-center gap-8 lg:gap-6 relative z-10 py-2">
                                     
                                     {/* Bill Index Section */}
                                     <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-zinc-50 pb-4 lg:pb-0 lg:pr-6 w-full lg:w-auto text-center lg:text-left">
                                        <span className="text-[#CBA35C] text-[10px] font-black uppercase tracking-[0.3em] block mb-1 origin-left">BILL</span>
                                        <h3 className="text-3xl lg:text-4xl font-headline font-black text-zinc-500 leading-none opacity-40">#{submissions.indexOf(sub) + 1}</h3>
                                     </div>

                                     {/* Quantity Section */}
                                     <div className="lg:col-span-3 text-center border-b lg:border-b-0 lg:border-r border-zinc-50 pb-4 lg:pb-0 lg:px-6 w-full lg:w-auto">
                                        <span className="text-[#CBA35C] text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] block mb-1">Bill Quantity</span>
                                        <div className="flex items-center justify-center gap-1">
                                           <span className="text-3xl md:text-7xl font-headline font-black text-zinc-900 leading-none tracking-tighter">{sub.capacity}</span>
                                           <span className="text-zinc-300 text-[8px] md:text-[10px] font-black uppercase mt-3 md:mt-6 ml-1">QTL</span>
                                        </div>
                                        <div className="text-[8px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Invoice: {sub.invoiceNo}</div>
                                     </div>

                                     {/* Date Section */}
                                     <div className="lg:col-span-5 flex items-center justify-center gap-8 lg:gap-12 px-6 border-b lg:border-b-0 lg:border-r border-zinc-50 pb-4 lg:pb-0 w-full lg:w-auto">
                                        <div className="text-center">
                                           <span className="text-[#CBA35C] text-[10px] font-black uppercase tracking-[0.3em] block mb-1">Submission Date</span>
                                           <span className="text-xl font-headline font-black text-zinc-900 uppercase">{sub.invoiceDate || new Date(sub.timestamp).toLocaleDateString()}</span>
                                        </div>
                                     </div>

                                     {/* Status Section */}
                                     <div className="lg:col-span-3 text-center px-6 w-full lg:w-auto">
                                        <div className={`inline-flex w-full lg:w-auto items-center justify-center px-8 md:px-12 py-3 md:py-4 rounded-xl md:rounded-3xl text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all shadow-md ${sub.status === 'claimed' ? 'bg-[#CBA35C] text-black shadow-[#CBA35C]/10' :
                                           sub.status === 'accepted' ? 'bg-green-500 text-white shadow-green-100' :
                                              sub.status === 'pending' ? 'bg-zinc-100 text-zinc-400' :
                                                 'bg-red-50 text-red-500'
                                           }`}>
                                           <span>{sub.status === 'claimed' ? 'VERIFIED' : sub.status || 'PENDING'}</span>
                                        </div>
                                     </div>

                                  </div>
                               </div>
                            ))}
                         </div>
                         <div className="text-center pt-8">
                            <button onClick={() => { setSearched(false); setUserProfile(null); setSubmissions([]); }} className="text-zinc-400 font-black text-[10px] uppercase tracking-widest hover:text-zinc-900 transition-colors underline cursor-pointer">Use Different Number</button>
                         </div>
                         </>
                      ) : (
                         <div className="text-center p-16 md:p-24 bg-white rounded-[2.5rem] border border-[#EAE5DC] shadow-sm max-w-2xl mx-auto">
                            <p className="text-zinc-500 font-headline font-bold text-xl md:text-2xl uppercase mb-6 tracking-tight">No Active Registration Record Found.</p>
                            <button onClick={() => { setSearched(false); setError(""); }} className="bg-[#191817] hover:bg-black text-white font-headline font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all cursor-pointer">Try Different Number</button>
                         </div>
                      )}
                   </div>
                )}
            </div>
         </section>
      </div>
   );
}
