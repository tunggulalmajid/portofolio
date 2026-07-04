import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { Experience, Position } from '@/types';
import { ArrowLeft, Save, Plus, Trash2, X } from 'lucide-react';

interface Props { experience?: Experience; }

const inputClass = "w-full px-4 py-2.5 bg-[#151929] border border-white/10 focus:border-green-400 text-white rounded-xl outline-none text-sm transition-colors";
const cardClass = "bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4";

function ExperienceForm({ onSubmit, processing, data, setData, errors }: any) {
    // Positions management
    const addPosition = () => setData('positions', [...(data.positions ?? []), { title: '', period: '', responsibilities: [] }]);
    const updatePosition = (i: number, field: keyof Position, val: any) => {
        const arr = [...(data.positions ?? [])]; arr[i] = { ...arr[i], [field]: val }; setData('positions', arr);
    };
    const removePosition = (i: number) => setData('positions', (data.positions ?? []).filter((_: any, idx: number) => idx !== i));
    const addPosResp = (posIdx: number) => {
        const arr = [...(data.positions ?? [])]; 
        arr[posIdx].responsibilities = [...(arr[posIdx].responsibilities ?? []), ''];
        setData('positions', arr);
    };
    const updatePosResp = (posIdx: number, respIdx: number, val: string) => {
        const arr = [...(data.positions ?? [])];
        arr[posIdx].responsibilities[respIdx] = val;
        setData('positions', arr);
    };
    const removePosResp = (posIdx: number, respIdx: number) => {
        const arr = [...(data.positions ?? [])];
        arr[posIdx].responsibilities = arr[posIdx].responsibilities.filter((_: any, idx: number) => idx !== respIdx);
        setData('positions', arr);
    };

    // General responsibilities management
    const addResp = () => setData('responsibilities', [...(data.responsibilities ?? []), '']);
    const updateResp = (i: number, val: string) => {
        const arr = [...(data.responsibilities ?? [])]; arr[i] = val; setData('responsibilities', arr);
    };
    const removeResp = (i: number) => setData('responsibilities', (data.responsibilities ?? []).filter((_: any, idx: number) => idx !== i));

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className={cardClass}>
                <h3 className="text-white font-semibold border-b border-white/5 pb-3">Basic Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Company *</label>
                        <input type="text" value={data.company} onChange={(e: any) => setData('company', e.target.value)} className={inputClass} />
                        {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Position *</label>
                        <input type="text" value={data.position} onChange={(e: any) => setData('position', e.target.value)} className={inputClass} />
                        {errors.position && <p className="text-red-400 text-xs mt-1">{errors.position}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Type *</label>
                        <select value={data.type} onChange={(e: any) => setData('type', e.target.value)} className={inputClass}>
                            <option value="work">Work</option>
                            <option value="education">Education</option>
                            <option value="organization">Organization</option>
                        </select>
                        {errors.type && <p className="text-red-400 text-xs mt-1">{errors.type}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Location</label>
                        <input type="text" value={data.location} onChange={(e: any) => setData('location', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Start Date *</label>
                        <input type="date" value={data.start_date} onChange={(e: any) => setData('start_date', e.target.value)} className={inputClass} />
                        {errors.start_date && <p className="text-red-400 text-xs mt-1">{errors.start_date}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">End Date</label>
                        <input type="date" value={data.end_date ?? ''} onChange={(e: any) => setData('end_date', e.target.value || null)} className={inputClass} />
                        {errors.end_date && <p className="text-red-400 text-xs mt-1">{errors.end_date}</p>}
                    </div>
                    <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={data.is_current ?? false} onChange={(e: any) => setData('is_current', e.target.checked)} className="w-4 h-4 rounded border-white/20 bg-[#151929] text-green-400 focus:ring-green-400" />
                            <span className="text-sm text-gray-400">Currently working here</span>
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Order</label>
                        <input type="number" value={data.order} onChange={(e: any) => setData('order', Number(e.target.value))} className={inputClass} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
                    <textarea rows={3} value={data.description} onChange={(e: any) => setData('description', e.target.value)} className={inputClass} />
                    {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                </div>
            </div>

            <div className={cardClass}>
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-white font-semibold">Position History (Optional)</h3>
                    <button type="button" onClick={addPosition} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-400/10 hover:bg-green-400/20 text-green-400 rounded-lg text-xs transition-colors">
                        <Plus size={14} /> Add Position
                    </button>
                </div>
                <p className="text-gray-500 text-xs">Use this for multiple positions in the same organization (e.g., Staff → Leader)</p>
                <div className="space-y-4 mt-4">
                    {(data.positions ?? []).map((pos: Position, posIdx: number) => (
                        <div key={posIdx} className="border border-white/10 rounded-xl p-4 space-y-3">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Title *</label>
                                        <input type="text" value={pos.title} onChange={(e) => updatePosition(posIdx, 'title', e.target.value)} placeholder="e.g. Staff Divisi IT" className={inputClass} />
                                        {errors[`positions.${posIdx}.title`] && <p className="text-red-400 text-xs mt-1">{errors[`positions.${posIdx}.title`]}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Period *</label>
                                        <input type="text" value={pos.period} onChange={(e) => updatePosition(posIdx, 'period', e.target.value)} placeholder="e.g. 2021-2022" className={inputClass} />
                                        {errors[`positions.${posIdx}.period`] && <p className="text-red-400 text-xs mt-1">{errors[`positions.${posIdx}.period`]}</p>}
                                    </div>
                                </div>
                                <button type="button" onClick={() => removePosition(posIdx)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors shrink-0">
                                    <X size={16} />
                                </button>
                            </div>
                            
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-xs font-medium text-gray-400">Responsibilities</label>
                                    <button type="button" onClick={() => addPosResp(posIdx)} className="text-xs text-green-400 hover:text-green-300 transition-colors">+ Add</button>
                                </div>
                                <div className="space-y-1.5">
                                    {(pos.responsibilities ?? []).map((resp: string, respIdx: number) => (
                                        <div key={respIdx} className="flex gap-2">
                                            <input type="text" value={resp} onChange={(e) => updatePosResp(posIdx, respIdx, e.target.value)} placeholder="Responsibility" className={inputClass} />
                                            <button type="button" onClick={() => removePosResp(posIdx, respIdx)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors shrink-0">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cardClass}>
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-white font-semibold">General Responsibilities (Optional)</h3>
                    <button type="button" onClick={addResp} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-400/10 hover:bg-green-400/20 text-green-400 rounded-lg text-xs transition-colors">
                        <Plus size={14} /> Add
                    </button>
                </div>
                <div className="space-y-2">
                    {(data.responsibilities ?? []).map((resp: string, i: number) => (
                        <div key={i} className="flex gap-2">
                            <input type="text" value={resp} onChange={(e: any) => updateResp(i, e.target.value)} placeholder={`Responsibility ${i + 1}`} className={inputClass} />
                            <button type="button" onClick={() => removeResp(i)} className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors shrink-0"><Trash2 size={16} /></button>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cardClass}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
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

export function ExperienceCreate() {
    const form = useForm({ company: '', position: '', positions: [] as Position[], type: 'work', location: '', start_date: '', end_date: null as string | null, is_current: false, description: '', responsibilities: [] as string[], order: 0, is_active: true });
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); form.post('/admin/experiences'); };
    return (
        <AdminLayout title="Add Experience">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/experiences" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"><ArrowLeft size={20} /></Link>
                    <h2 className="text-xl font-bold text-white">Add Experience</h2>
                </div>
                <ExperienceForm onSubmit={handleSubmit} processing={form.processing} data={form.data} setData={form.setData} errors={form.errors} />
            </div>
        </AdminLayout>
    );
}

export default function ExperienceEdit({ experience }: Props) {
    const form = useForm({ company: experience?.company ?? '', position: experience?.position ?? '', positions: experience?.positions ?? [], type: experience?.type ?? 'work', location: experience?.location ?? '', start_date: experience?.start_date ?? '', end_date: experience?.end_date ?? null, is_current: experience?.is_current ?? false, description: experience?.description ?? '', responsibilities: experience?.responsibilities ?? [], order: experience?.order ?? 0, is_active: experience?.is_active ?? true, _method: 'PUT' });
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); form.post(`/admin/experiences/${experience?.id}`); };
    return (
        <AdminLayout title="Edit Experience">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/experiences" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"><ArrowLeft size={20} /></Link>
                    <h2 className="text-xl font-bold text-white">Edit Experience</h2>
                </div>
                <ExperienceForm onSubmit={handleSubmit} processing={form.processing} data={form.data} setData={form.setData} errors={form.errors} />
            </div>
        </AdminLayout>
    );
}
