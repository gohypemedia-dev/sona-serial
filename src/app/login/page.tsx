"use client";

import { useEffect } from "react";

export default function LoginPage() {
   useEffect(() => {
      window.location.replace("/?mode=login#auth-card");
   }, []);

   return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white font-body">
         <div className="w-10 h-10 border-4 border-zinc-100 border-t-[#CBA35C] rounded-full animate-spin"></div>
         <p className="mt-4 text-xs font-headline font-bold uppercase tracking-widest text-zinc-400">
            Redirecting to Secure Login...
         </p>
      </div>
   );
}

