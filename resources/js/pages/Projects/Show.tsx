import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Calendar, Tag, GitBranch, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import type { Project } from '@/types';

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
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { props } = usePage();
    const appUrl = (props.appUrl as string) || 'https://tunggulalmajid.com';
    const canonicalUrl = `${appUrl}/projects/${project.slug}`;

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => setLightboxOpen(false);

    const nextImage = useCallback(() => {
        if (project.images_url) {
            setCurrentImageIndex((prev) => (prev + 1) % project.images_url.length);
        }
    }, [project.images_url]);

    const prevImage = useCallback(() => {
        if (project.images_url) {
            setCurrentImageIndex((prev) => (prev - 1 + project.images_url.length) % project.images_url.length);
        }
    }, [project.images_url]);

    // Keyboard navigation
    useEffect(() => {
        if (!lightboxOpen) {
            return;
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }

            if (e.key === 'ArrowRight') {
                nextImage();
            }

            if (e.key === 'ArrowLeft') {
                prevImage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, nextImage, prevImage]);

    return (
        <>
            <Head>
                <title>{`${project.title} - Project by Tunggul Abdul Majid`}</title>
                <meta name="description" content={project.short_description || `Detail project ${project.title} oleh Tunggul Abdul Majid.`} />
                <meta name="keywords" content={`project, ${project.title}, ${project.category}, tunggul, tunggul abdul, tunggul abdul majid, tunggul unej, ${project.technologies.join(', ')}`} />
                <meta name="author" content="Tunggul Abdul Majid" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:title" content={`${project.title} - Tunggul Abdul Majid`} />
                <meta property="og:description" content={project.short_description} />
                <meta property="og:image" content={project.thumbnail_url || `${appUrl}/images/og-image.png`} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={canonicalUrl} />
                <meta name="twitter:title" content={`${project.title} - Tunggul Abdul Majid`} />
                <meta name="twitter:description" content={project.short_description} />
                <meta name="twitter:image" content={project.thumbnail_url || `${appUrl}/images/og-image.png`} />

                {/* Structured Data (JSON-LD) for Project */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CreativeWork",
                        "name": project.title,
                        "description": project.short_description,
                        "creator": {
                            "@type": "Person",
                            "name": "Tunggul Abdul Majid",
                            "alternateName": ["Tunggul", "Tunggul Abdul", "Tunggul Unej"]
                        },
                        "genre": project.category,
                        "dateCreated": project.year ? `${project.year}` : undefined,
                        "image": project.thumbnail_url || undefined,
                        "codeRepository": project.repo_link || undefined,
                        "url": canonicalUrl
                    })}
                </script>
            </Head>
            <div className="min-h-screen bg-[#1e2235] text-white">
                <Navbar />

                <motion.article 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="pt-24"
                >
                    {/* Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative py-16 overflow-hidden"
                    >
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
                    </motion.div>

                    {/* Thumbnail */}
                    {project.thumbnail_url && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
                        >
                            <img src={project.thumbnail_url} alt={project.title}
                                className="w-full rounded-2xl border border-white/5 shadow-2xl" />
                        </motion.div>
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
                                                <div key={i} className="cursor-pointer group relative aspect-video rounded-xl border border-white/5 overflow-hidden" onClick={() => openLightbox(i)}>
                                                    <img src={img} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-150" />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white text-sm font-medium">Click to view</span>
                                                    </div>
                                                </div>
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
                </motion.article>

                {related.length > 0 && (
                    <section className="py-16 border-t border-white/5 bg-[#151929]">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl font-bold text-white mb-8">Related Projects</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {related.map((proj) => (
                                    <Link key={proj.id} href={`/projects/${proj.slug}`}
                                        className="group bg-[#1e2235] border border-white/5 hover:border-green-400/20 rounded-2xl p-5 transition-colors">
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

            {/* Lightbox Modal */}
            {lightboxOpen && project.images_url && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={closeLightbox}>
                    {/* Close Button */}
                    <button onClick={closeLightbox} className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-10">
                        <X size={24} />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/50 text-white text-sm rounded-lg backdrop-blur-sm">
                        {currentImageIndex + 1} / {project.images_url.length}
                    </div>

                    {/* Navigation Buttons */}
                    {project.images_url.length > 1 && (
                        <>
                            <button onClick={(e) => {
 e.stopPropagation(); prevImage(); 
}} className="absolute left-4 p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
                                <ChevronLeft size={32} />
                            </button>
                            <button onClick={(e) => {
 e.stopPropagation(); nextImage(); 
}} className="absolute right-4 p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
                                <ChevronRight size={32} />
                            </button>
                        </>
                    )}

                    {/* Image */}
                    <img src={project.images_url[currentImageIndex]} alt={`Screenshot ${currentImageIndex + 1}`} className="max-h-[90vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />

                    {/* Thumbnail Navigation */}
                    {project.images_url.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
                            {project.images_url.map((img, i) => (
                                <button key={i} onClick={() => setCurrentImageIndex(i)} className={`shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${ i === currentImageIndex ? 'border-green-400 scale-110' : 'border-white/20 opacity-60 hover:opacity-100' }`}>
                                    <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
