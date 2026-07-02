import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { Project } from '@/types';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';

interface Props { project?: Project; }

const inputClass = "w-full px-4 py-2.5 bg-[#151929] border border-white/10 focus:border-green-400 text-white rounded-xl outline-none text-sm transition-colors";
const cardClass = "bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4";

function ProjectForm({ onSubmit, processing, data, setData, errors }: any) {
    const addTech = () => setData('technologies', [...(data.technologies ?? []), '']);
    const updateTech = (i: number, val: string) => {
        const arr = [...(data.technologies ?? [])]; arr[i] = val; setData('technologies', arr);
    };
    const removeTech = (i: number) => setData('technologies', (data.technologies ?? []).filter((_: any, idx: number) => idx !== i));

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className={cardClass}>
                <h3 className="text-white font-semibold border-b border-white/5 pb-3">Basic Info</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Title *</label>
                    <input type="text" value={data.title} onChange={(e: any) => setData('title', e.target.value)} className={inputClass} />
                    {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Category *</label>
                        <input type="text" value={data.category} onChange={(e: any) => setData('category', e.target.value)} placeholder="e.g. Web Application" className={inputClass} />
                        {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Status *</label>
                        <select value={data.status} onChange={(e: any) => setData('status', e.target.value)} className={inputClass}>
                            <option value="completed">Completed</option>
                            <option value="in_progress">In Progress</option>
                            <option value="archived">Archived</option>
                        </select>
                        {errors.status && <p className="text-red-400 text-xs mt-1">{errors.status}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Demo Link</label>
                        <input type="url" value={data.demo_link} onChange={(e: any) => setData('demo_link', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Repo Link</label>
                        <input type="url" value={data.repo_link} onChange={(e: any) => setData('repo_link', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Order</label>
                        <input type="number" value={data.order} onChange={(e: any) => setData('order', Number(e.target.value))} className={inputClass} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Short Description</label>
                    <textarea rows={2} value={data.short_description} onChange={(e: any) => setData('short_description', e.target.value)} className={inputClass} />
                    {errors.short_description && <p className="text-red-400 text-xs mt-1">{errors.short_description}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Description</label>
                    <textarea rows={4} value={data.full_description} onChange={(e: any) => setData('full_description', e.target.value)} className={inputClass} />
                    {errors.full_description && <p className="text-red-400 text-xs mt-1">{errors.full_description}</p>}
                </div>
            </div>

            <div className={cardClass}>
                <h3 className="text-white font-semibold border-b border-white/5 pb-3">Thumbnail</h3>
                <input type="file" accept="image/*" onChange={(e: any) => setData('thumbnail', e.target.files?.[0] ?? null)}
                    className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-400/10 file:text-green-400 hover:file:bg-green-400/20 file:text-sm file:cursor-pointer" />
                {errors.thumbnail && <p className="text-red-400 text-xs mt-1">{errors.thumbnail}</p>}
            </div>

            <div className={cardClass}>
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-white font-semibold">Technologies</h3>
                    <button type="button" onClick={addTech} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-400/10 hover:bg-green-400/20 text-green-400 rounded-lg text-xs transition-colors">
                        <Plus size={14} /> Add
                    </button>
                </div>
                <div className="space-y-2">
                    {(data.technologies ?? []).map((tech: string, i: number) => (
                        <div key={i} className="flex gap-2">
                            <input type="text" value={tech} onChange={(e: any) => updateTech(i, e.target.value)} placeholder={`Technology ${i + 1}`} className={inputClass} />
                            <button type="button" onClick={() => removeTech(i)} className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors shrink-0"><Trash2 size={16} /></button>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cardClass}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={data.is_featured} onChange={(e: any) => setData('is_featured', e.target.checked)} className="w-4 h-4 rounded border-white/20 bg-[#151929] text-green-400 focus:ring-green-400" />
                            <span className="text-sm text-gray-400">Featured</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={data.is_active} onChange={(e: any) => setData('is_active', e.target.checked)} className="w-4 h-4 rounded border-white/20 bg-[#151929] text-green-400 focus:ring-green-400" />
                            <span className="text-sm text-gray-400">Active</span>
                        </label>
                    </div>
                    <button type="submit" disabled={processing} className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-400 hover:bg-green-300 disabled:opacity-60 text-[#1e2235] font-semibold rounded-xl text-sm">
                        <Save size={16} /> {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </form>
    );
}

export function ProjectCreate() {
    const form = useForm({ title: '', short_description: '', full_description: '', category: '', technologies: [] as string[], thumbnail: null as File | null, demo_link: '', repo_link: '', status: 'completed', is_featured: false, order: 0, is_active: true });
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); form.post('/admin/projects', { forceFormData: true }); };
    return (
        <AdminLayout title="Add Project">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/projects" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><ArrowLeft size={20} /></Link>
                    <h2 className="text-xl font-bold text-white">Add Project</h2>
                </div>
                <ProjectForm onSubmit={handleSubmit} processing={form.processing} data={form.data} setData={form.setData} errors={form.errors} />
            </div>
        </AdminLayout>
    );
}

export default function ProjectEdit({ project }: Props) {
    const form = useForm({ title: project?.title ?? '', short_description: project?.short_description ?? '', full_description: project?.full_description ?? '', category: project?.category ?? '', technologies: project?.technologies ?? [], thumbnail: null as File | null, demo_link: project?.demo_link ?? '', repo_link: project?.repo_link ?? '', status: project?.status ?? 'completed', is_featured: project?.is_featured ?? false, order: project?.order ?? 0, is_active: project?.is_active ?? true, _method: 'PUT' });
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); form.post(`/admin/projects/${project?.id}`, { forceFormData: true }); };
    return (
        <AdminLayout title="Edit Project">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/projects" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><ArrowLeft size={20} /></Link>
                    <h2 className="text-xl font-bold text-white">Edit Project</h2>
                </div>
                <ProjectForm onSubmit={handleSubmit} processing={form.processing} data={form.data} setData={form.setData} errors={form.errors} />
            </div>
        </AdminLayout>
    );
}
