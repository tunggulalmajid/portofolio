import { Link } from '@inertiajs/react';
import { Edit, User } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { About} from '@/types';

interface AboutIndexProps {
    about: About | null;
}

export default function AboutIndex({ about }: AboutIndexProps) {
    return (
        <AdminLayout title="Manage About">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">About Section</h2>
                        <p className="text-gray-400 text-sm mt-1">Manage your about section content</p>
                    </div>
                    <Link href="/admin/about/edit" className="inline-flex items-center gap-2 px-4 py-2 bg-green-400 hover:bg-green-300 text-[#1e2235] font-semibold rounded-xl text-sm transition-colors">
                        <Edit size={16} /> Edit About
                    </Link>
                </div>
                {about ? (
                    <div className="bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#151929] rounded-xl overflow-hidden flex items-center justify-center">
                                {about.profile_image_url ? (
                                    <img src={about.profile_image_url} alt="Profile" className="w-full h-full object-cover" />
                                ) : <User size={24} className="text-gray-500" />}
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">{about.title}</h3>
                                <p className="text-gray-400 text-sm">{about.location}</p>
                            </div>
                            <span className={`ml-auto px-3 py-1 text-xs rounded-full border ${about.is_available ? 'bg-green-400/10 text-green-400 border-green-400/20' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                                {about.is_available ? 'Available' : 'Not Available'}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                            <div><p className="text-xs text-gray-500">Email</p><p className="text-gray-300 text-sm truncate">{about.email}</p></div>
                            <div><p className="text-xs text-gray-500">Phone</p><p className="text-gray-300 text-sm">{about.phone}</p></div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-[#1e2235] border border-white/5 rounded-2xl p-12 text-center">
                        <User size={48} className="text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 mb-4">No about data found.</p>
                        <Link href="/admin/about/edit" className="inline-flex items-center gap-2 px-4 py-2 bg-green-400 hover:bg-green-300 text-[#1e2235] font-semibold rounded-xl text-sm">
                            <Edit size={16} /> Create About
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
