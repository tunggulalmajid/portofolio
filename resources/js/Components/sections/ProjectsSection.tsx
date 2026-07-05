import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, GitBranch, Calendar } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectsSectionProps {
    projects: Project[];
}

const statusColors: Record<string, string> = {
    completed:   'bg-green-400/10 text-green-400 border-green-400/20',
    in_progress: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    archived:    'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
    const featured = projects.filter((p) => p.is_featured).slice(0, 6);
    const displayed = featured.length > 0 ? featured : projects.slice(0, 6);

    return (
        <section id="projects" className="py-24 bg-[#1e2235] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-400/3 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-green-400 font-medium text-sm tracking-widest uppercase mb-2">My Work</p>
                    <h2 className="text-4xl font-bold text-white">Featured Projects</h2>
                    <div className="mt-4 w-12 h-0.5 bg-green-400 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {displayed.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-[#252a40] border border-white/5 hover:border-green-400/20 rounded-2xl overflow-hidden transition-colors"
                        >
                            {/* Thumbnail */}
                            <div className="aspect-video bg-[#1e2235] overflow-hidden relative">
                                {project.thumbnail_url ? (
                                    <img
                                        src={project.thumbnail_url}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-150"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-5xl font-bold text-green-400/10">
                                            {project.title.charAt(0)}
                                        </span>
                                    </div>
                                )}
                                {project.status && (
                                    <span className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-medium border rounded-full ${statusColors[project.status] ?? statusColors.archived}`}>
                                        {project.status.replace('_', ' ')}
                                    </span>
                                )}
                                {project.images_url && project.images_url.length > 0 && (
                                    <span className="absolute bottom-3 left-3 px-2.5 py-1 text-xs font-medium bg-black/60 text-white rounded-full backdrop-blur-sm">
                                        +{project.images_url.length} images
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-base font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                                    {project.title}
                                </h3>
                                
                                {/* Year */}
                                {project.year && (
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                                        <Calendar size={12} />
                                        <span>{project.year}</span>
                                    </div>
                                )}
                                
                                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                                    {project.short_description}
                                </p>

                                {/* Tech tags */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {project.technologies.slice(0, 4).map((tech) => (
                                        <span key={tech} className="px-2 py-0.5 bg-[#1e2235] text-gray-400 text-xs rounded border border-white/5">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <span className="px-2 py-0.5 bg-[#1e2235] text-gray-500 text-xs rounded border border-white/5">
                                            +{project.technologies.length - 4}
                                        </span>
                                    )}
                                </div>

                                {/* Links */}
                                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="text-sm text-green-400 hover:text-green-300 font-medium flex items-center gap-1 transition-colors"
                                    >
                                        View Details <ArrowRight size={14} />
                                    </Link>
                                    <div className="flex gap-2">
                                        {project.repo_link && (
                                            <a href={project.repo_link} target="_blank" rel="noopener noreferrer"
                                                className="p-1.5 text-gray-500 hover:text-green-400 rounded-lg transition-all" aria-label="Repository">
                                                <GitBranch size={15} />
                                            </a>
                                        )}
                                        {project.demo_link && (
                                            <a href={project.demo_link} target="_blank" rel="noopener noreferrer"
                                                className="p-1.5 text-gray-500 hover:text-green-400 rounded-lg transition-all" aria-label="Demo">
                                                <ExternalLink size={15} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All */}
                <div className="text-center">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-8 py-3.5 border border-green-400/30 hover:border-green-400 text-green-400 hover:bg-green-400 hover:text-[#1e2235] font-semibold rounded-lg transition-all"
                    >
                        View All Projects <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
