import { Head, Link } from '@inertiajs/react';
import { Project } from '@/types';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { ExternalLink, ArrowLeft, ArrowRight, Calendar, Tag, GitBranch } from 'lucide-react';

interface ProjectShowProps {
    project: Project;
    related: Project[];
}

const statusColors: Record<string, string> = {
    completed:   'bg-green-400/10 text-green-400 border-green-400/20',
    in_progress: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    archived:    'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export default function ProjectShow({ project, related }: ProjectShowProps) {
    return (
        <>
            <Head title={project.title} />
            <div className="min-h-screen bg-[#1e2235] text-white">
                <Navbar />

                <article className="pt-24">
                    {/* Header */}
                    <div className="relative py-16 overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                        <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            <Link href="/projects"
                                className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8">
                                <ArrowLeft size={16} /> Back to Projects
                            </Link>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-green-400/10 border border-green-400/20 text-green-400 text-sm rounded-full">
                                    {project.category}
                                </span>
                                <span className={`px-3 py-1 text-sm rounded-full border ${statusColors[project.status] ?? statusColors.archived}`}>
                                    {project.status.replace('_', ' ')}
                                </span>
                                {project.is_featured && (
                                    <span className="px-3 py-1 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm rounded-full">
                                        Featured
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">{project.title}</h1>
                            <p className="text-lg text-gray-400 mb-8 max-w-2xl">{project.short_description}</p>

                            <div className="flex flex-wrap gap-3">
                                {project.demo_link && (
                                    <a href={project.demo_link} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-400 hover:bg-green-300 text-[#1e2235] font-semibold rounded-lg transition-all">
                                        <ExternalLink size={17} /> Live Demo
                                    </a>
                                )}
                                {project.repo_link && (
                                    <a href={project.repo_link} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 border border-green-400/30 hover:border-green-400 text-green-400 hover:text-green-300 font-semibold rounded-lg transition-all">
                                        <GitBranch size={17} /> View Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail */}
                    {project.thumbnail_url && (
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                            <img src={project.thumbnail_url} alt={project.title}
                                className="w-full rounded-2xl border border-white/5 shadow-2xl" />
                        </div>
                    )}

                    {/* Content */}
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main */}
                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-bold text-white mb-6">About This Project</h2>
                                <div className="space-y-4">
                                    {project.full_description.split('\n').filter(Boolean).map((para, i) => (
                                        <p key={i} className="text-gray-400 leading-relaxed">{para}</p>
                                    ))}
                                </div>

                                {project.images_url && project.images_url.length > 0 && (
                                    <div className="mt-12">
                                        <h3 className="text-xl font-bold text-white mb-6">Screenshots</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {project.images_url.map((img, i) => (
                                                <img key={i} src={img} alt={`Screenshot ${i + 1}`}
                                                    className="rounded-xl border border-white/5 w-full" />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-5">
                                <div className="bg-[#252a40] border border-white/5 rounded-2xl p-6">
                                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                        <Tag size={14} className="text-green-400" /> Tech Stack
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span key={tech} className="px-2.5 py-1 bg-[#1e2235] text-gray-300 text-xs rounded-lg border border-white/5">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-[#252a40] border border-white/5 rounded-2xl p-6 space-y-4">
                                    <h3 className="text-sm font-semibold text-white">Project Info</h3>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-400/10 rounded-lg">
                                            <Calendar size={13} className="text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Published</p>
                                            <p className="text-sm text-gray-300">
                                                {new Date(project.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-400/10 rounded-lg">
                                            <Tag size={13} className="text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Category</p>
                                            <p className="text-sm text-gray-300">{project.category}</p>
                                        </div>
                                    </div>
                                </div>

                                {(project.demo_link || project.repo_link) && (
                                    <div className="bg-[#252a40] border border-white/5 rounded-2xl p-6 space-y-3">
                                        <h3 className="text-sm font-semibold text-white mb-2">Links</h3>
                                        {project.demo_link && (
                                            <a href={project.demo_link} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors">
                                                <ExternalLink size={13} /> Live Demo
                                            </a>
                                        )}
                                        {project.repo_link && (
                                            <a href={project.repo_link} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors">
                                                <GitBranch size={13} /> Repository
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </article>

                {related.length > 0 && (
                    <section className="py-16 border-t border-white/5 bg-[#151929]">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl font-bold text-white mb-8">Related Projects</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {related.map((proj) => (
                                    <Link key={proj.id} href={`/projects/${proj.slug}`}
                                        className="group bg-[#1e2235] border border-white/5 hover:border-green-400/20 rounded-2xl p-5 transition-all">
                                        <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors mb-2">{proj.title}</h3>
                                        <p className="text-gray-400 text-sm line-clamp-2 mb-3">{proj.short_description}</p>
                                        <span className="text-green-400 text-sm flex items-center gap-1 font-medium">
                                            View Details <ArrowRight size={14} />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <Footer />
            </div>
        </>
    );
}
