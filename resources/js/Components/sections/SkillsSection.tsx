import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import type { Skill } from '@/types';

interface SkillsSectionProps {
    skills: Record<string, Skill[]>;
    allSkills: Skill[];
}

// Helper untuk render Lucide icon dinamis
function renderIcon(iconName: string | null, size = 16) {
    if (!iconName) {
        return null;
    }

    const Icon = (LucideIcons as any)[iconName];

    if (!Icon) {
        return null;
    }

    return <Icon size={size} />;
}

// Urutan kategori yang diinginkan
const categoryOrder = ['Frontend', 'Backend', 'Mobile', 'DevOps'];

// Icon emoji per kategori

// Deskripsi singkat per kategori
const categoryDescription: Record<string, string> = {
    Frontend:
        'Membangun tampilan yang responsif, interaktif, dan nyaman digunakan.',
    Backend: 'Merancang logika server, API, dan struktur data yang solid.',
    Mobile: 'Mengembangkan aplikasi mobile lintas platform yang performant.',
    DevOps: 'Mengelola infrastruktur, deployment, dan workflow pengembangan.',
};

export default function SkillsSection({
    skills,
    allSkills,
}: SkillsSectionProps) {
    // Filter hanya 4 kategori utama, urutkan sesuai categoryOrder
    const categories = categoryOrder.filter(
        (cat) => skills[cat] && skills[cat].length > 0,
    );

    // Duplikat array untuk infinite scrolling effect
    const scrollingSkills = [...allSkills, ...allSkills];

    if (categories.length === 0) {
        return null;
    }

    return (
        <section
            id="skills"
            className="relative overflow-hidden bg-[#151929] py-24"
        >
            <div className="bg-green-400/3 pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full blur-3xl" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <p className="mb-2 text-sm font-medium uppercase tracking-widest text-green-400">
                        What I Work With
                    </p>
                    <h2 className="text-4xl font-bold text-white">
                        Skills & Technologies
                    </h2>
                    <div className="mx-auto mt-4 h-0.5 w-12 bg-green-400" />
                </div>

                {/* Category cards — 2x2 grid */}
                <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="rounded-2xl border border-white/5 bg-[#1e2235] p-6 transition-colors hover:border-green-400/20"
                        >
                            {/* Category header */}
                            <div className="mb-3 flex items-center gap-3">
                                <h3 className="font-semibold text-white">
                                    {category}
                                </h3>
                            </div>

                            {/* Category description */}
                            {categoryDescription[category] && (
                                <p className="mb-5 text-xs leading-relaxed text-gray-500">
                                    {categoryDescription[category]}
                                </p>
                            )}

                            {/* Tech badges dengan icon Lucide */}
                            <div className="flex flex-wrap gap-2">
                                {skills[category].map((skill) => (
                                    <span
                                        key={skill.id}
                                        className="flex items-center gap-1.5 rounded-lg border bg-[#151929] px-2.5 py-1.5 text-xs transition-colors hover:border-opacity-50"
                                        style={{
                                            borderColor: skill.color
                                                ? `${skill.color}30`
                                                : 'rgba(255,255,255,0.05)',
                                            color: skill.color || '#d1d5db',
                                        }}
                                    >
                                        {renderIcon(skill.icon_name, 14)}
                                        <span>{skill.name}</span>
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Scrolling Tools Bar - menampilkan semua skills aktif */}
                <div className="relative overflow-hidden">
                    <p className="mb-4 text-center text-xs uppercase tracking-widest text-gray-500">
                        All Skills & Technologies
                    </p>
                    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                        <div className="flex animate-scroll-left gap-4 whitespace-nowrap">
                            {scrollingSkills.map((skill, i) => (
                                <span
                                    key={`${skill.id}-${i}`}
                                    className="inline-flex shrink-0 items-center gap-2 rounded-xl border bg-[#1e2235] px-4 py-2 text-sm"
                                    style={{
                                        borderColor: skill.color
                                            ? `${skill.color}30`
                                            : 'rgba(255,255,255,0.05)',
                                        color: skill.color || '#9ca3af',
                                    }}
                                >
                                    {renderIcon(skill.icon_name, 16)}
                                    <span>{skill.name}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
