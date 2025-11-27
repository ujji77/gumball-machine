import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Gumball from './Gumball';

const COLORS = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-teal-400",
    "bg-orange-400",
];

export default function Globe({ isDispensing }) {
    const [gumballs, setGumballs] = useState([]);

    useEffect(() => {
        // Generate random gumballs
        const newGumballs = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            x: Math.random() * 200 + 20, // Random x position within globe
            y: Math.random() * 150 + 50, // Random y position
            rotate: Math.random() * 360,
            delay: Math.random() * 0.5,
        }));
        setGumballs(newGumballs);
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-[60%] bg-white/10 rounded-t-full backdrop-blur-sm border-b-4 border-red-600/20 overflow-hidden z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/20 pointer-events-none rounded-t-full"></div>

            {/* Glass Reflection */}
            <div className="absolute top-10 left-10 w-16 h-24 bg-white/20 rounded-full rotate-[-15deg] blur-md pointer-events-none"></div>

            <div className="relative w-full h-full">
                {gumballs.map((gumball) => (
                    <Gumball key={gumball.id} {...gumball} />
                ))}
            </div>
        </div>
    );
}
