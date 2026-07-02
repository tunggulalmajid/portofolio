import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { Certificate } from '@/types';
import { ArrowLeft, Save } from 'lucide-react';

interface Props { certificate?: Certificate; }

const inputClass = "w-full px-4 py-2.5 bg-[#151929] border border-white/10 focus:border-green-400 text-white rounded-xl outline-none text-sm transition-colors";
const cardClass = "bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4";

function CertForm({ onSubmit, processing, data, setData, errors }: any) {
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
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Certificate Image</label>
                    <input type="file" accept="image/*" onChange={(e: any) => setData('image', e.target.files?.[0] ?? null)}
                        className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-400/10 file:text-green-400 hover:file:bg-green-400/20 file:text-sm file:cursor-pointer" />
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
        </form>
    );
}

export function CertificateCreate() {
    const form = useForm({ title: '', issuer: '', issue_date: '', expiry_date: null as string | null, credential_url: '', image: null as File | null, category: '', order: 0, is_active: true });
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); form.post('/admin/certificates', { forceFormData: true }); };
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
    const form = useForm({ title: certificate?.title ?? '', issuer: certificate?.issuer ?? '', issue_date: certificate?.issue_date ?? '', expiry_date: certificate?.expiry_date ?? null, credential_url: certificate?.credential_url ?? '', image: null as File | null, category: certificate?.category ?? '', order: certificate?.order ?? 0, is_active: certificate?.is_active ?? true, _method: 'PUT' });
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); form.post(`/admin/certificates/${certificate?.id}`, { forceFormData: true }); };
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
