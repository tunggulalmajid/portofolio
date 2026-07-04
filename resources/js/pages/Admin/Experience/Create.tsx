import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { Position } from '@/types';
import { ArrowLeft, Save, Plus, Trash2, X } from 'lucide-react';

const inputClass = "w-full px-4 py-2.5 bg-[#151929] border border-white/10 focus:border-green-400 text-white rounded-xl outline-none text-sm transition-colors";
const cardClass = "bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4";

export default function ExperienceCreate() {
    const form = useForm({ 
        company: '', 
        position: '', 
        positions: [] as Position[],
        type: 'work', 
        location: '', 
        start_date: '', 
        end_date: null as string | null, 
        is_current: false,
        description: '', 
        responsibilities: [] as string[], 
        order: 0, 
        is_active: true 
    });

    // Positions management
    const addPosition = () => form.setData('positions', [...form.data.positions, { title: '', period: '', responsibilities: [] }]);
    const updatePosition = (i: number, field: keyof Position, val: any) => {
        const arr = [...form.data.positions]; arr[i] = { ...arr[i], [field]: val }; form.setData('positions', arr);
    };
    const removePosition = (i: number) => form.setData('positions', form.data.positions.filter((_, idx) => idx !== i));
    const addPosResp = (posIdx: number) => {
        const arr = [...form.data.positions]; 
        arr[posIdx].responsibilities = [...(arr[posIdx].responsibilities ?? []), ''];
        form.setData('positions', arr);
    };
    const updatePosResp = (posIdx: number, respIdx: number, val: string) => {
        const arr = [...form.data.positions];
        arr[posIdx].responsibilities[respIdx] = val;
        form.setData('positions', arr);
    };
    const removePosResp = (posIdx: number, respIdx: number) => {
        const arr = [...form.data.positions];
        arr[posIdx].responsibilities = arr[posIdx].responsibilities.filter((_, idx) => idx !== respIdx);
        form.setData('positions', arr);
    };

    // General responsibilities management
    const addResp = () => form.setData('responsibilities', [...form.data.responsibilities, '']);
    const updateResp = (i: number, val: string) => {
        const arr = [...form.data.responsibilities];
        arr[i] = val;
        form.setData('responsibilities', arr);
    };
    const removeResp = (i: number) => form.setData('responsibilities', form.data.responsibilities.filter((_, idx) => idx !== i));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/admin/experiences');
    };

    return (
        <AdminLayout title="Add Experience">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/experiences" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <ArrowLeft size={20} />
                    </Link>
                    <h2 className="text-xl font-bold text-white">Add Experience</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className={cardClass}>
                        <h3 className="text-white font-semibold border-b border-white/5 pb-3">Basic Info</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Company *</label>
                                <input 
                                    type="text" 
                                    value={form.data.company} 
                                    onChange={(e) => form.setData('company', e.target.value)} 
                                    className={inputClass} 
                                />
                                {form.errors.company && <p className="text-red-400 text-xs mt-1">{form.errors.company}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Position *</label>
                                <input 
                                    type="text" 
                                    value={form.data.position} 
                                    onChange={(e) => form.setData('position', e.target.value)} 
                                    className={inputClass} 
                                />
                                {form.errors.position && <p className="text-red-400 text-xs mt-1">{form.errors.position}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Type *</label>
                                <select 
                                    value={form.data.type} 
                                    onChange={(e) => form.setData('type', e.target.value)} 
                                    className={inputClass}
                                >
                                    <option value="work">Work</option>
                                    <option value="education">Education</option>
                                    <option value="organization">Organization</option>
                                </select>
                                {form.errors.type && <p className="text-red-400 text-xs mt-1">{form.errors.type}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Location</label>
                                <input 
                                    type="text" 
                                    value={form.data.location} 
                                    onChange={(e) => form.setData('location', e.target.value)} 
                                    className={inputClass} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Start Date *</label>
                                <input 
                                    type="date" 
                                    value={form.data.start_date} 
                                    onChange={(e) => form.setData('start_date', e.target.value)} 
                                    className={inputClass} 
                                />
                                {form.errors.start_date && <p className="text-red-400 text-xs mt-1">{form.errors.start_date}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">End Date</label>
                                <input 
                                    type="date" 
                                    value={form.data.end_date ?? ''} 
                                    onChange={(e) => form.setData('end_date', e.target.value || null)} 
                                    className={inputClass} 
                                />
                                {form.errors.end_date && <p className="text-red-400 text-xs mt-1">{form.errors.end_date}</p>}
                            </div>
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={form.data.is_current} 
                                        onChange={(e) => form.setData('is_current', e.target.checked)} 
                                        className="w-4 h-4 rounded border-white/20 bg-[#151929] text-green-400 focus:ring-green-400" 
                                    />
                                    <span className="text-sm text-gray-400">Currently working here</span>
                                </label>
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
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
                            <textarea 
                                rows={3} 
                                value={form.data.description} 
                                onChange={(e) => form.setData('description', e.target.value)} 
                                className={inputClass} 
                            />
                            {form.errors.description && <p className="text-red-400 text-xs mt-1">{form.errors.description}</p>}
                        </div>
                    </div>

                    <div className={cardClass}>
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <h3 className="text-white font-semibold">Position History (Optional)</h3>
                            <button 
                                type="button" 
                                onClick={addPosition} 
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-400/10 hover:bg-green-400/20 text-green-400 rounded-lg text-xs transition-colors"
                            >
                                <Plus size={14} /> Add Position
                            </button>
                        </div>
                        <p className="text-gray-500 text-xs">Use this for multiple positions in the same organization (e.g., Staff → Leader)</p>
                        <div className="space-y-4 mt-4">
                            {form.data.positions.map((pos, posIdx) => (
                                <div key={posIdx} className="border border-white/10 rounded-xl p-4 space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Title *</label>
                                                <input type="text" value={pos.title} onChange={(e) => updatePosition(posIdx, 'title', e.target.value)} placeholder="e.g. Staff Divisi IT" className={inputClass} />
                                                {form.errors[`positions.${posIdx}.title`] && <p className="text-red-400 text-xs mt-1">{form.errors[`positions.${posIdx}.title`]}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Period *</label>
                                                <input type="text" value={pos.period} onChange={(e) => updatePosition(posIdx, 'period', e.target.value)} placeholder="e.g. 2021-2022" className={inputClass} />
                                                {form.errors[`positions.${posIdx}.period`] && <p className="text-red-400 text-xs mt-1">{form.errors[`positions.${posIdx}.period`]}</p>}
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
                                            {(pos.responsibilities ?? []).map((resp, respIdx) => (
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
                            <button 
                                type="button" 
                                onClick={addResp} 
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-400/10 hover:bg-green-400/20 text-green-400 rounded-lg text-xs transition-colors"
                            >
                                <Plus size={14} /> Add
                            </button>
                        </div>
                        <div className="space-y-2">
                            {form.data.responsibilities.map((resp, i) => (
                                <div key={i} className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={resp} 
                                        onChange={(e) => updateResp(i, e.target.value)} 
                                        placeholder={`Responsibility ${i + 1}`} 
                                        className={inputClass} 
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => removeResp(i)} 
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
                                <Save size={16} /> {form.processing ? 'Saving...' : 'Create Experience'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
