import AdminLayout from '@/Layouts/AdminLayout';
import { Link, usePage } from '@inertiajs/react';
import { Hero, FlashMessage } from '@/types';
import { Edit, User } from 'lucide-react';

interface HeroIndexProps {
    hero: Hero | null;
}

export default function HeroIndex({ hero }: HeroIndexProps) {
    return (
        <AdminLayout title="Manage Hero">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">Hero Section</h2>
                        <p className="text-gray-400 text-sm mt-1">Manage your hero section content</p>
                    </div>
                    <Link href="/admin/hero/edit" className="inline-flex items-center gap-2 px-4 py-2 bg-green-400 hover:bg-green-300 text-[#1e2235] font-semibold rounded-xl text-sm transition-colors">
                        <Edit size={16} /> Edit Hero
                    </Link>
                </div>

                {hero ? (
                    <div className="bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#151929] rounded-xl overflow-hidden flex items-center justify-center">
                                {hero.profile_image_url ? (
                                    <img src={hero.profile_image_url} alt={hero.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={24} className="text-gray-500" />
                                )}
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">{hero.name}</h3>
                                <p className="text-green-400 text-sm">{hero.tagline}</p>
                            </div>
                            <span className={`ml-auto px-3 py-1 text-xs rounded-full border ${hero.is_active ? 'bg-green-400/10 text-green-400 border-green-400/20' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                                {hero.is_active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Description</p>
                                <p className="text-gray-300 text-sm line-clamp-2">{hero.description}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">CV File</p>
                                <p className="text-gray-300 text-sm">{hero.cv_file_url ? '✓ Uploaded' : 'Not uploaded'}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-[#1e2235] border border-white/5 rounded-2xl p-12 text-center">
                        <User size={48} className="text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 mb-4">No hero data found. Create one to get started.</p>
                        <Link href="/admin/hero/edit" className="inline-flex items-center gap-2 px-4 py-2 bg-green-400 hover:bg-green-300 text-[#1e2235] font-semibold rounded-xl text-sm">
                            <Edit size={16} /> Create Hero
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
