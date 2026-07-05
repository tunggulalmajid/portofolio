import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AdminLayout from '@/Layouts/AdminLayout';
import type { Certificate } from '@/types';

interface Props { certificate?: Certificate; }

const inputClass = "w-full px-4 py-2.5 bg-[#151929] border border-white/10 focus:border-green-400 text-white rounded-xl outline-none text-sm transition-colors";
const cardClass = "bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4";

function CertForm({ onSubmit, processing, data, setData, errors }: any) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const openImagePreview = (url: string) => {
        setImagePreview(url);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className={cardClass}>
                <h3 className="text-white font-semibold border-b border-white/5 pb-3">Certificate Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Title *</label>
                        <input type="text" value={data.title} onChange={(e: any) => setData('title', e.target.value)} className={inputClass} />
                        {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Issuer *</label>
                        <input type="text" value={data.issuer} onChange={(e: any) => setData('issuer', e.target.value)} className={inputClass} />
                        {errors.issuer && <p className="text-red-400 text-xs mt-1">{errors.issuer}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Issue Date *</label>
                        <input type="date" value={data.issue_date} onChange={(e: any) => setData('issue_date', e.target.value)} className={inputClass} />
                        {errors.issue_date && <p className="text-red-400 text-xs mt-1">{errors.issue_date}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Expiry Date</label>
                        <input type="date" value={data.expiry_date ?? ''} onChange={(e: any) => setData('expiry_date', e.target.value || null)} className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
                        <input type="text" value={data.category} onChange={(e: any) => setData('category', e.target.value)} placeholder="e.g. Cloud, Web, Security" className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Credential URL</label>
                        <input type="url" value={data.credential_url} onChange={(e: any) => setData('credential_url', e.target.value)} className={inputClass} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Certificate Image</label>
                    
                    {/* Show existing image if editing */}
                    {data.existing_image && !data.image && (
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Current Image</label>
                            <div className="relative w-full max-w-md bg-[#151929] rounded-lg overflow-hidden border border-white/5 group">
                                <img src={`/storage/${data.existing_image}`} alt="Current certificate" className="w-full h-auto object-contain" />
                                <button type="button" onClick={() => openImagePreview(`/storage/${data.existing_image}`)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="flex items-center gap-2 text-white text-sm">
                                        <Eye size={16} /> View Full Image
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">{data.existing_image ? 'Change Image' : 'Upload Image'}</label>
                        <input type="file" accept="image/*" onChange={(e: any) => setData('image', e.target.files?.[0] ?? null)}
                            className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-400/10 file:text-green-400 hover:file:bg-green-400/20 file:text-sm file:cursor-pointer" />
                        {data.image && (
                            <p className="text-green-400 text-xs mt-2">New image selected: {data.image.name}</p>
                        )}
                        {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
                    </div>
                </div>
            </div>
            <div className={cardClass}>
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={data.is_active} onChange={(e: any) => setData('is_active', e.target.checked)} className="w-4 h-4 rounded border-white/20 bg-[#151929] text-green-400 focus:ring-green-400" />
                        <span className="text-sm text-gray-400">Active</span>
                    </label>
                    <button type="submit" disabled={processing} className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-400 hover:bg-green-300 disabled:opacity-60 text-[#1e2235] font-semibold rounded-xl text-sm">
                        <Save size={16} /> {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Image Preview Modal */}
            {imagePreview && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setImagePreview(null)}>
                    <button onClick={() => setImagePreview(null)} className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Save size={24} className="rotate-45" />
                    </button>
                    <img src={imagePreview} alt="Certificate preview" className="max-h-[90vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </form>
    );
}

export function CertificateCreate() {
    const form = useForm({ title: '', issuer: '', issue_date: '', expiry_date: null as string | null, credential_url: '', image: null as File | null, category: '', order: 0, is_active: true });
    
    useEffect(() => {
        if (Object.keys(form.errors).length > 0) {
            const firstError = Object.values(form.errors)[0];
            toast.error(firstError || 'Please check the form for errors');
        }
    }, [form.errors]);
    
    const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault(); form.post('/admin/certificates', { forceFormData: true }); 
};

    return (
        <AdminLayout title="Add Certificate">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/certificates" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><ArrowLeft size={20} /></Link>
                    <h2 className="text-xl font-bold text-white">Add Certificate</h2>
                </div>
                <CertForm onSubmit={handleSubmit} processing={form.processing} data={form.data} setData={form.setData} errors={form.errors} />
            </div>
        </AdminLayout>
    );
}

export default function CertificateEdit({ certificate }: Props) {
    const form = useForm({ title: certificate?.title ?? '', issuer: certificate?.issuer ?? '', issue_date: certificate?.issue_date ?? '', expiry_date: certificate?.expiry_date ?? null, credential_url: certificate?.credential_url ?? '', image: null as File | null, existing_image: certificate?.image ?? null, category: certificate?.category ?? '', order: certificate?.order ?? 0, is_active: certificate?.is_active ?? true, _method: 'PUT' });
    
    useEffect(() => {
        if (Object.keys(form.errors).length > 0) {
            const firstError = Object.values(form.errors)[0];
            toast.error(firstError || 'Please check the form for errors');
        }
    }, [form.errors]);
    
    const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault(); form.post(`/admin/certificates/${certificate?.id}`, { forceFormData: true }); 
};

    return (
        <AdminLayout title="Edit Certificate">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/certificates" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><ArrowLeft size={20} /></Link>
                    <h2 className="text-xl font-bold text-white">Edit Certificate</h2>
                </div>
                <CertForm onSubmit={handleSubmit} processing={form.processing} data={form.data} setData={form.setData} errors={form.errors} />
            </div>
        </AdminLayout>
    );
}
