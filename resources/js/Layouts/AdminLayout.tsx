import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    LayoutDashboard, User, Code2, Briefcase, Award, BookOpen,
    Phone, ChevronLeft, ChevronRight, LogOut, Menu, X, ExternalLink
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

interface AdminLayoutProps {
    title?: string;
    children: React.ReactNode;
}

const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Messages', href: '/admin/messages', icon: Phone },
    { label: 'Hero', href: '/admin/hero', icon: User },
    { label: 'About', href: '/admin/about', icon: BookOpen },
    { label: 'Experience', href: '/admin/experiences', icon: Briefcase },
    { label: 'Projects', href: '/admin/projects', icon: Code2 },
    { label: 'Certificates', href: '/admin/certificates', icon: Award },
    { label: 'Skills', href: '/admin/skills', icon: Code2 },
    { label: 'Contacts', href: '/admin/contacts', icon: Phone },
];

export default function AdminLayout({ title, children }: AdminLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { url } = usePage();
    const page = usePage();
    const auth = (page.props as any).auth as { user: { name: string; email: string } };
    const flash = (page.props as any).flash as { success?: string; error?: string } | undefined;

    // Handle flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                duration: 4000,
                position: 'top-right',
            });
        }
        if (flash?.error) {
            toast.error(flash.error, {
                duration: 5000,
                position: 'top-right',
            });
        }
    }, [flash]);

    const handleLogout = () => {
        router.post('/logout');
    };

    const isActive = (href: string) => {
        if (href === '/admin') return url === '/admin';
        return url.startsWith(href);
    };

    const Sidebar = ({ isMobile = false }) => (
        <aside
            className={`flex flex-col bg-[#1e2235] border-r border-white/5 transition-all duration-200 ${
                isMobile ? 'w-64' : collapsed ? 'w-16' : 'w-64'
            } ${isMobile ? '' : 'hidden md:flex'}`}
        >
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-white/5">
                {(!collapsed || isMobile) && (
                    <Link href="/" className="text-lg font-bold text-white hover:text-green-400 transition-colors flex items-center gap-2">
                        tunggulalmajid<span className="text-green-400">.</span>
                        <ExternalLink size={14} className="text-gray-500" />
                    </Link>
                )}
                {!isMobile && (
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                active
                                    ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            } ${collapsed && !isMobile ? 'justify-center' : ''}`}
                            title={collapsed && !isMobile ? item.label : undefined}
                        >
                            <Icon size={18} className="shrink-0" />
                            {(!collapsed || isMobile) && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* User + Logout */}
            <div className="p-3 border-t border-white/5">
                {(!collapsed || isMobile) && auth?.user && (
                    <div className="px-3 py-2 mb-2">
                        <p className="text-white text-sm font-medium truncate">{auth.user.name}</p>
                        <p className="text-gray-500 text-xs truncate">{auth.user.email}</p>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl text-sm transition-all ${
                        collapsed && !isMobile ? 'justify-center' : ''
                    }`}
                    title={collapsed && !isMobile ? 'Logout' : undefined}
                >
                    <LogOut size={18} className="shrink-0" />
                    {(!collapsed || isMobile) && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );

    return (
        <>
            {/* Toast Notifications */}
            <Toaster
                toastOptions={{
                    className: '',
                    style: {
                        background: '#1e2235',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        padding: '16px',
                    },
                    success: {
                        iconTheme: {
                            primary: '#4ade80',
                            secondary: '#1e2235',
                        },
                        style: {
                            border: '1px solid rgba(74, 222, 128, 0.2)',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#f87171',
                            secondary: '#1e2235',
                        },
                        style: {
                            border: '1px solid rgba(248, 113, 113, 0.2)',
                        },
                    },
                }}
            />

            {/* Mobile overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
                    <div className="absolute left-0 top-0 bottom-0 z-50">
                        <Sidebar isMobile={true} />
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}

            <div className="flex h-screen bg-[#151929] overflow-hidden">
                <Sidebar />

                <div className="flex-1 flex flex-col min-w-0">
                    {/* Header */}
                    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-[#1e2235] border-b border-white/5 shrink-0">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="md:hidden p-2 text-gray-400 hover:text-white"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-lg font-semibold text-white">{title}</h1>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors"
                                target="_blank"
                            >
                                <ExternalLink size={16} />
                                <span className="hidden sm:inline">View Site</span>
                            </Link>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 overflow-y-auto p-6">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
