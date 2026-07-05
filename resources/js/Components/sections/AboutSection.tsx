import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import type { About } from '@/types';

interface AboutSectionProps {
    about: About | null;
}

export default function AboutSection({ about }: AboutSectionProps) {
    if (!about) {
        return null;
    }

    return (
        <section
            id="about"
            className="relative overflow-hidden bg-[#151929] py-24"
        >
            <div className="bg-green-400/3 pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full blur-3xl" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <p className="mb-2 text-sm font-medium uppercase tracking-widest text-green-400">
                        Get to Know Me
                    </p>
                    <h2 className="text-4xl font-bold text-white">About Me</h2>
                    <div className="mx-auto mt-4 h-0.5 w-12 bg-green-400" />
                </div>

                <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-2xl font-bold text-white"
                        >
                            {about.title}
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="leading-relaxed text-gray-400"
                        >
                            {about.description}
                        </motion.p>
                        {about.short_bio && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="leading-relaxed text-gray-400"
                            >
                                {about.short_bio}
                            </motion.p>
                        )}

                        {/* Info list */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="space-y-3 pt-2"
                        >
                            {about.location && (
                                <div className="flex items-center gap-3">
                                    <MapPin
                                        size={16}
                                        className="flex-shrink-0 text-green-400"
                                    />
                                    <span className="text-sm text-gray-300">
                                        {about.location}
                                    </span>
                                </div>
                            )}
                            {about.email && (
                                <div className="flex items-center gap-3">
                                    <Mail
                                        size={16}
                                        className="flex-shrink-0 text-green-400"
                                    />
                                    <span className="text-sm text-gray-300">
                                        {about.email}
                                    </span>
                                </div>
                            )}
                            {about.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone
                                        size={16}
                                        className="flex-shrink-0 text-green-400"
                                    />
                                    <span className="text-sm text-gray-300">
                                        {about.phone}
                                    </span>
                                </div>
                            )}
                        </motion.div>

                        {about.is_available && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                                className="flex items-center gap-2 pt-2"
                            >
                                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                                <span className="text-sm text-green-400">
                                    Available for build a project
                                </span>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Right: Terminal code block */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.3 }}

                        className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl"
                    >
                        {/* Terminal header */}
                        <div className="flex items-center gap-2 border-b border-white/10 bg-[#161b22] px-4 py-3">
                            <span className="h-3 w-3 rounded-full bg-red-500" />
                            <span className="h-3 w-3 rounded-full bg-yellow-500" />
                            <span className="h-3 w-3 rounded-full bg-green-500" />
                            <span className="ml-3 font-mono text-xs text-gray-500">
                                about.js
                            </span>
                        </div>
                        {/* Code content */}
                        <div className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
                            <p>
                                <span className="text-blue-400">const </span>
                                <span className="text-white">about</span>
                                <span className="text-white"> = {'{'}</span>
                            </p>
                            <div className="space-y-1 pl-4">
                                <p>
                                    <span className="text-green-400">name</span>
                                    <span className="text-white">: </span>
                                    <span className="text-yellow-300">
                                        "{about.title}"
                                    </span>
                                    <span className="text-white">,</span>
                                </p>
                                <p>
                                    <span className="text-green-400">
                                        location
                                    </span>
                                    <span className="text-white">: </span>
                                    <span className="text-yellow-300">
                                        "{about.location ?? 'Indonesia'}"
                                    </span>
                                    <span className="text-white">,</span>
                                </p>
                                <p>
                                    <span className="text-green-400">
                                        available
                                    </span>
                                    <span className="text-white">: </span>
                                    <span className="text-orange-400">
                                        {about.is_available ? 'true' : 'false'}
                                    </span>
                                    <span className="text-white">,</span>
                                </p>
                                <p>
                                    <span className="text-green-400">
                                        education
                                    </span>
                                    <span className="text-white">: {'{'}</span>
                                </p>
                                <div className="space-y-1 pl-4">
                                    <p>
                                        <span className="text-green-400">
                                            degree
                                        </span>
                                        <span className="text-white">: </span>
                                        <span className="text-yellow-300">
                                            "S1 - Teknologi Informasi"
                                        </span>
                                        <span className="text-white">,</span>
                                    </p>
                                    <p>
                                        <span className="text-green-400">
                                            university
                                        </span>
                                        <span className="text-white">: </span>
                                        <span className="text-yellow-300">
                                            "Universitas Jember"
                                        </span>
                                        <span className="text-white">,</span>
                                    </p>
                                    <p>
                                        <span className="text-green-400">
                                            year
                                        </span>
                                        <span className="text-white">: </span>
                                        <span className="text-orange-400">
                                            2024
                                        </span>
                                        <span className="text-white"> - </span>
                                        <span className="text-orange-400">
                                            sekarang
                                        </span>
                                        <span className="text-white">,</span>
                                    </p>
                                </div>
                                <p>
                                    <span className="text-white">{'}'}</span>
                                    <span className="text-white">,</span>
                                </p>
                                <p>
                                    <span className="text-green-400">
                                        focus
                                    </span>
                                    <span className="text-white">: [</span>
                                </p>
                                <div className="pl-4">
                                    <p className="text-yellow-300">
                                        "Backend Development"
                                        <span className="text-white">,</span>
                                    </p>
                                    <p className="text-yellow-300">
                                        "Mobile Development"
                                        <span className="text-white">,</span>
                                    </p>
                                    <p className="text-yellow-300">
                                        "Fullstack Web Development"
                                    </p>
                                </div>
                                <p>
                                    <span className="text-white">],</span>
                                </p>
                            </div>
                            <p className="text-white">{'};'}</p>
                            <br />

                            <p>
                                <span className="text-blue-400">console</span>
                                <span className="text-white">.</span>
                                <span className="text-yellow-300">log</span>
                                <span className="text-white">(</span>
                                <span className="text-yellow-300">
                                    "Let`s Build Project"
                                </span>
                                <span className="text-white">);</span>
                            </p>
                            <p className="mt-2 text-green-400">
                                {'> Let`s Build Project'}
                            </p>
                            <p className="animate-pulse text-gray-500">
                                {'> _'}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
