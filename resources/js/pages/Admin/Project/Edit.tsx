import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { Project } from '@/types';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Props { project?: Project; }

const inputClass = "w-full px-4 py-2.5 bg-[#151929] border border-white/10 focus:border-green-400 text-white rounded-xl outline-none text-sm transition-colors";
const cardClass = "bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4";

function ProjectForm({ onSubmit, processing, data, setData, errors }: any) {
    const removeExistingImage = (imgPath: string) => {
        setData('images_to_delete', [...(data.images_to_delete ?? []), imgPath]);
        setData('existing_images', (data.existing_images ?? []).filter((img: string) => img !== imgPath));
    };

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
                        <select value={data.category} onChange={(e: any) => setData('category', e.target.value)} className={inputClass}>
                            <option value="">Select Category</option>
                            <option value="Web Application">Web Application</option>
                            <option value="Mobile Application">Mobile Application</option>
                            <option value="E-Commerce">E-Commerce</option>
                            <option value="Company Profile">Company Profile</option>
                            <option value="API">API</option>
                            <option value="Organization">Organization</option>
                        </select>
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
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Year</label>
                                <input type="number" value={data.year ?? ''} onChange={(e: any) => setData('year', e.target.value ? Number(e.target.value) : null)} placeholder="e.g. 2024" min="2000" max="2100" className={inputClass} />
                                {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year}</p>}
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
                
                {/* Show existing thumbnail if editing */}
                {data.existing_thumbnail && !data.thumbnail && (
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Current Thumbnail</label>
                        <div className="relative aspect-video w-48 bg-[#151929] rounded-lg overflow-hidden border border-white/5">
                            <img src={`/storage/${data.existing_thumbnail}`} alt="Current thumbnail" className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}
                
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{data.existing_thumbnail ? 'Change Thumbnail' : 'Upload Thumbnail'}</label>
                    <input type="file" accept="image/*" onChange={(e: any) => setData('thumbnail', e.target.files?.[0] ?? null)}
                        className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-400/10 file:text-green-400 hover:file:bg-green-400/20 file:text-sm file:cursor-pointer" />
                    {data.thumbnail && (
                        <p className="text-green-400 text-xs mt-2">New thumbnail selected: {data.thumbnail.name}</p>
                    )}
                    {errors.thumbnail && <p className="text-red-400 text-xs mt-1">{errors.thumbnail}</p>}
                </div>
            </div>

            <div className={cardClass}>
                <h3 className="text-white font-semibold border-b border-white/5 pb-3">Project Images (Gallery)</h3>
                
                {/* Existing Images */}
                {data.existing_images && data.existing_images.length > 0 && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Current Images</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {data.existing_images.map((img: string, i: number) => (
                                <div key={i} className="relative group aspect-video bg-[#151929] rounded-lg overflow-hidden">
                                    <img src={`/storage/${img}`} alt={`Gallery ${i+1}`} className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => removeExistingImage(img)} 
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Upload New Images */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Upload New Images</label>
                    <input type="file" accept="image/*" multiple onChange={(e: any) => setData('images', e.target.files ? Array.from(e.target.files) : [])}
                        className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-400/10 file:text-green-400 hover:file:bg-green-400/20 file:text-sm file:cursor-pointer" />
                    <p className="text-gray-500 text-xs mt-2">Select multiple images at once for project gallery (max 6 images total recommended)</p>
                    {errors.images && <p className="text-red-400 text-xs mt-1">{errors.images}</p>}
                    
                    {/* Preview New Images */}
                    {data.images && data.images.length > 0 && (
                        <div className="mt-3">
                            <p className="text-sm text-gray-400 mb-2">{data.images.length} new image(s) selected</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {Array.from(data.images).map((file: any, i: number) => (
                                    <div key={i} className="relative aspect-video bg-[#151929] rounded-lg overflow-hidden border border-green-400/20">
                                        <img src={URL.createObjectURL(file)} alt={`New ${i+1}`} className="w-full h-full object-cover" />
                                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-green-400/90 text-[#151929] text-xs rounded font-medium">New</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
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
    const form = useForm({ title: '', short_description: '', full_description: '', category: '', year: null as number | null, technologies: [] as string[], thumbnail: null as File | null, images: [] as File[], demo_link: '', repo_link: '', status: 'completed', is_featured: false, order: 0, is_active: true });
    
    useEffect(() => {
        if (Object.keys(form.errors).length > 0) {
            const firstError = Object.values(form.errors)[0];
            toast.error(firstError || 'Please check the form for errors');
        }
    }, [form.errors]);
    
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
    const form = useForm({ title: project?.title ?? '', short_description: project?.short_description ?? '', full_description: project?.full_description ?? '', category: project?.category ?? '', year: project?.year ?? null, technologies: project?.technologies ?? [], thumbnail: null as File | null, existing_thumbnail: project?.thumbnail ?? null, images: [] as File[], existing_images: project?.images ?? [], images_to_delete: [] as string[], demo_link: project?.demo_link ?? '', repo_link: project?.repo_link ?? '', status: project?.status ?? 'completed', is_featured: project?.is_featured ?? false, order: project?.order ?? 0, is_active: project?.is_active ?? true, _method: 'PUT' });
    
    useEffect(() => {
        if (Object.keys(form.errors).length > 0) {
            const firstError = Object.values(form.errors)[0];
            toast.error(firstError || 'Please check the form for errors');
        }
    }, [form.errors]);
    
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); form.post(`/admin/projects/${project?.slug}`, { forceFormData: true }); };
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
