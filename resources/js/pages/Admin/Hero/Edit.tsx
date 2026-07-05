import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { Hero } from '@/types';

interface HeroEditProps {
    hero: Hero | null;
}

const inputClass = "w-full px-4 py-2.5 bg-[#151929] border border-white/10 focus:border-green-400 text-white rounded-xl outline-none text-sm transition-colors";
const cardClass = "bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4";

export default function HeroEdit({ hero }: HeroEditProps) {
    const { data, setData, post, processing, errors } = useForm({
        name:               hero?.name ?? '',
        tagline:            hero?.tagline ?? '',
        description:        hero?.description ?? '',
        cta_primary_link:   hero?.cta_primary_link ?? '',
        cta_secondary_link: hero?.cta_secondary_link ?? '',
        is_active:          hero?.is_active ?? true,
        _method:            'PUT',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/hero');
    };

    return (
        <AdminLayout title="Edit Hero">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/hero" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-xl font-bold text-white">Edit Hero Section</h2>
                        <p className="text-gray-400 text-sm">Update your hero section content</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className={cardClass}>
                        <h3 className="text-white font-semibold border-b border-white/5 pb-3">Basic Info</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Name *</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className={inputClass} />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Tagline *</label>
                                <input type="text" value={data.tagline} onChange={e => setData('tagline', e.target.value)} className={inputClass} />
                                {errors.tagline && <p className="text-red-400 text-xs mt-1">{errors.tagline}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Description *</label>
                            <textarea rows={3} value={data.description} onChange={e => setData('description', e.target.value)} className={inputClass} />
                            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                        </div>
                    </div>



                    <div className={cardClass}>
                        <h3 className="text-white font-semibold border-b border-white/5 pb-3">Buttons</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Download CV Button Link (Google Drive URL)</label>
                                <input type="text" value={data.cta_primary_link} onChange={e => setData('cta_primary_link', e.target.value)} placeholder="https://drive.google.com/..." className={inputClass} />
                                {errors.cta_primary_link && <p className="text-red-400 text-xs mt-1">{errors.cta_primary_link}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Projects Button Link</label>
                                <input type="text" value={data.cta_secondary_link} onChange={e => setData('cta_secondary_link', e.target.value)} placeholder="#projects or https://..." className={inputClass} />
                                {errors.cta_secondary_link && <p className="text-red-400 text-xs mt-1">{errors.cta_secondary_link}</p>}
                            </div>
                        </div>
                    </div>

                    <div className={cardClass}>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)}
                                    className="w-4 h-4 rounded border-white/20 bg-[#151929] text-green-400 focus:ring-green-400" />
                                <span className="text-sm text-gray-400">Active</span>
                            </label>
                            <button type="submit" disabled={processing}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-400 hover:bg-green-300 disabled:opacity-60 text-[#1e2235] font-semibold rounded-xl transition-colors text-sm">
                                <Save size={16} /> {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
