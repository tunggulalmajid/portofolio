import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Project, PaginatedData } from '@/types';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Search, ExternalLink, ArrowRight, GitBranch } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectsIndexProps {
    projects: PaginatedData<Project>;
    categories: string[];
    filters: { category: string | null; search: string | null };
}

const statusColors: Record<string, string> = {
    completed:   'bg-green-400/10 text-green-400 border-green-400/20',
    in_progress: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    archived:    'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export default function ProjectsIndex({ projects, categories, filters }: ProjectsIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/projects', { search, category: filters.category }, { preserveState: true });
    };

    const handleCategory = (cat: string) => {
        router.get('/projects', { category: cat, search: filters.search }, { preserveState: true });
    };

    return (
        <>
            <Head title="Projects - Tunggul Abdul Majid" />
            <div className="min-h-screen bg-[#1e2235] text-white">
                <Navbar />

                {/* Header */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="pt-32 pb-16 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-green-400 font-medium text-sm tracking-widest uppercase mb-2">My Portfolio</p>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Project Gallery</h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            A collection of projects I've worked on — from web applications to APIs and everything in between.
                        </p>
                        <div className="mt-6 w-12 h-0.5 bg-green-400 mx-auto" />
                    </div>
                </motion.section>

                {/* Filters */}
                <section className="py-6 border-b border-white/5 sticky top-16 bg-[#1e2235]/95 backdrop-blur z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <form onSubmit={handleSearch} className="relative w-full sm:w-72">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search projects..."
                                    className="w-full pl-9 pr-4 py-2.5 bg-[#252a40] border border-white/5 focus:border-green-400/40 text-white rounded-lg outline-none transition-colors text-sm placeholder-gray-600"
                                />
                            </form>

                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategory(cat)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            (filters.category ?? 'All') === cat
                                                ? 'bg-green-400 text-[#1e2235]'
                                                : 'bg-[#252a40] border border-white/5 text-gray-400 hover:text-green-400 hover:border-green-400/30'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {projects.data.length === 0 ? (
                            <div className="text-center py-24">
                                <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm text-gray-500 mb-8">
                                    Showing {projects.from}–{projects.to} of {projects.total} projects
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                    {projects.data.map((project) => (
                                        <div
                                            key={project.id}
                                            className="group bg-[#252a40] border border-white/5 hover:border-green-400/20 rounded-2xl overflow-hidden transition-colors"
                                        >
                                            <div className="aspect-video bg-[#1e2235] overflow-hidden relative">
                                                {project.thumbnail_url ? (
                                                    <img src={project.thumbnail_url} alt={project.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-150" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-5xl font-bold text-green-400/10">{project.title.charAt(0)}</span>
                                                    </div>
                                                )}
                                                <span className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-medium border rounded-full ${statusColors[project.status] ?? statusColors.archived}`}>
                                                    {project.status.replace('_', ' ')}
                                                </span>
                                            </div>

                                            <div className="p-5">
                                                <h3 className="text-base font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                                                    {project.short_description}
                                                </p>

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

                                                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                                    <Link href={`/projects/${project.slug}`}
                                                        className="text-sm text-green-400 hover:text-green-300 font-medium flex items-center gap-1 transition-colors">
                                                        View Details <ArrowRight size={14} />
                                                    </Link>
                                                    <div className="flex gap-1.5">
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
                                        </div>
                                    ))}
                                </div>

                                {projects.last_page > 1 && (
                                    <div className="flex justify-center gap-2">
                                        {projects.links.map((link, i) => (
                                            <button key={i} disabled={!link.url}
                                                onClick={() => link.url && router.get(link.url)}
                                                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                                    link.active ? 'bg-green-400 text-[#1e2235] font-semibold'
                                                    : link.url ? 'bg-[#252a40] border border-white/5 text-gray-400 hover:text-green-400 hover:border-green-400/30'
                                                    : 'bg-[#252a40] border border-white/5 text-gray-600 cursor-not-allowed'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
