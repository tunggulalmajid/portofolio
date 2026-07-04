import { Certificate } from '@/types';
import { Award, ExternalLink, Calendar, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface CertificatesSectionProps {
    certificates: Certificate[];
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    if (certificates.length === 0) return null;

    const openImagePreview = (url: string) => {
        setImagePreview(url);
    };

    return (
        <section id="certificates" className="py-24 bg-[#151929] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400/3 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-green-400 font-medium text-sm tracking-widest uppercase mb-2">My Achievements</p>
                    <h2 className="text-4xl font-bold text-white">Certificates</h2>
                    <div className="mt-4 w-12 h-0.5 bg-green-400 mx-auto" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group bg-[#1e2235] border border-white/5 hover:border-green-400/20 rounded-2xl overflow-hidden transition-all hover:shadow-lg"
                        >
                            {/* Certificate image */}
                            <div className="w-full h-40 bg-[#151929] overflow-hidden flex items-center justify-center relative group/img">
                                {cert.image_url ? (
                                    <>
                                        <img
                                            src={cert.image_url}
                                            alt={cert.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <button
                                            onClick={() => openImagePreview(cert.image_url!)}
                                            className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                        >
                                            <span className="text-white text-sm font-medium">Click to view</span>
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <Award size={40} className="text-green-400/40" />
                                        <span className="text-xs text-gray-600">No image</span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-white font-semibold text-sm mb-1 leading-snug group-hover:text-green-400 transition-colors">
                                    {cert.title}
                                </h3>
                                <p className="text-green-400 text-xs font-medium mb-2">{cert.issuer}</p>

                                {cert.category && (
                                    <span className="inline-block px-2 py-0.5 bg-[#151929] text-gray-500 text-xs rounded mb-3">
                                        {cert.category}
                                    </span>
                                )}

                                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={11} className="text-green-400/60" />
                                        {cert.issue_date
                                            ? new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                                            : ''}
                                    </span>
                                    {cert.is_expired && <span className="text-red-400">Expired</span>}
                                </div>

                                {cert.credential_url && (
                                    <a
                                        href={cert.credential_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors font-medium"
                                    >
                                        <ExternalLink size={11} /> View Credential
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Image Preview Modal */}
            {imagePreview && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setImagePreview(null)}>
                    <button onClick={() => setImagePreview(null)} className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                        <X size={24} />
                    </button>
                    <img src={imagePreview} alt="Certificate preview" className="max-h-[90vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </section>
    );
}
