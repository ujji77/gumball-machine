import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Gumball({ color, x, y, rotate, delay }) {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: y, opacity: 1, rotate: rotate }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: delay
            }}
            className={cn(
                "absolute w-12 h-12 rounded-full shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.2),2px_2px_4px_rgba(0,0,0,0.1)]",
                color
            )}
            style={{ left: x, top: y }}
        >
            <div className="absolute top-2 left-3 w-3 h-2 bg-white/40 rounded-full rotate-[-45deg] blur-[1px]"></div>
        </motion.div>
    );
}
