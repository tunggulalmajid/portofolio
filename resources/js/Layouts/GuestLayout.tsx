import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import type { Contact } from '@/types';

interface GuestLayoutProps {
    title?: string;
    contacts?: Contact[];
    children: React.ReactNode;
}

export default function GuestLayout({ title, contacts = [], children }: GuestLayoutProps) {
    return (
        <>
            {title && <Head title={title} />}
            <div className="min-h-screen bg-gray-950 text-white">
                <Navbar />
                <main>{children}</main>
                <Footer contacts={contacts} />
            </div>
        </>
    );
}
