import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import Capsule from './Capsule';

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

export default function PhysicsGlobe({ isDispensing }) {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const [capsules, setCapsules] = useState([]);

    useEffect(() => {
        if (!sceneRef.current) return;

        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Events = Matter.Events;

        // Create an engine
        const engine = Engine.create();
        engineRef.current = engine;

        // Create a renderer (optional, for debugging, but we'll use React to render)
        // We need the bounds though.
        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;

        // Create bodies
        const wallOptions = { isStatic: true, render: { visible: false } };
        const ground = Bodies.rectangle(width / 2, height + 30, width, 60, wallOptions);
        const leftWall = Bodies.rectangle(-30, height / 2, 60, height, wallOptions);
        const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, wallOptions);

        // Angled walls to make a funnel/bowl shape at the bottom
        const leftSlope = Bodies.rectangle(0, height - 50, 200, 20, {
            isStatic: true,
            angle: Math.PI / 4,
            render: { visible: false }
        });
        const rightSlope = Bodies.rectangle(width, height - 50, 200, 20, {
            isStatic: true,
            angle: -Math.PI / 4,
            render: { visible: false }
        });

        // Add walls to the world
        Composite.add(engine.world, [ground, leftWall, rightWall, leftSlope, rightSlope]);

        // Add capsules
        const initialCapsules = [];
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * (width - 40) + 20;
            const y = Math.random() * -500 - 50; // Start above the screen
            const capsuleBody = Bodies.rectangle(x, y, 48, 24, {
                chamfer: { radius: 12 }, // Pill shape
                restitution: 0.5,
                friction: 0.005,
                render: { fillStyle: '#ff0000' } // Debug color
            });

            // Assign a random color to the body for tracking
            capsuleBody.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            capsuleBody.id = i; // Simple ID

            initialCapsules.push(capsuleBody);
        }
        Composite.add(engine.world, initialCapsules);

        // Run the engine
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Update React state on every tick (or throttle it)
        const updateState = () => {
            const newCapsuleStates = initialCapsules.map(body => ({
                id: body.id,
                x: body.position.x,
                y: body.position.y,
                rotate: body.angle,
                color: body.color
            }));
            setCapsules(newCapsuleStates);
            requestAnimationFrame(updateState);
        };

        const animationId = requestAnimationFrame(updateState);

        // Clean up
        return () => {
            Runner.stop(runner);
            Engine.clear(engine);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Handle dispensing (simple effect for now, maybe just agitate them)
    useEffect(() => {
        if (isDispensing && engineRef.current) {
            // Apply a random force to some bodies to simulate mixing/dispensing
            const bodies = Matter.Composite.allBodies(engineRef.current.world);
            bodies.forEach(body => {
                if (!body.isStatic) {
                    Matter.Body.applyForce(body, body.position, {
                        x: (Math.random() - 0.5) * 0.05,
                        y: -0.05 // Upward force
                    });
                }
            });
        }
    }, [isDispensing]);

    return (
        <div ref={sceneRef} className="absolute top-0 left-0 w-full h-[60%] bg-white/10 rounded-t-full backdrop-blur-sm border-b-4 border-red-600/20 overflow-hidden z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/20 pointer-events-none rounded-t-full"></div>

            {/* Glass Reflection */}
            <div className="absolute top-10 left-10 w-16 h-24 bg-white/20 rounded-full rotate-[-15deg] blur-md pointer-events-none"></div>

            {/* Capsules */}
            {capsules.map(capsule => (
                <Capsule
                    key={capsule.id}
                    x={capsule.x}
                    y={capsule.y}
                    rotate={capsule.rotate}
                    color={capsule.color}
                />
            ))}
        </div>
    );
}
