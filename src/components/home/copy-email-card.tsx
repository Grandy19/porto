"use client";

import { useState } from "react";
import { Mail, Check, Copy } from "lucide-react";

export function CopyEmailCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("grandysitumorang353@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      <div 
        onClick={handleCopy}
        className="group flex cursor-pointer flex-col justify-between gap-8 rounded-[24px] border border-white/10 bg-zinc-900/30 p-10 transition-all duration-[180ms] md:hover:-translate-y-[2px] active:scale-[0.98] md:hover:border-white/20 active:border-white/20 md:hover:bg-zinc-900/50 active:bg-zinc-900/50"
      >
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 text-zinc-300">
            <Mail className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-1.5 overflow-hidden">
            <h3 className="text-base font-semibold text-zinc-100">Email</h3>
            <p className="text-sm text-zinc-500 truncate">grandysitumorang353@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 transition-colors duration-[180ms] md:group-hover:text-zinc-100 group-active:text-zinc-100">
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Email
            </>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full border border-white/10 bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-2xl transition-all duration-300 z-50 ${copied ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
      >
        <Check className="h-4 w-4 text-green-400" />
        Email copied successfully
      </div>
    </>
  );
}
