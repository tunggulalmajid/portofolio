import { Link, router } from '@inertiajs/react';
import { Mail, MailOpen, Trash2, Eye, Calendar } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    read_at: string | null;
    created_at: string;
}

interface Props {
    messages: {
        data: Message[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    stats: {
        total: number;
        unread: number;
        today: number;
    };
}

export default function ContactMessageIndex({ messages, stats }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Delete this message?')) {
            router.delete(`/admin/messages/${id}`);
        }
    };

    return (
        <AdminLayout title="Contact Messages">
            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#1e2235] border border-white/5 rounded-xl p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Total Messages</p>
                                <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-400/10 rounded-lg flex items-center justify-center">
                                <Mail size={24} className="text-blue-400" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1e2235] border border-white/5 rounded-xl p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Unread</p>
                                <p className="text-2xl font-bold text-white mt-1">{stats.unread}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-400/10 rounded-lg flex items-center justify-center">
                                <MailOpen size={24} className="text-green-400" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1e2235] border border-white/5 rounded-xl p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Today</p>
                                <p className="text-2xl font-bold text-white mt-1">{stats.today}</p>
                            </div>
                            <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center">
                                <Calendar size={24} className="text-amber-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">Messages</h2>
                        <p className="text-gray-400 text-sm mt-1">{messages.total} total messages</p>
                    </div>
                </div>

                {/* Messages List */}
                <div className="bg-[#1e2235] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="divide-y divide-white/5">
                        {messages.data.length === 0 ? (
                            <div className="p-12 text-center">
                                <Mail size={48} className="mx-auto text-gray-600 mb-3" />
                                <p className="text-gray-400">No messages yet</p>
                            </div>
                        ) : (
                            messages.data.map((msg) => (
                                <div key={msg.id} className={`p-5 hover:bg-white/5 transition-colors ${
                                    !msg.is_read ? 'bg-green-400/5' : ''
                                }`}>
                                    <div className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                            msg.is_read ? 'bg-white/5' : 'bg-green-400/10'
                                        }`}>
                                            {msg.is_read ? (
                                                <MailOpen size={18} className="text-gray-400" />
                                            ) : (
                                                <Mail size={18} className="text-green-400" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <div className="min-w-0">
                                                    <p className={`font-semibold truncate ${
                                                        msg.is_read ? 'text-white' : 'text-green-400'
                                                    }`}>{msg.name}</p>
                                                    <p className="text-gray-400 text-sm truncate">{msg.email}</p>
                                                </div>
                                                <span className="text-gray-500 text-xs whitespace-nowrap">{msg.created_at}</span>
                                            </div>
                                            <p className="text-gray-400 text-sm line-clamp-2 mb-3">{msg.message}</p>
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/messages/${msg.id}`}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-400/10 hover:bg-green-400/20 text-green-400 rounded-lg transition-colors"
                                                >
                                                    <Eye size={13} /> View Details
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(msg.id)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={13} /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {messages.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {Array.from({ length: messages.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/messages?page=${page}`}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                    page === messages.current_page
                                        ? 'bg-green-400 text-[#1e2235] font-semibold'
                                        : 'text-gray-400 hover:bg-white/5'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
