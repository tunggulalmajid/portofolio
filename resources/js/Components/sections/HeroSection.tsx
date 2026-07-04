import { motion } from 'framer-motion';
import { Download, ArrowRight, Mail, GitBranch } from 'lucide-react';
import type { Hero } from '@/types';

interface HeroSectionProps {
    hero: Hero | null;
}

export default function HeroSection({ hero }: HeroSectionProps) {
    if (!hero) {
        return null;
    }

    return (
        <section
            id="hero"
            className="relative flex min-h-screen items-center overflow-hidden bg-[#1e2235]"
        >
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            {/* Green glow top right */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.05, 0.08, 0.05],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-green-400/5 blur-[150px]"
            />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
                    {/* Left: Text */}
                    <div className="flex-1 text-center lg:text-left">
                        {/* Hello badge */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-2 text-lg font-medium tracking-wide text-green-400"
                        >
                            HELLO, I'M
                        </motion.p>

                        {/* Name */}
                        <h1 className="mb-4 text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                            <motion.span
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="inline-block text-white"
                            >
                                {hero.name.split(' ')[0]}{' '}
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="inline-block text-green-400"
                            >
                                {hero.name.split(' ').slice(1).join(' ')}
                            </motion.span>
                        </h1>

                        {/* Role */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mb-6 text-xl font-medium text-gray-400 sm:text-2xl"
                        >
                            {hero.tagline}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mx-auto mb-8 max-w-xl leading-relaxed text-gray-400 lg:mx-0"
                        >
                            {hero.description}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                            className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
                        >
                            {hero.cta_primary_link && (
                                <motion.a
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    href={hero.cta_primary_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg bg-green-400 px-6 py-3 font-semibold text-[#1e2235] transition-all hover:bg-green-300 hover:shadow-lg hover:shadow-green-400/25"
                                >
                                    <Download size={18} />
                                    Download CV
                                </motion.a>
                            )}
                            {hero.cta_secondary_link && (
                                <motion.a
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    href={hero.cta_secondary_link}
                                    className="inline-flex items-center gap-2 rounded-lg border border-green-400/40 px-6 py-3 font-semibold text-green-400 transition-all hover:border-green-400 hover:text-green-300"
                                >
                                    Projects
                                    <ArrowRight size={18} />
                                </motion.a>
                            )}
                        </motion.div>

                        {/* Social icons row */}
                        <div className="mt-4 flex items-center justify-center gap-4 lg:justify-start">
                            <span className="text-sm text-gray-500">
                                Find me on:
                            </span>
                            <div className="flex gap-3">
                                {[
                                    {
                                        label: 'GitHub',
                                        icon: <GitBranch size={18} />,
                                        href: 'https://github.com',
                                    },
                                    {
                                        label: 'LinkedIn',
                                        icon: <ArrowRight size={18} />,
                                        href: 'https://linkedin.com',
                                    },
                                    {
                                        label: 'Email',
                                        icon: <Mail size={18} />,
                                        href: 'mailto:',
                                    },
                                ].map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-all hover:border-green-400/50 hover:text-green-400"
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Photo */}
                    <div className="relative flex-shrink-0">
                        {/* Green glow behind photo */}
                        <div className="absolute inset-0 scale-150 rounded-2xl bg-green-400/10 blur-3xl" />

                        {/* Outer dashed ring */}
                        <div className="absolute inset-0 scale-110 rounded-2xl border-2 border-dashed border-green-400/20" />

                        {/* Photo */}
                        <div className="relative h-64 w-64 overflow-hidden rounded-2xl border-4 border-green-400/30 shadow-2xl sm:h-72 sm:w-72 lg:h-80 lg:w-80">
                            <img
                                src="/assets/hero.png"
                                alt={hero.name}
                                className="h-full w-full object-cover object-top"
                            />
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -bottom-4 -right-4 rounded-xl border border-green-400/20 bg-[#252a40] px-4 py-3 shadow-xl">
                            <p className="text-xs text-gray-400">Let's</p>
                            <p className="text-sm font-semibold text-green-400">
                                Build Project
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gray-600">
                <span className="text-xs uppercase tracking-widest">
                    Scroll
                </span>
                <div className="h-10 w-px bg-gradient-to-b from-green-400/40 to-transparent" />
            </div>
        </section>
    );
}
