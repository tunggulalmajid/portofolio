import { Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Globe } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { Contact, PaginatedData} from '@/types';

interface Props { contacts: PaginatedData<Contact>; }

export default function ContactIndex({ contacts }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Delete this contact?')) {
router.delete(`/admin/contacts/${id}`);
}
    };

    return (
        <AdminLayout title="Manage Contacts">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div><h2 className="text-xl font-bold text-white">Contacts</h2><p className="text-gray-400 text-sm mt-1">{contacts.total} total</p></div>
                    <Link href="/admin/contacts/create" className="inline-flex items-center gap-2 px-4 py-2 bg-green-400 hover:bg-green-300 text-[#1e2235] font-semibold rounded-xl text-sm">
                        <Plus size={16} /> Add Contact
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {contacts.data.map((contact) => (
                        <div key={contact.id} className="bg-[#1e2235] border border-white/5 rounded-xl p-5 hover:border-green-400/20 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-10 h-10 bg-green-400/10 border border-green-400/20 rounded-lg flex items-center justify-center">
                                    <Globe size={18} className="text-green-400" />
                                </div>
                                <span className={`px-2 py-0.5 text-xs rounded-full border ${contact.is_active ? 'bg-green-400/10 text-green-400 border-green-400/20' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                                    {contact.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <p className="text-white font-medium">{contact.label}</p>
                            <p className="text-green-400 text-sm capitalize">{contact.type}</p>
                            <p className="text-gray-500 text-sm mt-1 truncate">{contact.value}</p>
                            <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-white/5">
                                <Link href={`/admin/contacts/${contact.id}/edit`} className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"><Edit size={14} /></Link>
                                <button onClick={() => handleDelete(contact.id)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
