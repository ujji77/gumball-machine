import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Capsule from './Capsule';

export default function CollectionTray({ capsule, onOpen }) {
    return (
        <div className="relative w-32 h-20 bg-zinc-800 rounded-t-xl border-t-4 border-zinc-700 flex items-end justify-center overflow-visible">
            {/* Inner shadow/depth */}
            <div className="absolute inset-0 bg-black/30 rounded-t-lg pointer-events-none"></div>

            <AnimatePresence>
                {capsule && (
                    <motion.div
                        initial={{ y: -100, rotate: -180, opacity: 0 }}
                        animate={{ y: 0, rotate: 0, opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="mb-2 z-20 cursor-pointer"
                        onClick={onOpen}
                    >
                        <Capsule color={capsule.color} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
