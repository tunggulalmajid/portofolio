import { Certificate } from '@/types';
import { Award, ExternalLink, Calendar } from 'lucide-react';

interface CertificatesSectionProps {
    certificates: Certificate[];
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
    if (certificates.length === 0) return null;

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
                    {certificates.map((cert) => (
                        <div
                            key={cert.id}
                            className="group bg-[#1e2235] border border-white/5 hover:border-green-400/20 rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                            {/* Certificate image */}
                            <div className="w-full h-40 bg-[#151929] overflow-hidden flex items-center justify-center">
                                {cert.image_url ? (
                                    <img
                                        src={cert.image_url}
                                        alt={cert.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
