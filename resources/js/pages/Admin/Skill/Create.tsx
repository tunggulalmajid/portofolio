import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

const inputClass = "w-full px-4 py-2.5 bg-[#151929] border border-white/10 focus:border-green-400 text-white rounded-xl outline-none text-sm transition-colors";
const cardClass = "bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4";

export default function SkillCreate() {
    const form = useForm({ 
        name: '', 
        category: '', 
        icon_name: '', 
        color: '#4ade80', 
        order: 0, 
        is_active: true 
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/admin/skills');
    };

    return (
        <AdminLayout title="Add Skill">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/skills" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">
                        <ArrowLeft size={20} />
                    </Link>
                    <h2 className="text-xl font-bold text-white">Add Skill</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className={cardClass}>
                        <h3 className="text-white font-semibold border-b border-white/5 pb-3">Skill Info</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Name *</label>
                                <input 
                                    type="text" 
                                    value={form.data.name} 
                                    onChange={(e) => form.setData('name', e.target.value)} 
                                    className={inputClass} 
                                />
                                {form.errors.name && <p className="text-red-400 text-xs mt-1">{form.errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Category *</label>
                                <select 
                                    value={form.data.category} 
                                    onChange={(e) => form.setData('category', e.target.value)} 
                                    className={inputClass}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Mobile">Mobile</option>
                                    <option value="DevOps">DevOps</option>
                                </select>
                                {form.errors.category && <p className="text-red-400 text-xs mt-1">{form.errors.category}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Icon Name (Lucide)</label>
                                <input 
                                    type="text" 
                                    value={form.data.icon_name ?? ''} 
                                    onChange={(e) => form.setData('icon_name', e.target.value)} 
                                    placeholder="e.g. Code2, Database, Smartphone" 
                                    className={inputClass} 
                                />
                                <p className="text-gray-500 text-xs mt-1">
                                    Lihat: <a href="https://lucide.dev/icons" target="_blank" rel="noopener" className="text-green-400 hover:underline">lucide.dev/icons</a>
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Color</label>
                                <input 
                                    type="color" 
                                    value={form.data.color} 
                                    onChange={(e) => form.setData('color', e.target.value)} 
                                    className="h-10 w-full rounded-xl border border-white/10 bg-[#151929] cursor-pointer" 
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
                    </div>
                    <div className={cardClass}>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={form.data.is_active} 
                                    onChange={(e) => form.setData('is_active', e.target.checked)} 
                                    className="w-4 h-4 rounded border-white/20 bg-[#151929] text-green-400 focus:ring-green-400" 
                                />
                                <span className="text-sm text-gray-400">Active</span>
                            </label>
                            <button 
                                type="submit" 
                                disabled={form.processing} 
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-400 hover:bg-green-300 disabled:opacity-60 text-[#1e2235] font-semibold rounded-xl text-sm"
                            >
                                <Save size={16} /> {form.processing ? 'Saving...' : 'Create Skill'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
