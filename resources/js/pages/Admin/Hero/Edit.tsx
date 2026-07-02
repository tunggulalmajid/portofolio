import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { Hero } from '@/types';
import { ArrowLeft, Save } from 'lucide-react';

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
        profile_image:      null as File | null,
        cv_file:            null as File | null,
        cta_primary_text:   hero?.cta_primary_text ?? 'View My Work',
        cta_primary_link:   hero?.cta_primary_link ?? '#projects',
        cta_secondary_text: hero?.cta_secondary_text ?? 'Download CV',
        cta_secondary_link: hero?.cta_secondary_link ?? '',
        is_active:          hero?.is_active ?? true,
        _method:            'PUT',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/hero', { forceFormData: true });
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
                        <h3 className="text-white font-semibold border-b border-white/5 pb-3">Media</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Profile Image</label>
                                <input type="file" accept="image/*" onChange={e => setData('profile_image', e.target.files?.[0] ?? null)}
                                    className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-400/10 file:text-green-400 hover:file:bg-green-400/20 file:text-sm file:cursor-pointer" />
                                {errors.profile_image && <p className="text-red-400 text-xs mt-1">{errors.profile_image}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">CV File (PDF)</label>
                                <input type="file" accept=".pdf" onChange={e => setData('cv_file', e.target.files?.[0] ?? null)}
                                    className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-400/10 file:text-green-400 hover:file:bg-green-400/20 file:text-sm file:cursor-pointer" />
                                {errors.cv_file && <p className="text-red-400 text-xs mt-1">{errors.cv_file}</p>}
                            </div>
                        </div>
                    </div>

                    <div className={cardClass}>
                        <h3 className="text-white font-semibold border-b border-white/5 pb-3">CTA Buttons</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Primary Button Text</label>
                                <input type="text" value={data.cta_primary_text} onChange={e => setData('cta_primary_text', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Primary Button Link</label>
                                <input type="text" value={data.cta_primary_link} onChange={e => setData('cta_primary_link', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Secondary Button Text</label>
                                <input type="text" value={data.cta_secondary_text} onChange={e => setData('cta_secondary_text', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Secondary Button Link</label>
                                <input type="text" value={data.cta_secondary_link} onChange={e => setData('cta_secondary_link', e.target.value)} className={inputClass} />
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
