import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { Experience, PaginatedData, FlashMessage } from '@/types';
import { Plus, Edit, Trash2, Briefcase, GraduationCap } from 'lucide-react';

interface ExperienceIndexProps { experiences: PaginatedData<Experience>; }

export default function ExperienceIndex({ experiences }: ExperienceIndexProps) {
    const page = usePage(); const flash = (page.props as any).flash as FlashMessage | undefined;

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            router.delete(`/admin/experiences/${id}`);
        }
    };

    return (
        <AdminLayout title="Manage Experience">
            <div className="space-y-6">
                {flash?.success && <div className="p-4 bg-green-400/10 border border-green-400/20 text-green-400 rounded-xl text-sm">{flash.success}</div>}
                <div className="flex items-center justify-between">
                    <div><h2 className="text-xl font-bold text-white">Experiences</h2><p className="text-gray-400 text-sm mt-1">{experiences.total} total records</p></div>
                    <Link href="/admin/experiences/create" className="inline-flex items-center gap-2 px-4 py-2 bg-green-400 hover:bg-green-300 text-[#1e2235] font-semibold rounded-xl text-sm">
                        <Plus size={16} /> Add Experience
                    </Link>
                </div>
                <div className="bg-[#1e2235] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead><tr className="border-b border-white/5 bg-white/5">
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Position</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Duration</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="text-right px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr></thead>
                            <tbody className="divide-y divide-white/5">
                                {experiences.data.map((exp) => (
                                    <tr key={exp.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-green-400/10 border border-green-400/20 rounded-lg flex items-center justify-center shrink-0">
                                                    {exp.type === 'education' ? <GraduationCap size={14} className="text-green-400" /> : <Briefcase size={14} className="text-green-400" />}
                                                </div>
                                                <div>
                                                    <p className="text-white text-sm font-medium">{exp.position}</p>
                                                    <p className="text-gray-500 text-xs">{exp.company}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"><span className="text-gray-400 text-sm capitalize">{exp.type}</span></td>
                                        <td className="px-6 py-4"><span className="text-gray-400 text-sm">{exp.start_date} – {exp.end_date ?? 'Present'}</span></td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 text-xs rounded-full border ${exp.is_active ? 'bg-green-400/10 text-green-400 border-green-400/20' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                                                {exp.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/experiences/${exp.id}/edit`} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"><Edit size={16} /></Link>
                                                <button onClick={() => handleDelete(exp.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {experiences.last_page > 1 && (
                        <div className="flex justify-center gap-2 p-4 border-t border-white/5">
                            {experiences.links.map((link, i) => (
                                <button key={i} disabled={!link.url} onClick={() => link.url && router.get(link.url)}
                                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${link.active ? 'bg-green-400 text-[#1e2235] font-semibold' : link.url ? 'bg-white/5 text-gray-400 hover:text-white border border-white/10' : 'bg-[#1e2235] text-gray-600 border border-white/5 cursor-not-allowed'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
