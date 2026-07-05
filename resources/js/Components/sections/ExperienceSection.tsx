import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import type { Experience } from '@/types';

interface ExperienceSectionProps {
    experiences: Experience[];
}

// Helper untuk format date (YYYY-MM-DD) ke MMM YYYY
function formatMonthYear(dateStr: string | null | undefined): string {
    if (!dateStr) {
return '';
}

    const date = new Date(dateStr);

    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
    const sorted = [...experiences].sort((a, b) => a.order - b.order);

    return (
        <section id="experience" className="py-24 bg-[#1e2235] relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400/3 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-green-400 font-medium text-sm tracking-widest uppercase mb-2">My Journey</p>
                    <h2 className="text-4xl font-bold text-white">Experience</h2>
                    <div className="mt-4 w-12 h-0.5 bg-green-400 mx-auto" />
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-green-400/50 via-green-400/20 to-transparent" />

                        <div className="space-y-8">
                            {sorted.length === 0 && (
                                <p className="text-center text-gray-500 py-12">No experience entries yet.</p>
                            )}

                            {sorted.map((exp, index) => (
                                <motion.div 
                                    key={exp.id} 
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    className="relative flex gap-8 pl-16"
                                >
                                    {/* Dot */}
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                                        className="absolute left-0 top-5 w-10 h-10 bg-[#252a40] border-2 border-green-400/40 rounded-full flex items-center justify-center shadow-lg shadow-green-900/20"
                                    >
                                        <Briefcase size={16} className="text-green-400" />
                                    </motion.div>

                                    {/* Card */}
                                    <motion.div 
                                        className="flex-1 bg-[#252a40] border border-white/5 hover:border-green-400/20 rounded-2xl p-6 transition-colors"
                                    >
                                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                            <div>
                                                <h3 className="text-white font-semibold text-lg">{exp.position}</h3>
                                                <p className="text-green-400 text-sm font-medium">{exp.company}</p>
                                            </div>
                                            <span className="px-3 py-1 bg-green-400/10 border border-green-400/20 text-green-400 text-xs rounded-full capitalize shrink-0">
                                                {exp.type}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 mb-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={12} className="text-green-400/60" />
                                                {exp.duration || `${formatMonthYear(exp.start_date)} – ${exp.end_date ? formatMonthYear(exp.end_date) : 'Present'}`}
                                            </span>
                                            {exp.location && (
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin size={12} className="text-green-400/60" />
                                                    {exp.location}
                                                </span>
                                            )}
                                        </div>

                                        {exp.description && (
                                            <p className="text-gray-400 text-sm mb-4">{exp.description}</p>
                                        )}

                                        {/* Position History */}
                                        {exp.positions && exp.positions.length > 0 && (
                                            <div className="space-y-3 mb-4">
                                                {exp.positions.map((pos, i) => (
                                                    <div key={i} className="border-l-2 border-green-400/30 pl-3">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className="text-white text-sm font-medium">{pos.title}</h4>
                                                            <span className="text-xs text-gray-500">({pos.period})</span>
                                                        </div>
                                                        {pos.responsibilities && pos.responsibilities.length > 0 && (
                                                            <ul className="space-y-1">
                                                                {pos.responsibilities.map((resp, j) => (
                                                                    <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                                                                        <span className="mt-2 w-1 h-1 bg-green-400 rounded-full flex-shrink-0" />
                                                                        {resp}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* General Responsibilities */}
                                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                                            <ul className="space-y-1.5">
                                                {exp.responsibilities.map((resp, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                                        <span className="mt-2 w-1 h-1 bg-green-400 rounded-full flex-shrink-0" />
                                                        {resp}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
