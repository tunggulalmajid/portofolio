import { Skill } from '@/types';

interface SkillsSectionProps {
    skills: Record<string, Skill[]>;
}

// Tools untuk scrolling bar (hardcoded karena hanya tampilan)
const tools = [
    'Git', 'GitHub', 'Docker', 'Linux', 'VS Code', 'Figma', 'Postman',
    'Nginx', 'Redis', 'Firebase', 'Vercel', 'AWS', 'CI/CD', 'Bash',
    'Git', 'GitHub', 'Docker', 'Linux', 'VS Code', 'Figma', 'Postman',
    'Nginx', 'Redis', 'Firebase', 'Vercel', 'AWS', 'CI/CD', 'Bash',
];

// Urutan kategori yang diinginkan
const categoryOrder = ['Frontend', 'Backend', 'Mobile', 'DevOps'];

// Icon emoji per kategori
const categoryIcon: Record<string, string> = {
    Frontend: '🎨',
    Backend: '⚙️',
    Mobile: '📱',
    DevOps: '🚀',
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
    // Filter hanya 4 kategori utama, urutkan sesuai categoryOrder
    const categories = categoryOrder.filter((cat) => skills[cat] && skills[cat].length > 0);

    if (categories.length === 0) return null;

    return (
        <section id="skills" className="py-24 bg-[#151929] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/3 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-green-400 font-medium text-sm tracking-widest uppercase mb-2">What I Work With</p>
                    <h2 className="text-4xl font-bold text-white">Skills & Technologies</h2>
                    <div className="mt-4 w-12 h-0.5 bg-green-400 mx-auto" />
                </div>

                {/* Category cards — 2x2 grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {categories.map((category) => (
                        <div
                            key={category}
                            className="bg-[#1e2235] border border-white/5 hover:border-green-400/20 rounded-2xl p-6 transition-all"
                        >
                            {/* Category header */}
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-xl">{categoryIcon[category] ?? '💡'}</span>
                                <h3 className="text-white font-semibold">{category}</h3>
                            </div>

                            {/* Tech badges only — no progress bar */}
                            <div className="flex flex-wrap gap-2">
                                {skills[category].map((skill) => (
                                    <span
                                        key={skill.id}
                                        className="px-2.5 py-1 bg-[#151929] border border-white/5 text-gray-300 text-xs rounded-lg hover:border-green-400/30 hover:text-green-400 transition-all"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scrolling Tools Bar */}
                <div className="relative overflow-hidden">
                    <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-4">Tools & Environment</p>
                    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                        <div className="flex gap-4 animate-scroll-left whitespace-nowrap">
                            {tools.map((tool, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center px-4 py-2 bg-[#1e2235] border border-white/5 text-gray-400 text-sm rounded-xl shrink-0"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
