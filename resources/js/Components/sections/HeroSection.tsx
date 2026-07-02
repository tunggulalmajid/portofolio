import { Hero } from '@/types';
import { Download, ArrowRight, Mail, GitBranch } from 'lucide-react';

interface HeroSectionProps {
    hero: Hero | null;
}

export default function HeroSection({ hero }: HeroSectionProps) {
    if (!hero) return null;

    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#1e2235]">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            {/* Green glow top right */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-400/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

                    {/* Left: Text */}
                    <div className="flex-1 text-center lg:text-left">
                        {/* Hello badge */}
                        <p className="text-green-400 font-medium text-lg mb-2 tracking-wide">HELLO, I'M</p>

                        {/* Name */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                            <span className="text-white">{hero.name.split(' ')[0]} </span>
                            <span className="text-green-400">{hero.name.split(' ').slice(1).join(' ')}</span>
                        </h1>

                        {/* Role */}
                        <h2 className="text-xl sm:text-2xl text-gray-400 font-medium mb-6">
                            {hero.tagline}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                            {hero.description}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
                            <a
                                href={hero.cta_primary_link ?? '/#contact'}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-green-400 hover:bg-green-300 text-[#1e2235] font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-green-400/25"
                            >
                                {hero.cta_primary_text ?? 'Hire Me'}
                                <ArrowRight size={18} />
                            </a>
                            {hero.cv_file_url && (
                                <a
                                    href={hero.cv_file_url}
                                    download
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-green-400/40 hover:border-green-400 text-green-400 hover:text-green-300 font-semibold rounded-lg transition-all"
                                >
                                    <Download size={18} />
                                    Download CV
                                </a>
                            )}
                        </div>

                        {/* Social icons row */}
                        <div className="flex items-center gap-4 justify-center lg:justify-start">
                            <span className="text-sm text-gray-500">Find me on:</span>
                            <div className="flex gap-3">
                                {[
                                    { label: 'GitHub', icon: <GitBranch size={18} />, href: 'https://github.com' },
                                    { label: 'LinkedIn', icon: <ArrowRight size={18} />, href: 'https://linkedin.com' },
                                    { label: 'Email', icon: <Mail size={18} />, href: 'mailto:' },
                                ].map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        className="w-9 h-9 flex items-center justify-center border border-white/10 hover:border-green-400/50 text-gray-400 hover:text-green-400 rounded-lg transition-all"
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
                        <div className="absolute inset-0 bg-green-400/10 rounded-full blur-3xl scale-150" />

                        {/* Outer dashed ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-green-400/20 scale-110" />

                        {/* Photo */}
                        <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-green-400/30 shadow-2xl">
                            <img
                                src="/assets/hero.png"
                                alt={hero.name}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -bottom-4 -right-4 bg-[#252a40] border border-green-400/20 rounded-xl px-4 py-3 shadow-xl">
                            <p className="text-xs text-gray-400">Status</p>
                            <p className="text-sm font-semibold text-green-400">Open to Work</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-px h-10 bg-gradient-to-b from-green-400/40 to-transparent" />
            </div>
        </section>
    );
}
