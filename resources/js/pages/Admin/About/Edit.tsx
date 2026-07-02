import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { About } from '@/types';
import { ArrowLeft, Save } from 'lucide-react';

interface AboutEditProps { about: About | null; }

const inputClass = "w-full px-4 py-2.5 bg-[#151929] border border-white/10 focus:border-green-400 text-white rounded-xl outline-none text-sm transition-colors";
const cardClass = "bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4";

export default function AboutEdit({ about }: AboutEditProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: about?.title ?? '',
        description: about?.description ?? '',
        short_bio: about?.short_bio ?? '',
        profile_image: null as File | null,
        location: about?.location ?? '',
        email: about?.email ?? '',
        phone: about?.phone ?? '',
        is_available: about?.is_available ?? true,
        is_active: about?.is_active ?? true,
        _method: 'PUT',
    });

    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); post('/admin/about', { forceFormData: true }); };

    return (
        <AdminLayout title="Edit About">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/about" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"><ArrowLeft size={20} /></Link>
                    <h2 className="text-xl font-bold text-white">Edit About Section</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className={cardClass}>
                        <h3 className="text-white font-semibold border-b border-white/5 pb-3">Content</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Title *</label>
                            <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className={inputClass} />
                            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Short Bio * (max 500 chars)</label>
                            <textarea rows={3} value={data.short_bio} onChange={e => setData('short_bio', e.target.value)} className={inputClass} />
                            {errors.short_bio && <p className="text-red-400 text-xs mt-1">{errors.short_bio}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
                            <textarea rows={4} value={data.description} onChange={e => setData('description', e.target.value)} className={inputClass} />
                            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                        </div>
                    </div>

                    <div className={cardClass}>
                        <h3 className="text-white font-semibold border-b border-white/5 pb-3">Personal Info</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Location</label>
                                <input type="text" value={data.location} onChange={e => setData('location', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Phone</label>
                                <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className={inputClass} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Profile Image</label>
                            <input type="file" accept="image/*" onChange={e => setData('profile_image', e.target.files?.[0] ?? null)}
                                className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-400/10 file:text-green-400 hover:file:bg-green-400/20 file:text-sm file:cursor-pointer" />
                        </div>
                    </div>

                    <div className={cardClass}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={data.is_available} onChange={e => setData('is_available', e.target.checked)} className="w-4 h-4 rounded border-white/20 bg-[#151929] text-green-400 focus:ring-green-400" />
                                    <span className="text-sm text-gray-400">Available for work</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="w-4 h-4 rounded border-white/20 bg-[#151929] text-green-400 focus:ring-green-400" />
                                    <span className="text-sm text-gray-400">Active</span>
                                </label>
                            </div>
                            <button type="submit" disabled={processing} className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-400 hover:bg-green-300 disabled:opacity-60 text-[#1e2235] font-semibold rounded-xl text-sm">
                                <Save size={16} /> {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
