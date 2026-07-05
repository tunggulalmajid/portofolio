import { Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Award, ExternalLink, Eye, X } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { Certificate, PaginatedData} from '@/types';

interface Props { certificates: PaginatedData<Certificate>; }

export default function CertificateIndex({ certificates }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleDelete = (id: number) => {
        if (confirm('Delete this certificate?')) {
router.delete(`/admin/certificates/${id}`);
}
    };

    const openImagePreview = (url: string) => {
        setImagePreview(url);
    };

    return (
        <AdminLayout title="Manage Certificates">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div><h2 className="text-xl font-bold text-white">Certificates</h2><p className="text-gray-400 text-sm mt-1">{certificates.total} total</p></div>
                    <Link href="/admin/certificates/create" className="inline-flex items-center gap-2 px-4 py-2 bg-green-400 hover:bg-green-300 text-[#1e2235] font-semibold rounded-xl text-sm">
                        <Plus size={16} /> Add Certificate
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certificates.data.map((cert) => (
                        <div key={cert.id} className="bg-[#1e2235] border border-white/5 rounded-xl p-5 space-y-3 hover:border-green-400/20 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="relative group w-16 h-16 bg-[#151929] border border-white/5 rounded-lg overflow-hidden flex items-center justify-center">
                                    {cert.image_url ? (
                                        <>
                                            <img src={cert.image_url} alt="" className="w-full h-full object-contain" />
                                            <button onClick={() => openImagePreview(cert.image_url!)} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Eye size={16} className="text-white" />
                                            </button>
                                        </>
                                    ) : (
                                        <Award size={20} className="text-green-400" />
                                    )}
                                </div>
                                <span className={`px-2 py-0.5 text-xs rounded-full border ${cert.is_active ? 'bg-green-400/10 text-green-400 border-green-400/20' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                                    {cert.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <div>
                                <p className="text-white font-medium text-sm">{cert.title}</p>
                                <p className="text-gray-400 text-xs mt-0.5">{cert.issuer}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 text-xs">{new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                <div className="flex gap-1">
                                    {cert.credential_url && <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg"><ExternalLink size={14} /></a>}
                                    <Link href={`/admin/certificates/${cert.id}/edit`} className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg"><Edit size={14} /></Link>
                                    <button onClick={() => handleDelete(cert.id)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        </div>
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
        </AdminLayout>
    );
}
