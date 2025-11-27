import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Capsule({ color, onClick }) {
    return (
        <div
            className={cn("w-16 h-16 rounded-full shadow-lg relative flex items-center justify-center overflow-hidden border-2 border-white/20", color)}
            onClick={onClick}
        >
            {/* Shine */}
            <div className="absolute top-2 left-3 w-4 h-3 bg-white/40 rounded-full rotate-[-45deg] blur-[1px]"></div>

            {/* Seam */}
            <div className="absolute w-full h-[2px] bg-black/10 rotate-45"></div>
        </div>
    );
}
