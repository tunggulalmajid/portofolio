import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { Project, PaginatedData, FlashMessage } from '@/types';
import { Plus, Edit, Trash2, Star, ExternalLink } from 'lucide-react';

interface Props { projects: PaginatedData<Project>; }

const statusColors: Record<string, string> = {
    completed:   'bg-green-400/10 text-green-400 border-green-400/20',
    in_progress: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    archived:    'bg-white/5 text-gray-500 border-white/10',
};

export default function ProjectIndex({ projects }: Props) {
    const handleDelete = (slug: string) => {
        if (confirm('Delete this project?')) router.delete(`/admin/projects/${slug}`);
    };

    return (
        <AdminLayout title="Manage Projects">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div><h2 className="text-xl font-bold text-white">Projects</h2><p className="text-gray-400 text-sm mt-1">{projects.total} total</p></div>
                    <Link href="/admin/projects/create" className="inline-flex items-center gap-2 px-4 py-2 bg-green-400 hover:bg-green-300 text-[#1e2235] font-semibold rounded-xl text-sm">
                        <Plus size={16} /> Add Project
                    </Link>
                </div>
                <div className="bg-[#1e2235] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead><tr className="border-b border-white/5 bg-white/5">
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Project</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Featured</th>
                                <th className="text-right px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr></thead>
                            <tbody className="divide-y divide-white/5">
                                {projects.data.map((project) => (
                                    <tr key={project.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-white text-sm font-medium">{project.title}</p>
                                            <p className="text-gray-500 text-xs mt-0.5">{project.slug}</p>
                                        </td>
                                        <td className="px-6 py-4"><span className="text-gray-400 text-sm">{project.category}</span></td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 text-xs rounded-full border ${statusColors[project.status] ?? statusColors.archived}`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {project.is_featured && <Star size={16} className="text-green-400" />}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a href={`/projects/${project.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"><ExternalLink size={16} /></a>
                                                <Link href={`/admin/projects/${project.slug}/edit`} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"><Edit size={16} /></Link>
                                                <button onClick={() => handleDelete(project.slug)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"><Trash2 size={16} /></button>
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
