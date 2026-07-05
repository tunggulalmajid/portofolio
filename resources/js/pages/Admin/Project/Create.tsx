import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const inputClass = "w-full px-4 py-2.5 bg-[#151929] border border-white/10 focus:border-green-400 text-white rounded-xl outline-none text-sm transition-colors";
const cardClass = "bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4";

export default function ProjectCreate() {
    const form = useForm({ 
        title: '', 
        short_description: '', 
        full_description: '', 
        category: '', 
        year: null as number | null, 
        technologies: [] as string[], 
        thumbnail: null as File | null, 
        images: [] as File[],
        demo_link: '', 
        repo_link: '', 
        status: 'completed', 
        is_featured: false, 
        order: 0, 
        is_active: true 
    });

    const addTech = () => form.setData('technologies', [...form.data.technologies, '']);
    const updateTech = (i: number, val: string) => {
        const arr = [...form.data.technologies];
        arr[i] = val;
        form.setData('technologies', arr);
    };
    const removeTech = (i: number) => form.setData('technologies', form.data.technologies.filter((_, idx) => idx !== i));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/admin/projects', { forceFormData: true });
    };

    return (
        <AdminLayout title="Add Project">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/projects" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">
                        <ArrowLeft size={20} />
                    </Link>
                    <h2 className="text-xl font-bold text-white">Add Project</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className={cardClass}>
                        <h3 className="text-white font-semibold border-b border-white/5 pb-3">Basic Info</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Title *</label>
                            <input 
                                type="text" 
                                value={form.data.title} 
                                onChange={(e) => form.setData('title', e.target.value)} 
                                className={inputClass} 
                            />
                            {form.errors.title && <p className="text-red-400 text-xs mt-1">{form.errors.title}</p>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Category *</label>
                                <select 
                                    value={form.data.category} 
                                    onChange={(e) => form.setData('category', e.target.value)} 
                                    className={inputClass}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Web Application">Web Application</option>
                                    <option value="Mobile Application">Mobile Application</option>
                                    <option value="E-Commerce">E-Commerce</option>
                                    <option value="Company Profile">Company Profile</option>
                                    <option value="API">API</option>
                                    <option value="Organization">Organization</option>
                                </select>
                                {form.errors.category && <p className="text-red-400 text-xs mt-1">{form.errors.category}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Status *</label>
                                <select 
                                    value={form.data.status} 
                                    onChange={(e) => form.setData('status', e.target.value)} 
                                    className={inputClass}
                                >
                                    <option value="completed">Completed</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="archived">Archived</option>
                                </select>
                                {form.errors.status && <p className="text-red-400 text-xs mt-1">{form.errors.status}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Year</label>
                                <input 
                                    type="number" 
                                    value={form.data.year ?? ''} 
                                    onChange={(e) => form.setData('year', e.target.value ? Number(e.target.value) : null)} 
                                    placeholder="e.g. 2024" 
                                    min="2000" 
                                    max="2100" 
                                    className={inputClass} 
                                />
                                {form.errors.year && <p className="text-red-400 text-xs mt-1">{form.errors.year}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Demo Link</label>
                                <input 
                                    type="url" 
                                    value={form.data.demo_link} 
                                    onChange={(e) => form.setData('demo_link', e.target.value)} 
                                    className={inputClass} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Repo Link</label>
                                <input 
                                    type="url" 
                                    value={form.data.repo_link} 
                                    onChange={(e) => form.setData('repo_link', e.target.value)} 
                                    className={inputClass} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Order</label>
                                <input 
                                    type="number" 
                                    value={form.data.order} 
                                    onChange={(e) => form.setData('order', Number(e.target.value))} 
                                    className={inputClass} 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Short Description</label>
                            <textarea 
                                rows={2} 
                                value={form.data.short_description} 
                                onChange={(e) => form.setData('short_description', e.target.value)} 
                                className={inputClass} 
                            />
                            {form.errors.short_description && <p className="text-red-400 text-xs mt-1">{form.errors.short_description}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Description</label>
                            <textarea 
                                rows={4} 
                                value={form.data.full_description} 
                                onChange={(e) => form.setData('full_description', e.target.value)} 
                                className={inputClass} 
                            />
                            {form.errors.full_description && <p className="text-red-400 text-xs mt-1">{form.errors.full_description}</p>}
                        </div>
                    </div>

                    <div className={cardClass}>
                        <h3 className="text-white font-semibold border-b border-white/5 pb-3">Thumbnail</h3>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => form.setData('thumbnail', e.target.files?.[0] ?? null)}
                            className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-400/10 file:text-green-400 hover:file:bg-green-400/20 file:text-sm file:cursor-pointer" 
                        />
                        {form.errors.thumbnail && <p className="text-red-400 text-xs mt-1">{form.errors.thumbnail}</p>}
                    </div>

                    <div className={cardClass}>
                        <h3 className="text-white font-semibold border-b border-white/5 pb-3">Project Images (Gallery)</h3>
                        <input 
                            type="file" 
                            accept="image/*" 
                            multiple
                            onChange={(e) => form.setData('images', e.target.files ? Array.from(e.target.files) : [])}
                            className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-400/10 file:text-green-400 hover:file:bg-green-400/20 file:text-sm file:cursor-pointer" 
                        />
                        <p className="text-gray-500 text-xs mt-2">Select multiple images for project gallery (max 6 images recommended)</p>
                        {form.errors.images && <p className="text-red-400 text-xs mt-1">{form.errors.images}</p>}
                    </div>

                    <div className={cardClass}>
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <h3 className="text-white font-semibold">Technologies</h3>
                            <button 
                                type="button" 
                                onClick={addTech} 
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-400/10 hover:bg-green-400/20 text-green-400 rounded-lg text-xs transition-colors"
                            >
                                <Plus size={14} /> Add
                            </button>
                        </div>
                        <div className="space-y-2">
                            {form.data.technologies.map((tech, i) => (
                                <div key={i} className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={tech} 
                                        onChange={(e) => updateTech(i, e.target.value)} 
                                        placeholder={`Technology ${i + 1}`} 
                                        className={inputClass} 
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => removeTech(i)} 
                                        className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors shrink-0"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={cardClass}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={form.data.is_featured} 
                                        onChange={(e) => form.setData('is_featured', e.target.checked)} 
                                        className="w-4 h-4 rounded border-white/20 bg-[#151929] text-green-400 focus:ring-green-400" 
                                    />
                                    <span className="text-sm text-gray-400">Featured</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={form.data.is_active} 
                                        onChange={(e) => form.setData('is_active', e.target.checked)} 
                                        className="w-4 h-4 rounded border-white/20 bg-[#151929] text-green-400 focus:ring-green-400" 
                                    />
                                    <span className="text-sm text-gray-400">Active</span>
                                </label>
                            </div>
                            <button 
                                type="submit" 
                                disabled={form.processing} 
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-400 hover:bg-green-300 disabled:opacity-60 text-[#1e2235] font-semibold rounded-xl text-sm"
                            >
                                <Save size={16} /> {form.processing ? 'Saving...' : 'Create Project'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
