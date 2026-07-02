import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { Skill, PaginatedData, FlashMessage } from '@/types';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Props { skills: PaginatedData<Skill>; }

export default function SkillIndex({ skills }: Props) {
    const page = usePage(); const flash = (page.props as any).flash as FlashMessage | undefined;
    const handleDelete = (id: number) => {
        if (confirm('Delete this skill?')) router.delete(`/admin/skills/${id}`);
    };
    return (
        <AdminLayout title="Manage Skills">
            <div className="space-y-6">
                {flash?.success && <div className="p-4 bg-green-400/10 border border-green-400/20 text-green-400 rounded-xl text-sm">{flash.success}</div>}
                <div className="flex items-center justify-between">
                    <div><h2 className="text-xl font-bold text-white">Skills</h2><p className="text-gray-400 text-sm mt-1">{skills.total} total</p></div>
                    <Link href="/admin/skills/create" className="inline-flex items-center gap-2 px-4 py-2 bg-green-400 hover:bg-green-300 text-[#1e2235] font-semibold rounded-xl text-sm">
                        <Plus size={16} /> Add Skill
                    </Link>
                </div>
                <div className="bg-[#1e2235] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead><tr className="border-b border-white/5 bg-white/5">
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Skill</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Proficiency</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="text-right px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr></thead>
                            <tbody className="divide-y divide-white/5">
                                {skills.data.map((skill) => (
                                    <tr key={skill.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4"><p className="text-white text-sm font-medium">{skill.name}</p></td>
                                        <td className="px-6 py-4"><span className="text-gray-400 text-sm">{skill.category}</span></td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-1.5 bg-[#151929] rounded-full max-w-24">
                                                    <div className="h-full bg-green-400 rounded-full" style={{ width: `${skill.proficiency}%` }} />
                                                </div>
                                                <span className="text-gray-400 text-xs">{skill.proficiency}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 text-xs rounded-full border ${skill.is_active ? 'bg-green-400/10 text-green-400 border-green-400/20' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                                                {skill.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/skills/${skill.id}/edit`} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"><Edit size={16} /></Link>
                                                <button onClick={() => handleDelete(skill.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
