import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function CoinSlot({ onInsert, disabled }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative group cursor-pointer" onClick={!disabled ? onInsert : undefined}>
                <div className={cn(
                    "w-24 h-12 bg-zinc-800 rounded-lg border-2 border-zinc-700 flex items-center justify-center shadow-lg overflow-hidden transition-transform active:scale-95",
                    disabled && "opacity-80 cursor-not-allowed"
                )}>
                    {/* Metal texture effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                    {/* The Slot */}
                    <div className="w-2 h-8 bg-black rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] relative z-10"></div>

                    {/* Highlight */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 pointer-events-none"></div>
                </div>
            </div>
            <span className="text-white/60 text-xs font-medium tracking-widest uppercase">Insert Coin</span>
        </div>
    );
}
