import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AdminLayout from '@/Layouts/AdminLayout';
import type { Contact } from '@/types';

interface Props { contact?: Contact; }

const inputClass = "w-full px-4 py-2.5 bg-[#151929] border border-white/10 focus:border-green-400 text-white rounded-xl outline-none text-sm transition-colors";
const cardClass = "bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4";

function ContactForm({ onSubmit, processing, data, setData, errors }: any) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className={cardClass}>
                <h3 className="text-white font-semibold border-b border-white/5 pb-3">Contact Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Type *</label>
                        <select value={data.type} onChange={(e: any) => setData('type', e.target.value)} className={inputClass}>
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="github">GitHub</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="twitter">Twitter</option>
                            <option value="instagram">Instagram</option>
                            <option value="website">Website</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.type && <p className="text-red-400 text-xs mt-1">{errors.type}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Label *</label>
                        <input type="text" value={data.label} onChange={(e: any) => setData('label', e.target.value)} placeholder="e.g. Email, GitHub" className={inputClass} />
                        {errors.label && <p className="text-red-400 text-xs mt-1">{errors.label}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Value *</label>
                        <input type="text" value={data.value} onChange={(e: any) => setData('value', e.target.value)} placeholder="e.g. admin@example.com" className={inputClass} />
                        {errors.value && <p className="text-red-400 text-xs mt-1">{errors.value}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">URL</label>
                        <input type="url" value={data.url} onChange={(e: any) => setData('url', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Icon</label>
                        <input type="text" value={data.icon} onChange={(e: any) => setData('icon', e.target.value)} placeholder="e.g. mail, github" className={inputClass} />
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

export function ContactCreate() {
    const form = useForm({ type: 'email', label: '', value: '', url: '', icon: '', is_active: true, order: 0 });
    
    useEffect(() => {
        if (Object.keys(form.errors).length > 0) {
            const firstError = Object.values(form.errors)[0];
            toast.error(firstError || 'Please check the form for errors');
        }
    }, [form.errors]);
    
    const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault(); form.post('/admin/contacts'); 
};

    return (
        <AdminLayout title="Add Contact">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/contacts" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><ArrowLeft size={20} /></Link>
                    <h2 className="text-xl font-bold text-white">Add Contact</h2>
                </div>
                <ContactForm onSubmit={handleSubmit} processing={form.processing} data={form.data} setData={form.setData} errors={form.errors} />
            </div>
        </AdminLayout>
    );
}

export default function ContactEdit({ contact }: Props) {
    const form = useForm({ type: contact?.type ?? 'email', label: contact?.label ?? '', value: contact?.value ?? '', url: contact?.url ?? '', icon: contact?.icon ?? '', is_active: contact?.is_active ?? true, order: contact?.order ?? 0, _method: 'PUT' });
    
    useEffect(() => {
        if (Object.keys(form.errors).length > 0) {
            const firstError = Object.values(form.errors)[0];
            toast.error(firstError || 'Please check the form for errors');
        }
    }, [form.errors]);
    
    const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault(); form.post(`/admin/contacts/${contact?.id}`); 
};

    return (
        <AdminLayout title="Edit Contact">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/contacts" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><ArrowLeft size={20} /></Link>
                    <h2 className="text-xl font-bold text-white">Edit Contact</h2>
                </div>
                <ContactForm onSubmit={handleSubmit} processing={form.processing} data={form.data} setData={form.setData} errors={form.errors} />
            </div>
        </AdminLayout>
    );
}
