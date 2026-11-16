"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SPRING = { type: "spring", stiffness: 250, damping: 30 } as const;
const AMBIENT_INTERVAL = 1500;
const HOVER_DURATION = 1200;
const SETTLE_DURATION = 1200;

const FRONT_FLIPPED = { rotateX: 80, y: -16, filter: "blur(4px)", opacity: 0 } as const;
const FRONT_REST = { rotateX: 0, y: 0, filter: "blur(0px)", opacity: 1 } as const;
const BACK_FLIPPED = { rotateX: 360, y: 0, filter: "blur(0px)", opacity: 1 } as const;
const BACK_REST = { rotateX: 270, y: 16, filter: "blur(4px)", opacity: 0 } as const;
const FLIPPED_STEP = 0.05;

type LayerState = {
	rotateX: number;
	y: number;
	filter: string;
	opacity: number;
};

type NameLayerProps = {
	characters: string[];
	flipped: boolean;
	flippedState: LayerState;
	restState: LayerState;
	// Delay before the first character moves when flipping.
	flippedOffset: number;
	// Per-character delay when returning to rest, applied right to left.
	restStep: number;
};

// Each layer is an aria-hidden span so the h1 only holds phrasing content. Spaces stay inline so
// word spacing is preserved; every other character needs inline-block to take a transform.
function NameLayer({
	characters,
	flipped,
	flippedState,
	restState,
	flippedOffset,
	restStep,
}: NameLayerProps) {
	return (
		<span className="block" aria-hidden="true">
			{characters.map((character, index) => (
				<motion.span
					// biome-ignore lint/suspicious/noArrayIndexKey: character positions are stable in a name
					key={index}
					animate={flipped ? flippedState : restState}
					initial={false}
					transition={{
						...SPRING,
						delay: flipped
							? flippedOffset + FLIPPED_STEP * index
							: (characters.length - 1 - index) * restStep,
					}}
					className={character === " " ? "inline" : "inline-block"}
				>
					{character}
				</motion.span>
			))}
		</span>
	);
}

type AnimatedNameProps = {
	name: string;
};

export function AnimatedName({ name }: AnimatedNameProps) {
	const prefersReducedMotion = useReducedMotion();
	const [flipped, setFlipped] = useState(false);
	const hoverUntil = useRef(0);
	const resetTimer = useRef<number | null>(null);
	const characters = Array.from(name);

	useEffect(() => {
		if (prefersReducedMotion) {
			return;
		}

		const interval = window.setInterval(() => {
			if (Date.now() < hoverUntil.current) {
				return;
			}
			setFlipped((current) => !current);
		}, AMBIENT_INTERVAL);

		return () => window.clearInterval(interval);
	}, [prefersReducedMotion]);

	useEffect(() => {
		return () => {
			if (resetTimer.current !== null) {
				window.clearTimeout(resetTimer.current);
			}
		};
	}, []);

	const handlePointerEnter = () => {
		if (prefersReducedMotion) {
			return;
		}

		hoverUntil.current = Date.now() + HOVER_DURATION;
		setFlipped(true);

		if (resetTimer.current !== null) {
			window.clearTimeout(resetTimer.current);
		}

		resetTimer.current = window.setTimeout(() => {
			setFlipped(false);
			hoverUntil.current = Date.now() + SETTLE_DURATION;
			resetTimer.current = null;
		}, HOVER_DURATION);
	};

	return (
		<h1
			aria-label={name}
			className="grid-stack w-fit cursor-pointer font-pixel text-[clamp(1.75rem,9.2vw,3rem)] font-medium leading-none tracking-tight"
			onPointerEnter={handlePointerEnter}
		>
			<NameLayer
				characters={characters}
				flipped={flipped}
				flippedState={FRONT_FLIPPED}
				restState={FRONT_REST}
				flippedOffset={0}
				restStep={0.06}
			/>
			<NameLayer
				characters={characters}
				flipped={flipped}
				flippedState={BACK_FLIPPED}
				restState={BACK_REST}
				flippedOffset={0.1}
				restStep={0.05}
			/>
		</h1>
	);
}
