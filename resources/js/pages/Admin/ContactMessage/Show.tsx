import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Mail, Calendar, Globe, Monitor } from 'lucide-react';

interface Props {
    message: {
        id: number;
        name: string;
        email: string;
        message: string;
        ip_address: string | null;
        user_agent: string | null;
        is_read: boolean;
        read_at: string | null;
        created_at: string;
    };
}

export default function ContactMessageShow({ message }: Props) {
    return (
        <AdminLayout title="Message Details">
            <div className="max-w-4xl space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/messages"
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-xl font-bold text-white">Message from {message.name}</h2>
                        <p className="text-gray-400 text-sm mt-1">Received on {message.created_at}</p>
                    </div>
                </div>

                {/* Message Content */}
                <div className="bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-6">
                    <div className="flex items-start gap-4 pb-6 border-b border-white/5">
                        <div className="w-12 h-12 bg-green-400/10 rounded-lg flex items-center justify-center shrink-0">
                            <Mail size={24} className="text-green-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg mb-1">{message.name}</h3>
                            <a
                                href={`mailto:${message.email}`}
                                className="text-green-400 hover:text-green-300 text-sm transition-colors"
                            >
                                {message.email}
                            </a>
                        </div>
                        {message.is_read && message.read_at && (
                            <span className="px-3 py-1 bg-white/5 text-gray-400 text-xs rounded-full">
                                Read on {message.read_at}
                            </span>
                        )}
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Message</h4>
                        <div className="bg-[#151929] border border-white/5 rounded-xl p-5">
                            <p className="text-white leading-relaxed whitespace-pre-wrap">{message.message}</p>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-400/10 rounded-lg flex items-center justify-center">
                                <Calendar size={18} className="text-blue-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Received</p>
                                <p className="text-sm text-white">{message.created_at}</p>
                            </div>
                        </div>

                        {message.ip_address && (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-400/10 rounded-lg flex items-center justify-center">
                                    <Globe size={18} className="text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">IP Address</p>
                                    <p className="text-sm text-white font-mono">{message.ip_address}</p>
                                </div>
                            </div>
                        )}

                        {message.user_agent && (
                            <div className="flex items-start gap-3 sm:col-span-2">
                                <div className="w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center shrink-0">
                                    <Monitor size={18} className="text-amber-400" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-gray-500 mb-1">User Agent</p>
                                    <p className="text-sm text-gray-400 break-all">{message.user_agent}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-[#1e2235] border border-white/5 rounded-2xl p-6">
                    <h4 className="text-white font-semibold mb-4">Quick Actions</h4>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href={`mailto:${message.email}?subject=Re: Your message&body=Hi ${message.name},%0A%0A`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-400 hover:bg-green-300 text-[#1e2235] font-semibold rounded-lg transition-colors text-sm"
                        >
                            <Mail size={16} /> Reply via Email
                        </a>
                        <a
                            href={`mailto:${message.email}`}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-green-400/30 hover:border-green-400 text-green-400 font-semibold rounded-lg transition-colors text-sm"
                        >
                            Open Email Client
                        </a>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
