import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { Skill } from '@/types';
import { ArrowLeft, Save } from 'lucide-react';

interface Props { skill?: Skill; }

const inputClass = "w-full px-4 py-2.5 bg-[#151929] border border-white/10 focus:border-green-400 text-white rounded-xl outline-none text-sm transition-colors";
const cardClass = "bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4";

function SkillForm({ onSubmit, processing, data, setData, errors }: any) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className={cardClass}>
                <h3 className="text-white font-semibold border-b border-white/5 pb-3">Skill Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Name *</label>
                        <input type="text" value={data.name} onChange={(e: any) => setData('name', e.target.value)} className={inputClass} />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Category *</label>
                        <input type="text" value={data.category} onChange={(e: any) => setData('category', e.target.value)} placeholder="e.g. Frontend, Backend, Tools" className={inputClass} />
                        {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Proficiency (0-100) *</label>
                        <input type="number" min={0} max={100} value={data.proficiency} onChange={(e: any) => setData('proficiency', Number(e.target.value))} className={inputClass} />
                        {errors.proficiency && <p className="text-red-400 text-xs mt-1">{errors.proficiency}</p>}
                        <div className="mt-2 h-2 bg-[#151929] rounded-full">
                            <div className="h-full rounded-full bg-green-400 transition-all" style={{ width: `${data.proficiency}%` }} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Icon (class or emoji)</label>
                        <input type="text" value={data.icon} onChange={(e: any) => setData('icon', e.target.value)} placeholder="e.g. devicon-react-plain" className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Color</label>
                        <input type="color" value={data.color} onChange={(e: any) => setData('color', e.target.value)} className="h-10 w-full rounded-xl border border-white/10 bg-[#151929] cursor-pointer" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Order</label>
                        <input type="number" value={data.order} onChange={(e: any) => setData('order', Number(e.target.value))} className={inputClass} />
                    </div>
                </div>
            </div>
            <div className={cardClass}>
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={data.is_active} onChange={(e: any) => setData('is_active', e.target.checked)} className="w-4 h-4 rounded border-white/20 bg-[#151929] text-green-400 focus:ring-green-400" />
                        <span className="text-sm text-gray-400">Active</span>
                    </label>
                    <button type="submit" disabled={processing} className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-400 hover:bg-green-300 disabled:opacity-60 text-[#1e2235] font-semibold rounded-xl text-sm">
                        <Save size={16} /> {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </form>
    );
}

export function SkillCreate() {
    const form = useForm({ name: '', category: '', proficiency: 80, icon: '', color: '#4ade80', order: 0, is_active: true });
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); form.post('/admin/skills'); };
    return (
        <AdminLayout title="Add Skill">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/skills" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><ArrowLeft size={20} /></Link>
                    <h2 className="text-xl font-bold text-white">Add Skill</h2>
                </div>
                <SkillForm onSubmit={handleSubmit} processing={form.processing} data={form.data} setData={form.setData} errors={form.errors} />
            </div>
        </AdminLayout>
    );
}

export default function SkillEdit({ skill }: Props) {
    const form = useForm({ name: skill?.name ?? '', category: skill?.category ?? '', proficiency: skill?.proficiency ?? 80, icon: skill?.icon ?? '', color: skill?.color ?? '#4ade80', order: skill?.order ?? 0, is_active: skill?.is_active ?? true, _method: 'PUT' });
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); form.post(`/admin/skills/${skill?.id}`); };
    return (
        <AdminLayout title="Edit Skill">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/skills" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><ArrowLeft size={20} /></Link>
                    <h2 className="text-xl font-bold text-white">Edit Skill</h2>
                </div>
                <SkillForm onSubmit={handleSubmit} processing={form.processing} data={form.data} setData={form.setData} errors={form.errors} />
            </div>
        </AdminLayout>
    );
}
