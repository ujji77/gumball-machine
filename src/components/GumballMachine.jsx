
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import PhysicsGlobe from './PhysicsGlobe';
import CoinSlot from './CoinSlot';
import CollectionTray from './CollectionTray';
import PromptReveal from './PromptReveal';
import { prompts } from '../data/prompts';

export default function GumballMachine() {
    const [hasCoin, setHasCoin] = useState(false);
    const [isDispensing, setIsDispensing] = useState(false);
    const [capsule, setCapsule] = useState(null);
    const [currentPrompt, setCurrentPrompt] = useState(null);
    const [isPromptOpen, setIsPromptOpen] = useState(false);

    const handleInsertCoin = () => {
        if (hasCoin || isDispensing || capsule) return;
        setHasCoin(true);
        // Simulate processing time then dispense
        setTimeout(() => {
            setHasCoin(false);
            setIsDispensing(true);

            // Dispense logic
            setTimeout(() => {
                setIsDispensing(false);
                setCapsule({ color: "bg-blue-400", id: Date.now() });
            }, 2000);
        }, 1000);
    };

    const handleOpenCapsule = () => {
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        setCurrentPrompt(randomPrompt);
        setIsPromptOpen(true);
        setCapsule(null); // Remove capsule after opening
    };

    const handleClosePrompt = () => {
        setIsPromptOpen(false);
        setCurrentPrompt(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#111] text-white p-4 overflow-hidden">
            <PromptReveal
                prompt={currentPrompt}
                isOpen={isPromptOpen}
                onClose={handleClosePrompt}
            />

            <div className="text-center mb-8 relative z-10">
                <h1 className="text-4xl md:text-5xl font-serif mb-4 tracking-wide">Vibe Challenge Gumball Machine</h1>
                <p className="text-zinc-400 text-lg font-light">Insert a coin to get your final day design challenge!</p>
            </div>

            <div className="relative w-full max-w-md aspect-[3/4] bg-red-500 rounded-t-full rounded-b-3xl shadow-2xl overflow-hidden border-4 border-red-600 z-0">
                {/* Globe Area */}
                <PhysicsGlobe isDispensing={isDispensing} />

                {/* Machine Body */}
                <div className="absolute bottom-0 left-0 w-full h-[40%] bg-red-500 flex flex-col items-center justify-center">
                    {/* Coin Slot */}
                    <div className="mb-8">
                        <CoinSlot onInsert={handleInsertCoin} disabled={hasCoin || isDispensing || capsule} />
                    </div>

                    {/* Collection Tray */}
                    <CollectionTray capsule={capsule} onOpen={handleOpenCapsule} />
                </div>
            </div>
        </div>
    );
}

