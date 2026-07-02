import { About } from '@/types';
import { MapPin, Mail, Phone } from 'lucide-react';

interface AboutSectionProps {
    about: About | null;
}

export default function AboutSection({ about }: AboutSectionProps) {
    if (!about) return null;

    return (
        <section id="about" className="py-24 bg-[#151929] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/3 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-green-400 font-medium text-sm tracking-widest uppercase mb-2">Get to Know Me</p>
                    <h2 className="text-4xl font-bold text-white">About Me</h2>
                    <div className="mt-4 w-12 h-0.5 bg-green-400 mx-auto" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-16">
                    {/* Left: Info */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white">{about.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{about.description}</p>
                        {about.short_bio && (
                            <p className="text-gray-400 leading-relaxed">{about.short_bio}</p>
                        )}

                        {/* Info list */}
                        <div className="space-y-3 pt-2">
                            {about.location && (
                                <div className="flex items-center gap-3">
                                    <MapPin size={16} className="text-green-400 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">{about.location}</span>
                                </div>
                            )}
                            {about.email && (
                                <div className="flex items-center gap-3">
                                    <Mail size={16} className="text-green-400 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">{about.email}</span>
                                </div>
                            )}
                            {about.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone size={16} className="text-green-400 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">{about.phone}</span>
                                </div>
                            )}
                        </div>

                        {about.is_available && (
                            <div className="flex items-center gap-2 pt-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-sm text-green-400">Available for new projects</span>
                            </div>
                        )}
                    </div>

                    {/* Right: Terminal code block */}
                    <div className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                        {/* Terminal header */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#161b22]">
                            <span className="w-3 h-3 bg-red-500 rounded-full" />
                            <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                            <span className="w-3 h-3 bg-green-500 rounded-full" />
                            <span className="ml-3 text-xs text-gray-500 font-mono">about.js</span>
                        </div>
                        {/* Code content */}
                        <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                            <p className="text-gray-500">{'// About me'}</p>
                            <p><span className="text-blue-400">const </span><span className="text-white">about</span><span className="text-white"> = {'{'}</span></p>
                            <div className="pl-4 space-y-1">
                                <p><span className="text-green-400">name</span><span className="text-white">: </span><span className="text-yellow-300">"{about.title}"</span><span className="text-white">,</span></p>
                                <p><span className="text-green-400">location</span><span className="text-white">: </span><span className="text-yellow-300">"{about.location ?? 'Indonesia'}"</span><span className="text-white">,</span></p>
                                <p><span className="text-green-400">available</span><span className="text-white">: </span><span className="text-orange-400">{about.is_available ? 'true' : 'false'}</span><span className="text-white">,</span></p>
                                <p><span className="text-green-400">education</span><span className="text-white">: {'{'}</span></p>
                                <div className="pl-4 space-y-1">
                                    <p><span className="text-green-400">degree</span><span className="text-white">: </span><span className="text-yellow-300">"S1 Teknik Informatika"</span><span className="text-white">,</span></p>
                                    <p><span className="text-green-400">university</span><span className="text-white">: </span><span className="text-yellow-300">"Universitas Brawijaya"</span><span className="text-white">,</span></p>
                                    <p><span className="text-green-400">year</span><span className="text-white">: </span><span className="text-orange-400">2021</span><span className="text-white"> - </span><span className="text-orange-400">2025</span><span className="text-white">,</span></p>
                                </div>
                                <p><span className="text-white">{'}'}</span><span className="text-white">,</span></p>
                                <p><span className="text-green-400">focus</span><span className="text-white">: [</span></p>
                                <div className="pl-4">
                                    <p className="text-yellow-300">"Web Development"<span className="text-white">,</span></p>
                                    <p className="text-yellow-300">"Mobile Development"<span className="text-white">,</span></p>
                                    <p className="text-yellow-300">"Problem Solving"</p>
                                </div>
                                <p><span className="text-white">],</span></p>
                            </div>
                            <p className="text-white">{'};'}</p>
                            <br />
                            <p className="text-gray-500">{'// Currently working on'}</p>
                            <p><span className="text-blue-400">console</span><span className="text-white">.</span><span className="text-yellow-300">log</span><span className="text-white">(</span><span className="text-yellow-300">"Building awesome projects!"</span><span className="text-white">);</span></p>
                            <p className="text-green-400 mt-2">{'> Building awesome projects!'}</p>
                            <p className="text-gray-500 animate-pulse">{'> _'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
