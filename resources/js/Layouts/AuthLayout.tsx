import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    title?: string;
    children: React.ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
    return (
        <>
            {title && <Head title={title} />}
            <div className="min-h-screen bg-[#151929] flex items-center justify-center px-4">
                {/* Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-400/3 rounded-full blur-3xl" />
                </div>

                <div className="relative w-full max-w-md">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block">
                            <span className="text-3xl font-bold text-white">
                                tunggulmajid<span className="text-green-400">.</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm mt-2">Admin Panel</p>
                    </div>

                    <div className="bg-[#1e2235] border border-white/5 rounded-2xl p-8 shadow-2xl">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
