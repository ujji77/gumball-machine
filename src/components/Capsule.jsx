import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Capsule({ color, onClick, x, y, rotate, className }) {
    const isPhysics = x !== undefined && y !== undefined;

    return (
        <div
            className={cn(
                "w-12 h-6 rounded-full shadow-lg flex items-center justify-center overflow-hidden border border-white/20 cursor-pointer",
                isPhysics ? "absolute" : "relative",
                color,
                className
            )}
            style={isPhysics ? {
                left: x,
                top: y,
                transform: `translate(-50%, -50%) rotate(${rotate}rad)`,
            } : undefined}
            onClick={onClick}
        >
            {/* Shine */}
            <div className="absolute top-1 left-2 w-3 h-1.5 bg-white/40 rounded-full rotate-[-45deg] blur-[0.5px]"></div>

            {/* Seam */}
            <div className="absolute w-[2px] h-full bg-black/10"></div>
        </div>
    );
}
